import { Breadcrumbs, Eyebrow, Section } from "./ui";
export function InformationPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <Breadcrumbs title={title} />
          <Eyebrow>INFORMAZIONI SUL SITO</Eyebrow>
          <h1>{title}</h1>
        </div>
      </section>
      <Section className="article-body-section" waterEffect>
        <div className="article-body">{children}</div>
      </Section>
    </>
  );
}
