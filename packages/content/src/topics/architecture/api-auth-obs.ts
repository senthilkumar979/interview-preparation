import { architectureTopic } from "./factory";

export const architectureApiAuthObsTopics = [
  architectureTopic({
    slug: "arch-api-strategy",
    title: "API strategy",
    order: 38,
    summary: "REST, GraphQL, tRPC, BFF, caching, waterfalls, and contracts as architecture — not just URLs.",
    related: ["arch-pattern-facade", "arch-client-vs-server-state"],
    isHighYield: true,
    oneLiner:
      "API strategy is how the UI gets data without becoming a distributed monolith: REST for resources, GraphQL for client-shaped graphs, tRPC for typed RPC in a TS monorepo, BFF to hide 8 backend services. Colocate fetch in RSC or a feature facade; cache with HTTP + Query; design errors, retries, and idempotency keys on writes.",
    beats: [
      "BFF (Backend for Frontend) exists because mobile, web, and admin want different shapes.",
      "Waterfalls: await A then B on the client is an architecture bug — parallelize or compose on the server.",
      "Idempotency-Key on payments. Retrying POST without it double-charges.",
    ],
    intro: "Pick a style per bounded context, not a religion for the company.",
    why: "Wrong API layer shows up as 12 round-trips and a brittle UI.",
    extras: [
      {
        key: "rest",
        title: "REST",
        body: "Resources, verbs, cacheable GETs, problem+json errors. Version with path or headers. Great with HTTP caching and CDNs. Awkward when a screen needs 8 resources (chatty) unless you add a BFF or GraphQL.",
      },
      {
        key: "gql",
        title: "GraphQL",
        body: "One endpoint, client-specified fields, persisted queries in prod. N+1 is the server’s problem (dataloaders). Authz per field. Caching is harder than REST GET (use persisted queries + CDN).",
      },
      {
        key: "trpc",
        title: "tRPC",
        body: "Procedures + inferred types. Excellent in TS monorepos. Not a public API for third parties. Still needs authz and versioning discipline internally.",
      },
      {
        key: "bff",
        title: "BFF",
        body: "A web-specific server aggregates microservices, sets cookies, maps DTOs. Next.js Route Handlers / Server Actions often play BFF. Don’t put business rules only in the BFF if Android needs them too — share a domain package.",
      },
    ],
    concept: "Contract first (OpenAPI/Zod). The UI depends on the contract, not on a random fetch.",
    how: "Feature calls facade → BFF or RSC loaders → services. Cache GETs. Mutate with invalidation.",
    usage: "Every product. Interviews: draw the hop count for a checkout page.",
    practices: "Timeouts, cancellation (`AbortSignal`), pagination, ETags. Don’t parse JSON as `any`.",
    mistakes: "Client calling 5 microservices directly (CORS hell, auth hell). GraphQL plus REST plus tRPC for the same resource.",
    code: `export async function loadCheckout(userId: string) {
  const [cart, methods] = await Promise.all([cartApi.get(userId), billingApi.methods(userId)]);
  return { cart, methods };
}
`,
    examples: [
      {
        id: "idem",
        title: "Idempotent pay",
        about: "Retry-safe POST.",
        language: "typescript",
        code: `await fetch("/api/pay", {
  method: "POST",
  headers: { "Idempotency-Key": crypto.randomUUID() },
  body: JSON.stringify({ orderId }),
});
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-authentication",
    title: "Authentication",
    order: 39,
    summary: "Prove who the user is: sessions, cookies, JWT, CSRF, httpOnly — UI is not the source of truth.",
    related: ["arch-authorization", "arch-oauth2", "arch-session-tokens"],
    isHighYield: true,
    oneLiner:
      "Authentication answers “who are you?” Sessions: server stores an id, browser holds an httpOnly Secure SameSite cookie. JWTs: self-contained access tokens — don’t store them in localStorage (XSS). CSRF matters for cookie sessions (SameSite=Lax/Strict + token). Next middleware can gate routes but must not be the only check.",
    beats: [
      "httpOnly cookies cannot be read by JS — good vs XSS token theft.",
      "Bearer tokens in memory + refresh rotation is an SPA pattern; BFF cookie is simpler for first-party web.",
      "Never log tokens. Rotate refresh tokens. Bind sessions to user-agent/IP only as a signal, not a sole factor.",
    ],
    intro: "If they can call your API without a secret the browser shouldn’t hold, you designed it.",
    why: "Account takeover is an architecture failure, not a CSS one.",
    concept: "Credential → authenticator (password, OIDC, passkey) → session.",
    how: "Login sets cookie or returns tokens. Subsequent requests send cookie or Authorization header. Logout revokes.",
    usage: "Every app. Passkeys/WebAuthn for phishing resistance.",
    practices: "Short access, long refresh, server-side revocation list for theft. MFA for sensitive actions.",
    mistakes: "JWT in localStorage. `SameSite=None` without Secure. Trusting `userId` in the request body.",
    code: `export async function GET() {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });
  return Response.json({ id: session.userId });
}
`,
    examples: [
      {
        id: "cookie",
        title: "Cookie flags",
        about: "Say them in the interview.",
        language: "typescript",
        code: `Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=1209600
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-authorization",
    title: "Authorization",
    order: 40,
    summary: "What the user may do: RBAC, ABAC, and why hiding a button is not security.",
    related: ["arch-authentication", "arch-oidc"],
    isHighYield: true,
    oneLiner:
      "Authorization answers “what can you do?” RBAC: roles (`admin`, `editor`). ABAC: attributes (`orgId`, `resource.owner`). Every mutation must check on the server. UI gating (`if (canEdit)`) is UX, not security. IDs in the URL are not permission.",
    beats: [
      "IDOR: user A fetches `/api/orders/B`s-id. Check ownership/org.",
      "ReBAC (Google Zanzibar-style) for sharing (“user X on doc Y”).",
      "OIDC `roles` claims are hints; your API still enforces.",
    ],
    intro: "Authn without authz is an open cupboard with a name tag.",
    why: "Most “hacks” in CRUD apps are missing server checks.",
    concept: "Policy: principal, action, resource, context.",
    how: "Central `can(user, action, resource)`. Fail closed. Log denials.",
    usage: "Admin panels, multi-tenant SaaS, comments.",
    practices: "Tests for negative cases. Don’t rely on unguessable UUIDs alone.",
    mistakes: "Only checking role in React. Client-supplied `role: admin` in JSON.",
    code: `function assertCanEdit(user: User, article: Article) {
  if (user.role === "admin") return;
  if (article.authorId === user.id) return;
  throw new ForbiddenError();
}
`,
    examples: [
      {
        id: "ui",
        title: "UI still hides",
        about: "But API repeats the check.",
        language: "typescript",
        code: `{can(user, "article:publish", article) ? <PublishButton /> : null}
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-oauth2",
    title: "OAuth 2.0",
    order: 41,
    summary: "Delegated authorization: roles, grants, auth code + PKCE, why implicit is dead.",
    related: ["arch-oidc", "arch-authentication"],
    isHighYield: true,
    oneLiner:
      "OAuth 2.0 lets a client access a resource server with tokens from an authorization server, without the user’s password. Roles: resource owner, client, authorization server, resource server. For SPAs and native apps use Authorization Code + PKCE. Implicit flow is obsolete. OAuth is authorization, not authentication — that’s OIDC.",
    beats: [
      "Auth code: front channel gets a code; back channel (or PKCE) swaps it for tokens.",
      "PKCE: client creates `code_verifier`, sends `code_challenge`; token request proves possession.",
      "Confidential clients (BFF) can use a client secret; public clients must not.",
    ],
    intro: "“Sign in with Google” is OIDC on OAuth rails. Know the rails.",
    why: "You will integrate IdPs. Wrong grant = token theft.",
    extras: [
      {
        key: "roles",
        title: "Roles",
        body: "Resource owner: user. Client: your app. Authorization server: issues tokens (Auth0, Cognito, Keycloak, Google). Resource server: API that accepts Bearer tokens.",
      },
      {
        key: "grants",
        title: "Grants",
        body: "Authorization code + PKCE: default for user login. Client credentials: machine-to-machine. Refresh token: new access tokens. Device code: TVs. Resource owner password: avoid. Implicit: do not use.",
      },
    ],
    concept: "Delegation with scoped tokens. Least privilege scopes.",
    how: "Redirect → consent → code → token → call API with Authorization: Bearer.",
    usage: "Social login, GitHub integrations, accessing Google Calendar.",
    practices: "Exact redirect URI match. State param (CSRF). Short-lived access tokens.",
    mistakes: "Access token in the URL hash (implicit). Reusing codes. Storing refresh tokens in localStorage.",
    figures: [
      {
        src: "/diagrams/architecture/arch-oauth-pkce.png",
        alt: "Authorization code + PKCE sequence",
        caption: "Auth code + PKCE",
      },
    ],
    code: `const verifier = randomString();
const challenge = base64url(sha256(verifier));
const url = new URL("https://idp.example/authorize");
url.searchParams.set("response_type", "code");
url.searchParams.set("client_id", process.env.NEXT_PUBLIC_CLIENT_ID!);
url.searchParams.set("code_challenge", challenge);
url.searchParams.set("code_challenge_method", "S256");
url.searchParams.set("redirect_uri", redirectUri);
url.searchParams.set("state", state);
url.searchParams.set("scope", "openid profile email");
`,
    examples: [
      {
        id: "token",
        title: "Token request",
        about: "Send the verifier.",
        language: "typescript",
        code: `await fetch("https://idp.example/token", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  }),
});
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-oidc",
    title: "OpenID Connect (OIDC)",
    order: 42,
    summary: "Identity layer on OAuth 2.0: ID tokens, UserInfo, discovery, vs access tokens.",
    related: ["arch-oauth2", "arch-authentication"],
    isHighYield: true,
    oneLiner:
      "OIDC is OAuth 2.0 plus an identity layer. The ID token is a JWT about the user (`sub`, `iss`, `aud`, `nonce`). The access token is for APIs and may be opaque. Discovery (`/.well-known/openid-configuration`) publishes JWKS and endpoints. Validate ID tokens: issuer, audience, expiry, nonce, signature.",
    beats: [
      "Don’t send the ID token as an API credential unless the API is written for it (usually access token).",
      "`profile`/`email` scopes. `offline_access` for refresh where offered.",
      "UserInfo endpoint is a Bearer call when claims are not all in the ID token.",
    ],
    intro: "OAuth alone does not define a standard user identity. OIDC does.",
    why: "SSO, “Login with…”, and Clerk/Auth0 conversations.",
    concept: "Authentication as a standardized OAuth scope (`openid`) + ID token.",
    how: "Same auth-code+PKCE flow with `scope=openid`. Validate JWT with JWKS.",
    usage: "Workforce SSO, consumer social login, B2B enterprise IdP.",
    practices: "Clock skew. `nonce` stored in the session that started login. Map `sub` as stable user id per issuer.",
    mistakes: "Parsing JWT without verifying signature. Trusting `email_verified` without checking.",
    figures: [
      {
        src: "/diagrams/architecture/arch-oauth-pkce.png",
        alt: "OIDC rides the same auth-code flow",
        caption: "OIDC uses OAuth 2.0 code + PKCE",
      },
    ],
    code: `const claims = await jose.jwtVerify(idToken, JWKS, {
  issuer: "https://idp.example",
  audience: clientId,
});
if (claims.payload.nonce !== expectedNonce) throw new Error("nonce");
`,
    examples: [
      {
        id: "discover",
        title: "Discovery",
        about: "Don’t hardcode token URLs if you can avoid it.",
        language: "typescript",
        code: `const cfg = await fetch("https://idp.example/.well-known/openid-configuration").then((r) => r.json());
// cfg.authorization_endpoint, token_endpoint, jwks_uri, userinfo_endpoint
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-session-tokens",
    title: "Sessions, tokens, and middleware gates",
    order: 43,
    summary: "BFF session cookies vs SPA tokens, refresh rotation, Next.js middleware as a coarse gate.",
    related: ["arch-authentication", "arch-oauth2", "arch-edge-rendering"],
    oneLiner:
      "First-party web: BFF holds tokens, browser holds a session cookie. Third-party API SPAs: authorization code + PKCE, access token in memory, refresh in httpOnly cookie if you control the domain. Next middleware is a UX gate (redirect). Resource servers still authorize every request.",
    beats: [
      "Refresh token rotation: new refresh each use; reuse detection = theft.",
      "Middleware cannot see httpOnly meaning from client JS — it sees cookies on the request.",
      "Edge middleware should not do heavy JWT crypto if you can validate a session id against KV.",
    ],
    intro: "Pick one session model and write it down. Hybrids cause CSRF+XSS combo bugs.",
    why: "Architecture reviews fail here more than in folder structure.",
    concept: "Where secrets live. Who refreshes. Who revokes.",
    how: "Login → session row or token pair → send on API → rotate → logout deletes.",
    usage: "Next.js Route Handlers as BFF. Clerk/Auth.js as the session implementation.",
    practices: "Absolute session timeout + idle timeout. Step-up auth for pay.",
    mistakes: "Middleware-only security. Long-lived JWT in localStorage as the session.",
    code: `export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  if (!session && req.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
`,
    examples: [
      {
        id: "bff",
        title: "BFF token storage",
        about: "Browser never sees the IdP refresh token.",
        language: "typescript",
        code: `// server: encrypt tokens in the session store
// browser: only session cookie
`,
      },
    ],
  }),

  architectureTopic({
    slug: "arch-observability",
    title: "Observability",
    order: 44,
    summary: "Logs, metrics, traces, RUM, frontend errors, Web Vitals, correlation IDs.",
    related: ["arch-performance-budgets", "arch-pattern-error-boundary"],
    isHighYield: true,
    oneLiner:
      "Observability is logs (events), metrics (aggregates), traces (request graphs). On the frontend add RUM (real user Web Vitals), error reporting (stack + replay if policy allows), and a correlation id on every API call so a click becomes a backend trace. Tools (Sentry, OpenTelemetry) are implementations, not the design.",
    beats: [
      "Cardinalities: don’t metric per user id unbounded. Use attributes carefully.",
      "PII in logs is a privacy incident. Scrub emails and tokens.",
      "SLOs: error rate, LCP, INP — architecture should name budgets.",
    ],
    intro: "If you cannot ask “why is checkout slow for EU users?” you do not have observability.",
    why: "Production is the real test. Interviews: three pillars + frontend specifics.",
    concept: "Unknown-unknowns: high-cardinality events you can slice later vs predefined dashboards.",
    how: "OpenTelemetry SDK → collector → backend. Browser exporter + server SDK share `traceparent`.",
    usage: "Every serious app. Feature flags + observability = explain experiments.",
    practices: "Sample traces. Error grouping. Source maps for minified stacks.",
    mistakes: "Only `console.log`. No correlation. Capturing raw request bodies with passwords.",
    figures: [
      {
        src: "/diagrams/architecture/arch-observability.png",
        alt: "Browser logs metrics traces to a collector",
        caption: "Client to collector to backends",
      },
    ],
    code: `const requestId = crypto.randomUUID();
await fetch("/api/checkout", {
  headers: { "x-request-id": requestId, traceparent: currentTraceparent() },
});
`,
    examples: [
      {
        id: "vitals",
        title: "Web Vitals as metrics",
        about: "Architecture cares about INP, not just Lighthouse locally.",
        language: "typescript",
        code: `onINP((metric) => {
  reportMetric("inp", metric.value, { route: location.pathname });
});
`,
      },
    ],
  }),
];
