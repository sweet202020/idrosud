import Link from "next/link";
import { company, sectors } from "@/content/site";
import { Arrow } from "./ui";
import { Logo } from "./header";
export { Header } from "./header";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p>Dove c’è acqua, ci siamo.</p>
          </div>
          <div>
            <p className="micro">ESPLORA</p>
            {sectors.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`}>
                {s.title}
              </Link>
            ))}
            <Link href="/chi-siamo">Chi siamo</Link>
          </div>
          <div>
            <p className="micro">TROVIAMOCI</p>
            <p>
              {company.address}
              <br />
              {company.city}
            </p>
            <a href="tel:+390832359673">{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <div>
            <p className="micro">RESTIAMO IN CONTATTO</p>
            <Link className="footer-contact" href="/contatti">
              Parliamone <Arrow diagonal />
            </Link>
            <Link href="/blog">Approfondimenti</Link>
          </div>
        </div>
        <div className="footer-word" aria-hidden="true">
          idrosud.
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 IDROSUD SRLS · P. IVA {company.vat} · REA {company.rea}
          </span>
          <div>
            <a href="/privacy-policy">Privacy Policy ↗</a>
            <a href="/cookie-policy">Cookie Policy ↗</a>
            <a href="#contenuto">Torna su ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
