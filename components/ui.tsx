import Link from "next/link";
import type { ReactNode } from "react";
import { WaterRippleAttachment } from "./water-ripple-section";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
export function Button({
  href,
  children,
  variant = "primary",
  type = "button",
  describedBy,
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "text";
  type?: "button" | "submit" | "reset";
  describedBy?: string;
}) {
  const content = (
    <>
      <span>{children}</span>
      <Arrow diagonal />
    </>
  );
  if (!href)
    return (
      <button
        type={type}
        className={`button button--${variant}`}
        aria-describedby={describedBy}
      >
        {content}
      </button>
    );
  return (
    <Link className={`button button--${variant}`} href={href}>
      {content}
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="small-dot" />
      {children}
    </p>
  );
}
export function Section({
  children,
  id,
  className = "",
  waterEffect = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  waterEffect?: boolean;
}) {
  return (
    <section
      id={id}
      className={`section ${className}${waterEffect ? " ripple-surface" : ""}`.trim()}
      data-water-ripple={waterEffect || undefined}
    >
      <div className="container">{children}</div>
      {waterEffect && <WaterRippleAttachment />}
    </section>
  );
}
export function SectionHeader({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {children && <div className="section-header-copy">{children}</div>}
    </div>
  );
}
export function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav className="breadcrumbs" aria-label="Percorso">
      <Link href="/">Home</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{title}</span>
    </nav>
  );
}
export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <article id={id} className={`card ${className}`.trim()}>
      {children}
    </article>
  );
}
export function MediaContainer({
  label,
  kind = "image",
  ratio = "landscape",
  className = "",
}: {
  label: string;
  kind?: "image" | "video";
  ratio?: "landscape" | "portrait" | "wide";
  className?: string;
}) {
  return (
    <div
      className={`media media--${ratio} ${className}`.trim()}
      role="img"
      aria-label={`Segnaposto ${kind === "video" ? "video" : "immagine"}: ${label}`}
    >
      <div className="media-corner corner-one" />
      <div className="media-corner corner-two" />
      <div className="media-label">
        <span className="media-symbol" aria-hidden="true">
          {kind === "video" ? "▷" : "▧"}
        </span>
        <span>
          <span className="micro">
            SEGNAPOSTO {kind === "video" ? "VIDEO" : "IMMAGINE"}
          </span>
          <span>{label}</span>
        </span>
      </div>
      <span className="media-index" aria-hidden="true">
        ID / {kind === "video" ? "MOTION" : "STILL"}
      </span>
    </div>
  );
}
export function ImagePlaceholder(
  props: Omit<Parameters<typeof MediaContainer>[0], "kind">,
) {
  return <MediaContainer {...props} kind="image" />;
}
export function VideoPlaceholder(
  props: Omit<Parameters<typeof MediaContainer>[0], "kind">,
) {
  return <MediaContainer {...props} kind="video" />;
}
export function CTASection({ waterEffect = false }: { waterEffect?: boolean }) {
  return (
    <Section className="cta-section" waterEffect={waterEffect}>
      <Eyebrow>IL PROSSIMO PASSO, INSIEME</Eyebrow>
      <div className="cta-row">
        <h2>
          Ogni esigenza.
          <br />
          La giusta <span>soluzione.</span>
        </h2>
        <div>
          <p>
            Un ricambio, un prodotto, un consiglio.
            <br />
            Partiamo da quello che ti serve.
          </p>
          <Button href="/contatti">Parliamone</Button>
        </div>
      </div>
    </Section>
  );
}
