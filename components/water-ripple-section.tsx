"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motionChangeEvent, motionIsEnabled } from "@/lib/motion-preference";

type RippleOptions = {
  imageUrl: string;
  resolution: number;
  dropRadius: number;
  perturbance: number;
  interactive: boolean;
};
type RippleInstance = {
  ripples: (
    option: RippleOptions | string,
    ...args: (number | string | boolean)[]
  ) => RippleInstance;
};
type RippleLibrary = ((element: HTMLElement) => RippleInstance) & {
  fn: { ripples?: unknown };
};
declare global {
  interface Window {
    jQuery?: RippleLibrary;
  }
}
let enginePromise: Promise<RippleLibrary> | undefined;
function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error("Cannot load local ripple engine"));
    };
    document.head.appendChild(script);
  });
}
async function loadEngine() {
  if (window.jQuery?.fn.ripples) return window.jQuery;
  if (!enginePromise)
    enginePromise = (async () => {
      if (!window.jQuery) await loadScript("/vendor/jquery-3.7.1.min.js");
      await loadScript("/vendor/jquery.ripples-0.6.3.min.js");
      if (!window.jQuery?.fn.ripples)
        throw new Error("Ripple engine unavailable");
      return window.jQuery;
    })().catch((error) => {
      enginePromise = undefined;
      throw error;
    });
  return enginePromise;
}
function makeTexture(section: HTMLElement) {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 800;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  const styles = getComputedStyle(section),
    token = (name: string) => styles.getPropertyValue(name).trim();
  const gradient = context.createLinearGradient(0, 0, 1600, 800);
  gradient.addColorStop(0, token("--aqua-start"));
  gradient.addColorStop(1, token("--aqua-end"));
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1600, 800);
  // Local graphic texture makes the optical displacement visible without photography.
  for (let line = -12; line < 35; line++) {
    context.beginPath();
    for (let x = -100; x < 1700; x += 8) {
      const y =
        line * 38 +
        Math.sin(x / 185 + line * 0.27) * 65 +
        Math.sin(x / 76 + line * 0.65) * 12;
      if (x === -100) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.strokeStyle = token("--ink");
    context.globalAlpha = 0.12;
    context.lineWidth = 2;
    context.stroke();
    context.strokeStyle = token("--white");
    context.globalAlpha = 0.75;
    context.lineWidth = 1;
    context.stroke();
  }
  context.globalAlpha = 0.13;
  context.fillStyle = token("--ink");
  context.font = "500 250px Outfit, sans-serif";
  context.textAlign = "center";
  context.fillText("IDROSUD", 800, 600);
  context.globalAlpha = 1;
  return canvas.toDataURL("image/png");
}
// Enhance an existing block without adding sections or changing its content.
export function initializeWaterRipple(section: HTMLElement, pathname: string) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let instance: RippleInstance | undefined,
    visible = false,
    disposed = false,
    starting = false,
    timer: ReturnType<typeof setInterval> | undefined,
    dropIndex = 0;
  const enabled = () =>
    motionIsEnabled(
      preference.matches,
      document.documentElement.dataset.motion,
    );
  function stopRain() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }
  function drop() {
    if (!instance || !visible || !enabled() || document.hidden) return;
    const rect = section!.getBoundingClientRect();
    const x = [0.32, 0.65, 0.47, 0.78][dropIndex % 4],
      y = [0.48, 0.62, 0.32, 0.55][dropIndex % 4];
    dropIndex++;
    instance.ripples("drop", rect.width * x, rect.height * y, 30, 0.065);
  }
  async function reconcile() {
    if (disposed) return;
    stopRain();
    if (!enabled()) {
      instance?.ripples("hide");

      return;
    }
    if (!visible || document.hidden) {
      instance?.ripples("hide");
      return;
    }
    if (!instance && !starting) {
      starting = true;
      try {
        const $ = await loadEngine();
        await document.fonts.ready;
        if (disposed) return;
        const candidate = $(section!);
        candidate.ripples({
          imageUrl: makeTexture(section!),
          resolution: 512,
          dropRadius: 24,
          perturbance: 0.035,
          interactive: true,
        });
        instance = candidate;
        if (process.env.NODE_ENV === "development")
          console.info("[IDROSUD ripple] WebGL engine initialized", pathname);
        section!.querySelector("canvas")?.setAttribute("aria-hidden", "true");
      } catch (error) {
        if (process.env.NODE_ENV === "development")
          console.error(
            "[IDROSUD ripple]",
            error instanceof Error ? error.message : "Initialization failed",
          );

        return;
      } finally {
        starting = false;
      }
    }
    if (disposed || !instance) return;
    if (!visible || !enabled() || document.hidden) {
      instance.ripples("hide");
      return;
    }
    instance.ripples("show");
    instance.ripples("play");

    drop();
    timer = setInterval(drop, 1600);
  }
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
            void reconcile();
          },
          { threshold: 0.05 },
        )
      : undefined;
  if (observer) observer.observe(section);
  else {
    visible = true;
    void reconcile();
  }
  preference.addEventListener("change", reconcile);
  window.addEventListener(motionChangeEvent, reconcile);
  document.addEventListener("visibilitychange", reconcile);
  return () => {
    disposed = true;
    stopRain();
    observer?.disconnect();
    preference.removeEventListener("change", reconcile);
    window.removeEventListener(motionChangeEvent, reconcile);
    document.removeEventListener("visibilitychange", reconcile);
    instance?.ripples("destroy");
  };
}

export function WaterRippleAttachment() {
  const pathname = usePathname();
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const target = marker.current?.parentElement;
    if (target) return initializeWaterRipple(target, pathname);
  }, [pathname]);
  return <span ref={marker} hidden aria-hidden="true" />;
}
