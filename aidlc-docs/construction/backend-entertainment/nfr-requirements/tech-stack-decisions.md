# Tech Stack Decisions - Backend Entertainment

## 기본 원칙
Unit 1과 동일한 기술 스택 사용. 추가 의존성 없음.

## 사용 기술 (Unit 1 상속)

| Technology | Purpose |
|-----------|---------|
| Spring Data JPA | GameQuestion 엔티티 접근 |
| Native Query (RAND()) | MySQL 랜덤 조회 |
| Lombok | 보일러플레이트 감소 |

## 추가 의존성
없음. Unit 1에서 설정한 spring-boot-starter-data-jpa, spring-boot-starter-web으로 충분.
