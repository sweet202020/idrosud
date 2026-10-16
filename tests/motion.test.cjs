const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

function compile(file) {
  return ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
}

function scrollHarness({
  reduced = false,
  supported = true,
  native = false,
} = {}) {
  let effect, intersection, mutation;
  const nodes = [],
    observed = new Set(),
    frames = new Map(),
    events = new Map();
  let nextFrame = 0,
    mutationDisconnected = false;
  class Element {
    constructor() {
      this.isConnected = true;
      this.values = new Map();
      this.classes = new Set();
      this.animations = [];
      this.style = {
        setProperty: (k, v) => this.values.set(k, v),
        removeProperty: (k) => this.values.delete(k),
      };
      this.classList = {
        add: (k) => this.classes.add(k),
        remove: (k) => this.classes.delete(k),
        toggle: (k, on) => (on ? this.classes.add(k) : this.classes.delete(k)),
      };
    }
    getBoundingClientRect() {
      return { top: 900, bottom: 1100, height: 200 };
    }
    matches() {
      return true;
    }
    hasAttribute() {
      return false;
    }
    querySelector() {
      return null;
    }
    contains(node) {
      return node === this;
    }
    animate(keyframes, options) {
      const animation = {
        keyframes,
        options,
        canceled: false,
        paused: false,
        pause() {
          this.paused = true;
        },
        play() {
          this.paused = false;
        },
        cancel() {
          this.canceled = true;
        },
      };
      this.animations.push(animation);
      return animation;
    }
  }
  class Observer {
    constructor(callback) {
      intersection = callback;
    }
    observe(node) {
      observed.add(node);
    }
    unobserve(node) {
      observed.delete(node);
    }
    disconnect() {
      observed.clear();
    }
  }
  class Mutations {
    constructor(callback) {
      mutation = callback;
    }
    observe() {}
    disconnect() {
      mutationDisconnected = true;
    }
  }
  const root = new Element();
  root.scrollHeight = 2800;
  root.dataset = {};
  const preference = {
    matches: reduced,
    addEventListener: (_, fn) => events.set("preference", fn),
    removeEventListener: () => events.delete("preference"),
  };
  const window = {
    innerHeight: 800,
    scrollY: 1000,
    matchMedia: () => preference,
    addEventListener: (k, fn) => events.set(k, fn),
    removeEventListener: (k) => events.delete(k),
  };
  if (supported) window.IntersectionObserver = Observer;
  const document = {
    documentElement: root,
    body: {},
    activeElement: null,
    querySelectorAll: (selector) =>
      selector === "[data-scroll-timeline]" ? [] : nodes,
    addEventListener: (k, fn) => events.set(k, fn),
    removeEventListener: (k) => events.delete(k),
  };
  const values = {
    "--reveal-duration": "1.1s",
    "--stagger-step": "110ms",
    "--reveal-distance": "56px",
    "--ease": "ease-out",
  };
  const output = {};
  const motion = {};
  new Function("exports", compile("lib/motion-preference.ts"))(motion);
  const deps = {
    exports: output,
    process: { env: { NODE_ENV: "test" } },
    require: (name) =>
      name === "react"
        ? {
            useEffect: (fn) => {
              effect = fn;
            },
          }
        : name === "next/navigation"
          ? { usePathname: () => "/" }
          : name === "@/lib/motion-preference"
            ? motion
            : { jsx: () => null },
    window,
    document,
    CSS: { supports: () => native },
    HTMLElement: Element,
    IntersectionObserver: Observer,
    MutationObserver: Mutations,
    requestAnimationFrame: (fn) => {
      frames.set(++nextFrame, fn);
      return nextFrame;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
    getComputedStyle: () => ({
      getPropertyValue: (name) => values[name] || "",
    }),
  };
  new Function(
    ...Object.keys(deps),
    compile("components/scroll-experience.tsx"),
  )(...Object.values(deps));
  output.ScrollExperience();
  const cleanup = effect();
  function flush() {
    while (frames.size) {
      const batch = [...frames.values()];
      frames.clear();
      batch.forEach((fn) => fn());
    }
  }
  return {
    nodes,
    observed,
    root,
    preference,
    events,
    Element,
    cleanup,
    flush,
    insert: () => mutation(),
    intersect: (node) => intersection([{ target: node, isIntersecting: true }]),
    mutationDisconnected: () => mutationDisconnected,
  };
}

test("scroll reveals register content streamed after layout mount", () => {
  const h = scrollHarness();
  assert.equal(h.observed.size, 0);
  const cards = [new h.Element(), new h.Element(), new h.Element()];
  cards.forEach((card) => {
    card.parentElement = { children: cards };
    h.nodes.push(card);
  });
  h.insert();
  h.flush();
  assert.equal(h.observed.size, 3);
  assert.ok(cards.every((card) => card.animations[0].paused));
  cards.forEach((card) => h.intersect(card));
  assert.ok(cards.every((card) => !card.animations[0].paused));
  assert.deepEqual(
    cards.map((c) => c.animations[0].options.delay),
    [0, 110, 220],
  );
  assert.equal(
    cards[0].animations[0].keyframes[0].transform,
    "translate3d(0,56px,0)",
  );
  assert.equal(cards[0].animations[0].options.duration, 1100);
  assert.equal(h.root.values.get("--scroll-progress"), "0.5");
  h.cleanup();
  assert.ok(cards.every((c) => c.animations[0].canceled));
  assert.equal(h.events.size, 0);
  assert.ok(h.mutationDisconnected());
});

test("keyboard focus and a changed reduced-motion preference cancel animations", () => {
  const h = scrollHarness();
  const card = new h.Element();
  h.nodes.push(card);
  h.insert();
  h.flush();
  h.intersect(card);
  h.events.get("focusin")({ target: card });
  assert.ok(card.animations[0].canceled);
  const second = new h.Element();
  h.nodes.push(second);
  h.insert();
  h.flush();
  h.intersect(second);
  h.preference.matches = true;
  h.events.get("preference")();
  assert.ok(second.animations[0].canceled);
  assert.ok(!h.root.classes.has("scroll-motion-enabled"));
  h.cleanup();
});

test("reduced motion or missing IntersectionObserver keeps late content visible", () => {
  for (const options of [{ reduced: true }, { supported: false }]) {
    const h = scrollHarness(options),
      card = new h.Element();
    h.nodes.push(card);
    h.insert();
    h.flush();
    assert.equal(card.animations.length, 0);
    assert.equal(h.observed.size, 0);
    h.cleanup();
  }
});

test("explicit opt-in re-enables motion even when the system requests reduced motion", () => {
  const h = scrollHarness({ reduced: true }),
    card = new h.Element();
  h.nodes.push(card);
  h.insert();
  h.flush();
  assert.equal(card.animations.length, 0);
  h.root.dataset.motion = "enabled";
  h.events.get("idrosud:motion-change")();
  h.intersect(card);
  assert.equal(card.animations.length, 1);
  assert.ok(h.root.classes.has("scroll-motion-enabled"));
  h.cleanup();
});

test("Chrome also uses entry-triggered reveals rather than scroll scrubbing", () => {
  const h = scrollHarness({ native: true }),
    card = new h.Element();
  h.nodes.push(card);
  h.insert();
  h.flush();
  h.intersect(card);
  assert.equal(card.animations.length, 1);
  h.cleanup();
});

test("reference ripple engine starts locally, drops waves and respects motion choices", async () => {
  let effect, intersection, state;
  const events = new Map(),
    timers = new Map(),
    calls = [];
  const root = { dataset: {} };
  const preference = {
    matches: false,
    addEventListener: (_, fn) => events.set("preference", fn),
    removeEventListener: () => events.delete("preference"),
  };
  const classes = new Set();
  const section = {
    classList: {
      add: (value) => classes.add(value),
      remove: (value) => classes.delete(value),
    },
    getBoundingClientRect: () => ({ width: 1200, height: 600 }),
    querySelector: () => ({ setAttribute() {} }),
  };
  class Observer {
    constructor(fn) {
      intersection = fn;
    }
    observe() {}
    disconnect() {}
  }
  const instance = {
    ripples(...args) {
      calls.push(args);
      return instance;
    },
  };
  const $ = () => instance;
  $.fn = { ripples: true };
  const context = {
    createLinearGradient: () => ({ addColorStop() {} }),
    fillRect() {},
    beginPath() {},
    moveTo() {},
    lineTo() {},
    stroke() {},
    fillText() {},
  };
  const output = {},
    motion = {};
  new Function("exports", compile("lib/motion-preference.ts"))(motion);
  const deps = {
    exports: output,
    require: (name) =>
      name === "react"
        ? {
            useEffect: (fn) => {
              effect = fn;
            },
            useRef: () => ({ current: section }),
            useState: () => [
              null,
              (value) => {
                state = value;
              },
            ],
          }
        : name === "next/navigation"
          ? { usePathname: () => "/" }
          : name === "@/lib/motion-preference"
            ? motion
            : { jsx: () => null, jsxs: () => null },
    window: {
      jQuery: $,
      matchMedia: () => preference,
      IntersectionObserver: Observer,
      addEventListener: (key, fn) => events.set(key, fn),
      removeEventListener: (key) => events.delete(key),
    },
    document: {
      documentElement: root,
      hidden: false,
      fonts: { ready: Promise.resolve() },
      createElement: () => ({
        getContext: () => context,
        toDataURL: () => "data:image/png;base64,LOCAL",
      }),
      addEventListener: (key, fn) => events.set(key, fn),
      removeEventListener: (key) => events.delete(key),
    },
    getComputedStyle: () => ({ getPropertyValue: () => "#b4eeee" }),
    IntersectionObserver: Observer,
    setInterval: (fn) => {
      timers.set(1, fn);
      return 1;
    },
    clearInterval: (id) => timers.delete(id),
  };
  new Function(
    ...Object.keys(deps),
    compile("components/water-ripple-section.tsx"),
  )(...Object.values(deps));
  const cleanup = output.initializeWaterRipple(section, "/");
  assert.equal(calls.length, 0);
  intersection([{ isIntersecting: true }]);
  await new Promise(setImmediate);
  assert.equal(calls[0][0].resolution, 512);
  assert.equal(calls[0][0].imageUrl, "data:image/png;base64,LOCAL");
  assert.ok(calls.some((call) => call[0] === "drop"));
  assert.equal(timers.size, 1);
  intersection([{ isIntersecting: false }]);
  assert.equal(timers.size, 0);
  preference.matches = true;
  events.get("preference")();
  assert.equal(calls.at(-1)[0], "hide");
  root.dataset.motion = "enabled";
  intersection([{ isIntersecting: true }]);
  await new Promise(setImmediate);
  assert.equal(timers.size, 1);
  cleanup();
  assert.equal(timers.size, 0);
  assert.equal(events.size, 0);
  assert.equal(calls.at(-1)[0], "destroy");
});
