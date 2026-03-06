/// Enter Capsicum capability mode on FreeBSD.
/// No-op on other platforms.
pub fn enter_capability_mode() {
    #[cfg(all(target_os = "freebsd", feature = "capsicum"))]
    {
        tracing::info!("Entering Capsicum capability mode");
        unsafe {
            if libc::cap_enter() != 0 {
                tracing::error!("Failed to enter Capsicum capability mode");
            } else {
                tracing::info!("Capsicum capability mode active — no new file/socket opens allowed");
            }
        }
    }

    #[cfg(not(all(target_os = "freebsd", feature = "capsicum")))]
    {
        tracing::info!("Capsicum not available (not FreeBSD or feature disabled) — skipping capability mode");
    }
}
