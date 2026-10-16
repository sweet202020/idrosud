import { Breadcrumbs, Eyebrow, Section, SectionHeader } from "@/components/ui";
import { ArticleGrid } from "@/components/blog";
import { articles } from "@/content/blog";
export const metadata = {
  title: "Blog",
  description:
    "Il blog IDROSUD: approfondimenti su piscine, cura del verde, irrigazione e trattamento dell’acqua.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | IDROSUD",
    description: "Idee, cura e conoscenza per l’acqua e il verde.",
    url: "/blog",
  },
};
export default function Blog() {
  return (
    <>
      <section className="inner-hero blog-hero">
        <div className="container">
          <Breadcrumbs title="Blog" />
          <Eyebrow>IDEE, CURA E CONOSCENZA</Eyebrow>
          <h1>
            Andiamo
            <br />
            più a fondo.
          </h1>
          <div className="inner-intro">
            <p>
              Il blog IDROSUD: spunti e approfondimenti per conoscere l’acqua,
              prenderti cura della piscina e seguire il ritmo dei tuoi spazi
              verdi.
            </p>
          </div>
          <nav className="blog-topics" aria-label="Argomenti del blog">
            {[...new Set(articles.map((a) => a.category))].map((category) => (
              <a
                href={`#${articles.find((a) => a.category === category)!.slug}`}
                key={category}
              >
                {category} <span aria-hidden="true">↓</span>
              </a>
            ))}
          </nav>
        </div>
      </section>
      <Section className="blog-archive" waterEffect>
        <SectionHeader label="IL BLOG IDROSUD" title="Tutti gli articoli." />
        <ArticleGrid articles={articles} />
      </Section>
    </>
  );
}
