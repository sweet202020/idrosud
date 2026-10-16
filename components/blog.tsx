import Link from "next/link";
import { type Article, formatArticleDate } from "@/content/blog";
import { Arrow, Card, ImagePlaceholder } from "./ui";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card id={article.slug} className="article-card">
      <Link href={`/blog/${article.slug}`}>
        <ImagePlaceholder label={article.title} />
        <div className="article-copy">
          <p className="micro">
            {article.category} ·{" "}
            <time dateTime={article.date}>
              {formatArticleDate(article.date)}
            </time>
          </p>
          <h3>{article.title}</h3>
          <p className="article-excerpt">{article.description}</p>
          <span className="text-link">
            Leggi l’articolo <Arrow diagonal />
          </span>
        </div>
      </Link>
    </Card>
  );
}
export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
