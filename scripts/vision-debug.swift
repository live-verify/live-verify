#!/usr/bin/env swift
// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: Apache-2.0

import AppKit
import CoreImage
import Foundation
import ImageIO
import Vision

// macOS debug harness: run the Vision rectangle detection + OCR pipeline on foo.jpeg (or a provided path).

// MARK: - Helpers

struct Logger {
    static func log(_ message: String) {
        let ts = ISO8601DateFormatter().string(from: Date())
        print("[\(ts)] \(message)")
    }
}

func loadImageData(at path: String) -> (data: Data, ciImage: CIImage, cgImage: CGImage) {
    let url = URL(fileURLWithPath: path)
    do {
        let data = try Data(contentsOf: url)
        guard let ciImage = CIImage(data: data) else {
            fatalError("Could not build CIImage from \(path)")
        }
        guard let source = CGImageSourceCreateWithData(data as CFData, nil),
              let cgImage = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
            fatalError("Could not build CGImage from \(path)")
        }
        return (data, ciImage, cgImage)
    } catch {
        fatalError("Failed to read \(path): \(error.localizedDescription)")
    }
}

func exifOrientation(from data: Data) -> CGImagePropertyOrientation? {
    guard let source = CGImageSourceCreateWithData(data as CFData, nil),
          let props = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [CFString: Any],
          let raw = props[kCGImagePropertyOrientation] as? UInt32,
          let orientation = CGImagePropertyOrientation(rawValue: raw) else {
        return nil
    }
    return orientation
}

func describe(_ orientation: CGImagePropertyOrientation?) -> String {
    guard let orientation else { return "unknown (defaulting to up)" }
    switch orientation {
    case .up: return "up (1)"
    case .upMirrored: return "upMirrored (2)"
    case .down: return "down (3)"
    case .downMirrored: return "downMirrored (4)"
    case .leftMirrored: return "leftMirrored (5)"
    case .left: return "left (6)"
    case .rightMirrored: return "rightMirrored (7)"
    case .right: return "right (8)"
    @unknown default: return "unknown value \(orientation.rawValue)"
    }
}

func recognizeText(from cgImage: CGImage, label: String, orientation: CGImagePropertyOrientation) -> String {
    let buffer = pixelBuffer(from: cgImage)
    return recognizeText(using: VNImageRequestHandler(cvPixelBuffer: buffer, orientation: orientation, options: [:]), label: label)
}

func pixelBuffer(from cgImage: CGImage) -> CVPixelBuffer {
    let frameSize = CGSize(width: cgImage.width, height: cgImage.height)
    let attrs: [CFString: Any] = [
        kCVPixelBufferCGImageCompatibilityKey: true,
        kCVPixelBufferCGBitmapContextCompatibilityKey: true
    ]

    var pixelBuffer: CVPixelBuffer?
    let status = CVPixelBufferCreate(
        kCFAllocatorDefault,
        Int(frameSize.width),
        Int(frameSize.height),
        kCVPixelFormatType_32BGRA,
        attrs as CFDictionary,
        &pixelBuffer
    )

    guard status == kCVReturnSuccess, let buffer = pixelBuffer else {
        fatalError("Failed to allocate pixel buffer: \(status)")
    }

    CVPixelBufferLockBaseAddress(buffer, [])
    defer { CVPixelBufferUnlockBaseAddress(buffer, []) }

    guard let context = CGContext(
        data: CVPixelBufferGetBaseAddress(buffer),
        width: Int(frameSize.width),
        height: Int(frameSize.height),
        bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
        space: CGColorSpaceCreateDeviceRGB(),
        bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue
    ) else {
        fatalError("Failed to create CGContext for pixel buffer")
    }

    context.draw(cgImage, in: CGRect(origin: .zero, size: frameSize))
    return buffer
}

private func recognizeText(using handler: VNImageRequestHandler, label: String) -> String {
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = false
    request.recognitionLanguages = ["en-US"]

    do {
        try handler.perform([request])
        guard let observations = request.results,
              !observations.isEmpty else {
            fatalError("\(label): no text observations")
        }
        let lines = observations.compactMap { $0.topCandidates(1).first?.string }
        return lines.joined(separator: "\n")
    } catch {
        fatalError("\(label) OCR failed: \(error.localizedDescription)")
    }
}

func detectRectangles(at url: URL, orientation: CGImagePropertyOrientation) -> [VNRectangleObservation] {
    let request = VNDetectRectanglesRequest()
    request.minimumAspectRatio = 0.3
    request.maximumAspectRatio = 1.0
    request.minimumSize = 0.1
    request.maximumObservations = 5
    request.minimumConfidence = 0.5

    let handler = VNImageRequestHandler(url: url, orientation: orientation, options: [:])
    do {
        try handler.perform([request])
        guard let results = request.results else {
            fatalError("Rectangle detection returned no observations")
        }
        return results.sorted { $0.confidence > $1.confidence }
    } catch {
        fatalError("Rectangle detection failed: \(error.localizedDescription)")
    }
}

func perspectiveCorrectedImage(from ciImage: CIImage, rect: VNRectangleObservation, padding: CGFloat = 0) -> CGImage {
    let extent = ciImage.extent

    func clamp(_ value: CGFloat) -> CGFloat {
        min(max(value, 0), 1)
    }

    let centroidX = (rect.topLeft.x + rect.topRight.x + rect.bottomLeft.x + rect.bottomRight.x) / 4
    let centroidY = (rect.topLeft.y + rect.topRight.y + rect.bottomLeft.y + rect.bottomRight.y) / 4

    func pad(_ point: CGPoint) -> CGPoint {
        let dx = point.x - centroidX
        let dy = point.y - centroidY
        let scaled = CGPoint(
            x: clamp(centroidX + dx * (1 + padding)),
            y: clamp(centroidY + dy * (1 + padding))
        )
        return CGPoint(x: scaled.x * extent.width, y: scaled.y * extent.height)
    }

    let topLeft = pad(rect.topLeft)
    let topRight = pad(rect.topRight)
    let bottomLeft = pad(rect.bottomLeft)
    let bottomRight = pad(rect.bottomRight)

    guard let filter = CIFilter(name: "CIPerspectiveCorrection") else {
        fatalError("Missing CIPerspectiveCorrection filter")
    }

    filter.setValue(ciImage, forKey: kCIInputImageKey)
    filter.setValue(CIVector(cgPoint: topLeft), forKey: "inputTopLeft")
    filter.setValue(CIVector(cgPoint: topRight), forKey: "inputTopRight")
    filter.setValue(CIVector(cgPoint: bottomLeft), forKey: "inputBottomLeft")
    filter.setValue(CIVector(cgPoint: bottomRight), forKey: "inputBottomRight")

    guard let output = filter.outputImage else {
        fatalError("Perspective correction produced no output")
    }

    let context = CIContext()
    guard let cg = context.createCGImage(output, from: output.extent) else {
        fatalError("Failed to render corrected image")
    }

    return cg
}

// MARK: - Main

let imagePath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "foo.jpeg"
let (imageData, ciImage, cgImage) = loadImageData(at: imagePath)
let url = URL(fileURLWithPath: imagePath)
let exif = exifOrientation(from: imageData)
let orientation = exif ?? .up

Logger.log("Loaded \(imagePath)")
Logger.log("Image extent: \(Int(ciImage.extent.width))x\(Int(ciImage.extent.height))")
Logger.log("EXIF orientation: \(describe(exif))")

let fullText = recognizeText(from: cgImage, label: "Full image", orientation: orientation)
Logger.log("Full image OCR (\(fullText.count) chars):\n\(fullText)")

let rectangles = detectRectangles(at: url, orientation: orientation)
Logger.log("Detected \(rectangles.count) rectangle(s)")

guard let first = rectangles.first else {
    fatalError("No rectangles detected; nothing to crop")
}

let firstPixels = CGRect(
    x: first.boundingBox.origin.x * ciImage.extent.width,
    y: first.boundingBox.origin.y * ciImage.extent.height,
    width: first.boundingBox.width * ciImage.extent.width,
    height: first.boundingBox.height * ciImage.extent.height
)
Logger.log(String(format: "Top rectangle: conf=%.3f norm={{%.3f, %.3f}, {%.3f, %.3f}} pixels=%.0fx%.0f at (%.0f, %.0f)",
                  first.confidence,
                  first.boundingBox.origin.x, first.boundingBox.origin.y,
                  first.boundingBox.width, first.boundingBox.height,
                  firstPixels.width,
                  firstPixels.height,
                  firstPixels.origin.x,
                  firstPixels.origin.y))

let correctedCG = perspectiveCorrectedImage(from: ciImage, rect: first, padding: 0.02)
Logger.log("Corrected crop size: \(correctedCG.width)x\(correctedCG.height) orientation: up")

let croppedText = recognizeText(from: correctedCG, label: "Cropped image", orientation: .up)
Logger.log("Cropped OCR (\(croppedText.count) chars):\n\(croppedText)")
