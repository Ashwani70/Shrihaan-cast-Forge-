// Product database — sourced exclusively from the SHRIHAAN CAST & FORGE product catalogue.
// Fields not present in the catalogue are marked "Available on Request" (AOR).
export const AOR = 'Available on Request';

const img = (slug) => `/products/${slug}.webp`;

export const CATEGORIES = [
  {
    slug: 'ringlock-system',
    name: 'Ringlock System',
    image: img('cat-ringlock-system'),
    description:
      'A high-performance modular scaffolding solution that ensures fast assembly, robust strength, and versatile configurations, delivering safe, durable access platforms for diverse construction and industrial projects with reliable load-bearing capability.',
  },
  {
    slug: 'ringlock-accessories',
    name: 'Ringlock Accessories',
    image: img('cat-ringlock-accessories'),
    description:
      'Base collars, double ledgers, board brackets, brace ends, ledger ends, rosettes, wedges and spigots for the Ringlock system.',
  },
  {
    slug: 'cuplock-system',
    name: 'Cuplock System',
    image: img('cat-cuplock-system'),
    description:
      'Cup Lock system allows up to four horizontal members to connect to a single vertical through a unique node point. Using fixed and sliding cups, components lock securely with a simple hammer action, eliminating nuts, bolts, or wedges.',
  },
  {
    slug: 'support-railings',
    name: 'Support Railings',
    image: img('cat-support-railings'),
    description:
      'Support guard rails, guard rails and formwork strip clamps available in hot dip galvanised, electro galvanised and painted finishes.',
  },
  {
    slug: 'kwikstage-system',
    name: 'Kwikstage System',
    image: img('cat-kwikstage-system'),
    description:
      'A versatile modular scaffolding solution featuring wedge-lock connections. Horizontals, ledgers, and braces securely fix into vertical standards with a hammer-locked wedge, ensuring fast erection, high load capacity, stability, and adaptability for construction, maintenance, and industrial access applications.',
  },
  {
    slug: 'ladders-brackets-gates-accessories',
    name: 'Ladders, Brackets, Gates & Accessories',
    image: img('cat-ladders-brackets-gates-accessories'),
    description:
      'Access ladders, heavy duty ladders, ladder brackets, expandable gates and twist lock / tube lock systems.',
  },
  {
    slug: 'screw-base-jacks',
    name: 'Screw Base Jacks',
    image: img('cat-screw-base-jacks'),
    description:
      'Hollow, solid, swivel, U-head, fork head and universal screw jacks with 4 TPI thread, together with U-head plates, base plates and caster wheels.',
  },
  {
    slug: 'walk-boards-steel-planks',
    name: 'Walk Boards & Steel Planks',
    image: img('cat-walk-boards-steel-planks'),
    description:
      'Steel and aluminium walk boards, planks, raised hook planks, toe boards and manhole planks in multiple sizes.',
  },
  {
    slug: 'steel-props',
    name: 'Steel Props',
    image: img('cat-steel-props'),
    description:
      'Light, medium and heavy duty adjustable steel props with a complete range of prop accessories.',
  },
  {
    slug: 'forged-pressed-couplers',
    name: 'Forged & Pressed Couplers',
    image: img('cat-forged-pressed-couplers'),
    description:
      'Drop forged and pressed couplers — right angle, swivel, sleeve, putlog, grave lock, joint pin and BRC types — manufactured to EN-74 / BS-1139 standard.',
  },
  {
    slug: 'framework-accessories',
    name: 'Formwork Accessories',
    image: img('cat-framework-accessories'),
    description:
      'Formwork and framework accessory range. Detailed specifications for this range are available on request.',
  },
  {
    slug: 'frames',
    name: 'Frames',
    image: img('cat-frames'),
    description:
      'Walk through, mason, ladder and double ladder frame systems with cross braces and frame guard rails.',
  },
];

const STD_COLS = ['Item Code', 'Length in Mtr.', 'Length in Feet', 'Weight in Kg', 'Weight in Lbs.'];
const LEDGER_COLS = ['Item Code', 'Length in Mtr.', 'Length in Feet', 'Weight in Kg', 'Weight in Lbs.'];

const ringlockLedgerRows = [
  ['RLS-HL-24-H', '0.73', '2.4', '3.13', '6.90'],
  ['RLS-HL-33-H', '1.0', '3.3', '4.11', '9.06'],
  ['RLS-HL-36-H', '1.09', '3.6', '4.44', '9.80'],
  ['RLS-HL-52-H', '1.57', '5.2', '6.22', '13.71'],
  ['RLS-HL-68-H', '2.07', '6.8', '8.07', '17.79'],
  ['RLS-HL-70-H', '2.13', '7.0', '8.29', '18.28'],
  ['RLS-HL-85-H', '2.57', '8.5', '9.92', '21.87'],
  ['RLS-HL-100-H', '3.05', '10.0', '11.70', '25.78'],
  ['RLS-HL-101-H', '3.07', '10.1', '11.77', '25.95'],
];

const cuplockTransomRows = [
  ['CL-T-40-H', '1.20', '4.0', '6.26', '13.80'],
  ['CL-T-43-H', '1.30', '4.3', '6.62', '14.59'],
  ['CL-T-60-H', '1.80', '6.0', '8.39', '18.50'],
  ['CL-T-82-H', '2.50', '8.2', '10.88', '23.98'],
];

const propVariants = (prefix) => [
  [`SP-${prefix}-20-H`, '1.5 - 2.0'],
  [`SP-${prefix}-25-H`, '1.7 - 2.5'],
  [`SP-${prefix}-30-H`, '2.0 - 3.0'],
  [`SP-${prefix}-40-H`, '2.5 - 4.0'],
];

const PLANK_SIZES = { 'Size (mtr.)': '1.57, 2.07, 2.57, 3.07', 'Size (feet)': '5.2, 6.8, 8.4, 10.1' };

export const PRODUCTS = [
  // ---------------- Ringlock System ----------------
  {
    slug: 'ringlock-vertical', name: 'Ringlock Vertical', category: 'ringlock-system',
    itemCode: 'RLS-VS Series', image: img('ringlock-vertical'),
    description: 'Vertical standards for the Ringlock modular scaffolding system, available with 1 to 6 rings.',
    specs: {}, variantColumns: ['Item Code', 'Description', 'Length in Mtr.', 'Length in Feet', 'Weight in Kg', 'Weight in Lbs.'],
    variants: [
      ['RLS-VS-16-H', 'Standard (1 Ring)', '0.50', '1.6', '3.0', '6.8'],
      ['RLS-VS-33-H', 'Standard (2 Ring)', '1.00', '3.3', '5.4', '11.9'],
      ['RLS-VS-49-H', 'Standard (3 Ring)', '1.50', '4.9', '7.6', '16.7'],
      ['RLS-VS-66-H', 'Standard (4 Ring)', '2.00', '6.6', '10.0', '22.0'],
      ['RLS-VS-82-H', 'Standard (5 Ring)', '2.50', '8.2', '13.0', '28.7'],
      ['RLS-VS-98-H', 'Standard (6 Ring)', '3.00', '9.8', '14.9', '32.8'],
    ],
  },
  {
    slug: 'ringlock-ledger', name: 'Ringlock Ledger', category: 'ringlock-system',
    itemCode: 'RLS-HL Series', image: img('ringlock-ledger'),
    description: 'Horizontal ledgers for the Ringlock system in nine lengths.',
    specs: {}, variantColumns: LEDGER_COLS, variants: ringlockLedgerRows,
  },
  {
    slug: 'ringlock-brace', name: 'Ringlock Brace', category: 'ringlock-system',
    itemCode: 'RLS-DV Series', image: img('ringlock-brace'),
    description: 'Diagonal braces for the Ringlock system.',
    specs: {}, variantColumns: LEDGER_COLS,
    variants: [
      ['RLS-DV-24-H', '2.0 x 0.73', '6.6 x 2.4', '7.89', '17.39'],
      ['RLS-DV-33-H', '2.0 x 1.0', '6.6 x 3.3', '8.16', '17.99'],
      ['RLS-DV-36-H', '2.0 x 1.09', '6.6 x 3.6', '8.27', '18.23'],
      ['RLS-DV-52-H', '2.0 x 1.57', '6.6 x 5.2', '8.99', '19.81'],
      ['RLS-DV-68-H', '2.0 x 2.07', '6.6 x 6.8', '9.94', '21.92'],
      ['RLS-DV-70-H', '2.0 x 2.13', '6.6 x 7.0', '10.06', '22.19'],
      ['RLS-DV-85-H', '2.0 x 2.57', '6.6 x 8.5', '11.04', '24.33'],
      ['RLS-DV-100-H', '2.0 x 3.05', '6.6 x 10.0', '12.18', '26.86'],
      ['RLS-DV-101-H', '2.0 x 3.07', '6.6 x 10.1', '12.23', '26.96'],
    ],
  },

  // ---------------- Ringlock Accessories ----------------
  {
    slug: 'base-collar', name: 'Base Collar', category: 'ringlock-accessories',
    itemCode: 'RLS-BC-10-H', image: img('base-collar'),
    description: 'Base collar for the Ringlock system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [['RLS-BC-10-H', '0.3', '1.0', '2.1', '0.57']],
  },
  {
    slug: 'double-ledger', name: 'Double Ledger', category: 'ringlock-accessories',
    itemCode: 'RLS-HL Series', image: img('double-ledger'),
    description: 'Double ledger for the Ringlock system.',
    specs: {}, variantColumns: LEDGER_COLS, variants: ringlockLedgerRows,
  },
  {
    slug: 'board-bracket', name: 'Board Bracket', category: 'ringlock-accessories',
    itemCode: 'RLS-BB Series', image: img('board-bracket'),
    description: 'Board bracket for the Ringlock system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['RLS-BB-15-H', '0.45', '1.5', '5.20', '11.5'],
      ['RLS-BB-25-H', '0.75', '2.5', '7.25', '16.0'],
    ],
  },
  {
    slug: 'brace-end', name: 'Brace End', category: 'ringlock-accessories',
    itemCode: 'RLSA-BE', image: img('brace-end'),
    description: 'Brace end for the Ringlock system.', specs: {}, variants: null,
  },
  {
    slug: 'ledger-end', name: 'Ledger End', category: 'ringlock-accessories',
    itemCode: 'RLSA-LE', image: img('ledger-end'),
    description: 'Ledger end for the Ringlock system.', specs: {}, variants: null,
  },
  {
    slug: 'rosette', name: 'Rosette', category: 'ringlock-accessories',
    itemCode: 'RLSA-R', image: img('rosette'),
    description: 'Rosette node for the Ringlock system.', specs: {}, variants: null,
  },
  {
    slug: 'wedge', name: 'Wedge', category: 'ringlock-accessories',
    itemCode: 'RLSA-WP', image: img('wedge'),
    description: 'Locking wedge for the Ringlock system.', specs: {}, variants: null,
  },
  {
    slug: 'spigot', name: 'Spigot', category: 'ringlock-accessories',
    itemCode: 'RLSA-S', image: img('spigot'),
    description: 'Spigot for the Ringlock system.', specs: {}, variants: null,
  },

  // ---------------- Cuplock System ----------------
  {
    slug: 'cuplock-vertical', name: 'Cuplock Vertical', category: 'cuplock-system',
    itemCode: 'CL-VS Series', image: img('cuplock-vertical'),
    description: 'Vertical standards for the Cuplock system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['CL-VS-16-H', '0.50', '1.6', '2.51', '5.53'],
      ['CL-VS-33-H', '1.00', '3.3', '5.00', '11.02'],
      ['CL-VS-49-H', '1.50', '4.9', '7.50', '16.53'],
      ['CL-VS-66-H', '2.00', '6.6', '10.00', '22.05'],
      ['CL-VS-82-H', '2.50', '8.2', '12.49', '27.54'],
      ['CL-VS-98-H', '3.00', '9.8', '15.00', '33.07'],
    ],
  },
  {
    slug: 'cuplock-ledger', name: 'Cuplock Ledger', category: 'cuplock-system',
    itemCode: 'CL-HL Series', image: img('cuplock-ledger'),
    description: 'Horizontal ledgers for the Cuplock system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['CL-HL-16-H', '0.50', '1.6', '2.01', '4.43'],
      ['CL-HL-23-H', '0.70', '2.3', '2.73', '6.02'],
      ['CL-HL-33-H', '1.00', '3.3', '3.74', '8.25'],
      ['CL-HL-50-H', '1.50', '5.0', '5.53', '12.19'],
      ['CL-HL-60-H', '1.80', '6.0', '6.61', '14.57'],
      ['CL-HL-82-H', '2.50', '8.2', '9.47', '20.88'],
      ['CL-HL-98-H', '3.00', '9.8', '11.27', '24.85'],
    ],
  },
  {
    slug: 'cuplock-brace', name: 'Cuplock Brace', category: 'cuplock-system',
    itemCode: 'CL-DB Series', image: img('cuplock-brace'),
    description: 'Diagonal braces for the Cuplock system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['CL-DB-35-H', '1.07 x 2.0', '3.5 x 6.6', '6.87', '15.15'],
      ['CL-DB-50-H', '1.52 x 2.0', '5.6 x 6.6', '7.52', '16.58'],
      ['CL-DB-70-H', '2.13 x 2.0', '7.0 x 6.6', '8.59', '18.94'],
      ['CL-DB-100-H', '3.05 x 2.0', '10.0 x 6.6', '10.49', '23.35'],
    ],
  },
  {
    slug: 'cuplock-transom', name: 'Cuplock Transom', category: 'cuplock-system',
    itemCode: 'CL-T Series', image: img('cuplock-transom'),
    description: 'Transoms for the Cuplock system.',
    specs: {}, variantColumns: STD_COLS, variants: cuplockTransomRows,
  },
  {
    slug: 'cuplock-board-bracket', name: 'Board Bracket', category: 'cuplock-system',
    itemCode: 'CL-BB Series', image: img('cuplock-board-bracket'),
    description: 'Board bracket for the Cuplock system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['CL-BB-13-H', '0.40', '1.3', '4.51', '9.94'],
      ['CL-BB-22-H', '0.66', '2.2', '6.35', '14.00'],
      ['CL-BB-29-H', '0.88', '2.9', '7.78', '17.15'],
    ],
  },
  {
    slug: 'top-cup', name: 'Top Cup', category: 'cuplock-system',
    itemCode: 'CLA-TC', image: img('top-cup'),
    description: 'Top cup for the Cuplock node point.', specs: {}, variants: null,
  },
  {
    slug: 'bottom-cup', name: 'Bottom Cup', category: 'cuplock-system',
    itemCode: 'CLA-BC', image: img('bottom-cup'),
    description: 'Bottom cup for the Cuplock node point.', specs: {}, variants: null,
  },
  {
    slug: 'ledger-blade', name: 'Ledger Blade', category: 'cuplock-system',
    itemCode: 'CLA-LB', image: img('ledger-blade'),
    description: 'Ledger blade for the Cuplock system.', specs: {}, variants: null,
  },
  {
    slug: 'cuplock-spigot', name: 'Spigot', category: 'cuplock-system',
    itemCode: 'CLA-S', image: img('cuplock-spigot'),
    description: 'Spigot for the Cuplock system.', specs: {}, variants: null,
  },

  // ---------------- Support Railings ----------------
  {
    slug: 'support-guard-rail-500', name: 'Support Guard Rail 500 mm', category: 'support-railings',
    itemCode: AOR, image: img('support-guard-rail-500'),
    description: 'Support guard rail, 500 mm.',
    specs: { Length: '500 mm', 'Finish Options': 'Hot Dip Galva / Electro Galva / Painted' }, variants: null,
  },
  {
    slug: 'guard-rail-1145', name: 'Guard Rail 1145 mm', category: 'support-railings',
    itemCode: AOR, image: img('guard-rail-1145'),
    description: 'Guard rail, 1145 mm.',
    specs: { Length: '1145 mm', 'Finish Options': 'Hot Dip Galva / Electro Galva / Painted' }, variants: null,
  },
  {
    slug: 'guard-rail-300', name: 'Guard Rail 300 mm', category: 'support-railings',
    itemCode: AOR, image: img('guard-rail-300'),
    description: 'Guard rail, 300 mm.',
    specs: { Length: '300 mm', 'Finish Options': 'Hot Dip Galva / Electro Galva / Painted' }, variants: null,
  },
  {
    slug: 'support-guard-rail-200', name: 'Support Guard Rail 200 mm', category: 'support-railings',
    itemCode: AOR, image: img('support-guard-rail-200'),
    description: 'Support guard rail, 200 mm.',
    specs: { Length: '200 mm', 'Finish Options': 'Hot Dip Galva / Electro Galva / Painted' }, variants: null,
  },
  {
    slug: 'guard-rail-100', name: 'Guard Rail 100 mm', category: 'support-railings',
    itemCode: AOR, image: img('guard-rail-100'),
    description: 'Guard rail, 100 mm.',
    specs: { Length: '100 mm', 'Finish Options': 'Hot Dip Galva / Electro Galva / Painted' }, variants: null,
  },
  {
    slug: 'formwork-strip-clamp', name: 'Formwork Strip Clamp', category: 'support-railings',
    itemCode: AOR, image: img('formwork-strip-clamp'),
    description: 'Formwork strip clamp.',
    specs: { Finish: 'Electro Galva', 'Size / Length': '40 x 5 x 538 mm' }, variants: null,
  },

  // ---------------- Kwikstage System ----------------
  {
    slug: 'kwikstage-vertical', name: 'Kwikstage Vertical', category: 'kwikstage-system',
    itemCode: 'KS-VS Series', image: img('kwikstage-vertical'),
    description: 'Vertical standards for the Kwikstage modular scaffolding system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['KS-VS-33-H', '1.00', '3.3', '6.2', '13.7'],
      ['KS-VS-66-H', '2.00', '6.6', '11.7', '25.8'],
      ['KS-VS-82-H', '2.5', '8.2', '14.4', '31.8'],
      ['KS-VS-98-H', '3.0', '9.8', '17.2', '38.0'],
    ],
  },
  {
    slug: 'kwikstage-ledger', name: 'Kwikstage Ledger', category: 'kwikstage-system',
    itemCode: 'CL-HL Series', image: img('kwikstage-ledger'),
    description: 'Horizontal ledgers for the Kwikstage system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['CL-HL-39-H', '1.2', '3.9', '5.5', '12.2'],
      ['CL-HL-59-H', '1.8', '5.9', '6.9', '6.9'],
      ['CL-HL-79-H', '2.4', '7.9', '8.8', '8.8'],
    ],
  },
  {
    slug: 'kwikstage-diagonal-brace', name: 'Kwikstage Diagonal Brace', category: 'kwikstage-system',
    itemCode: 'CL-DB Series', image: img('kwikstage-diagonal-brace'),
    description: 'Diagonal braces for the Kwikstage system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['CL-DB-24-H', '0.7 x 2.0', '2.4 x 6.6', '8.0', '17.7'],
      ['CL-DB-46-H', '1.4 x 2.0', '4.6 x 6.6', '8.8', '19.5'],
      ['CL-DB-52-H', '1.6 x 2.0', '5.2 x 6.6', '9.1', '20.1'],
      ['CL-DB-89-H', '2.0 x 2.0', '8.9 x 6.6', '10.1', '22.2'],
      ['CL-DB-98-H', '3.0 x 2.0', '9.8 x 6.6', '12.4', '27.0'],
    ],
  },
  {
    slug: 'broad-bracket', name: 'Broad Bracket', category: 'kwikstage-system',
    itemCode: 'CL-T Series', image: img('broad-bracket'),
    description: 'Broad bracket for the Kwikstage system.',
    specs: {}, variantColumns: STD_COLS, variants: cuplockTransomRows,
  },
  {
    slug: 'kwikstage-transom', name: 'Kwikstage Transom', category: 'kwikstage-system',
    itemCode: 'KS-T Series', image: img('kwikstage-transom'),
    description: 'Transoms for the Kwikstage system.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['KS-T-26-H', '0.8', '2.6', '5.9', '13.0'],
      ['KS-T-39-H', '1.20', '3.9', '9.7', '21.3'],
      ['KS-T-59-H', '1.80', '5.9', '13.1', '28.9'],
    ],
  },
  {
    slug: 'kwikstage-board-bracket', name: 'Board Bracket', category: 'kwikstage-system',
    itemCode: 'KS-ETBB-13-H', image: img('kwikstage-board-bracket'),
    description: 'Board bracket for the Kwikstage system.',
    specs: {}, variantColumns: ['Item Code', 'Weight in Kg', 'Weight in Lbs.'],
    variants: [['KS-ETBB-13-H', '1.3', '2.866']],
  },
  {
    slug: 'v-pressing', name: 'V-Pressing', category: 'kwikstage-system',
    itemCode: 'KSA-VP', image: img('v-pressing'),
    description: 'V-pressing for the Kwikstage system.', specs: {}, variants: null,
  },
  {
    slug: 'guiding-pin', name: 'Guiding Pin', category: 'kwikstage-system',
    itemCode: 'KSA-GP', image: img('guiding-pin'),
    description: 'Guiding pin for the Kwikstage system.', specs: {}, variants: null,
  },
  {
    slug: 'u-clip', name: 'U-Clip', category: 'kwikstage-system',
    itemCode: 'KSA-UC', image: img('u-clip'),
    description: 'U-clip for the Kwikstage system.', specs: {}, variants: null,
  },
  {
    slug: 'kwikstage-wedge-pin', name: 'Wedge / Pin', category: 'kwikstage-system',
    itemCode: 'KSA-WP', image: img('kwikstage-wedge-pin'),
    description: 'Wedge / pin for the Kwikstage system.', specs: {}, variants: null,
  },

  // ---------------- Ladders, Brackets, Gates & Accessories ----------------
  {
    slug: 'ladder', name: 'Ladder', category: 'ladders-brackets-gates-accessories',
    itemCode: 'SS-L Series', image: img('ladder'),
    description: 'Access ladder.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['SS-L-L3-H', '0.9', '3', '5.0', '11.0'],
      ['SS-L-L5-H', '1.5', '5', '7.9', '17.34'],
    ],
  },
  {
    slug: 'heavy-duty-ladder', name: 'Heavy Duty Ladder', category: 'ladders-brackets-gates-accessories',
    itemCode: 'SS-HL Series', image: img('heavy-duty-ladder'),
    description: 'Heavy duty access ladder.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['SS-HL-L3-H', '0.9', '3', '7.0', '15.33'],
      ['SS-HL-L5-H', '1.5', '10', '20.0', '44.88'],
    ],
  },
  {
    slug: 'expandable-gate', name: 'Expandable Gate', category: 'ladders-brackets-gates-accessories',
    itemCode: 'SS-EG-2434', image: img('expandable-gate'),
    description: 'Expandable gate, 25” to 34”.',
    specs: {}, variantColumns: ['Item Code', 'Description', 'Min. Extension in Inch', 'Min. Extension in Mtr.', 'Max. Extension in Inch', 'Max. Extension in Mtr.'],
    variants: [['SS-EG-2434', 'Gate Expandable 25” to 34”', '25.20', '0.640', '31.9', '0.81']],
  },
  {
    slug: 'ladder-bracket', name: 'Ladder Bracket', category: 'ladders-brackets-gates-accessories',
    itemCode: 'SS-LB Series', image: img('ladder-bracket'),
    description: 'Ladder bracket.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['SS-LB-13-H', '0.3', '13.7', '2.9', '6.40'],
      ['SS-LB-17-H', '0.4', '17', '3.1', '6.83'],
    ],
  },
  {
    slug: 'twist-lock-tube-lock', name: 'Twist Lock / Tube Lock', category: 'ladders-brackets-gates-accessories',
    itemCode: 'SS-TWL Series', image: img('twist-lock-tube-lock'),
    description: 'Twist lock / tube lock in nine sizes.',
    specs: {}, variantColumns: STD_COLS,
    variants: [
      ['SS-TWL-20-H', '0.6', '2.0', '2.5', '5.6'],
      ['SS-TWL-30-H', '0.9', '3.0', '3.3', '7.3'],
      ['SS-TWL-40-H', '1.2', '4.0', '4.3', '9.1'],
      ['SS-TWL-50-H', '1.5', '5.0', '4.9', '10.8'],
      ['SS-TWL-60-H', '1.8', '6.0', '5.7', '12.6'],
      ['SS-TWL-80-H', '2.4', '8.0', '7.3', '16.1'],
      ['SS-TWL-100-H', '3.0', '10.0', '8.9', '19.6'],
      ['SS-TWL-130-H', '3.96', '13.0', '11.24', '24.8'],
      ['SS-TWL-160-H', '4.87', '16.0', '13.65', '30.1'],
    ],
  },
  {
    slug: 'twist-lock-base-plate', name: 'Twist Lock Base Plate', category: 'ladders-brackets-gates-accessories',
    itemCode: 'SS-TWL-BP', image: img('twist-lock-base-plate'),
    description: 'Base plate for the twist lock / tube lock.', specs: {}, variants: null,
  },

  // ---------------- Screw Base Jacks ----------------
  {
    slug: 'hollow-screw-base-jack', name: 'Hollow Screw Base Jack', category: 'screw-base-jacks',
    itemCode: 'SBJ-HJ', image: img('hollow-screw-base-jack'),
    description: 'Hollow screw base jack with casted and forged jack nut.',
    specs: { Thread: '4 TPI', 'Tube OD': '32, 34, 38 mm', 'Length': '400, 500, 600, 700, 800 mm', 'Plate Size': '150*150*5, 150*150*6 mm', 'Jack Nut': 'Casted and Forged' }, variants: null,
  },
  {
    slug: 'solid-screw-jack', name: 'Solid Screw Jack', category: 'screw-base-jacks',
    itemCode: 'SBJ-SJ', image: img('solid-screw-jack'),
    description: 'Solid screw jack with casted and forged jack nut.',
    specs: { Thread: '4 TPI', 'Tube OD': '32, 34, 38 mm', 'Length': '400, 500, 600, 700 mm', 'Plate Size': '150*150*5 mm', 'Jack Nut': 'Casted and Forged' }, variants: null,
  },
  {
    slug: 'swivel-screw-jack', name: 'Swivel Screw Jack', category: 'screw-base-jacks',
    itemCode: 'SBJ-SWJ', image: img('swivel-screw-jack'),
    description: 'Swivel screw jack with casted and forged jack nut.',
    specs: { Thread: '4 TPI', 'Tube OD': '32, 34, 38 mm', 'Length': '400, 500, 600, 700, 800 mm', 'Plate Size': '150*150*5 mm', 'Jack Nut': 'Casted and Forged' }, variants: null,
  },
  {
    slug: 'u-head-screw-jack', name: 'U-Head Screw Jack', category: 'screw-base-jacks',
    itemCode: 'SBJ-UHJ', image: img('u-head-screw-jack'),
    description: 'U-head screw jack with casted and forged jack nut.',
    specs: { Thread: '4 TPI', 'Tube OD': '32, 34, 38 mm', 'Length': '400, 500, 600, 700, 800 mm', 'Plate Size': '150*100*75*5, 115*100*50*5 mm', 'Jack Nut': 'Casted and Forged' }, variants: null,
  },
  {
    slug: 'fork-head-screw-jack', name: 'Fork Head Screw Jack', category: 'screw-base-jacks',
    itemCode: 'SBJ-FHJ', image: img('fork-head-screw-jack'),
    description: 'Fork head screw jack with casted and forged jack nut.',
    specs: { Thread: '4 TPI', 'Thread OD': '32, 34, 38 mm', 'Length': '400, 500, 600, 700, 800 mm', 'Jack Nut': 'Casted and Forged' }, variants: null,
  },
  {
    slug: 'universal-screw-jack', name: 'Universal Screw Jack', category: 'screw-base-jacks',
    itemCode: 'SBJ-UJ', image: img('universal-screw-jack'),
    description: 'Universal screw jack with casted and forged jack nut.',
    specs: { Thread: '4 TPI', 'Tube OD': '32, 34, 38 mm', 'Length': '400, 500, 600, 700, 800 mm', 'Jack Nut': 'Casted and Forged' }, variants: null,
  },
  {
    slug: 'u-head-plate', name: 'U-Head Plate', category: 'screw-base-jacks',
    itemCode: 'SBJ-UHP', image: img('u-head-plate'),
    description: 'U-head plate for screw jack assemblies.', specs: {}, variants: null,
  },
  {
    slug: 'caster-wheel', name: 'Caster Wheel 6” & 8”', category: 'screw-base-jacks',
    itemCode: 'SBJ-CW', image: img('caster-wheel'),
    description: 'Caster wheel, available in 6” and 8”.',
    specs: { Sizes: '6” & 8”' }, variants: null,
  },

  // ---------------- Walk Boards & Steel Planks ----------------
  {
    slug: 'american-type-steel-plank', name: 'American Type Steel Plank', category: 'walk-boards-steel-planks',
    itemCode: 'SS-ASP', image: img('american-type-steel-plank'),
    description: 'American type steel plank.',
    specs: { ...PLANK_SIZES }, variants: null,
  },
  {
    slug: 'american-type-steel-plank-hook', name: 'American Type Steel Plank (Hook Type)', category: 'walk-boards-steel-planks',
    itemCode: 'SS-ATSP', image: img('american-type-steel-plank-hook'),
    description: 'American type steel plank.',
    specs: { ...PLANK_SIZES }, variants: null,
  },
  {
    slug: 'steel-raised-hook-plank', name: 'Steel Raised Hook Plank', category: 'walk-boards-steel-planks',
    itemCode: 'SS-SRHP', image: img('steel-raised-hook-plank'),
    description: 'Steel raised hook plank.',
    specs: { ...PLANK_SIZES }, variants: null,
  },
  {
    slug: 'light-duty-steel-plank-without-head', name: 'Light Duty Steel Plank without Head', category: 'walk-boards-steel-planks',
    itemCode: 'SS-LSPWH', image: img('light-duty-steel-plank-without-head'),
    description: 'Light duty steel plank without head.',
    specs: { ...PLANK_SIZES }, variants: null,
  },
  {
    slug: 'steel-plank-without-hook', name: 'Steel Plank without Hook', category: 'walk-boards-steel-planks',
    itemCode: 'SS-SPWH', image: img('steel-plank-without-hook'),
    description: 'Steel plank without hook.',
    specs: { 'Size (mtr.)': '1.67, 2.07, 2.57, 3.07', 'Size (feet)': '5.2, 6.8, 8.4, 10.1' }, variants: null,
  },
  {
    slug: 'aluminium-plank-with-manhole', name: 'Aluminium Plank with Manhole', category: 'walk-boards-steel-planks',
    itemCode: 'SS-APM', image: img('aluminium-plank-with-manhole'),
    description: 'Aluminium plank with manhole.',
    specs: { ...PLANK_SIZES, 'Width (mtr.)': '0.61', 'Width (feet)': '2.0' }, variants: null,
  },
  {
    slug: 'interlocking-toe-board', name: 'Interlocking Toe Board', category: 'walk-boards-steel-planks',
    itemCode: 'SS-ITB', image: img('interlocking-toe-board'),
    description: 'Interlocking toe board.',
    specs: { ...PLANK_SIZES }, variants: null,
  },
  {
    slug: 'aluminium-plank', name: 'Aluminium Plank', category: 'walk-boards-steel-planks',
    itemCode: 'SS-AP', image: img('aluminium-plank'),
    description: 'Aluminium plank.',
    specs: { ...PLANK_SIZES, 'Width (mtr.)': '0.32, 0.61', 'Width (feet)': '1.0, 2.0' }, variants: null,
  },
  {
    slug: 'plank-with-manhole', name: 'Plank with Manhole', category: 'walk-boards-steel-planks',
    itemCode: 'SS-PM', image: img('plank-with-manhole'),
    description: 'Plank with manhole.',
    specs: { ...PLANK_SIZES, 'Width (mtr.)': '0.61', 'Width (feet)': '2.0' }, variants: null,
  },

  // ---------------- Steel Props ----------------
  {
    slug: 'light-duty-prop', name: 'Light Duty Prop', category: 'steel-props',
    itemCode: 'SP-LDP Series', image: img('light-duty-prop'),
    description: 'Adjustable light duty steel prop.',
    specs: { 'Outer Tube': '56*1.8 mm', 'Inner Tube': '48.3*1.8 mm', 'Plate Size': '120*120*4 mm', Material: 'S235, S355' },
    variantColumns: ['Item Code', 'Length in Mtr.'], variants: propVariants('LDP'),
  },
  {
    slug: 'medium-duty-prop', name: 'Medium Duty Prop', category: 'steel-props',
    itemCode: 'SP-MDP Series', image: img('medium-duty-prop'),
    description: 'Adjustable medium duty steel prop.',
    specs: { 'Outer Tube': '60*2.0 mm', 'Inner Tube': '48.3*2.0 mm', 'Plate Size': '120*120*5 mm', Material: 'S235, S355' },
    variantColumns: ['Item Code', 'Length in Mtr.'], variants: propVariants('MDP'),
  },
  {
    slug: 'heavy-duty-prop', name: 'Heavy Duty Prop', category: 'steel-props',
    itemCode: 'SP-HDP Series', image: img('heavy-duty-prop'),
    description: 'Adjustable heavy duty steel prop.',
    specs: { 'Outer Tube': '60*3.0 mm', 'Inner Tube': '48.3*3.0 mm', 'Plate Size': '120*120*5 mm', Material: 'S235, S355' },
    variantColumns: ['Item Code', 'Length in Mtr.'], variants: propVariants('HDP'),
  },
  { slug: 'light-duty-prop-nut', name: 'Light Duty Prop Nut', category: 'steel-props', itemCode: 'SPA-LPN', image: img('light-duty-prop-nut'), description: 'Light duty prop nut.', specs: {}, variants: null },
  { slug: 'light-duty-prop-sleeve', name: 'Light Duty Prop Sleeve', category: 'steel-props', itemCode: 'SPA-LPS', image: img('light-duty-prop-sleeve'), description: 'Light duty prop sleeve.', specs: {}, variants: null },
  { slug: 'prop-nut-cover', name: 'Prop Nut Cover', category: 'steel-props', itemCode: 'SPA-PW', image: img('prop-nut-cover'), description: 'Prop nut cover.', specs: {}, variants: null },
  { slug: 'g-type-locking-pin', name: 'G-Type Locking Pin', category: 'steel-props', itemCode: 'SPA-GP', image: img('g-type-locking-pin'), description: 'G-type locking pin.', specs: {}, variants: null },
  { slug: 'locking-pin-with-chain', name: 'Locking Pin With Chain', category: 'steel-props', itemCode: 'SPA-LP', image: img('locking-pin-with-chain'), description: 'Locking pin with chain.', specs: {}, variants: null },
  { slug: 'tripod', name: 'Tripod', category: 'steel-props', itemCode: 'SPA-TP', image: img('tripod'), description: 'Prop tripod.', specs: {}, variants: null },
  { slug: 'fork-head', name: 'Fork Head', category: 'steel-props', itemCode: 'SPA-FH', image: img('fork-head'), description: 'Fork head for steel props.', specs: {}, variants: null },
  { slug: 'prop-nut', name: 'Prop Nut', category: 'steel-props', itemCode: 'SPA-PN', image: img('prop-nut'), description: 'Prop nut.', specs: {}, variants: null },
  { slug: 'flower-base-plate', name: 'Flower Base Plate', category: 'steel-props', itemCode: 'SPA-FBP', image: img('flower-base-plate'), description: 'Flower base plate.', specs: {}, variants: null },
  { slug: 'prop-base-plate', name: 'Base Plate', category: 'steel-props', itemCode: 'SPA-BP', image: img('prop-base-plate'), description: 'Base plate for steel props.', specs: {}, variants: null },
  { slug: 'prop-sleeve', name: 'Prop Sleeve', category: 'steel-props', itemCode: 'SPA-PS', image: img('prop-sleeve'), description: 'Prop sleeve.', specs: {}, variants: null },

  // ---------------- Forged & Pressed Couplers ----------------
  ...[
    ['british-type-right-angle-coupler', 'British Type Right Angle Coupler', 'DFC-BS-RAC'],
    ['british-type-swivel-coupler', 'British Type Swivel Coupler', 'DFC-BS-SWC'],
    ['american-type-swivel-coupler', 'American Type Swivel Coupler', 'DFC-AS-SWC'],
    ['american-type-right-angle-coupler', 'American Type Right Angle Coupler', 'DFC-AS-RAC'],
    ['german-type-right-angle-coupler', 'German Type Right Angle Coupler', 'DFC-GC-RAC'],
    ['german-type-swivel-coupler', 'German Type Swivel Coupler', 'DFC-GC-SWC'],
    ['combination-swivel-coupler', 'Combination Swivel Coupler', 'DFC-C-SWC'],
    ['combination-right-angle-coupler', 'Combination Right Angle Coupler', 'DFC-C-RAC'],
    ['grave-lock-coupler', 'Grave Lock Coupler', 'DFC-BS-GLC'],
    ['putlog-coupler', 'Putlog Coupler', 'DFC-BS-PC'],
    ['single-coupler', 'Single Coupler', 'DFC-BS-SC'],
    ['forged-joint-pin', 'Forged Joint Pin', 'DFC-BS-JP'],
    ['british-type-pressed-right-angle-coupler', 'British Type Pressed Right Angle Coupler', 'PC-BS-RAC'],
    ['british-type-pressed-swivel-coupler', 'British Type Pressed Swivel Coupler', 'PC-BS-SWC'],
    ['sleeve-coupler', 'Sleeve Coupler', 'PC-BS-SLC'],
    ['brc-coupler', 'BRC Coupler', 'PC-BS-BRC'],
  ].map(([slug, name, code]) => ({
    slug, name, category: 'forged-pressed-couplers', itemCode: code, image: img(slug),
    description: `${name} manufactured to EN-74 / BS-1139 standard.`,
    specs: { Standard: 'EN-74 / BS-1139' }, variants: null,
  })),

  // ---------------- Framework Accessories ----------------
  {
    slug: 'framework-accessory-01',
    name: 'Framework Accessory 01',
    category: 'framework-accessories',
    itemCode: 'FA-01',
    image: img('fa-01'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-02',
    name: 'Framework Accessory 02',
    category: 'framework-accessories',
    itemCode: 'FA-02',
    image: img('fa-02'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-03',
    name: 'Framework Accessory 03',
    category: 'framework-accessories',
    itemCode: 'FA-03',
    image: img('fa-03'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-04',
    name: 'Framework Accessory 04',
    category: 'framework-accessories',
    itemCode: 'FA-04',
    image: img('fa-04'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-05',
    name: 'Framework Accessory 05',
    category: 'framework-accessories',
    itemCode: 'FA-05',
    image: img('fa-05'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-06',
    name: 'Framework Accessory 06',
    category: 'framework-accessories',
    itemCode: 'FA-06',
    image: img('fa-06'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-07',
    name: 'Framework Accessory 07',
    category: 'framework-accessories',
    itemCode: 'FA-07',
    image: img('fa-07'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-08',
    name: 'Framework Accessory 08',
    category: 'framework-accessories',
    itemCode: 'FA-08',
    image: img('fa-08'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-09',
    name: 'Framework Accessory 09',
    category: 'framework-accessories',
    itemCode: 'FA-09',
    image: img('fa-09'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-10',
    name: 'Framework Accessory 10',
    category: 'framework-accessories',
    itemCode: 'FA-10',
    image: img('fa-10'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-11',
    name: 'Framework Accessory 11',
    category: 'framework-accessories',
    itemCode: 'FA-11',
    image: img('fa-11'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-12',
    name: 'Framework Accessory 12',
    category: 'framework-accessories',
    itemCode: 'FA-12',
    image: img('fa-12'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-13',
    name: 'Framework Accessory 13',
    category: 'framework-accessories',
    itemCode: 'FA-13',
    image: img('fa-13'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-14',
    name: 'Framework Accessory 14',
    category: 'framework-accessories',
    itemCode: 'FA-14',
    image: img('fa-14'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-15',
    name: 'Framework Accessory 15',
    category: 'framework-accessories',
    itemCode: 'FA-15',
    image: img('fa-15'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },
  {
    slug: 'framework-accessory-16',
    name: 'Framework Accessory 16',
    category: 'framework-accessories',
    itemCode: 'FA-16',
    image: img('fa-16'),
    description: 'Formwork and framework accessory component for construction, shoring and formwork applications manufactured by Shrihaan Cast & Forge Pvt. Ltd.',
    specs: {},
    variants: null,
  },

  // ---------------- Frames ----------------
  {
    slug: 'walk-through-frame', name: 'Walk Through Frame', category: 'frames',
    itemCode: 'SS-FS-WTF', image: img('walk-through-frame'),
    description: 'Walk through frame.',
    specs: { 'Size (mm)': '2006*1524, 1930*1524, 1219*1700, 1219*1930, 914*1700' }, variants: null,
  },
  {
    slug: 'ladder-frame', name: 'Ladder Frame', category: 'frames',
    itemCode: 'S5-FS-LF', image: img('ladder-frame'),
    description: 'Ladder frame.',
    specs: { 'Size (mm)': '1828*762, 1524*762, 914*762' }, variants: null,
  },
  {
    slug: 'walk-through-frame-type-2', name: 'Walk Through Frame (Type 2)', category: 'frames',
    itemCode: '55-FS-WTF-1', image: img('walk-through-frame-type-2'),
    description: 'Walk through frame.',
    specs: { 'Size (mm)': '2006*1524, 1930*1524, 1219*1700, 1219*1930, 914*1700' }, variants: null,
  },
  {
    slug: 'mason-frame', name: 'Mason Frame', category: 'frames',
    itemCode: 'SS-FS-MFS', image: img('mason-frame'),
    description: 'Mason frame.',
    specs: { 'Size (mm)': '1930*1524, 1524*1524, 1220*1524, 914*1524' }, variants: null,
  },
  {
    slug: 'double-ladder-frame', name: 'Double Ladder Frame', category: 'frames',
    itemCode: 'SS-FS-DLF', image: img('double-ladder-frame'),
    description: 'Double ladder frame.',
    specs: { 'Size (mm)': '1524*1524, 1524*1930' }, variants: null,
  },
  {
    slug: 'cross-brace', name: 'Cross Brace', category: 'frames',
    itemCode: 'SS-FS-CB', image: img('cross-brace'),
    description: 'Cross brace for frame systems.',
    specs: { 'Size (mm)': '1219*610, 1219*914, 1219*1219, 1524*610, 1829*610, 1829*1229, 2133*1219, 2438*1219, 3048*914, 3038*219' }, variants: null,
  },
  {
    slug: 'frame-guard-rail', name: 'Frame Guard Rail', category: 'frames',
    itemCode: 'SS-FS-FGR', image: img('frame-guard-rail'),
    description: 'Guard rail for frame systems.',
    specs: { 'Size (mm)': '914, 1219, 1524, 2133, 2438, 3048' }, variants: null,
  },
];

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);
export const productsByCategory = (slug) => PRODUCTS.filter((p) => p.category === slug);
export const categoryCount = (slug) => productsByCategory(slug).length;

// Primary product divisions — single source of truth for the Products navigation.
export const DIVISIONS = [
  {
    slug: 'forging-parts',
    name: 'Forging Parts',
    heading: 'Forging Parts',
    image: '/products/parts/div-forging-3d.jpg',
    description: 'Precision-forged components — levers, arms, forks, pins, and custom plates.',
  },
  {
    slug: 'tractorlink',
    name: 'Tractorlink',
    heading: 'Tractor-link',
    image: '/products/parts/eye-rod-3d.jpg',
    description: 'Tractor linkage components — ball studs, tie rod ends, top links, and eye rods.',
  },
  {
    slug: 'agriculture-parts',
    name: 'Agriculture Parts',
    heading: 'Agriculture Parts',
    image: '/products/parts/agriculture-3d.jpg',
    description: 'Forged components for agricultural machinery and material handling equipment.',
  },
  {
    slug: 'auto-parts',
    name: 'Auto Parts',
    heading: 'Auto Parts',
    image: '/products/parts/auto-3d.jpg',
    description: 'Forged automobile hardware — high-tensile hinges, strikers, latches, and brackets.',
  },
  {
    slug: 'scaffolding-parts',
    name: 'Scaffolding Parts',
    heading: 'Scaffolding Parts',
    image: '/products/parts/scaffolding-3d.jpg',
    description: 'Complete scaffolding, shoring and formwork range — Ringlock, Cuplock, and Kwikstage.',
  },
];

export const getDivision = (slug) => DIVISIONS.find((d) => d.slug === slug);

// Central validation for scaffolding catalogue products.
export const isCompleteScaffolding = (p) =>
  Boolean(p && p.name && p.image && p.category && p.description && p.status !== 'inactive');
export const visibleScaffolding = (list) => list.filter(isCompleteScaffolding);

// Maps product slugs to parametric 3D visualization builders (src/three/models.jsx).
// Products without a parametric builder use their catalogue photograph in a 3D turntable panel.
export const MODEL_MAP = {
  'ringlock-vertical': { key: 'ringlockVertical', params: { len: 2.0, rings: 4 } },
  'ringlock-ledger': { key: 'ledger', params: { len: 1.5 } },
  'ringlock-brace': { key: 'brace', params: { len: 1.7 } },
  'base-collar': { key: 'baseCollar' },
  'double-ledger': { key: 'doubleLedger', params: { len: 1.5 } },
  'board-bracket': { key: 'boardBracket' },
  'brace-end': { key: 'fitting' },
  'ledger-end': { key: 'fitting' },
  'rosette': { key: 'rosette' },
  'wedge': { key: 'wedge' },
  'spigot': { key: 'spigot' },
  'cuplock-vertical': { key: 'cuplockVertical', params: { len: 2.0, nodes: 4 } },
  'cuplock-ledger': { key: 'cuplockLedger', params: { len: 1.5 } },
  'cuplock-brace': { key: 'brace', params: { len: 1.7 } },
  'cuplock-transom': { key: 'transom', params: { len: 1.3 } },
  'cuplock-board-bracket': { key: 'boardBracket' },
  'top-cup': { key: 'cup' },
  'bottom-cup': { key: 'cup' },
  'ledger-blade': { key: 'fitting' },
  'cuplock-spigot': { key: 'spigot' },
  'support-guard-rail-500': { key: 'guardRail', params: { h: 1.0 } },
  'guard-rail-1145': { key: 'guardRail', params: { h: 1.145 } },
  'guard-rail-300': { key: 'guardRail', params: { h: 0.9 } },
  'support-guard-rail-200': { key: 'guardRail', params: { h: 0.85 } },
  'guard-rail-100': { key: 'guardRail', params: { h: 0.8 } },
  'formwork-strip-clamp': { key: 'stripClamp' },
  'kwikstage-vertical': { key: 'kwikstageVertical', params: { len: 2.0, nodes: 4 } },
  'kwikstage-ledger': { key: 'ledger', params: { len: 1.5 } },
  'kwikstage-diagonal-brace': { key: 'brace', params: { len: 1.7 } },
  'broad-bracket': { key: 'boardBracket' },
  'kwikstage-transom': { key: 'transom', params: { len: 1.3 } },
  'kwikstage-board-bracket': { key: 'boardBracket' },
  'v-pressing': { key: 'fitting' },
  'guiding-pin': { key: 'pin' },
  'u-clip': { key: 'fitting' },
  'kwikstage-wedge-pin': { key: 'wedge' },
  'ladder': { key: 'ladder', params: { h: 1.5, w: 0.42, rungs: 5 } },
  'heavy-duty-ladder': { key: 'ladder', params: { h: 1.5, w: 0.45, rungs: 5 } },
  'expandable-gate': { key: 'gate' },
  'ladder-bracket': { key: 'boardBracket' },
  'twist-lock-tube-lock': { key: 'twistLock', params: { h: 0.6 } },
  'twist-lock-base-plate': { key: 'basePlate' },
  'hollow-screw-base-jack': { key: 'jack', params: { head: 'flat', h: 0.6 } },
  'solid-screw-jack': { key: 'jack', params: { head: 'flat', h: 0.55 } },
  'swivel-screw-jack': { key: 'jack', params: { head: 'swivel', h: 0.6 } },
  'u-head-screw-jack': { key: 'jack', params: { head: 'uhead', h: 0.6 } },
  'fork-head-screw-jack': { key: 'jack', params: { head: 'fork', h: 0.6 } },
  'universal-screw-jack': { key: 'jack', params: { head: 'flat', h: 0.6 } },
  'u-head-plate': { key: 'basePlate' },
  'jack-base-plate': { key: 'basePlate' },
  'caster-wheel': { key: 'casterWheel' },
  'american-type-steel-plank': { key: 'plank', params: { len: 1.57, w: 0.25 } },
  'american-type-steel-plank-hook': { key: 'plank', params: { len: 1.57, w: 0.25, hooks: true } },
  'steel-raised-hook-plank': { key: 'plank', params: { len: 1.57, w: 0.25, hooks: true } },
  'light-duty-steel-plank-without-head': { key: 'plank', params: { len: 1.57, w: 0.25 } },
  'steel-plank-without-hook': { key: 'plank', params: { len: 1.57, w: 0.25 } },
  'aluminium-plank-with-manhole': { key: 'plank', params: { len: 1.57, w: 0.61, hooks: true } },
  'interlocking-toe-board': { key: 'plank', params: { len: 1.57, w: 0.15 } },
  'aluminium-plank': { key: 'plank', params: { len: 1.57, w: 0.32 } },
  'plank-with-manhole': { key: 'plank', params: { len: 1.57, w: 0.61, hooks: true } },
  'light-duty-prop': { key: 'prop', params: { duty: 'light' } },
  'medium-duty-prop': { key: 'prop', params: { duty: 'medium' } },
  'heavy-duty-prop': { key: 'prop', params: { duty: 'heavy' } },
  'light-duty-prop-nut': { key: 'propNut' },
  'light-duty-prop-sleeve': { key: 'sleeve' },
  'prop-nut-cover': { key: 'cup' },
  'g-type-locking-pin': { key: 'pin' },
  'locking-pin-with-chain': { key: 'pin' },
  'tripod': { key: 'tripod' },
  'fork-head': { key: 'forkHead' },
  'prop-nut': { key: 'propNut' },
  'flower-base-plate': { key: 'basePlate' },
  'prop-base-plate': { key: 'basePlate' },
  'prop-sleeve': { key: 'sleeve' },
  'british-type-right-angle-coupler': { key: 'coupler', params: { kind: 'right' } },
  'british-type-swivel-coupler': { key: 'coupler', params: { kind: 'swivel' } },
  'american-type-swivel-coupler': { key: 'coupler', params: { kind: 'swivel' } },
  'american-type-right-angle-coupler': { key: 'coupler', params: { kind: 'right' } },
  'german-type-right-angle-coupler': { key: 'coupler', params: { kind: 'right' } },
  'german-type-swivel-coupler': { key: 'coupler', params: { kind: 'swivel' } },
  'combination-swivel-coupler': { key: 'coupler', params: { kind: 'swivel' } },
  'combination-right-angle-coupler': { key: 'coupler', params: { kind: 'right' } },
  'grave-lock-coupler': { key: 'coupler', params: { kind: 'right' } },
  'putlog-coupler': { key: 'coupler', params: { kind: 'right' } },
  'single-coupler': { key: 'coupler', params: { kind: 'right' } },
  'forged-joint-pin': { key: 'sleeve' },
  'british-type-pressed-right-angle-coupler': { key: 'coupler', params: { kind: 'right' } },
  'british-type-pressed-swivel-coupler': { key: 'coupler', params: { kind: 'swivel' } },
  'sleeve-coupler': { key: 'sleeve' },
  'brc-coupler': { key: 'coupler', params: { kind: 'right' } },
  'framework-accessories-range': { key: 'imagePanel' },
  'walk-through-frame': { key: 'frameWalkThrough' },
  'ladder-frame': { key: 'frameLadder' },
  'walk-through-frame-type-2': { key: 'frameWalkThrough' },
  'mason-frame': { key: 'frameMason' },
  'double-ladder-frame': { key: 'frameDoubleLadder' },
  'cross-brace': { key: 'crossBrace' },
  'frame-guard-rail': { key: 'guardRail', params: { h: 1.0 } },
};

export const getModel = (slug) => MODEL_MAP[slug] || { key: 'imagePanel' };
