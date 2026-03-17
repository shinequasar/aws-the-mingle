# Requirements Verification Questions

테이블오더 서비스 요구사항을 분석했습니다. 아래 질문에 답변해 주세요.
각 질문의 [Answer]: 태그 뒤에 선택지 문자를 입력해 주세요.

## Question 1
백엔드 기술 스택으로 어떤 것을 사용하시겠습니까?

A) Node.js + Express (JavaScript/TypeScript)
B) Spring Boot (Java/Kotlin)
C) FastAPI (Python)
D) NestJS (TypeScript)
E) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 2
프론트엔드 기술 스택으로 어떤 것을 사용하시겠습니까?

A) React (TypeScript)
B) Vue.js (TypeScript)
C) Next.js (TypeScript)
D) Svelte/SvelteKit
E) Other (please describe after [Answer]: tag below)

[Answer]: a

## Question 3
데이터베이스로 어떤 것을 사용하시겠습니까?

A) PostgreSQL
B) MySQL
C) MongoDB
D) DynamoDB
E) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 4
배포 환경은 어디를 대상으로 하시겠습니까?

A) AWS (EC2, ECS, Lambda 등)
B) 로컬 서버 / On-premises
C) Docker Compose (로컬 개발 우선)
D) Kubernetes (EKS, GKE 등)
E) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 5
프로젝트 구조를 어떻게 구성하시겠습니까?

A) 모노레포 (프론트엔드 + 백엔드 하나의 저장소)
B) 멀티레포 (프론트엔드, 백엔드 별도 저장소)
C) 모놀리식 (서버 사이드 렌더링 포함 단일 앱)
D) Other (please describe after [Answer]: tag below)

[Answer]: a

## Question 6
관리자용 인터페이스는 어떤 형태로 제공하시겠습니까?

A) 고객용과 동일한 프론트엔드 앱 내 별도 라우트
B) 별도의 독립 웹 애플리케이션
C) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 7
매장(Store) 데이터는 어떻게 관리하시겠습니까? (MVP 범위)

A) 단일 매장만 지원 (하드코딩 또는 환경변수)
B) 다중 매장 지원 (매장 등록/관리 기능 포함)
C) 다중 매장 지원하되, 매장 등록은 DB 직접 입력 (관리 UI 없음)
D) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 8
메뉴 이미지는 어떻게 관리하시겠습니까?

A) 외부 URL 직접 입력 (이미지 업로드 기능 없음)
B) 서버에 직접 업로드 (로컬 파일 저장)
C) 클라우드 스토리지 업로드 (S3 등)
D) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 9
고객용 UI의 전체적인 디자인 톤/컬러를 어떻게 하시겠습니까?

A) 밝고 따뜻한 톤 (오렌지, 옐로우 계열 - 음식점/카페 느낌)
B) 모던하고 깔끔한 톤 (화이트, 그레이 기반 미니멀)
C) 다크 모드 기반 (어두운 배경, 고급스러운 느낌)
D) 브랜드 컬러 지정 (직접 입력)
E) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 10
고객용 메뉴 화면의 레이아웃을 어떻게 구성하시겠습니까?

A) 카드 그리드 (2열) - 이미지 중심의 카드형 배치
B) 리스트형 - 좌측 이미지 + 우측 텍스트 정보
C) 대형 카드 (1열) - 큰 이미지와 상세 정보
D) Other (please describe after [Answer]: tag below)

[Answer]: a

## Question 11
카테고리 네비게이션 방식을 어떻게 하시겠습니까?

A) 상단 탭 바 (가로 스크롤)
B) 좌측 사이드바 (세로 고정)
C) 상단 드롭다운 메뉴
D) Other (please describe after [Answer]: tag below)

[Answer]: b

## Question 12
관리자 대시보드의 디자인 스타일을 어떻게 하시겠습니까?

A) 심플한 테이블/리스트 기반 (기능 중심)
B) 카드 기반 대시보드 (시각적 요약 중심)
C) 기존 Admin 템플릿 스타일 (사이드바 + 콘텐츠 영역)
D) Other (please describe after [Answer]: tag below)

[Answer]: a

## Question 13
CSS 스타일링 방식으로 어떤 것을 사용하시겠습니까?

A) Tailwind CSS
B) styled-components / Emotion (CSS-in-JS)
C) CSS Modules
D) MUI (Material UI) / Ant Design 등 UI 프레임워크
E) Other (please describe after [Answer]: tag below)

[Answer]: a

## Question 14: Security Extensions
이 프로젝트에 보안 확장 규칙(SECURITY rules)을 적용하시겠습니까?

A) Yes — 모든 SECURITY 규칙을 blocking constraint로 적용 (프로덕션 수준 애플리케이션에 권장)
B) No — SECURITY 규칙 건너뛰기 (PoC, 프로토타입, 실험적 프로젝트에 적합)
C) Other (please describe after [Answer]: tag below)

[Answer]: b
