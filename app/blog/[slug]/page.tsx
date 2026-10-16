import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, formatArticleDate } from "@/content/blog";
import { ArticleGrid } from "@/components/blog";
import {
  Button,
  Eyebrow,
  ImagePlaceholder,
  Section,
  SectionHeader,
} from "@/components/ui";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/blog/${slug}`,
      publishedTime: `${article.date}T12:00:00Z`,
      authors: ["IDROSUD"],
      section: article.category,
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const related = articles
    .filter((a) => a.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.sector === article.sector) -
        Number(a.sector === article.sector),
    )
    .slice(0, 2);
  return (
    <>
      <article>
        <header className="inner-hero article-hero">
          <div className="container">
            <nav className="breadcrumbs" aria-label="Percorso">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{article.category}</span>
            </nav>
            <Eyebrow>{article.category}</Eyebrow>
            <h1>{article.title}</h1>
            <p className="article-byline">
              IDROSUD ·{" "}
              <time dateTime={article.date}>
                {formatArticleDate(article.date)}
              </time>
            </p>
            <p className="lead">{article.description}</p>
            <ImagePlaceholder label={article.title} ratio="wide" />
          </div>
        </header>
        <Section className="article-body-section">
          <div className="article-body">
            {article.sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.points && (
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className="article-next-step">
              <h2>Approfondiamo insieme.</h2>
              <p>
                Per informazioni su prodotti e componenti, esplora le soluzioni
                o raccontaci la tua esigenza.
              </p>
              <div className="hero-actions">
                <Button href={`/${article.sector}`} variant="outline">
                  Le soluzioni del settore
                </Button>
                <Button href="/contatti">Contattaci</Button>
              </div>
            </div>
            <Button href="/blog" variant="text">
              Torna al blog
            </Button>
          </div>
        </Section>
      </article>
      <Section waterEffect>
        <SectionHeader
          label="CONTINUA LA LETTURA"
          title="Altri approfondimenti."
        />
        <ArticleGrid articles={related} />
      </Section>
    </>
  );
}
