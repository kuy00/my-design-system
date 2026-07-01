# My Design System

다크(기본) + 라이트 페어링, 퍼플 액센트(`#7C3AED`) 공유. 웹·모바일 전 플랫폼에서 재사용하는 개인 디자인 시스템.

> **이 프로젝트는 [Stitch DESIGN.md 스펙](https://github.com/google-labs-code/design.md)을 완전 준수합니다.** 규칙은 [`CLAUDE.md`](./CLAUDE.md) 참고. `DESIGN.md` 수정 후에는 `npm run lint:design`으로 검증하세요 (에러 0 이어야 함).

## 구성

```
my-design-md/
├── DESIGN.md                     # ⭐ 유일 원천 — Stitch 스펙 준수 (8섹션). 값·설명 모두 여기서 편집
├── CLAUDE.md                     # 프로젝트 규칙 (Stitch 스펙 준수 강제)
├── validate.mjs                  # DESIGN.md 스펙 린터
├── gen-tokens.mjs                # DESIGN.md → tokens.json 생성기
├── build.mjs                     # 빌드: DESIGN.md → tokens.json → 플랫폼 파일 + 데모
├── demo/index.html               # 컴포넌트 데모 (TOKENS 마커에 tokens.css 주입, 생성물)
└── tokens/                       # ↓ 아래는 전부 생성물 (직접 편집 금지)
    ├── tokens.json               # DESIGN.md에서 생성 (W3C DTCG, 라이트+다크)
    ├── web/tokens.css · web/theme.ts
    ├── react-native/theme.ts
    ├── flutter/design_tokens.dart
    ├── ios/DesignTokens.swift
    └── android/{values,values-night}/colors.xml · values/dimens.xml
```

**원천은 `DESIGN.md` 하나입니다.** 값을 바꿀 땐 `DESIGN.md`만 고치고 `npm run build` → `tokens.json`·플랫폼 파일·데모가 전부 자동으로 따라옵니다.
- 다크 팔레트 = front matter `colors`, 라이트 = Colors 섹션 "라이트 모드 대체값" 표.
- `elevation`·`breakpoint`는 스펙상 front matter에 못 담아 `gen-tokens.mjs` 상수로 두고 프로즈와 동기화합니다.

## 빌드 / 워크플로

```bash
npm install          # 최초 1회 (style-dictionary, yaml 설치)
npm run lint:design  # DESIGN.md 스티치 스펙 검사 (에러 0 이어야 함)
npm run build        # DESIGN.md → tokens.json → 플랫폼 파일 5종 + 데모
npm run watch        # DESIGN.md 변경 감시 → 저장할 때마다 자동 재빌드
npm run check        # 스펙 검사 + 빌드 한 번에
```

생성되는 파일 (⚠️ 손으로 직접 고치지 말 것 — 다음 빌드 때 덮어써집니다):
`web/tokens.css`, `web/theme.ts`, `react-native/theme.ts`, `flutter/design_tokens.dart`,
`ios/DesignTokens.swift`, `android/values/colors.xml`, `android/values-night/colors.xml`, `android/values/dimens.xml`

포맷을 바꾸고 싶으면 `build.mjs`의 커스텀 포맷 함수를 수정하세요.

## 새 프로젝트에서 쓰는 법

1. 그 프로젝트 **루트에 `DESIGN.md`를 복사**한다 (에이전트가 자동 인식).
2. 해당 플랫폼의 토큰 파일을 프로젝트에 복사한다.
3. 프로젝트 `CLAUDE.md`(또는 에이전트 지시)에 한 줄 추가:
   > 이 프로젝트는 루트 `DESIGN.md`를 디자인 소스로 삼는다. 색·여백·코너·타이포는 정의된 토큰만 사용한다.

### 플랫폼별 적용

- **웹/React** — `tokens.css`를 전역 import 후 `var(--color-primary)` 사용. 또는 `theme.ts`를 CSS-in-JS에 주입. 다크는 `<html data-theme="dark">`.
- **React Native** — `theme.ts` import, `colors[scheme]`로 라이트/다크 선택 (`useColorScheme()`).
- **Flutter** — `design_tokens.dart` import, `DesignTokens.light` / `DesignTokens.dark`를 `ThemeData`에 매핑.
- **iOS (SwiftUI)** — `DesignTokens.swift` 추가, `DesignTokens.dark.primary` 등 사용. `Space Grotesk` 폰트 번들 등록 필요.
- **Android** — xml 3개를 각 `res/` 경로에 배치. 이름이 같아 다크모드에서 `values-night`가 자동 적용됨.

## 폰트

`Space Grotesk`(라틴) + `Pretendard`/`Noto Sans KR`(한글). 각 플랫폼에 폰트 파일을 번들/등록해야 합니다. 웹은 Google Fonts CDN 사용 가능.

## 에이전트 프롬프트 가이드

코딩 에이전트(Claude Code 등)에 붙여넣어 쓰는 참조. (스펙상 DESIGN.md 섹션이 아니라 여기 둠)

**색상 빠른 참조**
- 강조(공통): `#7C3AED` / 보조 — 다크 `#58A6FF`, 라이트 `#2563EB`
- 다크: bg `#0D1117` · surface `#161B22` · border `#30363D` · text `#E6EDF3` · muted `#8B949E`
- 라이트: bg `#FFFFFF` · surface `#FAF9FC` · border `#ECE9F5` · text `#1C1B22` · muted `#6B6A76`
- 상태 — success `#3FB950`/`#16A34A`, error `#FF7B72`/`#DC2626` (다크/라이트)
- radius 8px(기본)/10px(카드) · spacing 4·8·16·24·40 · 폰트 `Space Grotesk`+`Pretendard`

**복붙용 프롬프트**

> 이 프로젝트는 루트 `DESIGN.md`(Stitch 스펙 준수)를 디자인 소스로 삼는다. UI를 만들 때:
> - 다크를 기본으로 라이트를 함께 지원하고, 강조색 퍼플 `#7C3AED`을 두 모드에서 공유한다.
> - 색·여백·코너·타이포는 DESIGN.md에 정의된 토큰만 사용하고 임의값을 만들지 않는다.
> - 주요 액션·링크·포커스는 `primary`, 보조 강조는 모드별 accent. 깊이는 다크=발광, 라이트=그림자.
> - 폰트 `Space Grotesk`+한글 `Pretendard`, 기본 radius 8px(카드 10px), 모바일 퍼스트·터치 44px.
> - 모든 텍스트/배경 대비는 WCAG AA를 만족한다.
