import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export default function ArticleLoading() {
  return (
    <div className="inner-hero article-hero">
      <div className="container">
        <Eyebrow>Blog</Eyebrow>
        <p className="lead" role="status">
          Caricamento dell’articolo…
        </p>
        <Link href="/blog">Torna al blog</Link>
      </div>
    </div>
  );
}
