/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import SwiftUI
import VisionKit

/// Main app state
enum AppState {
    case scanning
    case processing
    case result(VerificationResult)
}

/// Build timestamp captured at compile time
private let buildTimestamp: String = {
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
    return formatter.string(from: Date())
}()

/// Main content view using DataScanner for text selection
struct ContentView: View {
    @StateObject private var pipeline = VerificationPipeline()

    @State private var appState: AppState = .scanning
    @State private var isScanning = false
    @State private var scannedText = ""
    @State private var capturedImage: UIImage?
    @State private var errorMessage: String?

    var body: some View {
        ZStack {
            switch appState {
            case .scanning:
                scannerContent

            case .processing:
                scannerContent
                ProcessingOverlay(step: pipeline.currentStep)

            case .result(let result):
                ResultView(
                    result: result,
                    capturedImage: capturedImage,
                    onReVerify: reVerify,
                    onVerifyAnother: resetToScanning
                )
            }
        }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
    }

    // MARK: - Scanner Content

    private var scannerContent: some View {
        VStack(spacing: 0) {
            // Check device support
            if !DataScanner.isSupported {
                unsupportedView
            } else if !DataScanner.isAvailable {
                unavailableView
            } else {
                // DataScanner camera view
                DataScanner(isScanning: $isScanning, scannedText: $scannedText, capturedImage: $capturedImage)
                    .ignoresSafeArea()
                    .overlay(alignment: .top) {
                        Text("Build: \(buildTimestamp)")
                            .font(.system(.caption2, design: .monospaced))
                            .foregroundColor(.white)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.black.opacity(0.6))
                            .cornerRadius(4)
                            .padding(.top, 50)
                    }
                    .overlay(alignment: .bottom) {
                        controlsOverlay
                    }
                    .task {
                        isScanning = true
                    }
            }
        }
    }

    private var unsupportedView: some View {
        VStack(spacing: 20) {
            Image(systemName: "text.viewfinder")
                .font(.system(size: 60))
                .foregroundColor(.red)

            Text("Not Supported")
                .font(.title2)

            Text("Live Text scanning requires iPhone XS or later with iOS 16+.")
                .multilineTextAlignment(.center)
                .foregroundColor(.secondary)
                .padding(.horizontal)
        }
        .padding()
    }

    private var unavailableView: some View {
        VStack(spacing: 20) {
            Image(systemName: "text.viewfinder")
                .font(.system(size: 60))
                .foregroundColor(.orange)

            Text("Temporarily Unavailable")
                .font(.title2)

            Text("Live Text is temporarily unavailable. Please try again.")
                .multilineTextAlignment(.center)
                .foregroundColor(.secondary)
                .padding(.horizontal)

            Button("Retry") {
                isScanning = true
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }

    private var controlsOverlay: some View {
        VStack(spacing: 12) {
            // Show scanned text preview with ⏎ at line ends
            if !scannedText.isEmpty {
                ScrollView {
                    Text(textWithReturnSymbols)
                        .font(.system(.caption, design: .monospaced))
                        .foregroundColor(.white)
                        .padding(8)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .frame(maxHeight: 120)
                .background(Color.black.opacity(0.7))
                .cornerRadius(8)
                .padding(.horizontal)
            }

            // Instructions and buttons
            HStack(spacing: 16) {
                // Clear button
                Button(action: clearText) {
                    Label("Clear", systemImage: "trash")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)
                        .background(Color.red.opacity(0.8))
                        .cornerRadius(8)
                }
                .disabled(scannedText.isEmpty)
                .opacity(scannedText.isEmpty ? 0.5 : 1)

                // Verify button
                Button(action: verifyScannedText) {
                    Label("Verify", systemImage: "checkmark.shield")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.horizontal, 24)
                        .padding(.vertical, 10)
                        .background(canVerify ? Color.green : Color.gray)
                        .cornerRadius(8)
                }
                .disabled(!canVerify)
            }
            .padding(.bottom, 8)

            // Hint text
            Text(hintText)
                .font(.caption)
                .foregroundColor(.white)
                .padding(.horizontal, 16)
                .padding(.vertical, 6)
                .background(Color.black.opacity(0.6))
                .cornerRadius(4)
                .padding(.bottom, 20)
        }
    }

    // MARK: - Computed Properties

    private var canVerify: Bool {
        hasVerifyURL(in: scannedText)
    }

    /// Display text with U+23CE (⏎) at end of each line for visibility
    private var textWithReturnSymbols: String {
        scannedText.components(separatedBy: .newlines)
            .map { $0 + "\u{23CE}" }
            .joined(separator: "\n")
    }

    private var hintText: String {
        if scannedText.isEmpty {
            return "Tap on text to select it"
        } else if !canVerify {
            return "Keep tapping until you see verify: or vfy: line"
        } else {
            return "Ready to verify!"
        }
    }

    // MARK: - Actions

    private func clearText() {
        scannedText = ""
    }

    private func verifyScannedText() {
        guard canVerify else { return }

        Log.d("Content", "Verifying scanned text (\(scannedText.count) chars)")
        isScanning = false
        appState = .processing

        Task {
            do {
                let result = try await pipeline.verifyText(scannedText)
                await MainActor.run {
                    appState = .result(result)
                }
            } catch {
                Log.d("Content", "Verification error: \(error.localizedDescription)")
                await MainActor.run {
                    let errorResult = VerificationResult(
                        outcome: .error(error.localizedDescription),
                        rawText: scannedText,
                        normalizedText: nil,
                        hash: nil,
                        verificationURL: nil,
                        baseURL: nil
                    )
                    appState = .result(errorResult)
                }
            }
        }
    }

    private func reVerify(editedText: String) {
        guard case .result(let currentResult) = appState,
              let baseURL = currentResult.baseURL else {
            return
        }

        Task {
            do {
                await MainActor.run {
                    appState = .processing
                }

                let result = try await pipeline.reVerify(editedText: editedText, baseURL: baseURL)

                await MainActor.run {
                    appState = .result(result)
                }
            } catch {
                await MainActor.run {
                    errorMessage = error.localizedDescription
                }
            }
        }
    }

    private func resetToScanning() {
        scannedText = ""
        capturedImage = nil
        appState = .scanning
        isScanning = true
    }

    // MARK: - Helpers

    /// Check if text contains a verify: or vfy: URL line
    /// Tolerates spaces around the colon (e.g., "verify :", "verify: ", "verify : ")
    private func hasVerifyURL(in text: String) -> Bool {
        let lines = text.components(separatedBy: .newlines)
        for line in lines {
            // Remove all spaces and lowercase for matching
            let normalized = line.lowercased().replacingOccurrences(of: " ", with: "")
            if normalized.hasPrefix("verify:") || normalized.hasPrefix("vfy:") {
                return true
            }
        }
        return false
    }
}

#Preview {
    ContentView()
}
