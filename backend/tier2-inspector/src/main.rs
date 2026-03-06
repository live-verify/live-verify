mod capsicum;
mod read_handler;
mod tls;
mod write_handler;

use clap::Parser;
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::net::TcpListener;

#[derive(Parser)]
struct Args {
    /// Read port (public-facing via Tier 1)
    #[arg(long, default_value = "8080")]
    read_port: u16,

    /// Write port (management, mTLS from issuers)
    #[arg(long, default_value = "8081")]
    write_port: u16,

    /// Tier 3 upstream URL
    #[arg(long, default_value = "https://tier3:9090")]
    upstream: String,

    /// TLS certificate file
    #[arg(long)]
    tls_cert: Option<String>,

    /// TLS private key file
    #[arg(long)]
    tls_key: Option<String>,

    /// CA certificate for mTLS client verification
    #[arg(long)]
    tls_ca: Option<String>,

    /// Client certificate for upstream mTLS to Tier 3
    #[arg(long)]
    upstream_cert: Option<String>,

    /// Client key for upstream mTLS to Tier 3
    #[arg(long)]
    upstream_key: Option<String>,
}

#[derive(Clone)]
pub struct AppState {
    pub upstream_url: String,
    pub client: reqwest::Client,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let args = Args::parse();

    // Build upstream HTTP client (with optional mTLS to Tier 3)
    let client = build_upstream_client(&args);

    let state = Arc::new(AppState {
        upstream_url: args.upstream.trim_end_matches('/').to_string(),
        client,
    });

    // Read server
    let read_app = read_handler::router(state.clone());
    let read_addr = SocketAddr::from(([0, 0, 0, 0], args.read_port));

    // Write server
    let write_app = write_handler::router(state.clone());
    let write_addr = SocketAddr::from(([0, 0, 0, 0], args.write_port));

    tracing::info!("Tier 2 read on {}, write on {}", read_addr, write_addr);

    // Bind sockets before potential Capsicum lockdown
    let read_listener = TcpListener::bind(read_addr).await.unwrap();
    let write_listener = TcpListener::bind(write_addr).await.unwrap();

    // Warm connection pool to Tier 3
    let warmup_url = format!("{}/healthz", state.upstream_url);
    match state.client.get(&warmup_url).send().await {
        Ok(_) => tracing::info!("Tier 3 connection pool warmed"),
        Err(e) => tracing::warn!("Tier 3 warmup failed (may not be up yet): {}", e),
    }

    // Enter Capsicum capability mode if available
    capsicum::enter_capability_mode();

    // Serve both ports
    tokio::select! {
        r = axum::serve(read_listener, read_app.into_make_service_with_connect_info::<SocketAddr>()) => {
            tracing::error!("Read server exited: {:?}", r);
        }
        r = axum::serve(write_listener, write_app.into_make_service()) => {
            tracing::error!("Write server exited: {:?}", r);
        }
    }
}

fn build_upstream_client(args: &Args) -> reqwest::Client {
    let mut builder = reqwest::Client::builder()
        .use_rustls_tls()
        .pool_max_idle_per_host(16);

    if let Some(ref ca_path) = args.tls_ca {
        if let Ok(ca_data) = std::fs::read(ca_path) {
            if let Ok(ca_cert) = reqwest::Certificate::from_pem(&ca_data) {
                builder = builder.add_root_certificate(ca_cert);
            }
        }
    }

    if let (Some(ref cert_path), Some(ref key_path)) = (&args.upstream_cert, &args.upstream_key) {
        if let (Ok(cert_data), Ok(key_data)) = (std::fs::read(cert_path), std::fs::read(key_path)) {
            let mut combined = cert_data;
            combined.push(b'\n');
            combined.extend_from_slice(&key_data);
            if let Ok(identity) = reqwest::Identity::from_pem(&combined) {
                builder = builder.identity(identity);
            }
        }
    }

    builder.build().unwrap()
}
