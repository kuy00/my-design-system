// DESIGN.md 스티치 스펙 준수 검사기
// 사용: npm run lint:design   (또는 node validate.mjs)
import { readFileSync } from 'node:fs';

const ALLOWED_FM_KEYS = ['version', 'name', 'description', 'colors', 'typography', 'rounded', 'spacing', 'components'];
const CANONICAL_SECTIONS = ['Overview', 'Colors', 'Typography', 'Layout', 'Elevation & Depth', 'Shapes', 'Components', "Do's and Don'ts"];
const ALLOWED_COMPONENT_PROPS = ['backgroundColor', 'textColor', 'typography', 'rounded', 'padding', 'size', 'height', 'width'];
const REF_ROOTS = ['colors', 'typography', 'rounded', 'spacing'];

const src = readFileSync('DESIGN.md', 'utf8');
const parts = src.split(/^---$/m);
const fm = parts[1] || '';
const body = parts.slice(2).join('---');
const errors = [];
const warnings = [];

// ---- front matter: top-level keys ----
const topKeys = [...fm.matchAll(/^([a-zA-Z][\w]*):/gm)].map((m) => m[1]);
topKeys.forEach((k) => { if (!ALLOWED_FM_KEYS.includes(k)) warnings.push(`unknown-key: front matter '${k}' 는 스펙 허용 키가 아님`); });
if (!/^\s{2}primary:/m.test(fm.split('colors:')[1] || '')) errors.push(`missing-primary: colors.primary 미정의`);

// ---- 정의된 토큰 경로 수집 (root.child) ----
const defined = new Set();
const fmLines = fm.split('\n');
let curRoot = null;
for (const line of fmLines) {
  const root = line.match(/^([a-zA-Z][\w]*):/);
  if (root) { curRoot = root[1]; continue; }
  const child = line.match(/^ {2}([\w-]+):/);
  if (child && curRoot) defined.add(`${curRoot}.${child[1]}`);
}

// ---- 참조 {a.b} 검사 ----
for (const m of fm.matchAll(/\{([\w.-]+)\}/g)) {
  const ref = m[1];
  const root = ref.split('.')[0];
  if (!REF_ROOTS.includes(root)) { errors.push(`broken-ref: {${ref}} — 루트 '${root}' 는 참조 불가`); continue; }
  const twoLevel = ref.split('.').slice(0, 2).join('.');
  if (!defined.has(twoLevel)) errors.push(`broken-ref: {${ref}} — 정의되지 않은 토큰`);
}

// ---- 컴포넌트 속성 검사 ----
const compBlock = fm.split('\ncomponents:')[1] || '';
for (const line of compBlock.split('\n')) {
  const prop = line.match(/^ {4}([\w-]+):/);
  if (prop && !ALLOWED_COMPONENT_PROPS.includes(prop[1])) {
    warnings.push(`component-prop: '${prop[1]}' 는 허용 속성 아님 (${ALLOWED_COMPONENT_PROPS.join('/')})`);
  }
}

// ---- 섹션 순서 검사 ----
const headings = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
headings.forEach((h) => { if (!CANONICAL_SECTIONS.includes(h)) warnings.push(`unknown-section: '## ${h}' 는 스펙 섹션 아님`); });
let idx = -1;
for (const h of headings) {
  const pos = CANONICAL_SECTIONS.indexOf(h);
  if (pos === -1) continue;
  if (pos < idx) { errors.push(`section-order: '## ${h}' 순서 어긋남`); }
  idx = Math.max(idx, pos);
}

// ---- 결과 ----
console.log(`\n📋 DESIGN.md 스펙 검사`);
console.log(`  front matter 키: ${topKeys.join(', ')}`);
console.log(`  섹션: ${headings.join(' → ')}`);
console.log(`  정의된 토큰 참조 경로: ${defined.size}개`);
if (errors.length) { console.log(`\n🔴 에러 ${errors.length}`); errors.forEach((e) => console.log('  - ' + e)); }
if (warnings.length) { console.log(`\n🟡 경고 ${warnings.length}`); warnings.forEach((w) => console.log('  - ' + w)); }
if (!errors.length && !warnings.length) console.log(`\n✅ 위배 없음 — 스티치 스펙 완전 준수`);
process.exit(errors.length ? 1 : 0);
