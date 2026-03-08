FROM golang:1.22-alpine AS builder
WORKDIR /build
COPY go.mod ./
COPY *.go ./
RUN CGO_ENABLED=0 go build -o /tier1-edge .

FROM alpine:3.20
RUN apk add --no-cache ca-certificates
COPY --from=builder /tier1-edge /usr/local/bin/tier1-edge
EXPOSE 8443
ENTRYPOINT ["tier1-edge"]
