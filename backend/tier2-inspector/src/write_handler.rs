use axum::{
    body::Bytes,
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    routing::put,
    Router,
};
use std::sync::Arc;

use crate::AppState;

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/healthz", axum::routing::get(healthz))
        .route("/v/:hash", put(put_hash))
        .with_state(state)
}

async fn healthz() -> &'static str {
    "ok"
}

async fn put_hash(
    State(state): State<Arc<AppState>>,
    Path(hash): Path<String>,
    body: Bytes,
) -> impl IntoResponse {
    // Validate hash
    if hash.len() != 64 || !hash.chars().all(|c| c.is_ascii_hexdigit() && !c.is_ascii_uppercase()) {
        return (StatusCode::BAD_REQUEST, "invalid hash".to_string());
    }

    // Validate payload
    if body.len() > 8192 {
        return (StatusCode::PAYLOAD_TOO_LARGE, "payload too large".to_string());
    }
    let payload = match std::str::from_utf8(&body) {
        Ok(s) => s.trim().to_string(),
        Err(_) => return (StatusCode::BAD_REQUEST, "invalid UTF-8".to_string()),
    };
    if payload.is_empty() {
        return (StatusCode::BAD_REQUEST, "empty payload".to_string());
    }

    // Forward to Tier 3
    let url = format!("{}/v/{}", state.upstream_url, hash);
    match state.client.put(&url).body(payload).send().await {
        Ok(resp) => {
            let status = StatusCode::from_u16(resp.status().as_u16()).unwrap_or(StatusCode::BAD_GATEWAY);
            let body = resp.text().await.unwrap_or_default();
            (status, body)
        }
        Err(e) => {
            tracing::error!("Upstream write error: {}", e);
            (StatusCode::BAD_GATEWAY, "upstream error".to_string())
        }
    }
}
