export const CASE_STUDIES = [
  {
    slug: "agentic-platform",
    tag: "Agentic AI in Production",
    title: "PayPal World's agentic platform, 0→1",
    dek: "A headless, agentic-first console so internal teams can investigate a transaction, a dispute, or a system issue without hopping across four other tools.",
    stat: { value: "8", label: "specialist agents in production" },
    sections: {
      context:
        "PayPal World connects global wallet participants — WeChat, UPI, and others — through a single operational layer. The Admin and Participant Portals exist because participants and internal teams asked for them, not because of a top-down AI mandate.",
      problem:
        "Investigating a failed transaction, a dispute, or a balance question meant switching across Splunk, Datadog, BigQuery, and Jira — 4–5 tool switches and 1–2 hours a day of manual data assembly, by BizOps's own account.",
      strategy:
        "Go headless and agentic-first: no custom UI, just intelligence grounded in context, skills, and hooks. Built the orchestration on Google ADK rather than a single-model chatbot, after leading a competitive bake-off against the other contenders.",
      solution:
        "An orchestrator classifies each query's intent and routes it to one of 8 specialist agents — transactions, disputes, analytics, SRE, participant directory, Jira, docs/RAG, and cases. RBAC spans 8 roles with JWT re-validated at every layer, frontend to downstream APIs; PII is scrubbed before anything reaches the model; every tool call is logged as an auditable event. The model routes and explains — it never touches data or APIs directly.",
      execution:
        "Shipped the same context/skills/hooks architecture twice: once internally for the Admin Portal, then extended outward for the Participant Portal, used directly by network participants like WeChat and UPI.",
      results:
        "Daily use across BizOps, Risk, Finance, and Network Governance, working toward a 90% internal-workflow-adoption target.",
      invite:
        "Happy to walk through the specific agent boundaries and what got cut from v1 — that's easier in conversation than in a case study.",
    },
  },
  {
    slug: "retrieval-evaluation",
    tag: "Evaluation & Trust",
    title: "Making a 95–99% AI-generated system trustworthy",
    dek: "The evaluation layer that lets people actually rely on the agentic platform's answers — not just the agents that generate them.",
    stat: { value: "95–99%", label: "of the codebase is AI-generated" },
    sections: {
      context:
        "Almost the entire platform is AI-generated code. That's an efficiency story until an ungoverned retrieval layer confidently returns the wrong thing — mapping \"latency\" to the wrong metric, or \"corridor\" to a currency instead of a payment corridor.",
      problem:
        "Speed of generation and trustworthiness of output are two different problems, and only one of them was being solved by default.",
      strategy:
        "Treat evaluation as a first-class part of the build, not a QA pass at the end. Move system prompts into the retrieval layer itself instead of hardcoding them, so grounding is explicit and auditable.",
      solution:
        "A golden-query evaluation set, a consensus check — multiple passes that have to agree before an answer ships — and LLM-as-judge scoring layered on top of automated regression checks, run across two separate corpora: external developer docs and internal admin SOPs/runbooks.",
      execution:
        "Every answer comes back grounded and source-cited rather than freely generated, which is what makes the rest of the platform usable in a regulated payments environment.",
      results:
        "Retrieval errors get caught before a BizOps or Risk user ever sees them, rather than after.",
      invite:
        "I can share specific examples of errors the consensus check caught — ask me.",
    },
  },
  {
    slug: "p2p-payments",
    tag: "Payments Infrastructure",
    title: "Instant money movement between PayPal and Venmo",
    dek: "Took PayPal-to-Venmo transfers from pilot to production, then opened the first cross-border corridors.",
    stat: { value: "$101M+", label: "moved in the first ~120 days" },
    sections: {
      context:
        "PayPal and Venmo are both PayPal products but functioned as separate wallets, with no instant way to move money between them in either direction.",
      problem:
        "Customers holding both wallets had no fast path to move their own money — a gap for a company that owns both sides of it.",
      strategy:
        "Scope precisely and ship the core flow first: I owned wallet integrations for P2P and in-store checkout across PayPal–Venmo, PayPal–WeChat, and PayPal–UPI. Online checkout was in scope for the wider program but owned by another PM — not claimed here.",
      solution:
        "Led the product from pilot to production, enabling instant, bidirectional transfers between the two wallets.",
      execution:
        "Followed the domestic launch with cross-border corridors into Canada and the UK.",
      results:
        "$101M+ in payments in roughly 120 days at a 97% success rate; Venmo-originated volume drove 60%+ of the new international P2P traffic.",
      invite:
        "The corridor sequencing and what we deliberately held back from v1 are worth a conversation — ask me.",
    },
  },
  {
    slug: "developer-platform",
    tag: "Developer Platforms",
    title: "Turning fragmented partner docs into a funnel",
    dek: "Self-serve documentation and an integration funnel that took lead-to-conversion from 22% to 55%+.",
    stat: { value: "195", label: "integrations since 2023" },
    sections: {
      context:
        "Partner-facing documentation and process lived in pieces across GMS, Partnerships, Inside Sales, Marketing, DevRel, and engineering — nobody owned the whole developer journey.",
      problem:
        "Developers trying to integrate hit a fragmented, slow, support-ticket-heavy path instead of a self-serve one.",
      strategy:
        "Treat the documentation and the funnel as one product, owned end to end, rather than a docs project separate from a growth project.",
      solution:
        "Overhauled Connected/Managed Path documentation into a self-serve knowledge system and rebuilt the developer-portal lead-gen funnel alongside it.",
      execution:
        "Built and ran the partner developer strategy across all six functions that touch a developer's path to production.",
      results:
        "195 integrations since 2023, $1.5MM in long-tail revenue, a 73% gross transaction margin, integration cycles cut from 63 to 20 days, and lead-to-conversion up from 22% to 55%+.",
      invite:
        "Happy to get into which funnel changes actually moved the conversion number versus which just felt like they should.",
    },
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
