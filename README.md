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

### 1️⃣ 게시글(Article)

| 필드        | 속성            | 설명                                                                                      | 예시 값   |
| ----------- | --------------- | ----------------------------------------------------------------------------------------- | --------- |
| content_id  | 문자열          | 이는 포스트가 속한 SNS에서 관리하는 고유 인식 값입니다.                                   |           |
| type        | 문자열 (열거형) | 파일 객체의 유형입니다. 가능한 값은 "facebook", "twitter", "instagram", "threads" 입니다. | "twitter" |
| title       | 문자열          | 포스트 제목입니다.                                                                        |           |
| content     | 문자열          | 이는 포스트의 내용이며 이미지, 비디오 등을 제외한 텍스트만 포함됩니다.                    |           |
| hashtags    | 아무 값         | 여러 개의 해시태그가 있으므로 미래 검색을 고려하여 설계해 주십시오.                       |           |
| view_count  | 숫자            | 조회수입니다.                                                                             | 100       |
| like_count  | 숫자            | 좋아요 수입니다.                                                                          | 10        |
| share_count | 숫자            | 공유 수입니다.                                                                            | 0         |
| updated_at  | 날짜 및 시간    | 포스트를 편집할 때 자동으로 기록됩니다.                                                   |           |
| created_at  | 날짜 및 시간    | 포스트를 생성할 때 자동으로 기록됩니다.                                                   |           |

<br>

### 2️⃣ 통계(Statistics)

| 필드                | 속성     | 설명                                                                                                                                                          | 예시 값                                                                                                          |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| contentId           | string   | 게시물이 속한 SNS에서 관리하는 고유 게시물 인식 값입니다.                                                                                                     |                                                                                                                  |
| snsType             | enum     | SNS 채널 이름입니다. <br> 가능한 값은 "facebook", "twitter", "instagram", "threads" 입니다.                                                                   |                                                                                                                  |
| hashtags            | string[] | 게시물이 가지고 있는 해시태그(string)의 배열입니다.                                                                                                           | ['apple','mobile','WWDC']                                                                                        |
| viewCountByDate     | enum[]   | 게시물의 일자별 조회수를 담고있는 배열입니다. 일자별 게시물 조회 수를 집계할 때 사용합니다. enum의 타입은 {count:number, measurementDate:Date}[] 입니다.      | [{count: 10, measurementDate:2023-01-01T00:00:01.991Z }, {count: 65, measurementDate:2023-01-02T00:00:01.991Z }] |
| likeCountByDate     | enum[]   | 게시물의 일자별 좋아요 수를 담고있는 배열입니다. 일자별 게시물 좋아요 수를 집계할 때 사용합니다. enum의 타입은 {count:number, measurementDate:Date}[] 입니다. | [{count: 10, measurementDate:2023-01-01T00:00:01.991Z }, {count: 65, measurementDate:2023-01-02T00:00:01.991Z }] |
| shareCountByDate    | enum[]   | 게시물의 일자별 공유 수를 담고있는 배열입니다. 일자별 게시물 공유 수를 집계할 때 사용합니다. enum의 타입은 {count:number, measurementDate:Date}[] 입니다.     | [{count: 10, measurementDate:2023-01-01T00:00:01.991Z }, {count: 65, measurementDate:2023-01-02T00:00:01.991Z }] |
| articleCreationDate | Date     | 게시물이 생성된 시간입니다. 기간별 게시물 생성 수를 집계할 때 사용합니다.                                                                                     | [{count: 10, measurementDate:2023-01-01T00:00:01.991Z }, {count: 65, measurementDate:2023-01-02T00:00:01.991Z }] |

- hashtags와 measurementDate로 일정 기간동안의 게시물 조회 수, 좋아요 수, 공유 수 read와 write(create, update)가 자주 진행되므로 복합 인덱스를 생성하였습니다.
- hashtags와 articleCreationDate로 일정 기간동안의 게시물 생성 수로 read가 자주 진행되고 지속해서 write(create)되는 많은 양의 도큐먼트를 빠르게 조회하기 위해 복합 인덱스를 생성하였습니다.

<br>

### 3️⃣ 사용자(User)

| 필드              | 속성                                               | 설명                        | 예시 값                                       |
| ----------------- | -------------------------------------------------- | --------------------------- | --------------------------------------------- |
| email             | `unique: true`                                     | 사용자의 이메일 주소        | "user@example.com"                            |
| password          |                                                    | 사용자의 비밀번호           | "SecureP@ssw0rd1"                             |
| connectedServices | `Array of { service: String, accountTag: String }` | 연결된 소셜 미디어 서비스들 | [{ service: "twitter", accountTag: "@user" }] |

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

#### 2. 게시물 생성 :

**Endpoint:** `POST /articles`
**Method:** `POST`
**Description:** Create a new article.
**Request Body:** `CreateArticleDto`
**Response:** The content ID of the created article as a string.

<br>

#### 3. 게시물 상세 조회 : 게시물 목록 클릭 시, 사용되는 게시물 상세 내용 조회 API

**Endpoint:** `GET /articles/likes/:contentId`
**Method:** `GET`
**Description:** Send a like to an article by its content ID.
**Path Parameters:**

- `contentId`: The content ID of the article.
  **Response:** The content ID of the liked article as a string.

<br>

#### 4. 게시물 좋아요 생성 : 게시물 목록 또는 상세에서 게시물 좋아요 클릭 시 사용되는 API

**Endpoint:** `GET /articles/:contentId`
**Method:** `GET`
**Description:** Fetch a specific article using its content ID.
**Path Parameters:**

- `contentId`: The content ID of the article.
  **Response:** `GetArticleDetailResDto`

<br>

#### 5. 게시물 공유 생성 : 게시물 목록 또는 상세에서 공유하기 클릭 시 사용되는 APIGet Paginated Article List

**Endpoint:** `POST /articles/share`
**Method:** `POST`
**Description:** Send a share notification for an article by its content ID.
**Request Body:** `CreateArticleShareDto`
**Response:** None (void).

---

### 게시물 통계(Statistics)
<<<<<<< HEAD

#### 1. 게시물 통계 데이터 조회

**Endpoint:** `GET /statistics/articles`
**Method:** `GET`
**Description:** 해시태그(hashtag)로 검색된 게시물의 시계열 통계 지표(게시물 생성, 조회, 좋아요, 공유 등의 수)를 조회 할 때 사용되는 API
**Query Parameters:** `GetArticleStatisticsDto`
| query | 속성 | default(미입력 시 값) | 설명 |예시|
| --- | --- | --- | --- |---|
| hashtags | string[] | sns의 계정태그 | 게시물 통계 검색을 희망하는 해시태그(string)입니다. 여러개의 해시태그를 검색하는 경우 공백(white space) 없이 컴마(,)로 구분합니다. <br> 해시태그를 보내지 않는 경우, 유저의 계정태그(accountTag)로 검색됩니다.'|'apple,mobile,WWDC'|
| periodType | string (열거형) | 필수 값 | 게시물 통계 검색 시 설정하는 조회 기간 유형입니다. 열거형으로 'date','hour'입니다. <br> 1시간 단위 검색은 hour이며 1일 단위 검색은 date입니다. ||
| startDate | date | 오늘로 부터 7일전 | periodType이 hour일 때, 조회 기간의 시작 "시간"이 되며, periodType이 date일 때, 조회 기간의 시작"일자"가 됩니다. <br> periodType이 date일 경우 시작 일자의 시간은 생략할 수 있습니다. ||
| endDate | date | 오늘 | periodType이 hour일 때, 조회 기간의 끝 "시간"이 되며, 최대 7일을 조회할 수 있습니다. periodType이 date일 때, 조회 기간의 끝 "일자"가 되며, 최대 30일을 조회할 수 있습니다. <br> periodType이 date일 경우 끝 일자의 시간은 생략할 수 있습니다.||
| value | enum | count |'어떤 통계 지표를 검색 할 지 선택하는 값 입니다. 게시물 수(count), 게시물 조회수(viewCount), 게시물 좋아요 수(likeCount), 게시물 공유 수(s hareCount)를 선택할 수 있습니다.||

=======

#### 1. 게시물 통계 데이터 조회

**Endpoint:** `GET /statistics/articles`  
**Method:** `GET`  
**Description:** 해시태그(hashtag)로 검색된 게시물의 시계열 통계 지표(게시물 생성, 조회, 좋아요, 공유 등의 수)를 조회 할 때 사용되는 API
**Query Parameters:** `GetArticleStatisticsDto`  
| query | 속성 | default(미입력 시 값) | 설명 |예시|
| --- | --- | --- | --- |---|
| hashtags | string[] | sns의 계정태그 | 게시물 통계 검색을 희망하는 해시태그(string)입니다. 여러개의 해시태그를 검색하는 경우 공백(white space) 없이 컴마(,)로 구분합니다. <br> 해시태그를 보내지 않는 경우, 유저의 계정태그(accountTag)로 검색됩니다.'|'apple,mobile,WWDC'|
| periodType | string (열거형) | 필수 값 | 게시물 통계 검색 시 설정하는 조회 기간 유형입니다. 열거형으로 'date','hour'입니다. <br> 1시간 단위 검색은 hour이며 1일 단위 검색은 date입니다. ||
| startDate | date | 오늘로 부터 7일전 | periodType이 hour일 때, 조회 기간의 시작 "시간"이 되며, periodType이 date일 때, 조회 기간의 시작"일자"가 됩니다. <br> periodType이 date일 경우 시작 일자의 시간은 생략할 수 있습니다. ||
| endDate | date | 오늘 | periodType이 hour일 때, 조회 기간의 끝 "시간"이 되며, 최대 7일을 조회할 수 있습니다. periodType이 date일 때, 조회 기간의 끝 "일자"가 되며, 최대 30일을 조회할 수 있습니다. <br> periodType이 date일 경우 끝 일자의 시간은 생략할 수 있습니다.||
| value | enum | count |'어떤 통계 지표를 검색 할 지 선택하는 값 입니다. 게시물 수(count), 게시물 조회수(viewCount), 게시물 좋아요 수(likeCount), 게시물 공유 수(s hareCount)를 선택할 수 있습니다.||

>>>>>>> a42008441c0a1d67f5036d8e8bdf30b51e96e76f
**Response:** `GetArticleStatisticsResDto`
| field | 속성 | 설명 |예시|
| --- | --- | --- | --- |
|isExistData|boolean|요청한 데이터가 해당 기간에 존재하는지에 대한 유무입니다.||
|data|IGetArticleStatisticsData[]|요청한 데이터의 값 배열입니다.|[ { date: '2023-09-15T00:00:00.000Z', likeCount: 8 },{ date: '2023-09-15T08:00:00.000Z', likeCount: 1 },{ date: '2023-09-15T12:00:00.000Z', likeCount: 2 }]|

<details>
<summary>Request/Response Flow</summary>
<div>
- 요청 dto(GetArticleStatisticsDto)에서 query가 요구사항에 부합하는 값을 보냈는지를 검증합니다.
- 하나의 api로 다양한 쿼리가 가능하도록 쿼리 필드의 값에 따라 쿼리가 자동 생성되는 OperatorFactory를 레포지토리 레이어에 함수로 작성하였습니다. OperatorFactory 함수에서 만들어진 operator로 mongoose의 aggregate(집계)메소드가 실행되며 통계 데이터를 데이터베이스에서 조회합니다.
- 응답 dto(GetArticleStatisticsResDto)에서, 데이터베이스에서 조회된 값을 클라이언트가 값을 조회하기 쉽도록 가공합니다.

<br>

---

## 사용자(User)

#### 1. 사용자 회원가입 요청 : 사용자 회원가입 요청에 사용되는 API. 회원가입 요청 이후 6자리의 랜덤한 코드가 입력한 이메일로 발송됩니다.

**Endpoint:** `POST auth/register`
**Method:** `POST`
**Description:** Register a new user.
**Request Body:** `RegisterUserDto`
**Response:** Status 200 code

<br>

#### 2. 사용자 가입 승인 : 사용자 회원 가입 요청을 승인하는 API. 회원 가입 요청자의 이메일로 전송된 코드와 사용자 정보를 검증하여 가입 승인 처리합니다.

**Endpoint:** `POST auth/verify`
**Method:** `POST`
**Description:** Verify a user's email with a code.
**Response:** Status 200 code

- `email`: The user's email.
- `code`: The verification code.

<br>

#### 3. 사용자 로그인 : 사용자가 계정, 비밀번호로 로그인 시 엑세스 토큰(JWT)을 발급하는 API

**Endpoint:** `POST auth/login`
**Method:** `POST`
**Description:** Authenticate and login a user.
**Request Body:** User credentials.
**Response:** HTTP 200 status code with an Authorization header containing the Bearer token.

<br>

---

## 🏁 마무리와 배운 점

- NoSQL와 Mongoose를 사용하여 협업하는 경험을 갖을 수 있었습니다.

### 명석

- 좋았던 점 : MongoDB, 통계 관련 API 등 처음 도전하는 기술을 사용해 요구사항을 시간 내에 잘 끝 마칠 수 있었다는 것에 만족한다. 그리고 팀원들과 회의를 하면서 기존에 해오던 방식에서 벗어나 다양한 의견들을 듣고 반영해볼 수 있어서 좋았다.

- 알게된 점 : MongoDB를 사용하는 이유, 장점, NoSQL 모델링 시 유의해야 할 점들에 대해 알게 되었다.

- 개선할 점 : 처음 팀이 구성되고 바로 프로젝트에 들어가다보니 기능 구현을 위한 역할 분담은 되었지만 그외에 많은 것들이 팀장님 어께 위로 얹혀진 것 같아 미안했다 ㅠ. 이제 한 번 프로젝트를 해보았으니 프로젝트를 진행할 때 어떤 역할들이 필요하고 그것들을 각자 잘 분담하면 그 짐을 같이 나눠 짊어질 수 있을 것 같다. 그리고 개인적으로 요구사항 분석을 처음에 제대로 하지 못해, 많은 변경이 생겼다. 처음에는 통계 데이터를 저장할 도큐먼트가 필요 없을 것으로 생각했으나 실제 기능 구현을 위해 요구사항 분석을 해보니 필요했었다. 앞으로 요구사항을 처음에 확실히 분석하고 정리하면 이런 일은 없을 것 같다.

### 상운

- NestJS의 적응 과정 : 처음에는 NestJS의 구조화된 접근 방식이 Express의 자유도에 비해 불편하게 느껴졌다.단순한 개발을 넘어서 구조 자체를 이해하는 데에도 시간이 소요되었다. 그러나 프로젝트 구조에 익숙해지며 NestJS의 장점을 점차 느끼게 되었다. 특히 유지 보수의 관점에서 보면, 지나치게 높은 자유도는 오히려 관리의 어려움을 초래할 수 있다는 것을 깨달았다. 이 과정에서 Guard와 같은 NestJS Enhancers의 중요성에 대해 학습하게 되었다.

- 팀원 간의 커뮤니케이션 중요성 : 프로젝트를 진행하면서 커뮤니케이션의 중요성을 깊게 깨달았다. 단순한 말로의 전달은 상대방에게 100% 정확히 도달하지 않는 경우가 많았다. 그것보다는 그림이나 코드를 통한 소통은 훨씬 더 명확하고 효율적이라는 것을 느꼈다. 초기에는 빠르게 진행되는 것처럼 보이는 커뮤니케이션이 나중에 잘못된 이해로 인해 큰 시간과 비용을 소모할 수 있다는 것을 경험했다. 특히 이번 프로젝트에서는 Service 로직에 JWT 관련 코드를 구현했으나 완전히 반영되지 않는 문제점에 직면했다. 추가로, JWT 사용 전략의 차이로 인해 코드 충돌이 발생하여 그 해결에도 상당한 시간과 노력이 소요되었다.

### 호준

- 유저와 인증을 분리해서 개발해본 경험 : 인증은 이번 프로젝트 말고도 다른 프로젝트에서 매번 맡아 진행했고, Oauth2.0, Refresh Token, 세션인증방식 여러가지 해보았다고 자신했던 부분이지만, 정작 이번 프로젝트에서는 소통의 문제로 서로 어려운 길을 가게 되었다. NestJS의 Guard와 Strategy 개념은 나름, 익숙하게 잘 개발했던 것 같다. 다만, 협업하는 개발자와 소통의 부재로, 다른 JWT 전략을 구사하는 등. 이번 기회로, 코드를 개발을 잘하는 것보다 소통하며 개발해야겠다는 생각이 들게 되었던 경험이다.

- MongoDB의 정규화 / 비정규화 모델 : NoSQL로 대부분의 프로젝트를 개발했던 경험이 있지만, 팀원들과 소통할 때 비정규화, 정규화를 이 개념을 어떻게 설명해야할 지 몰라서 찾아보았다. 이 모델링의 개념을 실제로 프로젝트에서 어떤 개념인지 자세하게 모르고 모델링을 했었는데, 이번 기회에 짚고 넘어갈 수 있었다.
