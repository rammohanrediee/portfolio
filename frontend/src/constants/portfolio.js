// Central content + links for the portfolio. Replace the placeholder URLs
// below with real ones when provided by Ram.

export const PROFILE = {
  name: "Ram Mohan Reddy K",
  role: "Python & Applied AI Engineer",
  issue: "ISSUE #04",
  bio:
    "A passionate full stack engineer with a love for creating innovative solutions and turning ideas into reality. I enjoy working with cutting-edge technologies and continuously learning new tools to solve complex problems.",
  currentlyBuilding: "TAL",
  currentlyBuildingNote: "a job-search workspace",
  githubUsername: "rammohanrediee",
};

// --- Social & project links (placeholders — swap with real URLs) ---
export const LINKS = {
  github: "https://github.com/rammohanrediee",
  x: "https://x.com/lone_warrior_49",
  email: "mailto:krammohan8845@gmail.com",
  voicePortfolio: "#voice-portfolio",
  orbitdesk: "#",
  peermock: "#",
  cvlens: "#",
};

// The three interview questions (left index column)
export const QUESTIONS = [
  {
    id: "orbitdesk",
    number: "Q1",
    tag: "RETRIEVAL",
    question:
      "Your first RAG build returned confident nonsense. How did you make AI documentation search actually trustworthy?",
    summary: "OrbitDesk — from naive vectors to hybrid retrieval.",
  },
  {
    id: "peermock",
    number: "Q2",
    tag: "CONCURRENCY",
    question:
      "Two users booked the same slot in the same millisecond. Walk me through how you stopped the double-booking.",
    summary: "PeerMock — optimistic locking under a real race.",
  },
  {
    id: "cvlens",
    number: "Q3",
    tag: "SYSTEMS",
    question:
      "A recruiter skims for ten seconds. How do you prove a résumé line actually answers a requirement?",
    summary: "CVLens — requirement-to-evidence matching.",
  },
];

// ---- OrbitDesk dataset ----
export const ORBITDESK = {
  query: "How do I stream tokens from the completions endpoint with backpressure?",
  first: {
    label: "First attempt",
    sub: "naive cosine vector search",
    latency: "1,420 ms",
    precision: "61%",
    recall: "74%",
    tone: "bad",
    note: "[ERR] confident fragments, stitched across unrelated docs",
    results: [
      { title: "streaming.mdx · chunk 7", score: 0.81, snippet: "set stream=True and iterate the response object…", bad: true, flag: "hallucinated param" },
      { title: "legacy_v1/rate_limits", score: 0.78, snippet: "backpressure is handled automatically by the SDK…", bad: true, flag: "wrong version" },
      { title: "faq.mdx · chunk 2", score: 0.73, snippet: "tokens arrive as server-sent events…", bad: false },
    ],
  },
  fixed: {
    label: "After the fix",
    sub: "BM25 + Reciprocal Rank Fusion + chunk re-rank",
    latency: "180 ms",
    precision: "99.4%",
    recall: "97%",
    tone: "good",
    note: "[OK] grounded spans, every claim cites a live line",
    results: [
      { title: "streaming.mdx · §Backpressure", score: 0.97, snippet: "await the async iterator; pause the consumer to apply backpressure…", bad: false, flag: "exact section" },
      { title: "guides/async-consumers", score: 0.95, snippet: "use an asyncio.Queue with maxsize to bound memory…", bad: false, flag: "grounded" },
      { title: "api/sse-protocol", score: 0.92, snippet: "each event is `data: {token}` terminated by \\n\\n…", bad: false },
    ],
  },
};

// ---- PeerMock dataset ----
export const PEERMOCK = {
  slot: "Tue 14:00 — Mock Interview · Slot #A17",
  requestA: {
    id: "A",
    user: "candidate_014",
    sentAt: "t+0.000s",
    version: "rev 8",
  },
  requestB: {
    id: "B",
    user: "candidate_221",
    sentAt: "t+0.004s",
    version: "rev 8",
  },
};

// ---- CVLens dataset ----
export const CVLENS = {
  requirements: [
    {
      id: 0,
      label: "5+ yrs async Python / FastAPI in production",
      matchLine: 2,
      annotation: "shipped async FastAPI at scale",
    },
    {
      id: 1,
      label: "LLM agentic workflows & tool calling",
      matchLine: 4,
      annotation: "built the agent loop + tool router",
    },
    {
      id: 2,
      label: "Postgres concurrency & distributed locks",
      matchLine: 6,
      annotation: "advisory locks under heavy write contention",
    },
  ],
  resume: [
    { line: 0, text: "RAM MOHAN REDDY — Backend & Applied AI", head: true },
    { line: 1, text: "EXPERIENCE", small: true },
    { line: 2, text: "Senior Backend Engineer — designed async FastAPI services handling 40k req/min with p99 < 120ms." },
    { line: 3, text: "Owned the retrieval layer: hybrid BM25 + vector fusion powering internal doc search." },
    { line: 4, text: "Built an LLM agent loop with a typed tool-calling router and deterministic replay for evals." },
    { line: 5, text: "Cut inference cost 38% via speculative chunk re-ranking and response caching." },
    { line: 6, text: "Hardened booking with Postgres advisory locks + optimistic versioning to kill double-writes." },
    { line: 7, text: "Mentored 4 engineers; introduced contract tests and load-testing gates in CI." },
  ],
};
