# Detached Camera Verification: Entryway Security & Active Witnessing

This document describes a specialized hardware configuration for **Live Verify - Camera** where the optical sensor is detached from the smartphone. Instead of holding a phone up to a visitor's badge, a fixed, wall-mounted camera at an entryway provides the feed to the user's device for real-time verification.

## 1. The Scenario: Doorstep & Front Desk Verification

In many high-stakes interactions (e.g., a delivery courier at a home, a process server at an office, or a police officer at a side entrance), the "Handheld Phone" model has limitations:
- **Physical Safety:** Opening a door to scan a badge can be confrontational or unsafe. Fake credentials are also used to gain entry for robbery — particularly at commercial premises.
- **Personal Safety:** Verifying qualifications matters beyond fraud. A gas engineer at a residential door may be genuine but not qualified for *your* boiler type; an unregistered fitter can cause carbon monoxide poisoning.
- **Angle of Capture:** A fixed camera can be optimized (angled 45° out or down) to capture credentials held at chest height.
- **Hands-Free Operation:** The resident or staff member can view the verification result on their phone while keeping their hands free or remaining behind a secure barrier.

## 2. Hardware Configuration

The detached camera acts as a remote lens for the **Live Verify** pipeline:

- **The Sensor:** A high-resolution (4K preferred) wide-angle camera mounted at eye or chest level.
- **The Angle:** Mounted at 45 degrees out or down to minimize glare from overhead lighting and optimize the "sweet spot" for badge presentation.
- **The Link:**
    *   **Wireless:** Low-latency Bluetooth (BLE) or local WiFi (WebRTC) feed to the smartphone.
    *   **Wired:** USB-C or Lightning connection for maximum reliability and zero-latency in commercial/front-desk settings.
- **Security & Standards:** While the hardware link is technical, the security of the connection is a platform-level concern. **Apple and Google** would be the entities to specify the protocols for how such cameras are securely "attached" or "paired" with smartphones to ensure the feed's integrity and prevent man-in-the-middle attacks.
- **The Processor:** All OCR, normalization, and hashing still occur on the **user's smartphone**. The camera is a "dumb sensor," ensuring the bank/issuer domain never sees the raw video feed (privacy-preserving).

## 3. The Verification Workflow

1.  **Arrival:** A visitor arrives at the entryway and presents their credential (e.g., a **[Delivery Courier Badge](../public/use-cases/delivery-courier-verification.md)** or **[Police Officer ID](../public/use-cases/police-officer-verification.md)**) toward the wall-mounted camera.
2.  **Feed Acquisition:** The smartphone app (Live Verify) automatically acquires the feed from the detached camera.
3.  **Active Detection:** The app's computer vision logic (OpenCV.js) detects the registration marks on the credential within the remote feed.
4.  **The "Verify" Moment:**
    *   The app performs OCR and normalization on the captured frame.
    *   The hash is computed and verified against the issuer's domain (e.g., `fedex.com` or `nypd.gov`).
5.  **Owner Notification:** The phone owner sees the verification result:
    *   ✅ **VERIFIED:** The credential text is currently attested by the issuer's domain (e.g., `nypd.gov` or `fedex.com`). The bearer still needs to match the credential — Live Verify confirms the document, not the person holding it.
    *   ❌ **FAILS VERIFICATION / NOT FOUND:** The credential text is not recognised by the claimed issuer's domain.

## 4. Key Advantages

### A. "Active Witnessing" Behind a Barrier
The resident can verify the visitor's authority without ever opening the door. This transforms the entryway from a point of vulnerability into a **Verifiable Security Zone**.

### B. Optimized Optical Path
Physical badges are often glossy. A fixed camera can be paired with polarized lighting or specific mounting angles (the 45-degree rule) to eliminate "hot spots" and moiré patterns that often plague handheld phone cameras.

### C. Deterrence via Presence
The presence of a "Live Verify Ready" camera deters impersonation and robbery-by-deception. Someone presenting a fake credential knows it will be checked against the issuer's domain in real-time — and that the interaction is being witnessed from behind a barrier.

## 5. Implementation for Smart Home & Commercial Security

### Smart Home Integration (IoT)
Video doorbells (Ring, Nest, etc.) could expose a "Live Verify" stream to the owner's phone. When a courier arrives, the owner taps "Verify Visitor" in their home app, triggering the Live Verify pipeline on the doorbell's feed.

### Front Desk / Security Kiosks
In corporate lobbies, a detached camera can be built into the desk surface, angled up toward the visitor. The security guard's tablet or phone displays the "VERIFIED" status, allowing for a seamless, high-trust check-in process.

## 6. Related Use Cases

- **[Cold-Caller Credentials](../public/use-cases/cold-caller-credentials.md)** — Verify utility workers or sales reps at the door.
- **[Building Inspector Verification](../public/use-cases/building-inspector-verification.md)** — Confirm authority before allowing entry to a residence.
- **[Healthcare Home-Visit Verification](../public/use-cases/healthcare-home-visit-verification.md)** — Protect vulnerable patients by verifying caregivers before they enter the home.

## 7. Technical Note on Latency

For detached cameras, the **[Multi-Orientation OCR](../LLM.md#multi-orientation-ocr)** and **[High-Resolution Capture](../LLM.md#high-resolution-capture)** logic must be optimized for the transport link. Using WebRTC for wireless links ensures the "Verify" moment happens in < 2 seconds, maintaining the "Live" feel of the verification.
