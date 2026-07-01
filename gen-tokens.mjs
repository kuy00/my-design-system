// DESIGN.md (유일 원천) → tokens/tokens.json (W3C DTCG) 생성
// DESIGN.md front matter(다크 팔레트·타이포·rounded·spacing) + Colors 섹션 라이트 표를 파싱한다.
// elevation·breakpoint는 스펙상 front matter에 못 담으므로(프로즈로만 존재) 여기 상수로 둔다.
import { readFileSync, writeFileSync } from 'node:fs';
import YAML from 'yaml';

const HEADINGS = ['h1', 'h2', 'h3', 'body', 'caption'];
const COLOR_ROLES = ['primary', 'accent', 'background', 'surface', 'border', 'text', 'textMuted', 'success', 'error'];

// 스펙 front matter로 표현 불가한 값 (DESIGN.md 프로즈와 동기화해 유지)
const ELEVATION = {
  shadowSm: '0 1px 2px rgba(0,0,0,0.06)',
  shadowMd: '0 4px 14px rgba(124,58,237,0.20)',
  glowPrimary: '0 0 20px rgba(124,58,237,0.35)',
};
const BREAKPOINT = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' };
const WEIGHT_SCALE = { regular: 400, semibold: 600, bold: 700 };

const c = (v) => ({ $type: 'color', $value: v });
const dim = (v) => ({ $type: 'dimension', $value: v });
const numT = (v) => ({ $type: 'number', $value: v });
const remToPx = (s) => `${Math.round(parseFloat(s) * 16)}px`; // "2.5rem" -> "40px"

export function genTokens() {
  const md = readFileSync('DESIGN.md', 'utf8');

  // 1) front matter
  const fmMatch = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) throw new Error('DESIGN.md front matter를 찾을 수 없음');
  const fm = YAML.parse(fmMatch[1]);
  const dark = fm.colors;

  // 2) Colors 섹션 "라이트 모드 대체값" 표 파싱
  const lightRegion = (md.split('라이트 모드 대체값')[1] || '').split(/\n##\s/)[0];
  const light = {};
  for (const m of lightRegion.matchAll(/^\|\s*([A-Za-z]+)\s*\|\s*`(#[0-9A-Fa-f]{6})`/gm)) light[m[1]] = m[2];
  for (const role of COLOR_ROLES) {
    if (!dark[role]) throw new Error(`front matter colors.${role} 없음`);
    if (!light[role]) throw new Error(`라이트 표에 ${role} 없음`);
  }

  // ── 파싱 누락 감지: DESIGN.md에 생성기가 반영 못하는 새 키가 있으면 실패 ──
  for (const k of Object.keys(dark))
    if (!COLOR_ROLES.includes(k)) throw new Error(`parsing-omission: colors.${k} 는 생성기 COLOR_ROLES에 없음 → gen-tokens.mjs 갱신 필요`);
  for (const k of Object.keys(fm.typography))
    if (k !== 'fontFamily' && !HEADINGS.includes(k)) throw new Error(`parsing-omission: typography.${k} 는 생성기 HEADINGS에 없음 → gen-tokens.mjs 갱신 필요`);

  // ── 상수(elevation/breakpoint)가 DESIGN.md 프로즈와 동기화됐는지 검증 ──
  for (const [k, v] of Object.entries(ELEVATION))
    if (!md.includes(v)) throw new Error(`sync-drift: elevation.${k} "${v}" 가 DESIGN.md 프로즈에 없음 (프로즈↔상수 불일치)`);
  const bpStr = `sm ${parseInt(BREAKPOINT.sm)} · md ${parseInt(BREAKPOINT.md)} · lg ${parseInt(BREAKPOINT.lg)} · xl ${parseInt(BREAKPOINT.xl)}`;
  if (!md.includes(bpStr)) throw new Error(`sync-drift: breakpoint "${bpStr}" 가 DESIGN.md Layout 프로즈에 없음 (프로즈↔상수 불일치)`);

  // 3) typography
  const fam = fm.typography.fontFamily.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
  const size = {}, lineHeight = {}, letterSpacing = {};
  for (const h of HEADINGS) {
    const t = fm.typography[h];
    size[h] = dim(remToPx(String(t.fontSize)));
    lineHeight[h] = numT(t.lineHeight);
    if (t.letterSpacing) letterSpacing[h] = dim(String(t.letterSpacing));
  }

  // 4) 조립 (DTCG)
  const tokens = {
    $description: 'GENERATED from DESIGN.md — do not edit by hand. (원천: DESIGN.md, 생성기: gen-tokens.mjs)',
    color: {
      brand: {
        primary: c(dark.primary),
        accentDark: c(dark.accent),
        accentLight: c(light.accent),
      },
      dark: Object.fromEntries(COLOR_ROLES.map((r) => [r, c(dark[r])])),
      light: Object.fromEntries(COLOR_ROLES.map((r) => [r, c(light[r])])),
    },
    font: {
      family: { $type: 'fontFamily', $value: fam },
      size,
      weight: Object.fromEntries(Object.entries(WEIGHT_SCALE).map(([k, v]) => [k, { $type: 'fontWeight', $value: v }])),
      lineHeight,
      letterSpacing,
    },
    spacing: Object.fromEntries(Object.entries(fm.spacing).map(([k, v]) => [k, dim(String(v))])),
    radius: Object.fromEntries(Object.entries(fm.rounded).map(([k, v]) => [k, dim(String(v))])),
    elevation: Object.fromEntries(Object.entries(ELEVATION).map(([k, v]) => [k, { $type: 'shadow', $value: v }])),
    breakpoint: Object.fromEntries(Object.entries(BREAKPOINT).map(([k, v]) => [k, dim(v)])),
  };

  writeFileSync('tokens/tokens.json', JSON.stringify(tokens, null, 2) + '\n');
  return tokens;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  genTokens();
  console.log('✅ DESIGN.md → tokens/tokens.json 생성 완료');
}
