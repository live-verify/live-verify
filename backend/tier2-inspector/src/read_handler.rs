use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    routing::get,
    Router,
};
use std::sync::Arc;

use crate::AppState;

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/healthz", get(healthz))
        .route("/v/{hash}", get(get_hash))
        .with_state(state)
}

async fn healthz() -> &'static str {
    "ok"
}

async fn get_hash(
    State(state): State<Arc<AppState>>,
    Path(hash): Path<String>,
) -> impl IntoResponse {
    // Validate hash: 64 lowercase hex chars
    if hash.len() != 64 || !hash.chars().all(|c| c.is_ascii_hexdigit() && !c.is_ascii_uppercase()) {
        return (StatusCode::BAD_REQUEST, "invalid hash".to_string());
    }

    // Forward to Tier 3
    let url = format!("{}/v/{}", state.upstream_url, hash);
    match state.client.get(&url).send().await {
        Ok(resp) => {
            let status = StatusCode::from_u16(resp.status().as_u16()).unwrap_or(StatusCode::BAD_GATEWAY);
            let body = resp.text().await.unwrap_or_default();
            (status, body)
        }
        Err(e) => {
            tracing::error!("Upstream error: {}", e);
            (StatusCode::BAD_GATEWAY, "upstream error".to_string())
        }
    }
}
