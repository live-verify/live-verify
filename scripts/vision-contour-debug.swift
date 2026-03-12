#!/usr/bin/env swift
// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: Apache-2.0

import AppKit
import CoreImage
import Foundation
import ImageIO
import Vision

// macOS debug harness: test VNDetectContoursRequest + scoring logic on an image

// MARK: - Logging

func log(_ message: String) {
    let ts = ISO8601DateFormatter().string(from: Date())
    print("[\(ts)] \(message)")
}

// MARK: - Image Loading

func loadCGImage(at path: String) -> CGImage {
    let url = URL(fileURLWithPath: path)
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
          let cgImage = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
        fatalError("Could not load image from \(path)")
    }
    return cgImage
}

// MARK: - Contour Detection (matches ContourDetector.swift)

struct QuadCandidate {
    let points: [CGPoint]
    let score: Double
}

func detectContours(in cgImage: CGImage) -> [VNContour] {
    let request = VNDetectContoursRequest()
    request.contrastAdjustment = 1.0
    request.detectsDarkOnLight = true

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    do {
        try handler.perform([request])
    } catch {
        log("Contour detection failed: \(error)")
        return []
    }

    guard let results = request.results,
          let observation = results.first else {
        log("No contour results")
        return []
    }

    var allContours: [VNContour] = []
    for i in 0..<observation.contourCount {
        if let contour = try? observation.contour(at: i) {
            allContours.append(contour)
            for j in 0..<contour.childContourCount {
                if let child = try? contour.childContour(at: j) {
                    allContours.append(child)
                }
            }
        }
    }

    return allContours
}

func isConvex(_ points: [CGPoint]) -> Bool {
    guard points.count >= 3 else { return false }
    var sign: Int?
    let n = points.count
    for i in 0..<n {
        let p1 = points[i]
        let p2 = points[(i + 1) % n]
        let p3 = points[(i + 2) % n]
        let cross = (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x)
        let currentSign = cross > 0 ? 1 : (cross < 0 ? -1 : 0)
        if currentSign != 0 {
            if let s = sign, s != currentSign { return false }
            sign = currentSign
        }
    }
    return true
}

func polygonArea(_ points: [CGPoint]) -> CGFloat {
    guard points.count >= 3 else { return 0 }
    var area: CGFloat = 0
    let n = points.count
    for i in 0..<n {
        let j = (i + 1) % n
        area += points[i].x * points[j].y
        area -= points[j].x * points[i].y
    }
    return abs(area) / 2
}

func orderCorners(_ corners: [CGPoint]) -> [CGPoint] {
    guard corners.count == 4 else { return corners }
    let cx = corners.reduce(0) { $0 + $1.x } / 4
    let cy = corners.reduce(0) { $0 + $1.y } / 4
    let sorted = corners.sorted { a, b in
        atan2(a.y - cy, a.x - cx) < atan2(b.y - cy, b.x - cx)
    }
    var minSum = CGFloat.greatestFiniteMagnitude
    var minIdx = 0
    for (i, pt) in sorted.enumerated() {
        let sum = pt.x + pt.y
        if sum < minSum { minSum = sum; minIdx = i }
    }
    return Array(sorted[minIdx...]) + Array(sorted[..<minIdx])
}

func scoreCandidate(_ points: [CGPoint], imageWidth: CGFloat, imageHeight: CGFloat) -> Double {
    let ordered = orderCorners(points)
    guard ordered.count == 4 else { return 0 }
    let tl = ordered[0], tr = ordered[1], br = ordered[2], bl = ordered[3]

    let w1 = hypot(tr.x - tl.x, tr.y - tl.y)
    let w2 = hypot(br.x - bl.x, br.y - bl.y)
    let h1 = hypot(bl.x - tl.x, bl.y - tl.y)
    let h2 = hypot(br.x - tr.x, br.y - tr.y)
    let w = (w1 + w2) / 2
    let h = (h1 + h2) / 2

    let area = w * h
    let ideal = pow(min(imageWidth, imageHeight) * 0.25, 2)
    let areaScore = exp(-abs(area - ideal) / ideal)

    let cx = (tl.x + tr.x + br.x + bl.x) / 4
    let cy = (tl.y + tr.y + br.y + bl.y) / 4
    let dx = (cx - imageWidth / 2) / (imageWidth / 2)
    let dy = (cy - imageHeight / 2) / (imageHeight / 2)
    let centerScore = exp(-(dx * dx + dy * dy))

    let ratio = w / h
    let ratioScore = exp(-abs(ratio - 1))

    return areaScore * centerScore * ratioScore
}

func extractQuadCandidates(from contours: [VNContour], imageWidth: CGFloat, imageHeight: CGFloat) -> [QuadCandidate] {
    let minAreaRatio: Double = 0.0005
    let maxAreaRatio: Double = 0.5
    let approxEpsilon: Double = 0.02
    let imageArea = imageWidth * imageHeight

    var candidates: [QuadCandidate] = []

    for contour in contours {
        guard let simplified = try? contour.polygonApproximation(epsilon: Float(approxEpsilon)) else {
            continue
        }

        let points = simplified.normalizedPoints
        guard points.count == 4 else { continue }

        // Convert normalized points to image coordinates
        // Vision uses bottom-left origin with Y going up
        let imagePoints = points.map { point in
            CGPoint(
                x: CGFloat(point.x) * imageWidth,
                y: (1 - CGFloat(point.y)) * imageHeight
            )
        }

        guard isConvex(imagePoints) else { continue }

        let area = polygonArea(imagePoints)
        let areaRatio = area / imageArea
        guard areaRatio > minAreaRatio && areaRatio < maxAreaRatio else { continue }

        let score = scoreCandidate(imagePoints, imageWidth: imageWidth, imageHeight: imageHeight)
        candidates.append(QuadCandidate(points: imagePoints, score: score))
    }

    return candidates
}

// MARK: - Perspective Correction

func perspectiveCorrectedImage(from cgImage: CGImage, corners: [CGPoint]) -> CGImage? {
    let ciImage = CIImage(cgImage: cgImage)
    let imageHeight = ciImage.extent.height

    guard corners.count == 4 else { return nil }
    let tl = corners[0], tr = corners[1], br = corners[2], bl = corners[3]

    // CIFilter expects bottom-left origin
    let tlCI = CGPoint(x: tl.x, y: imageHeight - tl.y)
    let trCI = CGPoint(x: tr.x, y: imageHeight - tr.y)
    let brCI = CGPoint(x: br.x, y: imageHeight - br.y)
    let blCI = CGPoint(x: bl.x, y: imageHeight - bl.y)

    guard let filter = CIFilter(name: "CIPerspectiveCorrection") else { return nil }
    filter.setValue(ciImage, forKey: kCIInputImageKey)
    filter.setValue(CIVector(cgPoint: tlCI), forKey: "inputTopLeft")
    filter.setValue(CIVector(cgPoint: trCI), forKey: "inputTopRight")
    filter.setValue(CIVector(cgPoint: blCI), forKey: "inputBottomLeft")
    filter.setValue(CIVector(cgPoint: brCI), forKey: "inputBottomRight")

    guard let output = filter.outputImage else { return nil }
    let context = CIContext()
    return context.createCGImage(output, from: output.extent)
}

// MARK: - OCR

func recognizeText(in cgImage: CGImage) -> String? {
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = false
    request.recognitionLanguages = ["en-US"]

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    do {
        try handler.perform([request])
    } catch {
        log("OCR failed: \(error)")
        return nil
    }

    guard let observations = request.results, !observations.isEmpty else {
        return nil
    }

    let lines = observations.compactMap { $0.topCandidates(1).first?.string }
    return lines.joined(separator: "\n")
}

// MARK: - Main

let imagePath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "foo.png"
log("Loading image: \(imagePath)")

let cgImage = loadCGImage(at: imagePath)
let imageWidth = CGFloat(cgImage.width)
let imageHeight = CGFloat(cgImage.height)
log("Image size: \(Int(imageWidth))x\(Int(imageHeight))")

// Step 1: Detect contours
log("Detecting contours...")
let contours = detectContours(in: cgImage)
log("Found \(contours.count) contours")

// Step 2: Extract quad candidates
let candidates = extractQuadCandidates(from: contours, imageWidth: imageWidth, imageHeight: imageHeight)
log("Found \(candidates.count) quad candidates")

// Show top candidates
let topCandidates = candidates.sorted { $0.score > $1.score }.prefix(5)
for (i, candidate) in topCandidates.enumerated() {
    let ordered = orderCorners(candidate.points)
    log("Candidate \(i+1): score=\(String(format: "%.4f", candidate.score))")
    log("  TL: (\(Int(ordered[0].x)), \(Int(ordered[0].y)))")
    log("  TR: (\(Int(ordered[1].x)), \(Int(ordered[1].y)))")
    log("  BR: (\(Int(ordered[2].x)), \(Int(ordered[2].y)))")
    log("  BL: (\(Int(ordered[3].x)), \(Int(ordered[3].y)))")
}

guard let best = candidates.max(by: { $0.score < $1.score }) else {
    log("ERROR: No quad candidates found!")
    log("Trying OCR on full image...")
    if let text = recognizeText(in: cgImage) {
        log("Full image OCR result (\(text.count) chars):\n\(text)")
    } else {
        log("Full image OCR also failed")
    }
    exit(1)
}

let orderedCorners = orderCorners(best.points)
log("Best candidate score: \(String(format: "%.4f", best.score))")

// Step 3: Perspective correction
log("Applying perspective correction...")
guard let croppedImage = perspectiveCorrectedImage(from: cgImage, corners: orderedCorners) else {
    log("ERROR: Perspective correction failed!")
    exit(1)
}
log("Cropped image size: \(croppedImage.width)x\(croppedImage.height)")

// Save cropped image for inspection
let desktopPath = NSHomeDirectory() + "/Desktop/cropped_debug.png"
if let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: desktopPath) as CFURL, kUTTypePNG, 1, nil) {
    CGImageDestinationAddImage(dest, croppedImage, nil)
    CGImageDestinationFinalize(dest)
    log("Saved cropped image to: \(desktopPath)")
}

// Step 4: OCR on cropped image
log("Running OCR on cropped image...")
if let text = recognizeText(in: croppedImage) {
    log("Cropped image OCR result (\(text.count) chars):\n\(text)")
} else {
    log("ERROR: No text found in cropped image!")
    log("Trying OCR on full image for comparison...")
    if let text = recognizeText(in: cgImage) {
        log("Full image OCR result (\(text.count) chars):\n\(text)")
    }
}
