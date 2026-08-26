export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-6 py-20 sm:py-28">
      {/* About */}
      <section className="mb-20">
        <p className="font-mono text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Priyanka Maskar
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Product leader building the retrieval & agentic-intelligence layer for PayPal World.
        </h1>
        {/* TODO: rewrite this in your own voice — 3-4 sentences, not the resume Summary copy-pasted */}
        <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          I own query understanding, multi-source retrieval, and retrieval trust for a headless,
          agentic-first system spanning servicing, technical support, and analytics across
          PayPal&rsquo;s global wallet network. 10+ years spanning product management and
          enterprise data engineering.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
          <a className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500" href="/resume.pdf">
            Resume
          </a>
          <a className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500" href="mailto:priyankamaskar@gmail.com">
            Email
          </a>
          <a className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500" href="https://linkedin.com/in/priyankamaskar">
            LinkedIn
          </a>
          {/* TODO: add GitHub + Substack links once you have the URLs handy */}
        </div>
      </section>

      {/* Selected work */}
      <section className="mb-20">
        <h2 className="mb-8 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
          Selected work
        </h2>
        <div className="flex flex-col gap-10">
          <CaseStudy
            fit="Best fit · Information Retrieval"
            title="Retrieval quality & evaluation"
            blurb="Golden-query eval sets and consensus checks, keeping a RAG system trustworthy inside a codebase that's ~95–99% AI-generated."
          />
          <CaseStudy
            fit="Best fit · your GitHub story"
            title="Team OS"
            blurb="A forkable, 50+ skill Claude Code toolkit that acts as an AI chief-of-staff for a PM team — adopted across the PayPal World org."
          />
          <CaseStudy
            fit="Best fit · growth metrics"
            title="Developer platform funnel"
            blurb="195 integrations, $1.5MM in long-tail revenue, conversion up from 22% to 55%+."
          />
        </div>
        {/* TODO: turn each into its own page (situation / what you owned / approach / impact) — this is just the summary view for now */}
      </section>

      {/* Writing */}
      <section className="mb-20">
        <h2 className="mb-4 text-xl font-semibold text-zinc-950 dark:text-zinc-50">Writing</h2>
        {/* TODO: swap in your real Substack URL, or fetch posts at build time from yourpub.substack.com/feed */}
        <p className="text-zinc-600 dark:text-zinc-400">
          Latest posts on{" "}
          <a className="underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500" href="https://YOURPUBLICATION.substack.com">
            Substack
          </a>
          .
        </p>
      </section>

      <footer className="font-mono text-sm text-zinc-500">Dublin, CA</footer>
    </main>
  );
}

function CaseStudy({ fit, title, blurb }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-amber-700 dark:text-amber-500">
        {fit}
      </p>
      <h3 className="mt-1 text-lg font-medium text-zinc-950 dark:text-zinc-50">{title}</h3>
      <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">{blurb}</p>
    </div>
  );
}
