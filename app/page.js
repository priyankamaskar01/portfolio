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

function useHoverCapable() {
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCapable(mq.matches);
    const handler = (e) => setCapable(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return capable;
}

// Whether cursor-driven effects (tilt, magnetic, spotlight) should run at all.
function usePointerFX() {
  const hoverCapable = useHoverCapable();
  const reduced = usePrefersReducedMotion();
  return hoverCapable && !reduced;
}

function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current || "system");
  }, []);

  function applyTheme(value) {
    const root = document.documentElement;
    if (value === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", value);
  }

  function toggle() {
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    const next = resolved === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle color theme" type="button">
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <span className="nav-logo">PM</span>
        <nav className="nav-links">
          <a className="nav-link" href="#work">
            Work
          </a>
          <a className="nav-link" href="#writing">
            Writing
          </a>
          <a className="nav-link" href="#contact">
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function Magnetic({ as: Tag = "a", className = "", children, ...props }) {
  const ref = useRef(null);
  const enabled = usePointerFX();

  function onMouseMove(e) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${(x * 0.25).toFixed(1)}px, ${(y * 0.35).toFixed(1)}px)`;
  }
  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }

  return (
    <Tag ref={ref} className={`magnetic ${className}`} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} {...props}>
      {children}
    </Tag>
  );
}

function Typewriter({ phrases, typingSpeed = 55, deletingSpeed = 28, pause = 1500 }) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    const current = phrases[phraseIndex % phrases.length];
    let timeout;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause, reduced]);

  return (
    <em>
      {text}
      <span className="cursor-blink">&nbsp;</span>
    </em>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const spotlightRef = useRef(null);
  const enabled = usePointerFX();

  function onMouseMove(e) {
    if (!enabled || !heroRef.current || !spotlightRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlightRef.current.style.setProperty("--mx", `${x}%`);
    spotlightRef.current.style.setProperty("--my", `${y}%`);
  }
  function onMouseEnter() {
    if (enabled && spotlightRef.current) spotlightRef.current.classList.add("active");
  }
  function onMouseLeave() {
    if (spotlightRef.current) spotlightRef.current.classList.remove("active");
  }

  return (
    <section
      ref={heroRef}
      className="hero-section"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="aurora" aria-hidden="true">
        <span className="aurora-blob a1" />
        <span className="aurora-blob a2" />
        <span className="aurora-blob a3" />
      </div>
      <div ref={spotlightRef} className="spotlight" aria-hidden="true" />

      <div className="hero-content mx-auto max-w-3xl px-6">
        <p className="hero-item font-mono text-sm uppercase tracking-wide text-muted">Priyanka Maskar</p>
        <h1 className="hero-item hero-headline font-display mt-4 text-4xl leading-tight text-ink sm:text-5xl">
          Building <Typewriter phrases={HERO_PHRASES} />
        </h1>
        {/* TODO: rewrite this in your own voice — 3-4 sentences, not the resume Summary copy-pasted */}
        <p className="hero-item mt-6 max-w-xl text-lg leading-8 text-muted">
          I own query understanding, multi-source retrieval, and retrieval trust for a headless,
          agentic-first system spanning servicing, technical support, and analytics across
          PayPal&rsquo;s global wallet network. 10+ years spanning product management and
          enterprise data engineering.
        </p>
        <div className="hero-item mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Magnetic className="btn-primary" href="/resume.pdf">
            Resume ↗
          </Magnetic>
          <Magnetic as="a" className="link-ghost" href="mailto:priyankamaskar@gmail.com">
            Email
          </Magnetic>
          <Magnetic as="a" className="link-ghost" href="https://linkedin.com/in/priyankamaskar">
            LinkedIn
          </Magnetic>
          {/* TODO: add GitHub + Substack links once you have the URLs handy */}
        </div>

        <div className="scroll-cue">
          <span className="font-mono text-xs uppercase tracking-wide text-muted">Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

const FOCUS_AREAS = [
  "Retrieval Systems",
  "Agentic AI",
  "Query Understanding",
  "Platform Strategy",
  "Data Engineering",
  "0→1 Product",
  "Developer Platforms",
];

function Marquee() {
  const items = [...FOCUS_AREAS, ...FOCUS_AREAS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-item" key={copy}>
            {items.map((item, i) => (
              <span key={`${copy}-${i}`}>
                {item} <span className="dot">●</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Reveal({ children, className = "", ...rest }) {
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
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`} {...rest}>
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

function TiltCard({ className = "", children }) {
  const ref = useRef(null);
  const enabled = usePointerFX();

  function onMouseMove(e) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-4px)`;
  }
  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      className={`case-card rounded-xl border border-custom bg-surface p-6 ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="font-mono text-sm text-ink">Dublin, CA</p>
          <p className="font-mono text-xs text-muted mt-1">Building the retrieval layer for PayPal World</p>
        </div>
        <div className="footer-socials">
          <Magnetic as="a" className="link-ghost" href="mailto:priyankamaskar@gmail.com">
            Email
          </Magnetic>
          <Magnetic as="a" className="link-ghost" href="https://linkedin.com/in/priyankamaskar">
            LinkedIn
          </Magnetic>
          {/* TODO: add GitHub + Substack links once you have the URLs handy */}
        </div>
      </div>
    </footer>
  );
}

const HERO_PHRASES = [
  "retrieval systems.",
  "agentic AI products.",
  "AI people can actually trust.",
  "on a decade of data engineering.",
];

export default function Home() {
  return (
    <>
      <Grain />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />

        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="py-24" id="work">
            <h2 className="font-display text-2xl text-ink">Selected work</h2>
            <div className="work-grid">
              <TiltCard className="featured">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-accent2">Information Retrieval</p>
                  <h3 className="font-display mt-2 text-xl text-ink">Retrieval quality &amp; evaluation</h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-muted">
                    Golden-query eval sets and consensus checks, keeping a RAG system trustworthy inside a codebase
                    that&rsquo;s AI-generated.
                  </p>
                </div>
                <div className="stat text-ink">
                  <CountUp value={95} suffix="–99%" />
                </div>
              </TiltCard>

              <TiltCard>
                <p className="font-mono text-xs uppercase tracking-wide text-accent2">AI-native PM tooling</p>
                <h3 className="font-display mt-2 text-xl text-ink">Team OS</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  A forkable{" "}
                  <span className="text-ink">
                    <CountUp value={50} suffix="+" />
                  </span>
                  -skill Claude Code toolkit acting as an AI chief-of-staff for a PM team — adopted across the
                  PayPal World org.
                </p>
              </TiltCard>

              <TiltCard>
                <p className="font-mono text-xs uppercase tracking-wide text-accent2">Growth &amp; platform</p>
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
              </TiltCard>
            </div>
            {/* TODO: turn each into its own page (situation / what you owned / approach / impact) — this is just the summary view for now */}
          </Reveal>

          <Reveal className="pb-24" id="writing">
            <h2 className="font-display text-2xl text-ink">Writing</h2>
            {/* TODO: swap in your real Substack URL, or fetch posts at build time from yourpub.substack.com/feed */}
            <p className="mt-4 text-muted">
              Latest posts on{" "}
              <Magnetic as="a" className="link-ghost" href="https://YOURPUBLICATION.substack.com">
                Substack
              </Magnetic>
              .
            </p>
          </Reveal>
        </div>

        <Footer />
      </main>
    </>
  );
}
