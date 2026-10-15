"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";

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

export function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <NextLink className="nav-logo" href="/">
          PM
        </NextLink>
        <nav className="nav-links">
          <NextLink className="nav-link" href="/#work">
            Work
          </NextLink>
          <NextLink className="nav-link" href="/#writing">
            Writing
          </NextLink>
          <NextLink className="nav-link" href="/#contact">
            Contact
          </NextLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function Reveal({ children, className = "", ...rest }) {
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
      { threshold: 0.12 }
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

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="font-mono text-sm text-ink">Dublin, CA</p>
          <p className="font-mono text-xs text-muted mt-1">Building the agentic layer for PayPal World</p>
        </div>
        <div className="footer-socials">
          <a className="link-ghost" href="/resume.pdf">
            Resume
          </a>
          <a className="link-ghost" href="mailto:priyankamaskar@gmail.com">
            Email
          </a>
          <a className="link-ghost" href="https://linkedin.com/in/priyankamaskar">
            LinkedIn
          </a>
          <a className="link-ghost" href="https://signalssystemssoul.substack.com">
            Substack
          </a>
          <a className="link-ghost" href="https://github.com/priyankamaskar01/portfolio">
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}

export function BackLink() {
  return (
    <NextLink className="back-link" href="/#work">
      ← Back to work
    </NextLink>
  );
}
