const ContentSecurityPolicy = {
  "form-action": ["'self'"],
  "base-uri": ["'self'"],
  "frame-ancestors": ["'self'"],
  "manifest-src": ["'self'"],
  "prefetch-src": ["'self'"],
  "default-src": ["'self'"],
  "object-src": ["data:"],
  "script-src": [
    "'self'",
    "https://www.google.com/recaptcha/",
    "https://www.gstatic.com/recaptcha/",
    "http://cdnjs.cloudflare.com/",
    "http://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js",
    "https://source.zoom.us/",
    "https://zoom.us/api/",
  ],
  "child-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com/"],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com/"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://singapore.stream-io-cdn.com/",
    "https://via.placeholder.com",
    "https://getstream.imgix.net",
    "https://spesialis1.orthopaedi.fk.unair.ac.id",
    "https://thumbs.dreamstime.com/",
    "https://zodiac-live-development.oss-cn-beijing.aliyuncs.com",
    "https://www.jotform.com/uploads/",
    "https://files.jotform.com/",
    "https://i.picsum.photos/",
    "https://marketplace.zoom.us/",
    "https://marketplacefront.zoom.us/marketplace_assets/app-default-icon.png",
  ],
  "media-src": [
    "'self'",
    "http://commondatastorage.googleapis.com",
    "https://d23dyxeqlo5psv.cloudfront.net",
    "https://zodiac-live-development.oss-cn-beijing.aliyuncs.com",
    "http://localhost:3000/",
    "https://source.zoom.us/",
  ],
  "connect-src": [
    "'self'",
    "ws://localhost:3000/",
    "https://zodiac-live-development.oss-cn-beijing.aliyuncs.com/",
    "https://chat.stream-io-api.com/",
    "wss://chat.stream-io-api.com/",
    "ws://localhost:3000/",
    "wss://api-staging.40apcca2022.sg/graphql",
    "ws://api-staging.40apcca2022.sg/graphql",
    "https://identitytoolkit.googleapis.com/v1/",
    "https://api.40apcca2022.sg/graphql",
    "https://api-staging.40apcca2022.sg",
    "https://40apcca2022.sg/",
    "https://securetoken.googleapis.com/v1/token",

    // "https://*.agora.io:*/",
    // "https://*.sd-rtn.com:*/",
    // "wss://*.agora.io:*/",
    // "wss://*.sd-rtn.com:*/",
    // "wss://*.edge.agora.io:*/",
    // "wss://*.edge.sd-rtn.com:*/",
    // "wss://*.edge.sd-rtn.com:*/",
    // "wss://*.edge.agora.io:*/",

    "https://www.jotform.com/",
    `https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/`,
    `https://content-firebaseappcheck.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/apps/`,
    "https://zodiac-live-development.oss-cn-beijing.aliyuncs.com",
    process.env.NEXT_PUBLIC_BACKEND_URL + "/graphql",
    process.env.NEXT_PUBLIC_BACKEND_WS_URL + "/graphql",
    "https://*.cloud.zoom.us/",
    "https://source.zoom.us/",
    "wss://*.cloud.zoom.us/",
    "http://localhost:4000/",
  ],
  "worker-src": ["'self'", "blob:"],
  "frame-src": [
    "'self'",
    "https://www.google.com/recaptcha/",
    "https://recaptcha.google.com/recaptcha/",
    "https://form.jotform.com",
    "https://submit.jotform.com",
    "https://zodiac-live-development.oss-cn-beijing.aliyuncs.com",
    "https://app.sli.do",
    "https://docs.google.com/",
    "https://view.officeapps.live.com/",
    "https://iframe.dacast.com/",
  ],
};

if (process.env.NODE_ENV === "production") {
  ContentSecurityPolicy["upgrade-insecure-requests"] = [];
} else {
  ContentSecurityPolicy["script-src"].push("'unsafe-eval'");
  ContentSecurityPolicy["connect-src"].push(
    `http://localhost:5001/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/us-central1/`
  );
}

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: Object.entries(ContentSecurityPolicy)
      .map(([key, value]) => {
        return `${key} ${value.join(" ")};`;
      })
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: false,
  generateEtags: false,
  poweredByHeader: false,
};
