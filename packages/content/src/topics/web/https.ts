import { webTopic } from "./factory";

export const webHttps = webTopic({
  slug: "web-https",
  title: "HTTPS and TLS",
  order: 5,
  summary: "Encrypting HTTP: certificates, the handshake, and why mixed content fails.",
  prerequisites: ["web-http"],
  related: ["web-what-happens-google", "web-browser-architecture"],
  isHighYield: true,
  oneLiner:
    "HTTPS is HTTP over TLS. After TCP (or as part of QUIC), the client and server negotiate keys, the server proves its identity with a certificate the browser trusts, then HTTP bytes are encrypted. Without this, cookies and passwords are visible on the path.",
  beats: [
    "Certificate: public key + hostname(s) signed by a CA in the trust store (or a private CA you installed).",
    "SNI tells the server which cert to present on a shared IP. Certificate transparency logs public certs.",
    "Mixed content: an HTTPS page loading `http://` scripts is blocked; images may be upgraded or warned.",
  ],
  intro: "“What happens when you google” includes a TLS handshake. Skipping it is a junior tell.",
  why: "Service workers, geolocation, and many APIs require a secure context. SEO and browsers mark HTTP as not secure.",
  concept:
    "TLS 1.3 handshake is fewer round trips than 1.2. Session resumption and 0-RTT (QUIC) trade replay risk for speed. HSTS (`Strict-Transport-Security`) forces HTTPS on later visits.",
  how: "ClientHello (ALPN: h2/h3, SNI) → ServerHello + cert → key agreement → encrypted HTTP. Browser checks expiry, hostname, revocation/CT as implemented.",
  usage: "Every production site. Localhost is a secure context without a public cert.",
  extras: [
    {
      key: "handshake",
      title: "Handshake, step by step (TLS 1.3 mental model)",
      body: "1. TCP three-way handshake (HTTP/1.1 and h2) or QUIC combines transport+crypto (h3). 2. ClientHello: supported ciphers, SNI, ALPN. 3. Server picks parameters, sends certificate chain. 4. Client verifies chain to a trusted root and that the name matches. 5. Both derive session keys. 6. Application data (HTTP) is encrypted. 7. Later requests on the same connection skip a full handshake.",
    },
  ],
  practices: "Redirect HTTP→HTTPS. Enable HSTS once you are sure. Keep certs auto-renewed. Serve the right chain (intermediates).",
  mistakes: "Self-signed certs in production. Forgetting www vs apex names on the cert. Loading scripts over HTTP on an HTTPS page.",
  language: "html",
  code: `Strict-Transport-Security: max-age=31536000; includeSubDomains
`,
  examples: [
    {
      id: "secure-context",
      title: "Secure context APIs",
      about: "SW registration fails on plain HTTP (except localhost).",
      language: "javascript",
      code: `if (window.isSecureContext) {
  navigator.serviceWorker.register("/sw.js");
}
`,
    },
  ],
});
