# 🚀 Get Your Feeds 개발과정 🚀

## 📘 API Documentation

- 👉 [Swagger Documentation](https://wante-preonboarding-backend.onrender.com/api-docs#/)

- 🚀 배포 주의사항 (클릭 후 약간의 대기 시간이 있을 수 있습니다. 콜드스타트 현상)

## 📚 기술 스택

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)


## 💼 : 소셜 미디어 통합 Feed 서비스

### 🌟 소셜 미디어 통합 Feed 서비스

#### 1️⃣ 

- 

#### 2️⃣ TypeScript와 정적 타입 검사

- 

#### 3️⃣ 코드 구성

- 

### 🚀 NestJS를 통한 프로젝트 구현

## 📑 요구사항 분석

- **JobPosting:** 특정 기업이 게시한 채용 정보를 담고 있습니다. 채용 포지션, 보상, 콘텐츠 및 사용 기술을 포함합니다.
- **Applicant:** 채용에 지원한 사용자의 정보를 담고 있습니다.

## 🗺️ ERD

![ERD Diagram](erd.png)

## 🛠️ 데이터 모델 설계

### 1️⃣ `Applicant` 엔터티

`Applicant` 엔터티는 사용자(`User`)와 직무 게시물(`JobPosting`) 사이의 다대다 관계를 관리합니다.

- 🎯 **고유 제약 조건**:
  `userId`와 `jobPostingId`의 조합은 고유해야 합니다. 이를 통해 동일한 사용자가 동일한 직무 게시물에 중복으로 지원할 수 없도록 합니다.

### 2️⃣ `Company` 엔터티

`Company` 엔터티는 회사에 대한 기본 정보를 제공합니다. 여기에는 회사의 이름, 국가, 지역 정보가 포함됩니다.

- 🔄 **관계 설정**:
  `Company`와 `JobPosting`은 일대다 관계를 형성합니다. 하나의 회사는 여러 개의 직무 게시물을 가질 수 있습니다.

### 3️⃣ `JobPosting` 엔터티

`JobPosting` 엔터티는 회사의 직무 게시물을 정의합니다. 이는 포지션, 보상, 컨텐츠, 기술 등 다양한 필드를 포함합니다.

- 🔄 **관계 설정**:
  - `Company`와 `JobPosting`은 다대일 관계를 형성합니다. 하나의 직무 게시물은 하나의 회사에 속합니다.
  - `JobPosting`과 `Applicant`는 일대다 관계를 형성합니다. 하나의 직무 게시물은 여러 지원자를 가질 수 있습니다.

### 4️⃣ `User` 엔터티

`User` 엔터티는 플랫폼의 사용자를 나타냅니다.

- 🔄 **관계 설정**:
  `User`와 `Applicant`는 일대다 관계를 형성합니다. 하나의 사용자는 여러 개의 지원 상태를 가질 수 있습니다.

🔍 **이러한 설계의 핵심 포인트**:

- `Applicant` 엔터티를 통해 `User`와 `JobPosting` 간의 관계를 잘 정의하고 관리합니다.
- 모든 엔터티 간의 관계가 명확히 정의되어 있어, 데이터의 일관성을 유지하며 쿼리 효율성을 높입니다.

### 🔥 기능들:

#### 1️⃣ **채용 정보 관리**

- 생성: POST `/job-postings`
- 업데이트: PUT & PATCH `/job-postings/:id`
- 삭제: DELETE `/job-postings/:id`
- 전체 조회: GET `/job-postings`
- 상세 조회: GET `/job-postings/:id/job_posting_detail`

#### 2️⃣ **지원자 관리**

- 채용공고에 지원: POST `/applications`

#### 3️⃣ **Sample 데이터 생성**

- 기능 테스트를 위한 회사와 사용자를 생성: POST `/sample/company`, `/sample/user`

## 📂 구현 과정

### 📁 폴더 구조:

```
project-root
│
├── src
│   ├── DTO
│   ├── controllers
│   ├── models
│   └── services
├── test
└── 기타 설정 및 메타데이터 파일들
```

## 📝 API 엔드포인트 상세

### 🎉 채용 공고 관리

# Article Controller API Documentation

## Article Operations

### 1. Get Paginated Article List
**Endpoint:** `GET /articles`  
**Method:** `GET`  
**Description:** Fetch a paginated list of articles.  
**Query Parameters:** RequestPaginatedQueryDto (pagination parameters)  
**Response:** `Page<GetArticleResDto>`

---

### 2. Create Article
**Endpoint:** `POST /articles`  
**Method:** `POST`  
**Description:** Create a new article.  
**Request Body:** `CreateArticleDto`  
**Response:** The content ID of the created article as a string.

---

### 3. Send Like by Content ID
**Endpoint:** `GET /articles/likes/:contentId`  
**Method:** `GET`  
**Description:** Send a like to an article by its content ID.  
**Path Parameters:**  
  - `contentId`: The content ID of the article.  
**Response:** The content ID of the liked article as a string.

---

### 4. Find Article by Content ID
**Endpoint:** `GET /articles/:contentId`  
**Method:** `GET`  
**Description:** Fetch a specific article using its content ID.  
**Path Parameters:**  
  - `contentId`: The content ID of the article.  
**Response:** `GetArticleDetailResDto`

---

### 5. Send Share by Content ID
**Endpoint:** `POST /articles/share`  
**Method:** `POST`  
**Description:** Send a share notification for an article by its content ID.  
**Request Body:** `CreateArticleShareDto`  
**Response:** None (void).

---

## User Authentication and Registration

### 1. Login
**Endpoint:** `POST /login`  
**Method:** `POST`  
**Description:** Authenticate and login a user.  
**Request Body:** User credentials.  
**Response:** HTTP 200 status code with an Authorization header containing the Bearer token.

---

### 2. Register
**Endpoint:** `POST /register`  
**Method:** `POST`  
**Description:** Register a new user.  
**Request Body:** `RegisterUserDto`  
**Response:** None (void).

---

### 3. Verify User
**Endpoint:** `POST /verify`  
**Method:** `POST`  
**Description:** Verify a user's email with a code.  
**Request Body:** 
  - `email`: The user's email.
  - `code`: The verification code.  
**Response:** None (void).

---

## Article Statistics

### Get Article Statistics
**Endpoint:** `GET /articles`  
**Method:** `GET`  
**Description:** Retrieve statistics for articles over a specific period.  
**Query Parameters:** `GetArticleStatisticsDto`  
**Response:** `GetArticleStatisticsResDto`

---

## User Operations

### 1. Create User
**Endpoint:** `POST /`  
**Method:** `POST`  
**Description:** Create a new user.  
**Request Body:** 
  - `email`: The user's email.
  - `password`: The user's password.
  - `service`: The service associated with the user.
  - `userHashtag`: The user's hashtag.  
**Response:** None (void).

---

### 2. Get User by Email
**Endpoint:** `GET /`  
**Method:** `GET`  
**Description:** Fetch a user using their email.  
**Request Body:** `email` - The user's email.  
**Response:** The email of the fetched user as a string.


## 🏁 마무리와 배운 점

- NestJS를 처음 사용하는 과정은 새로운 도전이었지만, 이러한 도전이 개발자로서 성장을 이끄는 원동력 중 하나라고 믿습니다. 스프링과 비슷한 개념을 가지고 있어서 스프링 개발자에게 친숙하게 다가올 수 있었습니다. 또한 TypeScript와 모듈 시스템을 통한 코드 구성은 코드의 가독성과 재사용성을 높여주었습니다.
