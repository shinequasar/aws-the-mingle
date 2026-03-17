# Build Instructions

## Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Gradle (wrapper 포함)

## Environment Variables
```bash
export JWT_SECRET=your-secret-key-min-32-chars-long
export UPLOAD_PATH=./uploads
export SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/huntingpocha
export SPRING_DATASOURCE_USERNAME=root
export SPRING_DATASOURCE_PASSWORD=your-password
```

## 1. Database Setup
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS huntingpocha DEFAULT CHARACTER SET utf8mb4;"
```

## 2. Backend Build
```bash
cd backend
./gradlew clean build
# 빌드 결과: build/libs/huntingpocha-0.0.1-SNAPSHOT.jar
```

## 3. Customer App Build
```bash
cd customer-app
npm install
npm run build
# 빌드 결과: dist/
```

## 4. Admin App Build
```bash
cd admin-app
npm install
npm run build
# 빌드 결과: dist/
```

## 5. Run Application
```bash
# Backend (port 8080)
cd backend
java -jar build/libs/huntingpocha-0.0.1-SNAPSHOT.jar

# Customer App (port 3000, dev mode)
cd customer-app
npm run dev

# Admin App (port 3001, dev mode)
cd admin-app
npm run dev
```

## Troubleshooting

### MySQL 연결 실패
- MySQL 서비스 실행 확인: `mysql.server start` (macOS)
- DB 존재 확인: `mysql -u root -p -e "SHOW DATABASES;"`

### Gradle 빌드 실패
- Java 17 확인: `java -version`
- Gradle wrapper 권한: `chmod +x gradlew`

### npm install 실패
- Node 18+ 확인: `node -v`
- 캐시 정리: `npm cache clean --force`
