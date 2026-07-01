// Build script — DESIGN.md(유일 원천) → tokens.json → 5개 플랫폼 파일 + 데모
// 사용: npm run build   (감시 모드: npm run watch)
//   1) DESIGN.md 파싱 → tokens/tokens.json 생성
//   2) tokens.json → 플랫폼 파일 + web/tokens.css (Style Dictionary)
//   3) web/tokens.css → demo/index.html 주입
import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, watchFile } from 'node:fs';
import { genTokens } from './gen-tokens.mjs';

// ---------- helpers ----------
const val = (t) => t.value ?? t.original?.$value;
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const num = (v) => parseFloat(v); // "40px" -> 40
const pick = (tokens, ...prefix) => tokens.filter((t) => prefix.every((p, i) => t.path[i] === p));
const get = (tokens, ...path) => {
  const t = tokens.find((x) => x.path.join('.') === path.join('.'));
  return t ? val(t) : undefined;
};
const COLOR_ORDER = ['background', 'surface', 'border', 'text', 'textMuted', 'primary', 'accent', 'success', 'error'];
const orderColors = (arr) => [...arr].sort((a, b) => COLOR_ORDER.indexOf(a.path[2]) - COLOR_ORDER.indexOf(b.path[2]));
const hex6 = (h) => h.replace('#', '').toUpperCase();
const GEN = 'Generated from tokens.json — do not edit by hand.';

// ---------- WEB: CSS variables ----------
StyleDictionary.registerFormat({
  name: 'my/css',
  format: ({ dictionary: { allTokens: t } }) => {
    const light = orderColors(pick(t, 'color', 'light'));
    const dark = orderColors(pick(t, 'color', 'dark'));
    const L = [];
    L.push(`/* My Design System — Web (CSS Variables). ${GEN} */`, '', ':root {');
    L.push(`  --color-primary: ${get(t, 'color', 'brand', 'primary')};`);
    light.filter((x) => x.path[2] !== 'primary').forEach((x) => L.push(`  --color-${kebab(x.path[2])}: ${val(x)};`));
    L.push('');
    pick(t, 'elevation').forEach((x) => L.push(`  --${kebab(x.path[1])}: ${val(x)};`));
    L.push('');
    const fam = get(t, 'font', 'family').map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', ');
    L.push(`  --font-family: ${fam};`);
    pick(t, 'font', 'size').forEach((x) => L.push(`  --font-size-${x.path[2]}: ${val(x)};`));
    pick(t, 'font', 'weight').forEach((x) => L.push(`  --font-weight-${x.path[2]}: ${val(x)};`));
    L.push('');
    pick(t, 'spacing').forEach((x) => L.push(`  --space-${x.path[1]}: ${val(x)};`));
    pick(t, 'radius').forEach((x) => L.push(`  --radius-${x.path[1]}: ${val(x)};`));
    pick(t, 'breakpoint').forEach((x) => L.push(`  --bp-${x.path[1]}: ${val(x)};`));
    L.push('}', '');
    const darkVars = dark.filter((x) => x.path[2] !== 'primary').map((x) => `  --color-${kebab(x.path[2])}: ${val(x)};`).join('\n');
    L.push('[data-theme="dark"] {', darkVars, '}', '');
    L.push('@media (prefers-color-scheme: dark) {', '  :root:not([data-theme="light"]) {', darkVars.replace(/^/gm, '  '), '  }', '}', '');
    return L.join('\n');
  },
});

// ---------- WEB: React/TS object ----------
StyleDictionary.registerFormat({
  name: 'my/web-ts',
  format: ({ dictionary: { allTokens: t } }) => {
    const obj = (arr) => arr.map((x) => `  ${x.path[2]}: '${val(x)}',`).join('\n');
    const scale = (arr, q = false) => arr.map((x) => `${x.path[x.path.length - 1]}: ${q ? `'${val(x)}'` : num(val(x))}`).join(', ');
    const fam = get(t, 'font', 'family').map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', ');
    return `// My Design System — React / Web (TypeScript). ${GEN}

export const brand = {
${pick(t, 'color', 'brand').map((x) => `  ${x.path[2]}: '${val(x)}',`).join('\n')}
} as const;

export const light = {
${obj(orderColors(pick(t, 'color', 'light')))}
} as const;

export const dark = {
${obj(orderColors(pick(t, 'color', 'dark')))}
} as const;

export const typography = {
  fontFamily: "${fam}",
  size: { ${scale(pick(t, 'font', 'size'))} },
  weight: { ${scale(pick(t, 'font', 'weight'))} },
  lineHeight: { ${scale(pick(t, 'font', 'lineHeight'))} },
} as const;

export const spacing = { ${scale(pick(t, 'spacing'))} } as const;
export const radius = { ${scale(pick(t, 'radius'))} } as const;
export const breakpoints = { ${scale(pick(t, 'breakpoint'))} } as const;

export const elevation = {
${pick(t, 'elevation').map((x) => `  ${x.path[1]}: '${val(x)}',`).join('\n')}
} as const;

export const theme = { brand, light, dark, typography, spacing, radius, breakpoints, elevation };
export type ColorScheme = typeof light;
export default theme;
`;
  },
});

// ---------- React Native ----------
StyleDictionary.registerFormat({
  name: 'my/rn-ts',
  format: ({ dictionary: { allTokens: t } }) => {
    const obj = (arr) => arr.map((x) => `    ${x.path[2]}: '${val(x)}',`).join('\n');
    const scale = (arr) => arr.map((x) => `${x.path[x.path.length - 1]}: ${num(val(x))}`).join(', ');
    const lh = pick(t, 'font', 'lineHeight').map((x) => {
      const key = x.path[2];
      return `${key}: ${Math.round(num(get(t, 'font', 'size', key)) * num(val(x)))}`;
    }).join(', ');
    return `// My Design System — React Native (TypeScript). ${GEN}

export const brand = {
${pick(t, 'color', 'brand').map((x) => `  ${x.path[2]}: '${val(x)}',`).join('\n')}
} as const;

export const colors = {
  light: {
${obj(orderColors(pick(t, 'color', 'light')))}
  },
  dark: {
${obj(orderColors(pick(t, 'color', 'dark')))}
  },
} as const;

export const fontFamily = 'Space Grotesk';
export const fontFamilyKR = 'Pretendard';
export const fontSize = { ${scale(pick(t, 'font', 'size'))} } as const;
export const fontWeight = { ${pick(t, 'font', 'weight').map((x) => `${x.path[2]}: '${val(x)}'`).join(', ')} } as const;
export const lineHeight = { ${lh} } as const; // size * ratio, rounded
export const spacing = { ${scale(pick(t, 'spacing'))} } as const;
export const radius = { ${scale(pick(t, 'radius'))} } as const;
export const breakpoints = { ${scale(pick(t, 'breakpoint'))} } as const;

export type Scheme = keyof typeof colors;
export const theme = { brand, colors, fontFamily, fontFamilyKR, fontSize, fontWeight, lineHeight, spacing, radius, breakpoints };
export default theme;
`;
  },
});

// ---------- Flutter (Dart) ----------
StyleDictionary.registerFormat({
  name: 'my/dart',
  format: ({ dictionary: { allTokens: t } }) => {
    const scheme = (mode) => orderColors(pick(t, 'color', mode)).map((x) => `    ${x.path[2]}: Color(0xFF${hex6(val(x))}),`).join('\n');
    const dims = (arr, prefix) => arr.map((x) => `${prefix}${cap(x.path[x.path.length - 1])} = ${num(val(x))}`).join(', ');
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return `// My Design System — Flutter (Dart). ${GEN}
import 'package:flutter/material.dart';

class AppColorScheme {
  final Color background, surface, border, text, textMuted, primary, accent, success, error;
  const AppColorScheme({
    required this.background, required this.surface, required this.border,
    required this.text, required this.textMuted, required this.primary,
    required this.accent, required this.success, required this.error,
  });
}

class DesignTokens {
  DesignTokens._();

  static const Color brandPrimary = Color(0xFF${hex6(get(t, 'color', 'brand', 'primary'))});
  static const Color brandAccentDark = Color(0xFF${hex6(get(t, 'color', 'brand', 'accentDark'))});
  static const Color brandAccentLight = Color(0xFF${hex6(get(t, 'color', 'brand', 'accentLight'))});

  static const AppColorScheme light = AppColorScheme(
${scheme('light')}
  );

  static const AppColorScheme dark = AppColorScheme(
${scheme('dark')}
  );

  static const String fontFamily = 'Space Grotesk';
  static const double ${pick(t, 'font', 'size').map((x) => `fs${cap(x.path[2])} = ${num(val(x))}`).join(', ')};
  static const FontWeight fwRegular = FontWeight.w400;
  static const FontWeight fwSemibold = FontWeight.w600;
  static const FontWeight fwBold = FontWeight.w700;

  static const double ${dims(pick(t, 'spacing'), 'space')};
  static const double ${dims(pick(t, 'radius'), 'radius')};
  static const double ${dims(pick(t, 'breakpoint'), 'bp')};
}
`;
  },
});

// ---------- iOS (SwiftUI) ----------
StyleDictionary.registerFormat({
  name: 'my/swift',
  format: ({ dictionary: { allTokens: t } }) => {
    const scheme = (mode) => orderColors(pick(t, 'color', mode)).map((x) => `        ${x.path[2]}: Color(hex: 0x${hex6(val(x))})`).join(',\n');
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const dims = (arr, prefix) => arr.map((x) => `${prefix}${cap(x.path[x.path.length - 1])}: CGFloat = ${num(val(x))}`).join(', ');
    return `// My Design System — iOS (SwiftUI). ${GEN}
import SwiftUI

extension Color {
    init(hex: UInt32) {
        self.init(.sRGB,
            red:   Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8)  & 0xFF) / 255,
            blue:  Double(hex & 0xFF) / 255,
            opacity: 1)
    }
}

struct AppColorScheme {
    let background, surface, border, text, textMuted, primary, accent, success, error: Color
}

enum DesignTokens {
    static let brandPrimary = Color(hex: 0x${hex6(get(t, 'color', 'brand', 'primary'))})
    static let brandAccentDark = Color(hex: 0x${hex6(get(t, 'color', 'brand', 'accentDark'))})
    static let brandAccentLight = Color(hex: 0x${hex6(get(t, 'color', 'brand', 'accentLight'))})

    static let light = AppColorScheme(
${scheme('light')}
    )

    static let dark = AppColorScheme(
${scheme('dark')}
    )

    static let fontFamily = "Space Grotesk"
    static let ${dims(pick(t, 'font', 'size'), 'fs')}
    static let ${dims(pick(t, 'spacing'), 'space')}
    static let ${dims(pick(t, 'radius'), 'radius')}
    static let ${dims(pick(t, 'breakpoint'), 'bp')}
}
`;
  },
});

// ---------- Android (XML) ----------
const androidColors = (mode, includeBrand) => ({ dictionary: { allTokens: t } }) => {
  const rows = [];
  if (includeBrand) {
    pick(t, 'color', 'brand').forEach((x) => rows.push(`    <color name="brand_${kebab(x.path[2]).replace(/-/g, '_')}">${val(x)}</color>`));
    rows.push('');
  }
  orderColors(pick(t, 'color', mode)).forEach((x) => rows.push(`    <color name="${kebab(x.path[2]).replace(/-/g, '_')}">${val(x)}</color>`));
  return `<?xml version="1.0" encoding="utf-8"?>
<!-- My Design System — Android ${mode.toUpperCase()} palette. ${GEN}
     Place in res/values${mode === 'dark' ? '-night' : ''}/colors.xml -->
<resources>
${rows.join('\n')}
</resources>
`;
};
StyleDictionary.registerFormat({ name: 'my/android-colors-light', format: androidColors('light', true) });
StyleDictionary.registerFormat({ name: 'my/android-colors-dark', format: androidColors('dark', false) });
StyleDictionary.registerFormat({
  name: 'my/android-dimens',
  format: ({ dictionary: { allTokens: t } }) => {
    const row = (name, v, unit) => `    <dimen name="${name}">${num(v)}${unit}</dimen>`;
    const sp = pick(t, 'spacing').map((x) => row(`space_${x.path[1]}`, val(x), 'dp')).join('\n');
    const rad = pick(t, 'radius').map((x) => row(`radius_${x.path[1]}`, val(x), 'dp')).join('\n');
    const fs = pick(t, 'font', 'size').map((x) => row(`font_${x.path[2]}`, val(x), 'sp')).join('\n');
    return `<?xml version="1.0" encoding="utf-8"?>
<!-- My Design System — Android spacing / radius / type scale. ${GEN}
     Place in res/values/dimens.xml -->
<resources>
    <!-- spacing -->
${sp}

    <!-- radius -->
${rad}

    <!-- type scale -->
${fs}
</resources>
`;
  },
});

// ---------- config ----------
const config = {
  source: ['tokens/tokens.json'],
  usesDtcg: true,
  log: { verbosity: 'silent', warnings: 'disabled' },
  platforms: {
    css: { transformGroup: 'css', buildPath: 'tokens/web/', files: [{ destination: 'tokens.css', format: 'my/css' }] },
    webts: { buildPath: 'tokens/web/', files: [{ destination: 'theme.ts', format: 'my/web-ts' }] },
    rn: { buildPath: 'tokens/react-native/', files: [{ destination: 'theme.ts', format: 'my/rn-ts' }] },
    flutter: { buildPath: 'tokens/flutter/', files: [{ destination: 'design_tokens.dart', format: 'my/dart' }] },
    ios: { buildPath: 'tokens/ios/', files: [{ destination: 'DesignTokens.swift', format: 'my/swift' }] },
    android: {
      buildPath: 'tokens/android/',
      files: [
        { destination: 'values/colors.xml', format: 'my/android-colors-light' },
        { destination: 'values-night/colors.xml', format: 'my/android-colors-dark' },
        { destination: 'values/dimens.xml', format: 'my/android-dimens' },
      ],
    },
  },
};

// web/tokens.css 를 demo/index.html 의 마커 사이에 주입
function injectDemo() {
  const css = readFileSync('tokens/web/tokens.css', 'utf8').trim();
  const demoPath = 'demo/index.html';
  const demo = readFileSync(demoPath, 'utf8');
  const block = `/* TOKENS:START — generated from tokens.json, do not edit */\n${css}\n/* TOKENS:END */`;
  const next = demo.replace(/\/\* TOKENS:START[\s\S]*?\/\* TOKENS:END \*\//, block);
  writeFileSync(demoPath, next);
}

async function build() {
  genTokens();                          // 1) DESIGN.md → tokens/tokens.json
  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();         // 2) tokens.json → 플랫폼 파일 + web/tokens.css
  injectDemo();                         // 3) web/tokens.css → demo/index.html
  console.log('✅ DESIGN.md → tokens.json → 플랫폼 파일 5종 + 데모 생성 완료');
}

await build();

if (process.argv.includes('--watch')) {
  console.log('👀 watching DESIGN.md ...');
  watchFile('DESIGN.md', { interval: 500 }, async () => {
    try { await build(); } catch (e) { console.error(e); }
  });
}
