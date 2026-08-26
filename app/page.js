"use client";

import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function CountUp({ value, decimals = 0, prefix = "", suffix = "", duration = 1200 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          function tick(now) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(eased * value);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          }
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-6 py-20 sm:py-28">
      {/* Hero / About */}
      <section className="mb-24">
        <p className="hero-item font-mono text-sm uppercase tracking-wide text-muted">
          Priyanka Maskar
        </p>
        <h1 className="hero-item font-display mt-4 text-4xl italic leading-tight text-ink sm:text-5xl">
          Building the retrieval &amp; agentic-intelligence layer for PayPal World.
        </h1>
        {/* TODO: rewrite this in your own voice — 3-4 sentences, not the resume Summary copy-pasted */}
        <p className="hero-item mt-6 max-w-xl text-lg leading-8 text-muted">
          I own query understanding, multi-source retrieval, and retrieval trust for a headless,
          agentic-first system spanning servicing, technical support, and analytics across
          PayPal&rsquo;s global wallet network. 10+ years spanning product management and
          enterprise data engineering.
        </p>
        <div className="hero-item mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <a
            className="text-accent underline decoration-current/30 underline-offset-4 hover:decoration-current"
            href="/resume.pdf"
          >
            Resume
          </a>
          <a
            className="text-accent underline decoration-current/30 underline-offset-4 hover:decoration-current"
            href="mailto:priyankamaskar@gmail.com"
          >
            Email
          </a>
          <a
            className="text-accent underline decoration-current/30 underline-offset-4 hover:decoration-current"
            href="https://linkedin.com/in/priyankamaskar"
          >
            LinkedIn
          </a>
          {/* TODO: add GitHub + Substack links once you have the URLs handy */}
        </div>
      </section>

      {/* Selected work */}
      <Reveal className="mb-24">
        <h2 className="font-display text-2xl italic text-ink">Selected work</h2>
        <div className="mt-8 flex flex-col gap-5">
          <div className="case-card rounded-xl border border-custom bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-accent">
              Information Retrieval
            </p>
            <h3 className="font-display mt-2 text-xl text-ink">
              Retrieval quality &amp; evaluation
            </h3>
            <p className="mt-2 leading-relaxed text-muted">
              Golden-query eval sets and consensus checks, keeping a RAG system trustworthy
              inside a codebase that&rsquo;s{" "}
              <span className="text-ink">
                <CountUp value={95} suffix="–99%" /> AI-generated
              </span>
              .
            </p>
          </div>

          <div className="case-card rounded-xl border border-custom bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-accent">
              AI-native PM tooling
            </p>
            <h3 className="font-display mt-2 text-xl text-ink">Team OS</h3>
            <p className="mt-2 leading-relaxed text-muted">
              A forkable{" "}
              <span className="text-ink">
                <CountUp value={50} suffix="+" />
              </span>
              -skill Claude Code toolkit that acts as an AI chief-of-staff for a PM team —
              adopted across the PayPal World org.
            </p>
          </div>

          <div className="case-card rounded-xl border border-custom bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-accent">
              Growth &amp; platform
            </p>
            <h3 className="font-display mt-2 text-xl text-ink">Developer platform funnel</h3>
            <p className="mt-2 leading-relaxed text-muted">
              <span className="text-ink">
                <CountUp value={195} />
              </span>{" "}
              integrations,{" "}
              <span className="text-ink">
                <CountUp value={1.5} decimals={1} prefix="$" suffix="MM" />
              </span>{" "}
              in long-tail revenue, conversion up from 22% to{" "}
              <span className="text-ink">
                <CountUp value={55} suffix="%+" />
              </span>
              .
            </p>
          </div>
        </div>
        {/* TODO: turn each into its own page (situation / what you owned / approach / impact) — this is just the summary view for now */}
      </Reveal>

      {/* Writing */}
      <Reveal className="mb-24">
        <h2 className="font-display text-2xl italic text-ink">Writing</h2>
        {/* TODO: swap in your real Substack URL, or fetch posts at build time from yourpub.substack.com/feed */}
        <p className="mt-4 text-muted">
          Latest posts on{" "}
          <a
            className="text-accent underline decoration-current/30 underline-offset-4 hover:decoration-current"
            href="https://YOURPUBLICATION.substack.com"
          >
            Substack
          </a>
          .
        </p>
      </Reveal>

      <footer className="font-mono text-sm text-muted">Dublin, CA</footer>
    </main>
  );
}
