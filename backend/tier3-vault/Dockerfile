FROM golang:1.23-alpine AS builder
WORKDIR /build
COPY go.mod go.sum ./
RUN go mod download
COPY *.go ./
COPY internal/ ./internal/
COPY seed/ ./seed/
RUN CGO_ENABLED=0 go build -o /tier3-vault .

FROM alpine:3.20
RUN apk add --no-cache ca-certificates
COPY --from=builder /tier3-vault /usr/local/bin/tier3-vault
EXPOSE 9090
ENTRYPOINT ["tier3-vault"]
