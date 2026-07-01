---
version: 1.0.0
name: My Design System
description: 다크(기본) + 라이트 페어링 개인 범용 디자인 시스템. 강조색 퍼플을 두 모드가 공유한다. front matter는 기본(다크) 팔레트를 담고, 라이트 대체값은 Colors 섹션 표에 문서화한다.

colors:
  primary: "#7C3AED"
  accent: "#58A6FF"
  background: "#0D1117"
  surface: "#161B22"
  border: "#30363D"
  text: "#E6EDF3"
  textMuted: "#8B949E"
  success: "#3FB950"
  error: "#FF7B72"

typography:
  fontFamily: "'Space Grotesk', 'Pretendard', 'Noto Sans KR', sans-serif"
  h1: { fontSize: 2.5rem, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }
  h2: { fontSize: 1.75rem, fontWeight: 700, lineHeight: 1.25 }
  h3: { fontSize: 1.25rem, fontWeight: 600, lineHeight: 1.3 }
  body: { fontSize: 1rem, fontWeight: 400, lineHeight: 1.6 }
  caption: { fontSize: 0.8125rem, fontWeight: 400, lineHeight: 1.5 }

rounded:
  sm: 6px
  md: 8px
  lg: 10px
  full: 999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "11px 20px"
    typography: "{typography.body}"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "11px 20px"
  button-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.success}"
    rounded: "{rounded.md}"
    padding: "11px 20px"
  button-danger:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error}"
    rounded: "{rounded.md}"
    padding: "11px 20px"
  link:
    textColor: "{colors.accent}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "11px 14px"
    typography: "{typography.body}"
  tag:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "4px 12px"
    typography: "{typography.caption}"
  nav-item:
    textColor: "{colors.textMuted}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  nav-item-active:
    textColor: "{colors.primary}"
  toggle-track:
    backgroundColor: "{colors.border}"
    rounded: "{rounded.full}"
    width: "44px"
    height: "24px"
  toggle-track-on:
    backgroundColor: "{colors.primary}"
  toggle-thumb:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.full}"
    size: "20px"
  checkbox:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.sm}"
    size: "18px"
  checkbox-checked:
    backgroundColor: "{colors.primary}"
  radio:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.full}"
    size: "18px"
  radio-checked:
    backgroundColor: "{colors.primary}"
  select:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "11px 14px"
  select-menu:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.xs}"
  select-option-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary}"
  modal-overlay:
    backgroundColor: "rgba(0,0,0,0.6)"
  modal:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    width: "min(90vw, 480px)"
  toast:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  alert-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.success}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  alert-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.error}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
---

## Overview

이것은 하나의 파일로 다크모드(기본)와 라이트모드를 아우르는 개인 범용 디자인 시스템이다. 내가 만드는 모든 앱·웹에 적용해 일관된 룩앤필을 유지하는 것이 목표다.

**무드.** 어둡고 강렬하며 기술적인(dark · bold · technical) 분위기. 대시보드, AI 서비스, 개발자 도구에 특히 잘 어울린다.

**밀도.** 중간 밀도(comfortable). 정보는 조밀하게 담되 요소 사이에 충분한 여백을 둬 답답하지 않게 한다. `spacing` 스케일(4/8/16/24/40)로 리듬을 통일한다.

**디자인 철학.**
- **"모드가 바뀌어도 브랜드는 하나"** — 강조색 퍼플 `#7C3AED`을 라이트/다크 양쪽에서 동일하게 쓴다.
- **강조는 포인트로만** — 퍼플은 주요 액션·포커스에만 쓰고 넓은 면적엔 쓰지 않는다.
- **깊이의 표현이 모드마다 다르다** — 다크는 발광(glow), 라이트는 부드러운 그림자.
- **토큰이 곧 규칙** — 색·여백·코너는 반드시 정의된 토큰에서 가져온다. 임의값 금지.

## Colors

front matter의 `colors`는 **기본 모드(다크) 팔레트**다. 컴포넌트 토큰은 이 역할 이름(`{colors.primary}` 등)을 참조한다. 라이트 모드는 아래 대체값 표로 관리한다.

**기본(다크) — front matter 값**

| 역할 | HEX | 용도 |
|---|---|---|
| primary | `#7C3AED` | 메인 강조 — 주요 버튼, 링크, 선택, 포커스 (모드 공통) |
| accent | `#58A6FF` | 보조 강조 (링크 등) |
| background | `#0D1117` | 최하단 페이지 배경 |
| surface | `#161B22` | 카드·패널 표면 |
| border | `#30363D` | 구분선, 테두리 |
| text | `#E6EDF3` | 본문 텍스트 |
| textMuted | `#8B949E` | 보조/설명 텍스트 |
| success | `#3FB950` | 성공·긍정 상태 |
| error | `#FF7B72` | 오류·위험 상태 |

**라이트 모드 대체값**

| 역할 | HEX |
|---|---|
| primary | `#7C3AED` (공통) |
| accent | `#2563EB` |
| background | `#FFFFFF` |
| surface | `#FAF9FC` |
| border | `#ECE9F5` |
| text | `#1C1B22` |
| textMuted | `#6B6A76` |
| success | `#16A34A` |
| error | `#DC2626` |

**접근성:** 모든 텍스트/배경 조합은 최소 WCAG AA(4.5:1)를 만족한다. 다크 본문(`#E6EDF3`/`#0D1117`), 라이트 본문(`#1C1B22`/`#FFFFFF`), 퍼플 버튼 위 흰 텍스트 모두 통과.

## Typography

기본 서체는 **Space Grotesk**(기하학적 산세리프)이며, 한글은 **Pretendard → Noto Sans KR** 순으로 폴백한다. 제목은 자간을 살짝 좁혀(-0.02em) 단단한 인상을 준다. 계층은 아래 5단계만 사용한다.

| 계층 | size | weight | line-height | letter-spacing | 용도 |
|---|---|---|---|---|---|
| h1 | 2.5rem (40px) | 700 | 1.15 | -0.02em | 페이지 대표 제목 |
| h2 | 1.75rem (28px) | 700 | 1.25 | — | 섹션 제목 |
| h3 | 1.25rem (20px) | 600 | 1.3 | — | 서브 제목, 카드 제목 |
| body | 1rem (16px) | 400 | 1.6 | — | 본문 |
| caption | 0.8125rem (13px) | 400 | 1.5 | — | 보조 텍스트, 캡션 |

## Layout

- **간격 스케일:** `xs 4 · sm 8 · md 16 · lg 24 · xl 40`(px). 모든 여백·간격은 이 값에서만 고른다. 임의 px 금지.
- **그리드:** 12컬럼 유동 그리드, 거터 24px(`lg`).
- **컨테이너:** 최대 폭 1120px, 좌우 패딩 모바일 16px / 데스크톱 24px.
- **여백 철학:** 관계가 가까운 요소일수록 간격을 좁힌다(근접성). 섹션 사이 `xl`(40px), 카드 내부 `md`(16px)를 기본으로.

**반응형(Responsive).**
- 브레이크포인트: `sm 640 · md 768 · lg 1024 · xl 1280`(px). 모바일 퍼스트로 작성한다.
- 터치 타깃: 인터랙티브 요소는 최소 44×44px (Android는 48dp 권장).
- 축소 전략: 다단 → 태블릿(`md`) 2단 → 모바일(`sm`) 1단 스택. 상단/사이드 내비 → 모바일 하단 탭바/햄버거. h1은 모바일에서 2.5rem→2rem. 본문 한 줄 길이는 45~75자 유지.

**플랫폼 적응(Platform adaptation).** 이 시스템의 *토큰*(색·간격·타이포·radius·상태색)은 웹/iOS/Android/Flutter/RN 전 플랫폼 공통이다. 그러나 아래 "구조/상호작용 패턴"은 픽셀 동일하게 강제하지 말고 **네이티브 관습을 이 토큰으로 테마링**한다.
- **내비게이션:** 데스크톱/웹은 상단·사이드, 모바일은 **하단 탭바**(iOS Tab Bar / Android bottom nav)를 우리 `surface`/`primary`로 칠한다.
- **오버레이:** 데스크톱은 중앙 Modal(최대폭 480px), 모바일은 **바텀 시트/액션 시트**를 우리 `surface`·radius로.
- **피드백:** 웹은 Toast(우하단), 모바일은 **Snackbar(하단 전폭)** / iOS는 배너. 우리 토큰으로 스타일.
- **폼 컨트롤:** 스위치·피커 등은 각 OS 네이티브 컨트롤을 우선 쓰고 `primary`로 강조색만 맞춘다. iOS는 체크박스/라디오 대신 체크마크·세그먼티드·스위치가 자연스럽다.
- **상호작용:** 웹은 hover/focus, 터치(iOS/Android/RN)는 **press 상태**(ripple·opacity)로 대체한다. hover 전용 정보 노출 금지.
- **깊이:** 네온 발광(glow)은 **웹 한정**. 네이티브는 절제된 그림자/머티리얼로 대체한다.
- **버튼 코너:** 기본 8px. 단 Android Material 3에서는 pill(full) 버튼이 관습이므로 그쪽 규범을 따라도 된다.

## Elevation & Depth

- **다크모드:** 그림자를 거의 쓰지 않는다. 깊이는 `border`(#30363D)와 주요 요소의 **퍼플 발광**(`0 0 20px rgba(124,58,237,0.35)`)으로 표현한다.
- **라이트모드:** 부드러운 드롭섀도우 — 카드 `0 1px 2px rgba(0,0,0,0.06)`, 강조 버튼 `0 4px 14px rgba(124,58,237,0.20)`(퍼플기).
- **서피스 계층:** `background`(최하단) → `surface`(카드/패널) → 그 위 요소는 테두리 또는 그림자로 구분.
- **z축 위계:** `base < card < dropdown < modal < toast`.

## Shapes

기본 코너는 `rounded.md`(8px). 카드·모달은 조금 더 둥근 `rounded.lg`(10px), 태그·체크박스는 `rounded.sm`(6px), 토글·라디오·알약형 요소는 `rounded.full`(999px). 각지거나 과하게 둥근 코너는 지양하고 6~10px의 절제된 곡선을 일관되게 쓴다.

## Components

기계용 정의는 front matter의 `components:` 토큰(스펙 형태 — 값이 실제로 바뀌는 변형만 `nav-item-active`처럼 별도 엔트리)에 있다. 상태(hover/focus/disabled)처럼 색·크기 토큰이 그대로인 변형은 토큰으로 두지 않고 아래 표의 "상태" 열에 규칙으로 적는다. `{colors.…}` 참조는 활성 모드(기본 다크)의 값으로 해석된다.

| 컴포넌트 | 스타일 | 상태 |
|---|---|---|
| **Button / primary** | `primary` 배경, 흰 텍스트, radius 8px. 다크는 발광 그림자 | hover: 밝기 +8% · active: -8% · disabled: opacity 0.5 |
| **Button / ghost** | `surface` 배경 + `border` 테두리, `text` 색 | hover: surface 밝기 변화 · focus: 테두리 primary |
| **Button / success·danger** | 상태색을 옅게 깐 배경 + 동색 텍스트·테두리 | — |
| **Link** | `accent` 색 텍스트 | hover: 밑줄 |
| **Card** | `surface` 배경 + `border` 테두리, radius 10px | 다크 그림자 없음 / 라이트 shadow · hover: 테두리 강조 |
| **Input** | `background` 배경 + `border` 테두리, radius 8px | focus: 테두리 `primary` + 얇은 링 · error: 테두리 `error` |
| **Tag / Badge** | `primary` 옅게 깐 배경 + `primary` 텍스트, radius 6px | — |
| **Navigation** | 항목 `textMuted`, 활성은 `primary` + 좌측/하단 인디케이터 | hover: text · active: primary |
| **Toggle / Switch** | 트랙 44×24, off `border`/on `primary`, 흰 thumb 20px, radius full | on: 트랙 primary + thumb 슬라이드 |
| **Checkbox** | 18px, `background` + `border`, radius 6px | checked: `primary` 배경 + 흰 체크 |
| **Radio** | 18px, `background` + `border`, radius full | checked: `primary` + 내부 점 |
| **Select / Dropdown** | Input과 동일 + 우측 chevron. 메뉴는 `surface`, radius 8px | focus: 테두리 primary · 옵션 active: primary 옅게 |
| **Modal / Dialog** | 오버레이 `rgba(0,0,0,.6)`, 본체 `surface`, radius 10px, 최대폭 480px | 라이트 shadow / 다크 border로 깊이 |
| **Toast / Alert** | 기본 `surface`. success/error는 상태색 옅게 깐 배경+동색 | success · error · info(기본) |

## Do's and Don'ts

**Do**
- ✅ 주요 액션·포커스에는 항상 `primary`(퍼플)를 쓴다.
- ✅ 색·여백·코너·타이포는 반드시 정의된 토큰에서 가져온다.
- ✅ 다크는 발광, 라이트는 그림자로 깊이를 준다.
- ✅ 라이트 모드는 Colors 섹션의 대체값 표를 따른다.
- ✅ 네이티브 앱에서는 내비/오버레이/피드백/폼컨트롤을 **네이티브 패턴 + 우리 토큰**으로 만든다 (Layout의 플랫폼 적응 참고).

**Don't**
- ❌ 본문·넓은 면적에 퍼플을 남용하지 않는다 (강조는 포인트로만).
- ❌ 임의의 hex 색이나 임의 px 여백을 새로 만들지 않는다.
- ❌ 한 화면에서 강조색을 두 개 이상 경쟁시키지 않는다.
- ❌ 다크모드에서 강한 드롭섀도우를 쓰지 않는다 (발광으로 대체).
- ❌ 터치 플랫폼(iOS/Android/RN)에 hover 전용 상호작용을 강제하지 않는다 (press로 대체).
- ❌ 네이티브 앱에 웹 전용 패턴(중앙 모달·우하단 토스트·네온 글로우·가로 pill 내비)을 그대로 옮기지 않는다.
