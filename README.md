# 🚀 Get Your Feeds 개발과정 🚀

## 📚 기술 스택

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

### 📁 폴더 구조:

```
project-root
│
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── article
│   │   ├── article.controller.spec.ts
│   │   ├── article.controller.ts
│   │   ├── article.module.ts
│   │   ├── article.service.spec.ts
│   │   ├── article.service.ts
│   │   ├── dto
│   │   │   ├── create-article-share.dto.ts
│   │   │   ├── create-article.dto.ts
│   │   │   ├── get-article-detail-res.dto.ts
│   │   │   ├── get-article-res.dto.ts
│   │   │   └── get-article.dto.ts
│   │   └── schema
│   │       └── article.schema.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   ├── decorators
│   │   │   └── user.decorator.ts
│   │   ├── guards
│   │   │   ├── jwt-auth.guard.spec.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── local-auth.guard.spec.ts
│   │   │   └── local-auth.guard.ts
│   │   ├── strategies
│   │   │   ├── jwt.strategy.spec.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── local.strategy.spec.ts
│   │   │   └── local.strategy.ts
│   │   └── types
│   │       ├── jwt-payload.interface.ts
│   │       └── verification.data.ts
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

- NoSQL와 Mongoose를 사용하여 협업하는 경험을 갖을 수 있었습니다. 
