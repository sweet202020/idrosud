"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motionChangeEvent, motionIsEnabled } from "@/lib/motion-preference";

const targets =
  "main [data-reveal], main .section-header, main .category-card, main .feature-card, main .article-card, main .product-card, main .inner-hero h1, main .inner-intro, main .article-body > section, main .article-body > p, main .cta-row, main .media, main .story-chapter, main .team-profile, main .about-manifesto, main .company-grid > div, main .contact-info > div, main .contact-form, main .product-list, main .accordion details, main .article-next-step, main .lead";

export function ScrollExperience() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tracked = new Set<HTMLElement>();
    const shown = new Set<HTMLElement>();
    const enabled = () =>
      motionIsEnabled(preference.matches, root.dataset.motion);
    let observer: IntersectionObserver | undefined;
    let frame = 0,
      discoveryFrame = 0;
    let lastDiagnostic = "";
    const styles = getComputedStyle(root);
    const milliseconds = (value: string) =>
      parseFloat(value) * (value.trim().endsWith("ms") ? 1 : 1000);
    const stagger =
      milliseconds(styles.getPropertyValue("--stagger-step")) || 110;

    function prepareEntrance(node: HTMLElement) {
      const cards = node.matches(
        ".category-card, .feature-card, .article-card, .product-card, .team-profile",
      );
      const index = node.parentElement
        ? [...node.parentElement.children].indexOf(node)
        : 0;
      node.style.setProperty(
        "--reveal-delay",
        `${cards ? (Math.max(0, index) % 3) * stagger : 0}ms`,
      );
      node.classList.add("scroll-reveal-ready");
    }

    function reveal(node: HTMLElement, animate = true) {
      if (!animate || !enabled()) node.classList.remove("scroll-reveal-ready");
      if (shown.has(node)) return;
      shown.add(node);
      observer?.unobserve(node);
      node.classList.add("is-revealed");
    }

    function discover() {
      discoveryFrame = 0;
      for (const node of tracked) {
        if (!node.isConnected) {
          tracked.delete(node);
          shown.delete(node);
        }
      }
      const candidates = [...document.querySelectorAll<HTMLElement>(targets)].filter(
        // Prefer individual blocks inside declarative section wrappers.
        (node) => !node.hasAttribute("data-reveal") || !node.querySelector(targets),
      );
      const candidateSet = new Set(candidates);
      candidates.forEach((node) => {
        if (tracked.has(node)) return;
        // A card or chapter owns its entrance; never fade its descendants again.
        for (let parent = node.parentElement; parent; parent = parent.parentElement) {
          if (candidateSet.has(parent)) return;
        }
        tracked.add(node);
        if (!enabled()) return;
        if (
          !observer ||
          node.getBoundingClientRect().top < window.innerHeight ||
          node.contains(document.activeElement)
        )
          reveal(node, false);
        else {
          prepareEntrance(node);
          observer.observe(node);
        }
      });
      scheduleScroll();
      if (process.env.NODE_ENV === "development") {
        const diagnostic = JSON.stringify({
          enabled: enabled(),
          systemReduced: preference.matches,
          override: root.dataset.motion || "system",
          mode: "reveal-on-entry",
          targets: tracked.size,
        });
        if (diagnostic !== lastDiagnostic) {
          lastDiagnostic = diagnostic;
          console.info("[IDROSUD motion]", diagnostic);
        }
      }
    }
    function scheduleDiscovery() {
      if (!discoveryFrame) discoveryFrame = requestAnimationFrame(discover);
    }
    function updateScroll() {
      frame = 0;
      if (!enabled()) return;
      const total = root.scrollHeight - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      root.style.setProperty("--scroll-progress", String(progress));
      root.style.setProperty("--scroll-turn", String(progress * 90) + "deg");
    }
    function scheduleScroll() {
      if (!frame && enabled()) frame = requestAnimationFrame(updateScroll);
    }
    function configure() {
      observer?.disconnect();
      root.classList.toggle("scroll-motion-enabled", enabled());
      observer =
        enabled() && "IntersectionObserver" in window
          ? new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) reveal(entry.target as HTMLElement);
                });
              },
              { threshold: 0, rootMargin: "0px 0px -18% 0px" },
            )
          : undefined;
      tracked.forEach((node) => {
        if (!enabled()) {
          node.classList.remove("scroll-reveal-ready");
          return;
        }
        if (!shown.has(node)) {
          if (observer) {
            if (node.getBoundingClientRect().top < window.innerHeight)
              reveal(node, false);
            else {
              prepareEntrance(node);
              observer.observe(node);
            }
          } else reveal(node, false);
        }
      });
      discover();
    }
    function onFocus(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) return;
      tracked.forEach((node) => {
        if (node.contains(event.target as HTMLElement)) {
          reveal(node, false);
        }
      });
    }
    configure();
    // Next.js can stream route content after this shared layout has mounted.
    // Observe inserted nodes so subsequent sections never miss registration.
    const mutations = new MutationObserver(scheduleDiscovery);
    mutations.observe(document.body, { childList: true, subtree: true });
    preference.addEventListener("change", configure);
    window.addEventListener(motionChangeEvent, configure);
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleDiscovery);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(discoveryFrame);
      preference.removeEventListener("change", configure);
      window.removeEventListener(motionChangeEvent, configure);
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleDiscovery);
      document.removeEventListener("focusin", onFocus);
      tracked.forEach((node) => {
        node.classList.remove("scroll-reveal-ready", "is-revealed");
        node.style.removeProperty("--reveal-delay");
      });
      document
        .querySelectorAll<HTMLElement>("[data-scroll-timeline]")
        .forEach((node) => node.style.removeProperty("--timeline-progress"));
      root.classList.remove("scroll-motion-enabled");
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--scroll-turn");
    };
  }, [pathname]);
  return (
    <div className="reading-progress" aria-hidden="true">
      <span />
    </div>
  );
}
