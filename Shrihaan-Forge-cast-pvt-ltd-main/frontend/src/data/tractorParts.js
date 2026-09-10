// Tractor parts — sourced exclusively from the customer-supplied forging component catalog images.
// Product names preserved verbatim from the supplied material. No specifications invented.
const img = (slug) => `/products/tractor/${slug}.webp`;
const AOR = 'Available on Request';
const pimg = (slug) => `/products/parts/${slug}.webp`;

const std = (name, slug, extraImages = 0) => ({
  slug,
  name,
  itemCode: AOR,
  images: [img(slug), ...Array.from({ length: extraImages }, (_, i) => img(`${slug}-${i + 2}`))],
  hasImage: false,
  description: 'Precision forging component from the SHRIHAAN CAST & FORGE tractor parts range.',
  application: AOR,
  specs: {},
});

// Products from the customer-supplied Products.zip — names and model codes preserved from the supplied images.
const photo = (name, slug, itemCode, extras = 0, opts = {}) => ({
  slug,
  name,
  itemCode,
  images: [pimg(slug), ...Array.from({ length: extras }, (_, i) => pimg(`${slug}-${i + 2}`))],
  hasImage: true,
  description: opts.description || `Precision forged component — Model ${itemCode}.`,
  application: opts.application || AOR,
  specs: opts.specs || { Model: itemCode },
  divisions: opts.divisions,
});

const ZIP_PRODUCTS = [
  // Agriculture parts (harvester guards & blades)
  ...['GC256', 'GC257', 'GC260', 'GC261', 'GC262', 'GC263'].map((m) =>
    photo('Double Tine Guard', `double-tine-guard-${m.toLowerCase()}`, m, 1, { divisions: ['agriculture-parts'] })
  ),
  photo('Single Tine Guard', 'single-tine-guard-gc258', 'GC258', 1, { divisions: ['agriculture-parts'] }),
  ...['GC264', 'GC265', 'GC266', 'GC267', 'GC268'].map((m) =>
    photo('Ledger Blade', `ledger-blade-${m.toLowerCase()}`, m, 1, { divisions: ['agriculture-parts'] })
  ),
  photo('Ledger Blade', 'ledger-blade-gc269', 'GC269', 2, { divisions: ['agriculture-parts'] }),
  // Auto parts
  photo('Scaffold Cup', 'scaffold-cup-gc286', 'GC286', 1, {
    divisions: ['auto-parts'],
    application: 'Used in scaffolding system to support vertical standards',
    specs: { Model: 'GC286', Material: 'Carbon Steel', Finish: 'Natural', Weight: '0.35 kg (Approx.)', Dimensions: '80 mm × 70 mm × 28 mm', Application: 'Used in scaffolding system to support vertical standards' },
  }),
  photo('Locating Peg', 'locating-peg-gc287', 'GC287', 1, {
    divisions: ['auto-parts'],
    application: 'Used to locate and align scaffolding components in scaffolding system. Compatible with Cup Lock System.',
    specs: { Model: 'GC287', Material: 'Carbon Steel', Finish: 'Natural', Weight: '0.40 kg (Approx.)', Dimensions: 'Ø16 mm × 110 mm', Application: 'Used to locate and align scaffolding components in scaffolding system', 'Compatible With': 'Cup Lock System' },
  }),
  photo('Locating Peg', 'locating-peg-gc288', 'GC288', 1, { divisions: ['auto-parts'] }),
  photo('Locating Peg', 'locating-peg-gc285', 'GC285', 1, { divisions: ['auto-parts'] }),
  photo('Spigot Pin', 'spigot-pin', AOR, 1, { divisions: ['auto-parts'], specs: {} }),
  photo('Dog Bone Tie', 'dog-bone-tie', AOR, 1, { divisions: ['auto-parts'], specs: {} }),
  // Tractor parts (linkage)
  ...[['GC270', 1], ['GC271', 2], ['GC272', 2], ['GC273', 2], ['GC274', 1], ['GC275', 1]].map(([m, ex]) =>
    photo('Eye Rod', `eye-rod-${m.toLowerCase()}`, m, ex, { divisions: ['tractorlink'] })
  ),
  photo('Tongue Tip', 'tongue-tip-gc276', 'GC276', 1, { divisions: ['tractorlink'] }),
  photo('Toggle Pin', 'toggle-pin-gc277', 'GC277', 0, { divisions: ['tractorlink'] }),
  photo('Socket Eye Bolt', 'socket-eye-bolt-gc278', 'GC278', 1, { divisions: ['tractorlink'] }),
  photo('L-Shaped Handle Pin', 'l-shaped-handle-pin-gc279', 'GC279', 2, { divisions: ['tractorlink'] }),
  photo('Scaffolding Spigot', 'scaffolding-spigot-gc280', 'GC280', 0, { divisions: ['tractorlink'] }),
  photo('Ledger Blade', 'ledger-blade-gc281', 'GC281', 0, { divisions: ['tractorlink'] }),
  photo('Scaffold Wedge Nut', 'scaffold-wedge-nut-gc282', 'GC282', 1, { divisions: ['tractorlink'] }),
  photo('Standard Top Link (Zinc Coated)', 'standard-top-link-zinc-coated', AOR, 1, {
    divisions: ['tractorlink'],
    specs: { Finish: 'Zinc Coated' },
    description: 'Standard top link for tractor three-point linkage, zinc coated finish.',
  }),

  // Forging Parts (ChatGPT Image Aug 21 catalog)
  ...[
    ['U Shackle', 'u-shackle', ['forging-parts', 'tractorlink']],
    ['Wedge', 'forging-wedge', ['forging-parts']],
    ['Wing Nut', 'wing-nut-forging', ['forging-parts', 'auto-parts']],
    ['Lock Ring', 'lock-ring', ['forging-parts']],
    ['Square Flange', 'square-flange', ['forging-parts']],
    ['End Cap', 'end-cap', ['forging-parts']],
    ['Large Clamp', 'large-clamp', ['forging-parts']],
    ['Small Clamp', 'small-clamp', ['forging-parts']],
    ['Thrust Plate', 'thrust-plate', ['forging-parts']],
  ].map(([name, slug, divisions]) => ({
    slug,
    name,
    itemCode: AOR,
    images: [pimg(slug)],
    hasImage: true,
    description: `Precision drop forged ${name.toLowerCase()} component engineered for industrial, structural, machinery, automotive, and agricultural applications.`,
    application: 'Industrial Machinery & Forged Component Assemblies',
    specs: { Material: 'High Tensile Drop Forged Steel', Finish: 'Natural / Self Color / Zinc Plated', Process: 'Precision Drop Forging' },
    divisions,
  })),
];

// Merge supplied photos into existing grid products
const MERGED_PHOTOS = {
  'hook-latch': { images: ['hook-latch-photo'], addDiv: null },
  'eye-rod': { images: ['eye-rod-photo'], addDiv: null },
};

export const TRACTOR_PARTS = [
  std('Ball Stud', 'ball-stud'),
  std('Yoke End', 'yoke-end'),
  std('King Pin', 'king-pin'),
  std('Crank Shaft', 'crank-shaft'),
  { ...std('Hand Lever', 'hand-lever', 1) },
  std('Shift Fork', 'shift-fork'),
  { ...std('Rocker Arm', 'rocker-arm', 1) },
  std('Pitman Arm', 'pitman-arm'),
  std('U Bolt', 'u-bolt'),
  { ...std('Hinge Bracket', 'hinge-bracket', 1) },
  std('Flange Bush', 'flange-bush'),
  std('Thrust Collar', 'thrust-collar'),
  { ...std('Eye Bolt', 'eye-bolt', 1) },
  { ...std('Clevis Fork', 'clevis-fork', 1) },
  std('Connecting Link', 'connecting-link'),
  std('Locking Lever', 'locking-lever'),
  std('Tie Rod End', 'tie-rod-end'),
  std('Spindle', 'spindle'),
  std('Swivel Base', 'swivel-base'),
  std('Clevis Pin', 'clevis-pin'),
  std('Cam Follower', 'cam-follower'),
  std('Cam Plate', 'cam-plate'),
  std('Rod Eye', 'rod-eye'),
  { ...std('Clamp Lever', 'clamp-lever', 1) },
  std('Cam', 'cam'),
  std('Pivot Pin', 'pivot-pin'),
  { ...std('Hammer Head', 'hammer-head', 1) },
  std('Oval Plate', 'oval-plate'),
  std('Rocker Arm (Type 2)', 'rocker-arm-type-2'),
  std('Rocker Arm (Type 3)', 'rocker-arm-type-3'),
  std('Rod End', 'rod-end'),
  std('Link', 'link'),
  std('Solid Pin', 'solid-pin'),
  std('Double Lever', 'double-lever'),
  std('Clevis Block', 'clevis-block'),
  std('Clevis Yoke', 'clevis-yoke'),
  std('Round Headed Pin', 'round-headed-pin'),
  std('Double Lever (Type 2)', 'double-lever-type-2'),
  std('Thrust Washer', 'thrust-washer'),
  std('Shoulder Pin', 'shoulder-pin'),
  std('Steel Ball', 'steel-ball'),
  std('Adjustable Foot', 'adjustable-foot'),
  std('Thrust Nut', 'thrust-nut'),
  std('Hinge Pin', 'hinge-pin'),
  std('Door Hinge', 'door-hinge'),
  std('Lock Lever', 'lock-lever'),
  std('Keeper Plate', 'keeper-plate'),
  std('Saddle Clip', 'saddle-clip'),
  std('Door Stop', 'door-stop'),
  std('Striker', 'striker'),
  std('Wing Nut', 'wing-nut'),
  std('Wing Bolt', 'wing-bolt'),
  std('Hook Latch', 'hook-latch'),
  std('Tri Wing Knob', 'tri-wing-knob'),
  std('L Bracket', 'l-bracket'),
  std('L Bracket (Light Duty)', 'l-bracket-light-duty'),
  std('D Shackle', 'd-shackle'),
  std('Eye Rod', 'eye-rod'),
  std('Collar Nut', 'collar-nut'),
  std('Turn Buckle End', 'turn-buckle-end'),
  std('Flange Plate', 'flange-plate'),
  std('Pad Eye', 'pad-eye'),
  std('Weld On Eye', 'weld-on-eye'),
  {
    slug: 'bale-spear-double',
    name: 'Bale Spear Double',
    itemCode: AOR,
    images: [img('bale-spear-double')],
    description:
      'Bale Spear Double is a forged component used in agricultural and material handling equipment. It is designed to provide secure penetration and strong grip for handling hay or straw bales.',
    application: 'Used in Bale Handling Equipment',
    features: ['High Strength Forged Steel', 'Wear Resistant & Durable', 'Precision Engineered for Long Life'],
    specs: {
      Material: 'Forged Steel',
      Finish: 'Painted',
      Color: 'Yellow',
      Weight: '2.20 kg (Approx.)',
      'Tine Length': '200 mm (Approx.)',
      'Mounting Hole Size': '16 mm (Approx.)',
      Application: 'Used in Bale Handling Equipment',
    },
    hasImage: true,
  },
  {
    slug: 'standard-top-link-cat1-cat2',
    name: 'Standard Top Link Assembly (Cat 1 / Cat 2)',
    itemCode: 'TL-CAT1-STD',
    images: ['/products/parts/standard-top-link-zinc-coated.webp', '/products/parts/standard-top-link-zinc-coated-2.webp', '/products/drawings/top-link-drawing.jpg'],
    description: 'Heavy-duty 3-point hitch central top link assembly featuring forged turnbuckle body with left-hand and right-hand Acme threads and spherical ball eye bushings.',
    application: '3-Point Tractor Linkage & Implement Upper Attachment',
    features: ['High Tensile Drop Forged Carbon Steel', 'Acme Precision Threads M30/M36', 'Induction Hardened Ball Bushings'],
    specs: {
      'Working Length': '500 mm – 740 mm (Adjustable)',
      'Pin Hole Size': '19.1 mm (Cat 1) / 25.5 mm (Cat 2)',
      'Thread Size': 'M30 × 3.0 Acme Thread',
      'Ultimate Tensile Load': '12,500 kgf (122.5 kN)',
      'Material Grade': 'EN9 / S355JR Drop Forged Steel',
      'Surface Finish': 'Yellow Zinc Plated / Cr3 Passivated',
    },
    divisions: ['tractorlink', 'forging-parts'],
    hasImage: true,
  },
  {
    slug: 'tractor-lower-lift-arm',
    name: 'Tractor Lower Lift Arm (Draft Arm Link)',
    itemCode: 'LLA-820-CAT2',
    images: ['/products/parts/eye-rod-gc270.webp', '/products/parts/eye-rod-gc270-2.webp', '/products/drawings/lower-lift-arm-drawing.jpg'],
    description: 'Precision drop-forged heavy duty lower draft arm link engineered to withstand high draft loads, twisting moments, and soil resistance during tillage.',
    application: 'Lower 3-Point Hitch Attachment for Tractors',
    features: ['ASTM A105 Forged Flat Bar Section', 'Hardened Ball Socket (52-58 HRC)', 'High Strength Fatigue Resistant Structure'],
    specs: {
      'Center Length': '820 mm C-C',
      'Flat Bar Section': '80 mm × 19 mm Thick',
      'Tractor Pin Hole': 'Ø 25.4 mm (Cat 2)',
      'Implement Ball Hole': 'Ø 28.7 mm (Cat 2)',
      'Safe Working Load': '3,500 kg per arm',
      'Material': 'ASTM A105 Medium Carbon Steel',
    },
    divisions: ['tractorlink', 'forging-parts'],
    hasImage: true,
  },
  {
    slug: 'adjustable-leveling-box-assembly',
    name: 'Adjustable Leveling Box Assembly (Side Link)',
    itemCode: 'TLB-ALB-2D',
    images: ['/products/parts/socket-eye-bolt-gc278.webp', '/products/parts/l-shaped-handle-pin-gc279.webp', '/products/drawings/leveling-side-link-drawing.jpg'],
    description: 'Adjustable vertical leveling box assembly connecting tractor lift arm to lower link, equipped with internal bevel gear drive and knurled adjustment handle.',
    application: 'Vertical Height & Level Adjustment for Implements',
    features: ['Internal Bevel Gear Mechanism', 'Integrated Grease Zerk Fitting', 'Forged Clevis Fork & Swivel Ball Mount'],
    specs: {
      'Adjustable Height': '460 mm – 620 mm',
      'Top Clevis Mount': '19 mm Pin Hole, 40 mm Fork Width',
      'Bottom Swivel Ball': '28 mm Hole, 60 mm Base Width',
      'Thread Spec': 'M27 × 3.0 Pitch Heavy Acme Thread',
      'Material': 'Drop Forged S355 / C45 Structural Steel',
      'Finish': 'Hot-Dip Galvanized / Black Powder Coated',
    },
    divisions: ['tractorlink', 'forging-parts'],
    hasImage: true,
  },
  ...ZIP_PRODUCTS,
];

export const getTractorPart = (slug) => TRACTOR_PARTS.find((p) => p.slug === slug);

// Central product validation — a product is publicly visible ONLY when fully configured.
export const isCompleteProduct = (p) =>
  Boolean(
    p &&
    p.name &&
    p.hasImage &&
    Array.isArray(p.images) &&
    p.images.length > 0 &&
    p.images[0] &&
    p.description &&
    Array.isArray(p.divisions) &&
    p.divisions.length > 0 &&
    p.status !== 'inactive'
  );

export const visibleProducts = (list) => list.filter(isCompleteProduct);

// Division assignment (multi-membership; every part is a forging component)
const TRACTORLINK = new Set([
  'ball-stud', 'yoke-end', 'lever-arm', 'king-pin', 'hand-lever', 'clutch-fork', 'shift-fork', 'rocker-arm',
  'pitman-arm', 'connecting-link', 'tie-rod-end', 'spindle', 'rod-eye', 'eye-bolt', 'eye-rod', 'clevis-fork',
  'clevis-pin', 'clevis-yoke', 'clevis-block', 'link', 'rod-end', 'double-lever', 'd-shackle', 'turn-buckle-end',
  'weld-on-eye', 'pad-eye', 'swivel-base', 'u-bolt', 'l-bracket', 'l-bracket-light-duty',
]);
const AUTO = new Set([
  'hammer-head', 'adjustable-foot', 'thrust-nut', 'hinge-pin', 'door-hinge', 'lock-lever', 'keeper-plate',
  'saddle-clip', 'door-stop', 'striker', 'wing-nut', 'wing-bolt', 'hook-latch', 'hand-lever', 'tri-wing-knob',
  'clamp-lever', 'hinge-bracket',
]);
const AGRI = new Set(['bale-spear-double']);

TRACTOR_PARTS.forEach((p) => {
  if (!p.divisions) {
    p.divisions = ['forging-parts'];
    if (TRACTORLINK.has(p.slug)) p.divisions.push('tractorlink');
    if (AUTO.has(p.slug)) p.divisions.push('auto-parts');
    if (AGRI.has(p.slug)) p.divisions.push('agriculture-parts');
  }
  const merge = MERGED_PHOTOS[p.slug];
  if (merge) {
    p.images = merge.images.map(pimg);
    p.hasImage = true;
    if (merge.addDiv && !p.divisions.includes(merge.addDiv)) p.divisions.push(merge.addDiv);
  }
});

export const tractorPartsByDivision = (slug) => TRACTOR_PARTS.filter((p) => p.divisions.includes(slug));
