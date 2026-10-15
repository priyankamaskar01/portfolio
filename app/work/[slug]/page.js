import { notFound } from "next/navigation";
import { Nav, Reveal, Footer, BackLink } from "@/components/Site";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return { title: "Not found" };
  return {
    title: `${c.title} — Priyanka Maskar`,
    description: c.dek,
  };
}

const SECTION_ORDER = [
  ["context", "Context"],
  ["problem", "Problem"],
  ["strategy", "Strategy"],
  ["solution", "Solution"],
  ["execution", "Execution"],
  ["results", "Results"],
];

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  return (
    <>
      <Nav />
      <main>
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="py-16">
            <BackLink />
            <p className="section-label mt-6">{c.tag}</p>
            <h1 className="hero-headline mt-3 text-3xl sm:text-4xl">{c.title}</h1>
            <p className="mt-4 max-w-xl text-lg leading-7 text-muted">{c.dek}</p>
            <div className="detail-stat mt-7">
              <span className="num font-mono">{c.stat.value}</span>
              <span className="label">{c.stat.label}</span>
            </div>
          </Reveal>

          <Reveal className="pb-20">
            {SECTION_ORDER.map(([key, label]) => (
              <div className="case-section" key={key}>
                <p className="kicker">{label}</p>
                <p>{c.sections[key]}</p>
              </div>
            ))}
            {c.sections.invite && (
              <div className="invite-callout">
                <p>{c.sections.invite}</p>
              </div>
            )}
          </Reveal>
        </div>
        <Footer />
      </main>
    </>
  );
}
