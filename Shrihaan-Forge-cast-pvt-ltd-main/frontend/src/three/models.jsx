import * as THREE from 'three';

// Metal palettes sampled from catalogue photography
export const GALV = '#c3c9cf';
export const GALV_DARK = '#9aa2ab';
export const ZINC = '#d7dce1';
export const CAST = '#8f979e';
export const YELLOW = '#e9a820';
export const PROP_RED = '#a5271b';
export const STEEL_DARK = '#6b7280';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

// tube between two points
function tube(a, b, r, c = GALV, extra = {}) {
  const va = V(...a);
  const vb = V(...b);
  const dir = vb.clone().sub(va);
  const len = dir.length();
  const q = new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), dir.clone().normalize());
  const mid = va.clone().add(vb).multiplyScalar(0.5);
  return { t: 'cyl', a: [r, r, len, 20], p: mid.toArray(), q: [q.x, q.y, q.z, q.w], c, ...extra };
}

const cyl = (rt, rb, h, p, c = GALV, extra = {}) => ({ t: 'cyl', a: [rt, rb, h, 24], p, c, ...extra });
const box = (w, h, d, p, c = GALV, extra = {}) => ({ t: 'box', a: [w, h, d], p, c, ...extra });
const torus = (r, t2, arc, p, rot = [0, 0, 0], c = GALV, extra = {}) => ({ t: 'torus', a: [r, t2, 12, 32, arc], p, r: rot, c, ...extra });
const hex = (r, h, p, c = CAST, extra = {}) => ({ t: 'cyl', a: [r, r, h, 6], p, c, rough: 0.5, ...extra });
const sphere = (r, p, c = GALV, extra = {}) => ({ t: 'sphere', a: [r, 20, 20], p, c, ...extra });

const builders = {
  ringlockVertical: ({ len = 2.0, rings = 4 } = {}) => {
    const parts = [
      cyl(0.045, 0.045, len, [0, len / 2, 0]),
      cyl(0.026, 0.034, 0.3, [0, len + 0.13, 0], GALV_DARK, { ex: [0, 0.55, 0] }),
    ];
    for (let i = 0; i < rings; i++) {
      const y = 0.35 + i * 0.5;
      if (y > len - 0.1) break;
      parts.push(cyl(0.125, 0.125, 0.024, [0, y, 0], GALV, { ex: [0, 0.2 + i * 0.12, 0] }));
      parts.push(torus(0.125, 0.008, Math.PI * 2, [0, y + 0.014, 0], [Math.PI / 2, 0, 0], GALV_DARK, { ex: [0, 0.2 + i * 0.12, 0] }));
    }
    return { parts, fit: len + 0.3, explode: true };
  },

  ledger: ({ len = 1.5 } = {}) => ({
    parts: [
      tube([-len / 2, 0.05, 0], [len / 2, 0.05, 0], 0.024),
      box(0.05, 0.1, 0.13, [-len / 2 - 0.02, 0.07, 0], CAST, { ex: [-0.35, 0, 0] }),
      box(0.05, 0.1, 0.13, [len / 2 + 0.02, 0.07, 0], CAST, { ex: [0.35, 0, 0] }),
      box(0.02, 0.05, 0.06, [-len / 2 - 0.05, 0.11, 0], GALV_DARK, { ex: [-0.5, 0.1, 0] }),
      box(0.02, 0.05, 0.06, [len / 2 + 0.05, 0.11, 0], GALV_DARK, { ex: [0.5, 0.1, 0] }),
    ],
    fit: 0.4, len, explode: true, horizontal: true,
  }),

  doubleLedger: ({ len = 1.5 } = {}) => ({
    parts: [
      tube([-len / 2, 0.02, -0.045], [len / 2, 0.02, -0.045], 0.024),
      tube([-len / 2, 0.02, 0.045], [len / 2, 0.02, 0.045], 0.024),
      box(0.06, 0.1, 0.2, [-len / 2 - 0.02, 0.05, 0], CAST, { ex: [-0.35, 0, 0] }),
      box(0.06, 0.1, 0.2, [len / 2 + 0.02, 0.05, 0], CAST, { ex: [0.35, 0, 0] }),
    ],
    fit: 0.4, len, explode: true, horizontal: true,
  }),

  brace: ({ len = 1.7 } = {}) => ({
    parts: [
      tube([-len / 2, 0, 0], [len / 2, 0, 0], 0.02),
      cyl(0.012, 0.028, 0.09, [-len / 2 - 0.04, 0, 0], CAST, { r: [0, 0, Math.PI / 2], ex: [-0.3, 0, 0] }),
      cyl(0.012, 0.028, 0.09, [len / 2 + 0.04, 0, 0], CAST, { r: [0, 0, Math.PI / 2], ex: [0.3, 0, 0] }),
    ],
    fit: 0.35, len, explode: true, horizontal: true,
  }),

  baseCollar: () => ({
    parts: [
      cyl(0.05, 0.05, 0.34, [0, 0.17, 0]),
      cyl(0.125, 0.125, 0.025, [0, 0.14, 0], GALV, { ex: [0, 0.25, 0] }),
      torus(0.125, 0.008, Math.PI * 2, [0, 0.155, 0], [Math.PI / 2, 0, 0], GALV_DARK, { ex: [0, 0.25, 0] }),
    ],
    fit: 0.4, explode: true,
  }),

  rosette: () => {
    const parts = [
      cyl(0.13, 0.13, 0.025, [0, 0.4, 0]),
      cyl(0.055, 0.055, 0.03, [0, 0.4, 0], STEEL_DARK),
    ];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      parts.push(box(0.028, 0.028, 0.012, [Math.cos(a) * 0.115, 0.4, Math.sin(a) * 0.115], STEEL_DARK, { r: [0, -a, 0] }));
    }
    return { parts, fit: 0.3 };
  },

  wedge: () => ({
    parts: [box(0.22, 0.055, 0.04, [0, 0.3, 0], GALV, { r: [0, 0, 0.12] }), cyl(0.02, 0.02, 0.05, [-0.09, 0.32, 0], GALV_DARK)],
    fit: 0.25,
  }),

  spigot: () => ({
    parts: [
      cyl(0.032, 0.032, 0.42, [0, 0.21, 0]),
      torus(0.042, 0.01, Math.PI * 2, [0, 0.21, 0], [Math.PI / 2, 0, 0], GALV_DARK),
    ],
    fit: 0.45,
  }),

  cuplockVertical: ({ len = 2.0, nodes = 4 } = {}) => {
    const parts = [cyl(0.048, 0.048, len, [0, len / 2, 0]), cyl(0.028, 0.036, 0.26, [0, len + 0.11, 0], GALV_DARK, { ex: [0, 0.5, 0] })];
    for (let i = 0; i < nodes; i++) {
      const y = 0.35 + i * 0.5;
      if (y > len - 0.15) break;
      parts.push(cyl(0.1, 0.082, 0.1, [0, y, 0], GALV, { ex: [0, 0.18 + i * 0.1, 0] }));
      parts.push(cyl(0.085, 0.1, 0.085, [0, y + 0.13, 0], GALV_DARK, { ex: [0, 0.3 + i * 0.1, 0] }));
    }
    return { parts, fit: len + 0.25, explode: true };
  },

  cuplockLedger: ({ len = 1.5 } = {}) => ({
    parts: [
      tube([-len / 2, 0.05, 0], [len / 2, 0.05, 0], 0.024),
      box(0.02, 0.11, 0.13, [-len / 2 - 0.01, 0.06, 0], CAST, { r: [0, 0, -0.35], ex: [-0.3, 0, 0] }),
      box(0.02, 0.11, 0.13, [len / 2 + 0.01, 0.06, 0], CAST, { r: [0, 0, 0.35], ex: [0.3, 0, 0] }),
    ],
    fit: 0.35, len, explode: true, horizontal: true,
  }),

  transom: ({ len = 1.3 } = {}) => ({
    parts: [
      box(len, 0.055, 0.065, [0, 0.05, 0]),
      box(0.05, 0.1, 0.09, [-len / 2 - 0.02, 0.06, 0], CAST, { ex: [-0.3, 0, 0] }),
      box(0.05, 0.1, 0.09, [len / 2 + 0.02, 0.06, 0], CAST, { ex: [0.3, 0, 0] }),
    ],
    fit: 0.35, len, explode: true, horizontal: true,
  }),

  boardBracket: () => ({
    parts: [
      tube([-0.35, 0.75, 0], [0.45, 0.75, 0], 0.022),
      tube([-0.35, 0.02, 0], [-0.35, 0.75, 0], 0.022),
      tube([-0.35, 0.05, 0], [0.42, 0.72, 0], 0.018, GALV_DARK),
      box(0.05, 0.12, 0.06, [-0.37, 0.82, 0], CAST),
      box(0.05, 0.12, 0.06, [0.46, 0.7, 0], CAST),
    ],
    fit: 0.9,
  }),

  cup: () => ({
    parts: [
      cyl(0.1, 0.082, 0.1, [0, 0.35, 0], GALV),
      torus(0.1, 0.01, Math.PI * 2, [0, 0.4, 0], [Math.PI / 2, 0, 0], GALV_DARK),
      cyl(0.05, 0.05, 0.03, [0, 0.31, 0], STEEL_DARK),
    ],
    fit: 0.25,
  }),

  guardRail: ({ h = 1.0 } = {}) => ({
    parts: [
      cyl(0.021, 0.021, h, [0, h / 2, 0]),
      torus(0.035, 0.009, Math.PI, [0.04, h * 0.85, 0], [0, 0, -Math.PI / 2]),
      torus(0.035, 0.009, Math.PI, [0.04, h * 0.5, 0], [0, 0, -Math.PI / 2]),
      box(0.02, 0.1, 0.06, [0, 0.03, 0], GALV_DARK),
    ],
    fit: h,
  }),

  stripClamp: () => ({
    parts: [
      box(0.54, 0.006, 0.04, [0, 0.3, 0], ZINC),
      torus(0.05, 0.008, Math.PI, [0.29, 0.3, 0], [0, Math.PI / 2, 0], ZINC),
    ],
    fit: 0.2, horizontal: true,
  }),

  kwikstageVertical: ({ len = 2.0, nodes = 4 } = {}) => {
    const parts = [cyl(0.048, 0.048, len, [0, len / 2, 0]), cyl(0.028, 0.036, 0.26, [0, len + 0.11, 0], GALV_DARK, { ex: [0, 0.5, 0] })];
    for (let i = 0; i < nodes; i++) {
      const y = 0.35 + i * 0.5;
      if (y > len - 0.15) break;
      parts.push(box(0.13, 0.05, 0.025, [0, y, 0.06], GALV, { r: [0.6, 0, 0], ex: [0, 0.2 + i * 0.1, 0.15] }));
      parts.push(box(0.13, 0.05, 0.025, [0, y, -0.06], GALV, { r: [-0.6, 0, 0], ex: [0, 0.2 + i * 0.1, -0.15] }));
    }
    return { parts, fit: len + 0.25, explode: true };
  },

  ladder: ({ h = 1.5, w = 0.42, rungs = 5 } = {}) => {
    const parts = [
      cyl(0.02, 0.02, h, [-w / 2, h / 2, 0]),
      cyl(0.02, 0.02, h, [w / 2, h / 2, 0]),
    ];
    for (let i = 1; i <= rungs; i++) {
      parts.push(tube([-w / 2, (i * h) / (rungs + 1), 0], [w / 2, (i * h) / (rungs + 1), 0], 0.014, GALV_DARK));
    }
    return { parts, fit: h };
  },

  gate: () => {
    const parts = [
      tube([-0.45, 0, 0], [-0.45, 0.85, 0], 0.02),
      tube([0.45, 0, 0], [0.45, 0.85, 0], 0.02),
      tube([-0.45, 0.85, 0], [0.45, 0.85, 0], 0.02),
      tube([-0.45, 0.45, 0], [0.45, 0.45, 0], 0.02),
      tube([-0.45, 0.02, 0], [0.45, 0.02, 0], 0.02),
      cyl(0.016, 0.016, 0.85, [-0.15, 0.43, 0], GALV_DARK),
      cyl(0.016, 0.016, 0.85, [0.15, 0.43, 0], GALV_DARK),
    ];
    return { parts, fit: 0.95 };
  },

  twistLock: ({ h = 0.6 } = {}) => ({
    parts: [
      cyl(0.033, 0.033, h, [0, h / 2 + 0.05, 0]),
      cyl(0.02, 0.033, 0.09, [0, 0.06, 0], GALV_DARK),
      tube([-0.05, h + 0.06, 0], [0.05, h + 0.06, 0], 0.011, CAST),
    ],
    fit: h + 0.15,
  }),

  basePlate: ({ s = 0.15 } = {}) => ({
    parts: [
      box(s, 0.008, s, [0, 0.06, 0]),
      cyl(0.032, 0.036, 0.05, [0, 0.09, 0], GALV_DARK),
    ],
    fit: 0.15,
  }),

  jack: ({ head = 'flat', h = 0.6 } = {}) => {
    const parts = [
      box(0.15, 0.008, 0.15, [0, 0.004, 0], GALV, { ex: [0, -0.15, 0] }),
      cyl(0.024, 0.024, h, [0, h / 2 + 0.01, 0], ZINC, { rough: 0.25 }),
      hex(0.05, 0.07, [0, h * 0.62, 0], CAST, { ex: [0, 0.12, 0] }),
      box(0.17, 0.018, 0.018, [0, h * 0.62, 0], GALV_DARK, { ex: [0, 0.12, 0] }),
    ];
    const top = h + 0.02;
    if (head === 'uhead') {
      parts.push(box(0.11, 0.012, 0.075, [0, top + 0.03, 0], GALV, { ex: [0, 0.3, 0] }));
      parts.push(box(0.012, 0.07, 0.075, [-0.05, top + 0.07, 0], GALV, { ex: [0, 0.34, 0] }));
      parts.push(box(0.012, 0.07, 0.075, [0.05, top + 0.07, 0], GALV, { ex: [0, 0.34, 0] }));
    } else if (head === 'fork') {
      [[-0.035, -0.035], [0.035, -0.035], [-0.035, 0.035], [0.035, 0.035]].forEach(([x, z]) =>
        parts.push(box(0.013, 0.1, 0.013, [x, top + 0.05, z], GALV, { ex: [0, 0.34, 0] }))
      );
    } else if (head === 'swivel') {
      parts.push(sphere(0.042, [0, top + 0.03, 0], GALV_DARK, { ex: [0, 0.28, 0] }));
      parts.push(box(0.15, 0.008, 0.15, [0, top + 0.075, 0], GALV, { ex: [0, 0.36, 0] }));
    } else {
      parts.push(cyl(0.03, 0.026, 0.05, [0, top + 0.02, 0], GALV_DARK, { ex: [0, 0.3, 0] }));
    }
    return { parts, fit: h + 0.2, explode: true };
  },

  prop: ({ duty = 'light' } = {}) => {
    const c = duty === 'light' ? YELLOW : duty === 'medium' ? PROP_RED : GALV;
    return {
      parts: [
        box(0.12, 0.008, 0.12, [0, 0.004, 0], c, { rough: 0.45, metal: 0.4, ex: [0, -0.15, 0] }),
        cyl(0.032, 0.032, 1.1, [0, 0.56, 0], c, { rough: 0.45, metal: 0.4 }),
        cyl(0.026, 0.026, 0.85, [0, 1.35, 0], ZINC, { ex: [0, 0.3, 0] }),
        hex(0.048, 0.06, [0, 1.06, 0], CAST, { ex: [0, 0.18, 0] }),
        box(0.15, 0.016, 0.016, [0, 1.06, 0], GALV_DARK, { ex: [0, 0.18, 0] }),
        box(0.12, 0.008, 0.12, [0, 1.78, 0], c, { rough: 0.45, metal: 0.4, ex: [0, 0.42, 0] }),
      ],
      fit: 1.85, explode: true,
    };
  },

  plank: ({ len = 1.57, w = 0.25, hooks = false } = {}) => {
    const parts = [
      box(len, 0.03, w, [0, 0.35, 0], ZINC, { rough: 0.4 }),
      box(len, 0.05, 0.014, [0, 0.36, w / 2 - 0.007], GALV_DARK),
      box(len, 0.05, 0.014, [0, 0.36, -w / 2 + 0.007], GALV_DARK),
    ];
    if (hooks) {
      parts.push(torus(0.05, 0.01, Math.PI, [-len / 2 - 0.02, 0.33, w / 4], [0, 0, Math.PI / 2], GALV_DARK, { ex: [-0.25, 0, 0] }));
      parts.push(torus(0.05, 0.01, Math.PI, [-len / 2 - 0.02, 0.33, -w / 4], [0, 0, Math.PI / 2], GALV_DARK, { ex: [-0.25, 0, 0] }));
      parts.push(torus(0.05, 0.01, Math.PI, [len / 2 + 0.02, 0.33, w / 4], [0, 0, Math.PI / 2], GALV_DARK, { ex: [0.25, 0, 0] }));
      parts.push(torus(0.05, 0.01, Math.PI, [len / 2 + 0.02, 0.33, -w / 4], [0, 0, Math.PI / 2], GALV_DARK, { ex: [0.25, 0, 0] }));
    }
    return { parts, fit: 0.35, len, explode: hooks, horizontal: true };
  },

  coupler: ({ kind = 'right' } = {}) => {
    const clampA = torus(0.062, 0.023, Math.PI * 1.45, [0, 0.35, 0], [0, 0, Math.PI * 0.78], ZINC, { ex: [-0.22, 0, 0] });
    const clampB =
      kind === 'swivel'
        ? torus(0.062, 0.023, Math.PI * 1.45, [0, 0.35, 0.001], [Math.PI / 2, 0, Math.PI * 0.28], ZINC, { ex: [0.22, 0, 0] })
        : torus(0.062, 0.023, Math.PI * 1.45, [0, 0.35, 0], [0, Math.PI / 2, Math.PI * 0.78], ZINC, { ex: [0.22, 0, 0] });
    return {
      parts: [
        clampA, clampB,
        cyl(0.014, 0.014, 0.07, [0.0, 0.35, 0.075], CAST, { r: [Math.PI / 2, 0, 0], ex: [0, 0, 0.2] }),
        hex(0.024, 0.02, [0, 0.35, 0.115], CAST, { r: [Math.PI / 2, 0, 0], ex: [0, 0, 0.28] }),
      ],
      fit: 0.35, explode: true,
    };
  },

  frameWalkThrough: ({ w = 1.2, h = 1.95 } = {}) => ({
    parts: [
      cyl(0.021, 0.021, h, [-w / 2, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      cyl(0.021, 0.021, h, [w / 2, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([-w / 2, h - 0.02, 0], [w / 2, h - 0.02, 0], 0.021, YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([-w / 2, h * 0.62, 0], [-w / 2 + 0.42, h * 0.62, 0], 0.018, YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([w / 2, h * 0.62, 0], [w / 2 - 0.42, h * 0.62, 0], 0.018, YELLOW, { rough: 0.5, metal: 0.3 }),
      cyl(0.012, 0.012, 0.1, [-w / 2, h * 0.75, 0.03], GALV_DARK, { r: [Math.PI / 2, 0, 0] }),
      cyl(0.012, 0.012, 0.1, [w / 2, h * 0.75, 0.03], GALV_DARK, { r: [Math.PI / 2, 0, 0] }),
    ],
    fit: h,
  }),

  frameMason: ({ w = 1.5, h = 1.9 } = {}) => ({
    parts: [
      cyl(0.021, 0.021, h, [-w / 2, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      cyl(0.021, 0.021, h, [w / 2, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([-w / 2, h - 0.02, 0], [w / 2, h - 0.02, 0], 0.021, YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([-w / 2, h * 0.55, 0], [w / 2, h * 0.55, 0], 0.018, YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([-w / 2, h * 0.12, 0], [0, h * 0.4, 0], 0.016, YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([w / 2, h * 0.12, 0], [0, h * 0.4, 0], 0.016, YELLOW, { rough: 0.5, metal: 0.3 }),
    ],
    fit: h,
  }),

  frameLadder: ({ w = 0.76, h = 1.8 } = {}) => {
    const parts = [
      cyl(0.021, 0.021, h, [-w / 2, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      cyl(0.021, 0.021, h, [w / 2, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([-w / 2, h - 0.02, 0], [w / 2, h - 0.02, 0], 0.021, YELLOW, { rough: 0.5, metal: 0.3 }),
    ];
    for (let i = 1; i <= 4; i++) parts.push(tube([-w / 2, (i * h * 0.85) / 5, 0], [w / 2, (i * h * 0.85) / 5, 0], 0.015, YELLOW, { rough: 0.5, metal: 0.3 }));
    return { parts, fit: h };
  },

  frameDoubleLadder: ({ w = 1.5, h = 1.55 } = {}) => {
    const parts = [
      cyl(0.021, 0.021, h, [-w / 2, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      cyl(0.021, 0.021, h, [w / 2, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      cyl(0.021, 0.021, h, [0, h / 2, 0], YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([-w / 2, h - 0.02, 0], [w / 2, h - 0.02, 0], 0.021, YELLOW, { rough: 0.5, metal: 0.3 }),
      tube([-w / 2, h * 0.5, 0], [w / 2, h * 0.5, 0], 0.018, YELLOW, { rough: 0.5, metal: 0.3 }),
    ];
    [1, 2, 3].forEach((i) => {
      parts.push(tube([-w / 2, (i * h * 0.4) / 4, 0], [0, (i * h * 0.4) / 4, 0], 0.014, YELLOW, { rough: 0.5, metal: 0.3 }));
      parts.push(tube([0, (i * h * 0.4) / 4, 0], [w / 2, (i * h * 0.4) / 4, 0], 0.014, YELLOW, { rough: 0.5, metal: 0.3 }));
    });
    return { parts, fit: h };
  },

  crossBrace: ({ len = 1.8 } = {}) => ({
    parts: [
      tube([-len / 2, -0.35, 0], [len / 2, 0.35, 0], 0.017, YELLOW, { rough: 0.5, metal: 0.3, ex: [0, 0, 0.18] }),
      tube([-len / 2, 0.35, 0], [len / 2, -0.35, 0], 0.017, YELLOW, { rough: 0.5, metal: 0.3, ex: [0, 0, -0.18] }),
      cyl(0.02, 0.02, 0.06, [0, 0, 0], CAST, { r: [Math.PI / 2, 0, 0] }),
    ],
    fit: 0.85, len, explode: true, horizontal: true, lift: 0.45,
  }),

  tripod: () => ({
    parts: [
      torus(0.06, 0.018, Math.PI * 2, [0, 0.72, 0], [Math.PI / 2, 0, 0], GALV),
      tube([0, 0.7, 0], [0.3, 0, 0.18], 0.016),
      tube([0, 0.7, 0], [-0.3, 0, 0.18], 0.016),
      tube([0, 0.7, 0], [0, 0, -0.34], 0.016),
    ],
    fit: 0.8,
  }),

  propNut: () => ({
    parts: [hex(0.055, 0.08, [0, 0.3, 0], CAST), box(0.2, 0.02, 0.02, [0, 0.32, 0], GALV_DARK)],
    fit: 0.25,
  }),

  sleeve: () => ({ parts: [cyl(0.042, 0.042, 0.22, [0, 0.3, 0], GALV)], fit: 0.3 }),

  pin: () => ({
    parts: [
      cyl(0.011, 0.011, 0.14, [0, 0.3, 0], ZINC, { r: [0, 0, Math.PI / 2] }),
      torus(0.035, 0.009, Math.PI * 1.3, [0.09, 0.3, 0], [0, 0, Math.PI * 0.15], ZINC),
    ],
    fit: 0.15,
  }),

  forkHead: () => {
    const parts = [cyl(0.024, 0.024, 0.25, [0, 0.18, 0], ZINC)];
    [[-0.035, -0.035], [0.035, -0.035], [-0.035, 0.035], [0.035, 0.035]].forEach(([x, z]) =>
      parts.push(box(0.013, 0.11, 0.013, [x, 0.36, z], GALV, { ex: [0, 0.15, 0] }))
    );
    return { parts, fit: 0.45, explode: true };
  },

  casterWheel: () => ({
    parts: [
      torus(0.1, 0.035, Math.PI * 2, [0, 0.14, 0], [0, Math.PI / 2, 0], STEEL_DARK, { rough: 0.7, metal: 0.2 }),
      cyl(0.035, 0.035, 0.06, [0, 0.14, 0], GALV, { r: [0, 0, Math.PI / 2] }),
      box(0.02, 0.16, 0.09, [-0.045, 0.28, 0], GALV),
      box(0.02, 0.16, 0.09, [0.045, 0.28, 0], GALV),
      cyl(0.02, 0.02, 0.12, [0, 0.42, 0], ZINC),
    ],
    fit: 0.55,
  }),

  fitting: () => ({
    parts: [
      hex(0.05, 0.07, [0, 0.3, 0], CAST),
      box(0.05, 0.1, 0.03, [0, 0.38, 0], CAST),
      cyl(0.016, 0.016, 0.05, [0, 0.44, 0], GALV_DARK),
    ],
    fit: 0.3,
  }),
};

export const buildModel = (key, params) => {
  const b = builders[key];
  return b ? b(params) : null;
};
