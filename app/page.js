import Link from "next/link";
import { Nav, Reveal, Footer } from "@/components/Site";
import { CASE_STUDIES } from "@/lib/case-studies";

const PROOF_POINTS = [
  { num: "$100M+", label: "moved through PayPal↔Venmo" },
  { num: "195", label: "integrations since 2023" },
  { num: "8", label: "production agents" },
  { num: "50+", label: "skills shipped as Team OS" },
];

const PRINCIPLES = [
  {
    title: "Build the evaluation before you ask anyone to trust the system.",
    why: "An agentic system that can't show its work doesn't get adopted, no matter how capable it is.",
    evidence:
      "Golden-query sets, consensus checks, and LLM-as-judge shipped alongside the agents themselves, not after.",
  },
  {
    title: "Decide platform choices with a bake-off, not a default.",
    why: "\"Agentic\" is a decision with real lock-in. It deserves the same rigor as any build-vs-buy call.",
    evidence: "Led the competitive analysis across contenders before committing to Vertex AI and Google ADK.",
  },
  {
    title: "Know precisely what's yours.",
    why: "Scope creep in a case study is the fastest way to lose credibility with a technical interviewer.",
    evidence:
      "Owned wallet integrations for P2P and in-store checkout across PayPal–Venmo, WeChat, and UPI. Online checkout was in scope for the wider program — owned by another PM, not claimed here.",
  },
  {
    title: "Turn a personal fix into a team system.",
    why: "The highest-leverage tools are the ones built to solve your own problem first.",
    evidence: "Team OS started inside PayPal's AI transformation work and is now forked by other PM teams.",
  },
];

const AGENTS = ["Transactions", "Disputes", "Analytics", "SRE", "Participants", "Jira", "Docs / RAG", "Cases"];

export default function Home() {
  const [featured, ...rest] = CASE_STUDIES;

  return (
    <>
      <Nav />
      <main>
        <section className="hero-section">
          <div className="mx-auto max-w-3xl px-6">
            <div className="eyebrow-row">
              <span className="status-dot" aria-hidden="true"></span>
              <p className="eyebrow">Priyanka Maskar · Lead Product Manager, PayPal World</p>
            </div>
            <h1 className="hero-headline mt-4 text-4xl sm:text-5xl">
              Shipping agentic AI into <span className="accent">production payments infrastructure.</span>
            </h1>
            {/* TODO: pass over this paragraph in your own voice */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              I own query understanding, multi-source retrieval, and retrieval trust for a headless,
              agentic-first system spanning servicing, technical support, and analytics across
              PayPal&rsquo;s global wallet network &mdash; and the evaluation infrastructure that keeps
              it trustworthy enough to run in production.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 proof-grid">
              {PROOF_POINTS.map((p) => (
                <div className="proof-item" key={p.label}>
                  <div className="num font-mono">{p.num}</div>
                  <div className="label">{p.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a className="btn-primary" href="#work">
                Explore my work
              </a>
              <a className="link-ghost" href="mailto:priyankamaskar@gmail.com">
                Connect
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="py-20" id="work">
            <p className="section-label">
              <span className="mark" aria-hidden="true">✳</span>Selected work
            </p>
            <h2 className="section-heading">Products shipped. Systems trusted.</h2>

            <Link href={`/work/${featured.slug}`} className="feature-card">
              <div className="feature-copy">
                <p className="tag">{featured.tag}</p>
                <h3>{featured.title}</h3>
                <p>{featured.dek}</p>
                <div className="feature-stat">
                  <span className="num font-mono">{featured.stat.value}</span>
                  <span className="label">{featured.stat.label}</span>
                </div>
                <span className="view-link">View case study →</span>
              </div>
              <div className="feature-visual" aria-hidden="true">
                <div className="agent-core">
                  <span>Orchestrator</span>
                  <small>intent → routing → evidence</small>
                </div>
                <div className="agent-grid">
                  {AGENTS.map((a) => (
                    <div key={a}>{a}</div>
                  ))}
                </div>
              </div>
            </Link>

            <div className="work-list">
              {rest.map((c) => (
                <Link key={c.slug} href={`/work/${c.slug}`} className="work-card">
                  <div className="work-card-top">
                    <div>
                      <p className="tag">{c.tag}</p>
                      <h3>{c.title}</h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="stat-num">{c.stat.value}</div>
                      <div className="stat-label">{c.stat.label}</div>
                    </div>
                  </div>
                  <p>{c.dek}</p>
                  <span className="view-link">View case study →</span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal className="py-20">
            <p className="section-label">
              <span className="mark" aria-hidden="true">✳</span>How I think about products
            </p>
            <h2 className="section-heading">Principles, not a playbook.</h2>
            <div className="mt-6">
              {PRINCIPLES.map((p) => (
                <div className="principle" key={p.title}>
                  <h3>{p.title}</h3>
                  <p className="why">{p.why}</p>
                  <p className="evidence">{p.evidence}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="py-20">
            <p className="section-label">
              <span className="mark" aria-hidden="true">✳</span>Experiments
            </p>
            <h2 className="section-heading">Things I built because I needed them</h2>
            <div className="work-list">
              <div className="work-card" style={{ cursor: "default" }}>
                <div className="work-card-top">
                  <div>
                    <p className="tag">AI-native team tooling</p>
                    <h3>Team OS</h3>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="stat-num">50+</div>
                    <div className="stat-label">skills</div>
                  </div>
                </div>
                <p>
                  A forkable toolkit of Claude Code skills, a team-context memory library, and built-in
                  expert-reviewer agents &mdash; started as a fix for my own team&rsquo;s PRD and spec review
                  cycle, now forked by other PayPal PM teams. First drafts went from 30+ minutes of editing
                  to ready-to-use, with an engineer/exec/skeptic review in about 60 seconds versus a roughly
                  two-week cross-functional cycle.
                </p>
              </div>

              <div className="work-card" style={{ cursor: "default" }}>
                <div className="work-card-top">
                  <div>
                    <p className="tag">Personal AI project · Concept</p>
                    <h3>Between</h3>
                  </div>
                </div>
                <p>
                  A private reflection agent for processing recurring conflict patterns &mdash; built to
                  help one partner notice what keeps happening before a disagreement turns into the same
                  old argument. Safety screening runs before anything resembling coaching, partner
                  participation is optional and consent-driven, and sensitive cases route to real support
                  resources rather than the agent&rsquo;s own advice. A concept and prototype, not a
                  clinical tool or a replacement for licensed care.
                </p>
                {/* TODO: this description is adapted from the brief you shared for this project —
                    please confirm the specifics (safety screening, consent flow, routing behavior) are
                    accurate before this goes live, and let me know if you'd like a link or a stronger
                    disclaimer line. */}
              </div>
            </div>
          </Reveal>

          <Reveal className="py-20" id="writing">
            <p className="section-label">
              <span className="mark" aria-hidden="true">✳</span>Writing
            </p>
            <h2 className="section-heading">Signals, Systems and Soul</h2>
            {/* TODO: swap in 2-4 specific post titles + links once you pick which ones to feature */}
            <p className="mt-4 text-muted">
              I write about AI and product on{" "}
              <a className="link-ghost" href="https://signalssystemssoul.substack.com">
                Substack
              </a>
              .
            </p>
          </Reveal>

          <Reveal className="py-20">
            <p className="section-label">
              <span className="mark" aria-hidden="true">✳</span>About
            </p>
            <h2 className="section-heading">Where this came from</h2>
            {/* TODO: this is a first draft — pass it for voice/accuracy before it's final */}
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Started in enterprise data: SQL and Oracle migrations for telecom systems with 5M+
              subscribers, before product felt like the obvious next step. Moved into product through
              GiftNow and Fast, shipping B2B platform features and a new gift-card revenue line. At
              PayPal, spent two years in developer experience &mdash; partner docs, integration funnels
              &mdash; before moving to PayPal World, where the questions got more technical: how do you
              let people move money across wallets that were never built to talk to each other, and how
              do you trust an AI system enough to let it touch that infrastructure. That&rsquo;s where the
              agentic platform and the evaluation program came from &mdash; not a mandate to &ldquo;do
              AI,&rdquo; but a real operational problem that needed an answer with evidence behind it.
              Currently building the agentic layer for PayPal World&rsquo;s Admin and Participant Portals,
              writing about AI and product on Substack, and interested in product roles where the
              technical bar is high and the AI is expected to actually work, not just demo well.
            </p>
          </Reveal>
        </div>

        <Footer />
      </main>
    </>
  );
}
