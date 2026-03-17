# NFR Requirements Plan - Backend Core Order (Unit 1)

## Execution Checklist

### Phase 1: NFR Assessment
- [x] 성능 요구사항 정의
- [x] 보안 요구사항 정의
- [x] 가용성/안정성 요구사항 정의

### Phase 2: Tech Stack Decisions
- [x] Spring Boot 버전 및 주요 라이브러리 결정
- [x] 데이터베이스 설정 결정
- [x] 빌드 도구 결정

---

## Questions

## Question 1
예상 동시 접속 규모는? (매장 1개 기준)

A) 소규모 (룸 10개 이하, 동시 접속 ~20명)
B) 중규모 (룸 10~30개, 동시 접속 ~60명)
C) 대규모 (룸 30개 이상, 동시 접속 100명+)
D) Other (please describe after [Answer]: tag below)

[Answer]: b:동시접속을 사람이 아니라 룸당 패드1대 기준으로해줘

## Question 2
Spring Boot에서 사용할 언어는?

A) Java 17+
B) Kotlin
C) Other (please describe after [Answer]: tag below)

[Answer]: a

## Question 3
빌드 도구는?

A) Gradle (Groovy DSL)
B) Gradle (Kotlin DSL)
C) Maven
D) Other (please describe after [Answer]: tag below)

[Answer]: a
