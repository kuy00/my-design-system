# 프로젝트 규칙 — 이 저장소는 Stitch DESIGN.md 스펙을 따른다

이 프로젝트의 `DESIGN.md`는 **Google Stitch의 DESIGN.md 오픈소스 스펙**(github.com/google-labs-code/design.md)에 **완전 준수**해야 한다. 아래 규칙을 위배하는 편집은 하지 않는다.

**⚠️ 필수 규칙: `DESIGN.md` 수정 시 반드시 `npm run check` 실행.** (스펙 검사 + 빌드 → tokens.json·플랫폼 파일 5종·demo 자동 동기화) 파싱 누락(`parsing-omission`)·드리프트(`sync-drift`)·스펙 에러 중 하나라도 나면 완료로 간주하지 않는다. 생성물(tokens.json·플랫폼 파일·demo)만 갱신 안 된 채 두는 것을 금지한다.

## 1. front matter 허용 키 (이 외 금지)
`version`, `name`, `description`, `colors`, `typography`, `rounded`, `spacing`, `components`
- ❌ `defaultMode`, `elevation`, `breakpoints` 등 스펙 외 키를 front matter에 두지 않는다. 해당 정보는 프로즈 섹션(Elevation & Depth, Layout)에 문서화한다.

## 2. 섹션 순서 (`##` 헤딩, 생략 가능·순서 고정)
`Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts`
- ❌ 스펙 외 섹션(예: Responsive, Agent Prompt Guide)을 새로 만들지 않는다. 반응형은 Layout에, 에이전트용 참조는 `README.md`에 둔다.

## 3. 토큰 참조 문법
`{colors.primary}`, `{rounded.md}`, `{spacing.md}`, `{typography.body}` — **복수형 `colors`**, 점 표기. 참조는 반드시 front matter에 정의된 토큰으로 해석되어야 한다(`broken-ref` 금지).

## 4. 컴포넌트 규칙
- 허용 속성만: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`.
  - ❌ `borderColor`, `shadow` 등은 토큰 속성으로 쓰지 않는다 — 테두리·그림자·포커스링·hover 밝기·disabled opacity 같은 상태는 Components 섹션 **표(프로즈)** 로 설명한다.
- 변형(variant)은 중첩하지 않고 `nav-item-active`처럼 **별도 flat 엔트리**로. 단, 허용 속성 값이 실제로 바뀌는 경우에만 토큰으로 둔다.

## 5. 색상 / 듀얼 모드
- front matter `colors`는 **단일 팔레트 = 기본(다크)** 이다. `primary`는 반드시 정의(`missing-primary` 금지).
- 라이트 모드 대체값은 **Colors 섹션의 표**로 관리한다 (스펙 front matter는 단일 팔레트 전제이므로).
- 모든 텍스트/배경 대비는 **WCAG AA(4.5:1)** 이상을 유지한다(`contrast-ratio`).

## 6. 단일 원천은 DESIGN.md — 나머지는 전부 생성물
- **`DESIGN.md`가 유일한 원천이다.** 값(색·타이포·간격·radius)은 여기서만 고친다.
  - 다크 팔레트 = front matter `colors`, 라이트 팔레트 = Colors 섹션 "라이트 모드 대체값" 표. 생성기가 이 둘을 읽는다.
  - 예외: `elevation`·`breakpoint`는 스펙상 front matter에 못 담으므로 `gen-tokens.mjs` 상수로 두고 DESIGN.md 프로즈와 동기화한다.
- **생성물(직접 편집 금지):** `tokens/tokens.json`, 플랫폼 파일 5종, `demo/index.html`(TOKENS 마커 사이). 다음 빌드에 덮어써진다.
- 변경 흐름: `DESIGN.md` 수정 → `npm run build` → tokens.json + 플랫폼 파일 + 데모 자동 재생성.

## 명령
- `npm run lint:design` — DESIGN.md 스펙 검사 (에러 0 이어야 함)
- `npm run build` — DESIGN.md → tokens.json → 플랫폼 파일 5종 + 데모
- `npm run watch` — DESIGN.md 변경 감시 → 자동 재빌드
- `npm run check` — 스펙 검사 + 빌드 한 번에
