# 🚀 Get Your Feeds 🚀

## 📚 기술 스택

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

<br>

## 🚀 프로젝트 소개

Get Your Feeds는 소셜 미디어 통합 Feed 서비스입니다.

본 레포지토리는 유저 계정의 해시태그(”#dani”) 를 기반으로 `인스타그램`, `스레드`, `페이스북`, `트위터` 등 복수의 SNS에 게시된 게시물 중 유저의 해시태그가 포함된 게시물들을 하나의 서비스에서 확인할 수 있는 통합 Feed 어플리케이션의 Backend API 저장소입니다.

이를 통해 본 서비스의 고객(Client)은 하나의 채널로 유저(”#dani”), 또는 브랜드(”#danishop”) 의 SNS 노출 게시물 및 통계를 확인할 수 있습니다.

<br>

## 🌟 팀원 및 역할 소개

|              고미종               |               추연규                |      이명석      |    송호준     |       이상운       |
| :-------------------------------: | :---------------------------------: | :--------------: | :-----------: | :----------------: |
| 게시물 상세 조회 <br> 게시물 공유 | 게시물 목록 조회 <br> 게시물 좋아요 | 게시물 통계 조회 | jwt 토큰 인증 | 유저 비즈니스 로직 |

<br>

## 🛠️ Document 구조

### 1️⃣ 게시물(Article)

| 필드        | 속성            | 설명                                                                                      | 예시 값   |
| ----------- | --------------- | ----------------------------------------------------------------------------------------- | --------- |
| content_id  | string(UUID)          | 이는 포스트가 속한 SNS에서 관리하는 고유 인식 값입니다.                                   |           |
| type        | enum | 파일 객체의 유형입니다. 가능한 값은 "facebook", "twitter", "instagram", "threads" 입니다. | 'twitter' |
| title       | string          | 포스트 제목입니다.                                                                        | 'hello, danishop!'          |
| content     | string          | 이는 포스트의 내용이며 이미지, 비디오 등을 제외한 텍스트만 포함됩니다.                    | 'I visited the danishop'          |
| hashtags    | string[]         | 여러 개의 해시태그가 있으므로 미래 검색을 고려하여 설계해 주십시오.                       | ['dani', 'danishop']          |
| view_count  | number            | 조회수입니다.                                                                             | 100       |
| like_count  | number            | 좋아요 수입니다.                                                                          | 10        |
| share_count | number            | 공유 수입니다.                                                                            | 1         |
| updated_at  | Date    | 포스트를 편집할 때 자동으로 기록됩니다.                                                   |           |
| created_at  | Date    | 포스트를 생성할 때 자동으로 기록됩니다.                                                   |           |

<br>

### 2️⃣ 통계(Statistics)

| 필드 | 속성 | 설명 | 예시 값 |
| ---- | ---- | ---- | ------- |
|      |      |      |         |

<br>

### 3️⃣ 사용자(User)

| 필드               | 속성                                              | 설명                     | 예시 값                                        |
|------------------|-------------------------------------------------|------------------------|----------------------------------------------|
| email            | `unique: true`                                  | 사용자의 이메일 주소          | "user@example.com"                          |
| password         |                                                   | 사용자의 비밀번호             | "SecureP@ssw0rd1"                            |
| connectedServices| `Array of { service: String, accountTag: String }` | 연결된 소셜 미디어 서비스들      | [{ service: "twitter", accountTag: "@user" }] |


<br>

## 🔥 기능 구현

### 1️⃣ 게시글(Article)

- 게시물 목록 조회 : Feed에 나타나는 게시물 목록 조회 API

- 게시물 상세 조회 : 게시물 목록 클릭 시, 사용되는 게시물 상세 내용 조회 API

- 게시물 좋아요 생성 : 게시물 목록 또는 상세에서 게시물 좋아요 클릭 시 사용되는 API

- 게시물 공유 생성 : 게시물 목록 또는 상세에서 공유하기 클릭 시 사용되는 API

### 2️⃣ 통계(Statistics)

- 게시물 통계 데이터 조회 : 해시태그(hashtag)로 검색된 게시물의 시계열 통계 지표(게시물 생성, 조회, 좋아요, 공유 등의 수)를 조회 할 때 사용되는 API

### 3️⃣ 사용자(User)

- 사용자 회원가입 요청 : 사용자 회원가입 요청에 사용되는 API. 회원가입 요청 이후 6자리의 랜덤한 코드가 입력한 이메일로 발송됩니다.

- 사용자 가입 승인 : 사용자 회원 가입 요청을 승인하는 API. 회원 가입 요청자의 이메일로 전송된 코드와 사용자 정보를 검증하여 가입 승인 처리합니다.

- 사용자 로그인 : 사용자가 계정, 비밀번호로 로그인 시 엑세스 토큰(JWT)을 발급하는 API

<br>

## 📁 폴더 구조

<details>
<summary>클릭</summary>
<div>

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

</div>
</details>

<br>

## 📝 API 엔드포인트 상세

### 🎉 게시물(Article)

#### 1. 게시물 목록 조회 : Feed에 나타나는 게시물 목록 조회 API

**Endpoint:** `GET /articles`  
**Method:** `GET`  
**Description:** Fetch a paginated list of articles.  
**Query Parameters:** RequestPaginatedQueryDto (pagination parameters)  
**Response:** `Page<GetArticleResDto>`

<br>

#### 2. 게시물 상세 조회 : 게시물 목록 클릭 시, 사용되는 게시물 상세 내용 조회 API

**Endpoint:** `GET /articles/:contentId`  

**Method:** `GET`  

**Description:** 유저가 게시물을 클릭 시 view_count 가 1 증가하고 게시물의 모든 필드 값을 확인하는데 사용되는 API

**Path Parameters:**

- `contentId`: 게시물의 Content ID.

**Response:** 

- response status 200, `GetArticleDetailResDto`

| field | 속성 | 설명 |예시|
| --- | --- | --- | --- |
| contentId | string | 해당 게시물 Content ID |  |
| title | string | 해당 게시물 제목 | 'NestJS Repository Pattern' |
| type | string | 해당 게시물 SNS 출처 | 'twitter' |
| content | string | 해당 게시물 내용 | 'Separation of dependencies is ...' |
| hashtags | string[] | 해당 게시물의 해시태그들 | ['repository', 'pattern'] |
| viewCount | number | 해당 게시물의 조회수 | 300 |
| likeCount | number | 해당 게시물의 좋아요수 | 30 |
| shareCount | number | 해당 게시물의 공유수 | 10 |

- response status 404 (해당 게시물이 존재하지 않을시)


<br>

#### 3. 게시물 좋아요 생성 : 게시물 목록 또는 상세에서 게시물 좋아요 클릭 시 사용되는 API

**Endpoint:** `GET /articles/:contentId`  
**Method:** `GET`  
**Description:** Fetch a specific article using its content ID.  
**Path Parameters:**

- `contentId`: The content ID of the article.  
  **Response:** `GetArticleDetailResDto`

<br>

#### 4. 게시물 공유 생성 : 게시물 목록 또는 상세에서 공유하기 클릭 시 사용되는 API

**Endpoint:** `POST /articles/share`  

**Method:** `POST`  

**Description:** 각 게시물이 관리되는 SNS 별 특정된 API 를 호출하고 성공할 시 (response status 200) 해당 게시물의 share_count가 1 증가

**Request Body:** `CreateArticleShareDto` 

| field | 속성 | 설명 |예시|
| --- | --- | --- | --- |
| contentId | string | 해당 게시물 Content ID |  |

**Response:** 

- response status 200, None(void)
- response status 404 (해당 게시물이 존재하지 않을시)

---

## 게시물 통계(Statistics)

#### 1. 게시물 통계 데이터 조회 : 해시태그(hashtag)로 검색된 게시물의 시계열 통계 지표(게시물 생성, 조회, 좋아요, 공유 등의 수)를 조회 할 때 사용되는 API

**Endpoint:** `GET /articles`  
**Method:** `GET`  
**Description:** Retrieve statistics for articles over a specific period.  
**Query Parameters:** `GetArticleStatisticsDto`  
**Response:** `GetArticleStatisticsResDto`

---

## 사용자(User)

#### 1. 사용자 회원가입 요청 : 사용자 회원가입 요청에 사용되는 API. 회원가입 요청 이후 6자리의 랜덤한 코드가 입력한 이메일로 발송됩니다.

**Endpoint:** `POST /register`  
**Method:** `POST`  
**Description:** Register a new user.  
**Request Body:** `RegisterUserDto`  
**Response:** None (void).

<br>

#### 2. 사용자 가입 승인 : 사용자 회원 가입 요청을 승인하는 API. 회원 가입 요청자의 이메일로 전송된 코드와 사용자 정보를 검증하여 가입 승인 처리합니다.

**Endpoint:** `POST /verify`  
**Method:** `POST`  
**Description:** Verify a user's email with a code.  
**Request Body:**

- `email`: The user's email.
- `code`: The verification code.  
  **Response:** None (void).

<br>

#### 3. 사용자 로그인 : 사용자가 계정, 비밀번호로 로그인 시 엑세스 토큰(JWT)을 발급하는 API

**Endpoint:** `POST /login`  
**Method:** `POST`  
**Description:** Authenticate and login a user.  
**Request Body:** User credentials.  
**Response:** HTTP 200 status code with an Authorization header containing the Bearer token.

<br>

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

<br>

### 2. Get User by Email

**Endpoint:** `GET /`  
**Method:** `GET`  
**Description:** Fetch a user using their email.  
**Request Body:** `email` - The user's email.  
**Response:** The email of the fetched user as a string.

---

## 🏁 마무리와 배운 점

- NoSQL와 Mongoose를 사용하여 협업하는 경험을 갖을 수 있었습니다.

### 명석

- 좋았던 점 : MongoDB, 통계 관련 API 등 처음 도전하는 기술을 사용해 요구사항을 시간 내에 잘 끝 마칠 수 있었다는 것에 만족한다. 그리고 팀원들과 회의를 하면서 기존에 해오던 방식에서 벗어나 다양한 의견들을 듣고 반영해볼 수 있어서 좋았다.

- 알게된 점 : MongoDB를 사용하는 이유, 장점, NoSQL 모델링 시 유의해야 할 점들에 대해 알게 되었다.

- 개선할 점 : 처음 팀이 구성되고 바로 프로젝트에 들어가다보니 기능 구현을 위한 역할 분담은 되었지만 그외에 많은 것들이 팀장님 어께 위로 얹혀진 것 같아 미안했다 ㅠ. 이제 한 번 프로젝트를 해보았으니 프로젝트를 진행할 때 어떤 역할들이 필요하고 그것들을 각자 잘 분담하면 그 짐을 같이 나눠 짊어질 수 있을 것 같다. 그리고 개인적으로 요구사항 분석을 처음에 제대로 하지 못해, 많은 변경이 생겼다. 처음에는 통계 데이터를 저장할 도큐먼트가 필요 없을 것으로 생각했으나 실제 기능 구현을 위해 요구사항 분석을 해보니 필요했었다. 앞으로 요구사항을 처음에 확실히 분석하고 정리하면 이런 일은 없을 것 같다.
