/*
    Copyright (C) 2025, Paul Hammant

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import Foundation
import AVFoundation
import UIKit
import CoreMedia
import Vision
import CoreMotion

// MARK: - Orientation Helpers

private extension UIInterfaceOrientation {
    var label: String {
        switch self {
        case .portrait: return "portrait"
        case .portraitUpsideDown: return "portraitUpsideDown"
        case .landscapeLeft: return "landscapeLeft"
        case .landscapeRight: return "landscapeRight"
        default: return "unknown"
        }
    }
}

private extension UIDeviceOrientation {
    var label: String {
        switch self {
        case .portrait: return "portrait"
        case .portraitUpsideDown: return "portraitUpsideDown"
        case .landscapeLeft: return "landscapeLeft"
        case .landscapeRight: return "landscapeRight"
        case .faceUp: return "faceUp"
        case .faceDown: return "faceDown"
        default: return "unknown"
        }
    }
}

private extension AVCaptureVideoOrientation {
    var label: String {
        switch self {
        case .portrait: return "portrait"
        case .portraitUpsideDown: return "portraitUpsideDown"
        case .landscapeLeft: return "landscapeLeft"
        case .landscapeRight: return "landscapeRight"
        @unknown default: return "unknown"
        }
    }
}

/// Tracks device orientation via notifications so we can react even if UI is locked
final class OrientationTracker {
    private let motionManager = CMMotionManager()
    private(set) var videoOrientation: AVCaptureVideoOrientation?
    private(set) var source: String = "device"

    init() {
        UIDevice.current.beginGeneratingDeviceOrientationNotifications()
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleOrientationChange),
            name: UIDevice.orientationDidChangeNotification,
            object: nil
        )
        startMotionUpdates()
        updateOrientation()
    }

    @objc private func handleOrientationChange() {
        updateOrientation()
    }

    private func updateOrientation() {
        let deviceOrientation = UIDevice.current.orientation
        if let resolved = deviceOrientation.captureVideoOrientation {
            videoOrientation = resolved
            source = "device"
            Log.d("Orientation", "Device orientation -> \(resolved.label)")
        } else {
            Log.d("Orientation", "Device orientation unresolved: \(deviceOrientation.label)")
        }
    }

    private func startMotionUpdates() {
        guard motionManager.isDeviceMotionAvailable else {
            Log.d("Orientation", "Motion unavailable")
            return
        }
        motionManager.deviceMotionUpdateInterval = 0.1
        motionManager.startDeviceMotionUpdates(to: .main) { [weak self] motion, error in
            guard let self, let motion else {
                if let error { Log.d("Orientation", "Motion error: \(error.localizedDescription)") }
                return
            }
            let gravity = motion.gravity
            let x = gravity.x
            let y = gravity.y
            let threshold = 0.35
            let videoOrientation: AVCaptureVideoOrientation?
            if abs(y) > abs(x) && abs(y) > threshold {
                videoOrientation = y >= 0 ? .portraitUpsideDown : .portrait
            } else if abs(x) > threshold {
                // Gravity.x positive = device tilted left (home button on left) = landscapeRight device = landscapeLeft video
                // Gravity.x negative = device tilted right (home button on right) = landscapeLeft device = landscapeRight video
                // This matches UIDeviceOrientation.captureVideoOrientation where landscape orientations are swapped
                videoOrientation = x >= 0 ? .landscapeLeft : .landscapeRight
            } else {
                videoOrientation = nil
            }

            if let videoOrientation,
               videoOrientation != self.videoOrientation {
                self.videoOrientation = videoOrientation
                source = "motion"
                Log.d("Orientation", "Motion orientation -> video \(videoOrientation.label) (x=\(String(format: "%.2f", x)), y=\(String(format: "%.2f", y)))")
            }
        }
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
        motionManager.stopDeviceMotionUpdates()
    }
}

/// Resolves camera-friendly orientation even when the device is flat
enum OrientationResolver {
    /// Best-effort UI interface orientation (main thread safe)
    static func interfaceOrientation() -> UIInterfaceOrientation? {
        let resolve: () -> UIInterfaceOrientation? = {
            UIApplication.shared.connectedScenes
                .compactMap { $0 as? UIWindowScene }
                .first(where: { $0.activationState == .foregroundActive })?
                .interfaceOrientation
        }

        if Thread.isMainThread {
            return resolve()
        }

        var orientation: UIInterfaceOrientation?
        DispatchQueue.main.sync {
            orientation = resolve()
        }
        return orientation
    }

    /// Choose the best available capture orientation (nil if unresolved)
    /// Prefer device orientation because UI may be locked to portrait.
    static func captureOrientation(
        interfaceOrientation: UIInterfaceOrientation?,
        deviceOrientation: UIDeviceOrientation
    ) -> AVCaptureVideoOrientation? {
        if let deviceOrientation = deviceOrientation.captureVideoOrientation {
            return deviceOrientation
        }

        if let interfaceOrientation,
           let videoOrientation = interfaceOrientation.captureVideoOrientation {
            return videoOrientation
        }

        return nil
    }
}

private extension UIInterfaceOrientation {
    var captureVideoOrientation: AVCaptureVideoOrientation? {
        switch self {
        case .portrait: return .portrait
        case .portraitUpsideDown: return .portraitUpsideDown
        case .landscapeLeft: return .landscapeLeft
        case .landscapeRight: return .landscapeRight
        default: return nil
        }
    }
}

private extension UIDeviceOrientation {
    var captureVideoOrientation: AVCaptureVideoOrientation? {
        switch self {
        case .portrait: return .portrait
        case .portraitUpsideDown: return .portraitUpsideDown
        case .landscapeLeft: return .landscapeRight
        case .landscapeRight: return .landscapeLeft
        default: return nil
        }
    }
}

// MARK: - Live Text Detection Types

/// Represents a detected text region with its bounding box
struct DetectedTextRegion: Identifiable {
    let id = UUID()
    let boundingBox: CGRect  // Normalized coordinates (0-1), Vision coordinate system
    let confidence: Float

    /// Convert Vision coordinates (bottom-left origin) to screen coordinates (top-left origin)
    func screenRect(for viewSize: CGSize) -> CGRect {
        let x = boundingBox.origin.x * viewSize.width
        let y = (1 - boundingBox.origin.y - boundingBox.height) * viewSize.height
        let width = boundingBox.width * viewSize.width
        let height = boundingBox.height * viewSize.height
        return CGRect(x: x, y: y, width: width, height: height)
    }
}

/// Lightweight real-time text detector for live camera preview
class LiveTextDetector {
    private let textRequest: VNRecognizeTextRequest
    private var isProcessing = false

    init() {
        textRequest = VNRecognizeTextRequest()
        textRequest.recognitionLevel = .fast
        textRequest.usesLanguageCorrection = false
        textRequest.recognitionLanguages = ["en-US"]
    }

    func detectText(in pixelBuffer: CVPixelBuffer) -> [DetectedTextRegion] {
        guard !isProcessing else { return [] }
        isProcessing = true
        defer { isProcessing = false }

        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:])
        do {
            try handler.perform([textRequest])
            guard let observations = textRequest.results else { return [] }
            return observations.map { observation in
                DetectedTextRegion(
                    boundingBox: observation.boundingBox,
                    confidence: observation.confidence
                )
            }
        } catch {
            return []
        }
    }
}

// MARK: - Camera Types

/// Camera permission status
enum CameraPermission {
    case notDetermined
    case authorized
    case denied
}

/// Camera service errors
enum CameraServiceError: Error, LocalizedError {
    case notAuthorized
    case setupFailed
    case captureError(Error)
    case noPhotoData

    var errorDescription: String? {
        switch self {
        case .notAuthorized:
            return "Camera access not authorized"
        case .setupFailed:
            return "Failed to set up camera"
        case .captureError(let error):
            return "Photo capture failed: \(error.localizedDescription)"
        case .noPhotoData:
            return "No photo data available"
        }
    }
}

/// Manages AVCaptureSession for camera access and photo capture
class CameraService: NSObject, ObservableObject {
    @Published var permission: CameraPermission = .notDetermined
    @Published var isSessionRunning = false
    @Published var capturedImage: UIImage?
    @Published var error: CameraServiceError?
    @Published var zoomFactor: CGFloat = 1.0
    @Published var maxZoomFactor: CGFloat = 1.0
    @Published var liveDetections: [DetectedTextRegion] = []
    @Published var isLiveDetectionEnabled = false  // TEMP: disabled for debugging
    @Published var isCapturing = false

    let session = AVCaptureSession()
    private let sessionQueue = DispatchQueue(label: "camera.session", qos: .userInitiated)
    private let detectionQueue = DispatchQueue(label: "camera.detection", qos: .userInitiated)
    private var photoOutput: AVCapturePhotoOutput?
    private var videoOutput: AVCaptureVideoDataOutput?
    private var photoContinuation: CheckedContinuation<UIImage, Error>?
    private var captureDevice: AVCaptureDevice?
    private let textDetector = LiveTextDetector()
    private let orientationTracker = OrientationTracker()
    private var captureStartTime: Date?

    // Frame throttling for live detection
    private var frameCount = 0
    private let processEveryNthFrame = 15  // ~4fps detection to reduce load

    override init() {
        super.init()
        checkPermission()
    }

    /// Check and request camera permission
    func checkPermission() {
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            permission = .authorized
        case .notDetermined:
            permission = .notDetermined
        case .denied, .restricted:
            permission = .denied
        @unknown default:
            permission = .denied
        }
    }

    /// Request camera permission
    func requestPermission() async {
        let granted = await AVCaptureDevice.requestAccess(for: .video)
        await MainActor.run {
            permission = granted ? .authorized : .denied
        }
    }

    /// Set up the camera session
    func setupSession() {
        guard permission == .authorized else {
            error = .notAuthorized
            return
        }

        sessionQueue.async { [weak self] in
            self?.configureSession()
        }
    }

    private func configureSession() {
        Log.d("Camera", "Configuring session...")
        session.beginConfiguration()

        // Favor speed over resolution for capture and processing latency
        if session.canSetSessionPreset(.hd1280x720) {
            session.sessionPreset = .hd1280x720
        } else {
            session.sessionPreset = .photo
        }

        // Add video input
        guard let camera = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back) else {
            Log.d("Camera", "ERROR: No back camera found")
            DispatchQueue.main.async {
                self.error = .setupFailed
            }
            return
        }

        Log.d("Camera", "Found camera: \(camera.localizedName)")

        // Store device reference for zoom control
        captureDevice = camera

        do {
            let input = try AVCaptureDeviceInput(device: camera)
            if session.canAddInput(input) {
                session.addInput(input)
            }

            // Update max zoom factor on main thread
            let maxZoom = min(camera.activeFormat.videoMaxZoomFactor, 10.0)
            DispatchQueue.main.async {
                self.maxZoomFactor = maxZoom
            }
        } catch {
            DispatchQueue.main.async {
                self.error = .setupFailed
            }	
            session.commitConfiguration()
            return
        }

        // Add photo output
        let output = AVCapturePhotoOutput()
        if session.canAddOutput(output) {
            session.addOutput(output)
            output.isHighResolutionCaptureEnabled = false
            photoOutput = output
        }

        // NOTE: Video output for live text detection disabled - was causing camera conflicts
        // TODO: Re-enable once camera stability is confirmed
        // let video = AVCaptureVideoDataOutput()
        // video.setSampleBufferDelegate(self, queue: detectionQueue)
        // ...

        session.commitConfiguration()
    }

    /// Start the camera session
    func startSession() {
        Log.d("Camera", "startSession() called")
        sessionQueue.async { [weak self] in
            guard let self = self else { return }
            if !self.session.isRunning {
                Log.d("Camera", "Starting session...")
                self.session.startRunning()
                let running = self.session.isRunning
                Log.d("Camera", "Session running: \(running)")
                DispatchQueue.main.async {
                    self.isSessionRunning = running
                }
            } else {
                Log.d("Camera", "Session already running")
            }
        }
    }

    /// Stop the camera session
    func stopSession() {
        sessionQueue.async { [weak self] in
            guard let self = self else { return }
            if self.session.isRunning {
                self.session.stopRunning()
                DispatchQueue.main.async {
                    self.isSessionRunning = false
                }
            }
        }
    }

    /// Set camera zoom factor
    /// - Parameter factor: Zoom factor (1.0 = no zoom)
    func setZoom(_ factor: CGFloat) {
        sessionQueue.async { [weak self] in
            guard let self = self,
                  let device = self.captureDevice else { return }
            do {
                try device.lockForConfiguration()
                let maxZoom = min(device.activeFormat.videoMaxZoomFactor, 10.0)
                device.videoZoomFactor = max(1.0, min(factor, maxZoom))
                device.unlockForConfiguration()

                DispatchQueue.main.async {
                    self.zoomFactor = factor
                }
            } catch {
                // Silently fail zoom - not critical
            }
        }
    }

    /// Capture a photo
    /// - Returns: Captured UIImage
    func capturePhoto() async throws -> UIImage {
        captureStartTime = Date()
        Log.d("Camera", "capturePhoto() called, isCapturing=\(isCapturing)")

        guard let photoOutput = photoOutput else {
            Log.d("Camera", "ERROR: photoOutput is nil")
            isCapturing = false
            throw CameraServiceError.setupFailed
        }

        guard session.isRunning else {
            Log.d("Camera", "ERROR: session not running")
            isCapturing = false
            throw CameraServiceError.setupFailed
        }

        Log.d("Camera", "Starting photo capture...")

        return try await withCheckedThrowingContinuation { continuation in
            self.photoContinuation = continuation
            let enqueueTime = Date()

            self.sessionQueue.async { [weak self] in
                guard let self = self else {
                    continuation.resume(throwing: CameraServiceError.setupFailed)
                    return
                }

                let queueEnterDelta = Int(Date().timeIntervalSince(enqueueTime) * 1000)
                Log.d("Camera", "Taking photo on session queue... (+\(queueEnterDelta)ms since enqueue)")

                // Set orientation preferring device/motion tracker (works even if UI is portrait-only)
                if let connection = photoOutput.connection(with: .video) {
                    let interfaceOrientation = OrientationResolver.interfaceOrientation()
                    let deviceOrientation = UIDevice.current.orientation
                    let trackedOrientation = orientationTracker.videoOrientation
                    let videoOrientation = trackedOrientation
                        ?? OrientationResolver.captureOrientation(
                            interfaceOrientation: interfaceOrientation,
                            deviceOrientation: deviceOrientation
                        )
                    if let videoOrientation {
                        connection.videoOrientation = videoOrientation
                        Log.d(
                            "Camera",
                            "Orientation: source=\(orientationTracker.source) tracked=\(trackedOrientation?.label ?? "nil") interface=\(interfaceOrientation?.label ?? "nil") device=\(deviceOrientation.label) video=\(videoOrientation.label)"
                        )
                    } else {
                        Log.d(
                            "Camera",
                            "Orientation unresolved: source=\(orientationTracker.source) tracked=\(trackedOrientation?.label ?? "nil") interface=\(interfaceOrientation?.label ?? "nil") device=\(deviceOrientation.label)"
                        )
                    }
                }

                let settings = AVCapturePhotoSettings()
                // Use fast settings to minimize shutter-to-capture latency
                settings.isHighResolutionPhotoEnabled = false
                if #available(iOS 16.0, *) {
                    settings.photoQualityPrioritization = .speed
                }
                photoOutput.capturePhoto(with: settings, delegate: self)
                let startDelta = captureStartTime.map { Int(Date().timeIntervalSince($0) * 1000) } ?? -1
                Log.d("Camera", "Photo capture initiated (+\(startDelta)ms from capturePhoto call)")
            }
        }
    }
}

// MARK: - AVCapturePhotoCaptureDelegate
extension CameraService: AVCapturePhotoCaptureDelegate {
    func photoOutput(_ output: AVCapturePhotoOutput,
                     didFinishProcessingPhoto photo: AVCapturePhoto,
                     error: Error?) {
        let delegateDelta = captureStartTime.map { Int(Date().timeIntervalSince($0) * 1000) } ?? -1
        Log.d("Camera", "photoOutput delegate called (+\(delegateDelta)ms from capturePhoto call)")

        defer {
            DispatchQueue.main.async {
                self.isCapturing = false
            }
        }

        if let error = error {
            Log.d("Camera", "Photo capture error: \(error)")
            photoContinuation?.resume(throwing: CameraServiceError.captureError(error))
            photoContinuation = nil
            return
        }

        guard let imageData = photo.fileDataRepresentation(),
              let image = UIImage(data: imageData) else {
            Log.d("Camera", "ERROR: No image data")
            photoContinuation?.resume(throwing: CameraServiceError.noPhotoData)
            photoContinuation = nil
            return
        }

        Log.d("Camera", "Photo captured successfully: \(image.size)")

        DispatchQueue.main.async {
            self.capturedImage = image
        }

        photoContinuation?.resume(returning: image)
        photoContinuation = nil
    }
}

// MARK: - AVCaptureVideoDataOutputSampleBufferDelegate
extension CameraService: AVCaptureVideoDataOutputSampleBufferDelegate {
    func captureOutput(_ output: AVCaptureOutput,
                      didOutput sampleBuffer: CMSampleBuffer,
                      from connection: AVCaptureConnection) {
        // Skip if detection is disabled
        guard isLiveDetectionEnabled else { return }

        // Throttle frame processing
        frameCount += 1
        guard frameCount % processEveryNthFrame == 0 else { return }

        // Get pixel buffer from sample buffer
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
            Log.d("LiveText", "No pixel buffer")
            return
        }

        // Run text detection
        let detections = textDetector.detectText(in: pixelBuffer)

        if !detections.isEmpty {
            Log.d("LiveText", "Found \(detections.count) text regions")
        }

        // Update detections on main thread
        DispatchQueue.main.async { [weak self] in
            self?.liveDetections = detections
        }
    }
}
