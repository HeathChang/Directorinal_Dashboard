# Directional Dashboard 2025

대시보드 애플리케이션으로, 게시글 관리 및 데이터 시각화 기능을 제공합니다.

## 📋 프로젝트 개요

이 프로젝트는 React와 TypeScript를 기반으로 구축된 대시보드 애플리케이션입니다. 사용자 인증, 게시글 CRUD 기능, 그리고 다양한 차트를 통한 데이터 시각화를 제공합니다.

**⚠️ 중요: Post 기능은 로그인이 필수입니다. 로그인하지 않으면 게시글 정보를 볼 수 없습니다.**

## 🚀 프로젝트 실행 방법

### 사전 요구사항

- Node.js (v18 이상 권장)
- npm 또는 yarn

### 설치 및 실행

1. 프로젝트 클론
```bash
git clone <repository-url>
cd directional_2025
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 접속
```
http://localhost:5173
```

### 기타 명령어

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사
npm run lint

# 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch

# Storybook 실행
npm run storybook
```

## 🛠 기술 스택

### Frontend Framework & Library
- **React** (v19.2.0) - UI 라이브러리
- **TypeScript** (v5.9.3) - 타입 안정성
- **Vite** (v7.2.4) - 빌드 도구 및 개발 서버

### 상태 관리 & 데이터 페칭
- **@tanstack/react-query** (v5.90.12) - 서버 상태 관리 및 데이터 페칭
- **Axios** (v1.13.2) - HTTP 클라이언트

### UI 라이브러리 & 스타일링
- **Material-UI (MUI)** (v7.3.6) - UI 컴포넌트 라이브러리
- **Tailwind CSS** (v4.1.17) - 유틸리티 기반 CSS 프레임워크
- **Emotion** (v11.14.0) - CSS-in-JS 스타일링
- **@tabler/icons-react** (v3.35.0) - 아이콘 라이브러리

### 차트 라이브러리
- **ECharts** (v6.0.0) - 데이터 시각화
- **echarts-for-react** (v3.0.5) - React용 ECharts 래퍼

### 라우팅
- **react-router-dom** (v7.10.1) - 클라이언트 사이드 라우팅

### 기타
- **notistack** (v3.0.2) - 알림/스낵바
- **clsx** (v2.1.1) - 조건부 클래스명 유틸리티

### 개발 도구
- **ESLint** - 코드 품질 검사
- **Jest** - 테스트 프레임워크
- **Storybook** - 컴포넌트 문서화 및 개발
- **Vitest** - 단위 테스트

## ✨ 주요 구현 기능

### 1. 인증 시스템
- 사용자 로그인/로그아웃 기능
- JWT 토큰 기반 인증
- 로컬 스토리지를 통한 인증 상태 관리

### 2. 게시글 관리 (Post)
**⚠️ 로그인 필수: 게시글 기능은 로그인 후에만 사용할 수 있습니다.**

- 게시글 목록 조회 (무한 스크롤)
- 게시글 생성 (Create)
- 게시글 수정 (Update)
- 게시글 삭제 (Delete)
- 게시글 검색 기능
- 카테고리별 필터링
- 정렬 기능 (생성일, 제목 등)
- 컬럼 설정 모달 (테이블 컬럼 표시/숨김)

### 3. 데이터 시각화 (Chart)
다양한 차트를 통한 데이터 시각화:

- **커피 소비량 차트** - 바 차트
- **인기 스낵 브랜드 차트** - 도넛 차트
- **스낵 영향 차트** - 스택 영역 차트
- **상위 커피 브랜드 차트** - 스택 바 차트
- **주간 기분 트렌드 차트** - 멀티 라인 차트
- **주간 운동 트렌드 차트** - 멀티 라인 차트

### 4. UI/UX 기능
- 반응형 디자인
- 로딩 상태 표시
- 에러 처리 및 알림
- 무한 스크롤
- 검색 및 필터링
- 정렬 기능

### 5. 컴포넌트 아키텍처
Atomic Design 패턴 기반 컴포넌트 구조:
- **Atoms**: Input, Modal, Select, Table, Textarea
- **Molecules**: PostForm, PostModal, PostRow, SearchBar, Chart 컴포넌트들
- **Organisms**: Header, PostHeader, PostTable, Chart 컴포넌트들
- **Templates**: PostTemplate, ChartTemplate

## 🌐 배포

**배포 링크**: [https://directorinal-dashboard.vercel.app/](https://directorinal-dashboard.vercel.app/)

## 📁 프로젝트 구조

```
src/
├── apis/              # API 호출 함수
├── components/        # React 컴포넌트
│   ├── atoms/        # 기본 컴포넌트
│   ├── molecules/    # 복합 컴포넌트
│   ├── organisms/    # 복잡한 컴포넌트
│   └── templates/    # 페이지 템플릿
├── constants/         # 상수 정의
├── hooks/            # Custom Hooks
├── pages/            # 페이지 컴포넌트
├── routers/          # 라우팅 설정
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수
```

## 📝 주요 파일 설명

- `src/App.tsx` - 메인 애플리케이션 컴포넌트
- `src/routers/Router.tsx` - 라우팅 설정
- `src/hooks/useAuth.ts` - 인증 관련 훅
- `src/hooks/usePosts.ts` - 게시글 데이터 관리 훅
- `src/pages/post/PostPage.tsx` - 게시글 페이지
- `src/pages/chart/ChartPage.tsx` - 차트 페이지

## 🔐 인증 정보

게시글 기능을 사용하려면 먼저 로그인이 필요합니다. 로그인하지 않은 상태에서는 게시글 정보를 볼 수 없습니다.

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.
