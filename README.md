# vue3-movie-app

[![Netlify Status](https://api.netlify.com/api/v1/badges/b1a2aa81-fe1d-4ce4-87f6-514542139e61/deploy-status)](https://app.netlify.com/sites/sleepy-swanson-adba46/deploys)

[netlify URL](https://sleepy-swanson-adba46.netlify.app/#/)

fastcampus vue 강의 들으며 만든 영화 정보 검색 앱

### 구조 구성

- vue router 구성
- bootstrap 구성

### 컴포넌트 구성

- Header - nav bar, logo 및 google fonts 적용
- Headline
- Footer
- Search - 필터, 버튼, 반응형 구성(bootstrap layout breakpoint 사용)
- Loader - bootstrap spinner 사용
- MovieList - 비동기 요청 및 예외처리(axios 라이브러리 사용)
- MovieItem
- Movie - 스켈레톤 UI 적용

### Store 구성

- vuex를 통한 action, mutation, state 세팅

### 사용자 plugin

- loadImage.js : 이미지 로딩 완료 이벤트 핸들러

### 기타

- 404 Not Found component

### 배포

- netlify 사용
- netlify serverless functions 사용
- netlify - api key 등 환경변수 설정

### 테스트

- unit test - @vue/test-utils, jest 사용
