"use client";
import { useEffect, useState } from "react";
import { motionChangeEvent, motionIsEnabled } from "@/lib/motion-preference";

export function MotionToggle() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    try {
      const saved = localStorage.getItem("idrosud-motion");
      if (saved === "enabled" || saved === "reduced")
        document.documentElement.dataset.motion = saved;
    } catch {
      /* Storage can be unavailable; the control still works for this visit. */
    }
    const update = () =>
      setEnabled(
        motionIsEnabled(
          preference.matches,
          document.documentElement.dataset.motion,
        ),
      );
    update();
    window.dispatchEvent(new Event(motionChangeEvent));
    preference.addEventListener("change", update);
    window.addEventListener(motionChangeEvent, update);
    return () => {
      preference.removeEventListener("change", update);
      window.removeEventListener(motionChangeEvent, update);
    };
  }, []);
  function toggle() {
    const mode = enabled ? "reduced" : "enabled";
    document.documentElement.dataset.motion = mode;
    try {
      localStorage.setItem("idrosud-motion", mode);
    } catch {
      /* Session-only preference. */
    }
    window.dispatchEvent(new Event(motionChangeEvent));
  }
  if (enabled === null) return null;
  return (
    <button
      type="button"
      className="motion-toggle"
      onClick={toggle}
      aria-pressed={enabled}
      style={{display: "none" }}
    >
    </button>
  );
}
