"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { company, sectors } from "@/content/site";
import { Arrow, Button } from "./ui";
import logo from "../public/assets/logo_4.png";

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      aria-label="IDROSUD, homepage"
      className="logo"
      onClick={onNavigate}
    >
      <img width="160" src={logo.src} alt="IDROSUD" className="logo-img" />
    </Link>
  );
}

function SectorNavigation({
  onNavigate,
  pathname,
}: {
  onNavigate: () => void;
  pathname: string;
}) {
  return (
    <div className="nav-sectors">
      {sectors.map((sector) => (
        <Link
          className="nav-sector"
          href={`/${sector.slug}`}
          key={sector.slug}
          aria-current={pathname === `/${sector.slug}` ? "page" : undefined}
          onClick={onNavigate}
        >
          <span className="nav-sector-index">{sector.number}</span>
          <span className="nav-sector-copy">
            <span>{sector.title}</span>
            <span className="nav-sector-description">{sector.description}</span>
          </span>
          <Arrow diagonal />
        </Link>
      ))}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<"solutions" | "mobile" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const solutionToggle = useRef<HTMLButtonElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const solutions = useRef<HTMLDivElement>(null);
  const mobile = useRef<HTMLDivElement>(null);
  const close = () => setPanel(null);
  const inSector = sectors.some((sector) => pathname === `/${sector.slug}`);
  const isActive = (path: string) =>
    pathname === path || (path === "/blog" && pathname.startsWith("/blog/"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    const desktop = window.matchMedia("(min-width: 1001px)");
    const onResize = () => setPanel(null);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", onResize);
    };
  }, []);

  useEffect(() => {
    if (!panel) return;
    const previousOverflow = document.body.style.overflow;
    if (panel === "mobile") document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPanel(null);
        (panel === "mobile" ? mobileToggle : solutionToggle).current?.focus();
      }
      if (event.key === "Tab" && panel === "mobile") {
        const nodes = [
          ...header.current!.querySelectorAll<HTMLElement>(
            "a[href],button:not([disabled])",
          ),
        ].filter((node) => node.offsetParent !== null);
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [panel]);

  return (
    <>
      {panel && (
        <div className="nav-backdrop" aria-hidden="true" onClick={close} />
      )}
      <header
        ref={header}
        className="header"
        data-scrolled={scrolled}
        data-panel-open={panel !== null}
        onBlur={(event) => {
          if (
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            close();
        }}
      >
        <div className="header-inner">
          <div className="header-brand">
            <Logo onNavigate={close} />
            <span className="header-brand-caption">
              Acqua. Tecnologia.
              <br />
              Persone.
            </span>
          </div>
          <nav className="desktop-nav" aria-label="Navigazione principale">
            <button
              ref={solutionToggle}
              type="button"
              className="nav-solutions-toggle"
              data-active={inSector}
              aria-expanded={panel === "solutions"}
              aria-controls="solutions-menu"
              onClick={() =>
                setPanel(panel === "solutions" ? null : "solutions")
              }
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setPanel("solutions");
                  requestAnimationFrame(() =>
                    solutions.current?.querySelector("a")?.focus(),
                  );
                }
              }}
            >
              Soluzioni
              <span className="nav-plus" aria-hidden="true" />
            </button>
            <Link
              href="/chi-siamo"
              aria-current={isActive("/chi-siamo") ? "page" : undefined}
              onClick={close}
            >
              La nostra storia
            </Link>
            <Link
              href="/blog"
              aria-current={isActive("/blog") ? "page" : undefined}
              onClick={close}
            >
              Blog
            </Link>
          </nav>
          <div className="header-contact" onClick={close}>
            <Button href="/contatti">Parliamone</Button>
          </div>
          <button
            ref={mobileToggle}
            type="button"
            className="menu-toggle"
            aria-expanded={panel === "mobile"}
            aria-controls="mobile-menu"
            onClick={() => setPanel(panel === "mobile" ? null : "mobile")}
          >
            {panel === "mobile" ? "Chiudi" : "Menu"}
            <span className="menu-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
        <div
          ref={solutions}
          id="solutions-menu"
          className="nav-panel nav-solutions-panel"
          hidden={panel !== "solutions"}
        >
          <div className="nav-panel-heading">
            <span className="micro">UN ELEMENTO. TRE MONDI.</span>
            <Link href="/#soluzioni" onClick={close}>
              Tutte le soluzioni <Arrow />
            </Link>
          </div>
          <nav aria-label="Soluzioni IDROSUD">
            <SectorNavigation pathname={pathname} onNavigate={close} />
          </nav>
          <div className="nav-panel-footer">
            <span>Il tuo punto di riferimento a Lecce.</span>
            <a href={`mailto:${company.email}`}>
              {company.email}
              <Arrow diagonal />
            </a>
          </div>
        </div>
        <div
          ref={mobile}
          id="mobile-menu"
          className="nav-panel nav-mobile-panel"
          hidden={panel !== "mobile"}
        >
          <p className="micro nav-mobile-label">ESPLORA IDROSUD</p>
          <nav aria-label="Navigazione mobile">
            <SectorNavigation pathname={pathname} onNavigate={close} />
            <div className="nav-mobile-pages">
              {[
                { href: "/chi-siamo", label: "La nostra storia" },
                { href: "/blog", label: "Blog" },
                { href: "/contatti", label: "Parliamone" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={close}
                >
                  {link.label}
                  <Arrow diagonal />
                </Link>
              ))}
            </div>
          </nav>
          <div className="nav-panel-footer">
            <span>LECCE, PUGLIA</span>
            <a href={`mailto:${company.email}`}>
              {company.email}
              <Arrow diagonal />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
