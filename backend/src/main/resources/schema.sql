CREATE DATABASE IF NOT EXISTS hunting_pocha DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hunting_pocha;

CREATE TABLE IF NOT EXISTS stores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    store_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    store_id BIGINT NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    login_attempts INT DEFAULT 0,
    locked_until DATETIME,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    store_id BIGINT NOT NULL,
    room_number INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS room_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,
    started_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    completed_at DATETIME,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    store_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS menus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    display_order INT DEFAULT 0,
    available BOOLEAN DEFAULT TRUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_session_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (room_session_id) REFERENCES room_sessions(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    menu_id BIGINT NOT NULL,
    menu_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    unit_price INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_id) REFERENCES menus(id)
);

CREATE TABLE IF NOT EXISTS order_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    session_id BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL,
    total_amount INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    items JSON NOT NULL,
    ordered_at DATETIME NOT NULL,
    completed_at DATETIME NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS call_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    reason VARCHAR(100) NOT NULL,
    handled BOOLEAN DEFAULT FALSE,
    created_at DATETIME NOT NULL,
    handled_at DATETIME,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

-- Social & Hunting tables
CREATE TABLE IF NOT EXISTS send_menu_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_room_id BIGINT NOT NULL,
    receiver_room_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    menu_items JSON NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (sender_room_id) REFERENCES rooms(id),
    FOREIGN KEY (receiver_room_id) REFERENCES rooms(id),
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_room_id BIGINT NOT NULL,
    receiver_room_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    content VARCHAR(200) NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (sender_room_id) REFERENCES rooms(id),
    FOREIGN KEY (receiver_room_id) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS photos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_room_id BIGINT NOT NULL,
    receiver_room_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (sender_room_id) REFERENCES rooms(id),
    FOREIGN KEY (receiver_room_id) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS merge_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    requester_room_id BIGINT NOT NULL,
    target_room_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL,
    free_extension_used BOOLEAN DEFAULT FALSE,
    extension_count INT DEFAULT 0,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (requester_room_id) REFERENCES rooms(id),
    FOREIGN KEY (target_room_id) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reporter_room_id BIGINT NOT NULL,
    target_type VARCHAR(20) NOT NULL,
    target_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    reason VARCHAR(500),
    handled BOOLEAN DEFAULT FALSE,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (reporter_room_id) REFERENCES rooms(id)
);

-- Game tables
CREATE TABLE IF NOT EXISTS game_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(30) NOT NULL,
    category VARCHAR(30),
    content TEXT NOT NULL,
    option_a VARCHAR(200),
    option_b VARCHAR(200)
);

-- Seed: icebreaker questions
INSERT INTO game_questions (type, category, content) VALUES
('ICEBREAKER', 'light', '가장 최근에 웃었던 이유는?'),
('ICEBREAKER', 'light', '무인도에 하나만 가져간다면?'),
('ICEBREAKER', 'light', '요즘 빠져있는 취미는?'),
('ICEBREAKER', 'fun', '가장 창피했던 순간은?'),
('ICEBREAKER', 'fun', '술자리에서 가장 기억에 남는 에피소드는?'),
('ICEBREAKER', 'deep', '인생에서 가장 중요한 가치는?'),
('ICEBREAKER', 'deep', '10년 후 나는 어디서 뭘 하고 있을까?');

-- Seed: balance game
INSERT INTO game_questions (type, content, option_a, option_b) VALUES
('BALANCE', '연애할 때 더 중요한 것은?', '외모', '성격'),
('BALANCE', '여행 스타일은?', '계획형', '즉흥형'),
('BALANCE', '소개팅에서 더 중요한 것은?', '첫인상', '대화력'),
('BALANCE', '금요일 밤에 더 하고 싶은 것은?', '클럽/바', '집에서 넷플릭스'),
('BALANCE', '연인과 싸웠을 때?', '바로 화해', '시간을 두고 냉각');

-- Seed: truth or lie
INSERT INTO game_questions (type, content) VALUES
('TRUTH_OR_LIE', '나에 대한 3가지 사실 중 거짓 하나를 찾아보세요'),
('TRUTH_OR_LIE', '첫사랑 이야기를 해주세요 - 진실일까요?'),
('TRUTH_OR_LIE', '가장 황당했던 경험을 말해주세요');

-- Seed: conversation topics
INSERT INTO game_questions (type, category, content) VALUES
('TOPIC', 'light', '요즘 가장 핫한 드라마/영화는?'),
('TOPIC', 'light', '최근에 가본 맛집 추천!'),
('TOPIC', 'fun', '술게임 중 가장 좋아하는 건?'),
('TOPIC', 'fun', '이상형 월드컵 해볼까요?'),
('TOPIC', 'deep', '버킷리스트 TOP 3는?'),
('TOPIC', 'deep', '가장 감동받았던 순간은?');

-- Seed: roulette penalties
INSERT INTO game_questions (type, content) VALUES
('PENALTY', '원샷!'),
('PENALTY', '옆 사람에게 칭찬 3개 하기'),
('PENALTY', '30초 동안 개인기 보여주기'),
('PENALTY', '가장 최근 찍은 셀카 공개'),
('PENALTY', '옆 사람과 하이파이브 10번');

-- Seed: store
INSERT INTO stores (store_code, name, address, phone, created_at, updated_at)
VALUES ('HP01', '헌팅포차 강남점', '서울시 강남구', '02-1234-5678', NOW(), NOW());

-- Seed: admin (password: admin123)
INSERT INTO admins (store_id, username, password, login_attempts, created_at)
VALUES (1, 'admin', '$2b$12$UjYcv7B8QaLVFOFTXulzkeU2WrljMa/IqsLp48LtbeKXFMmnqLwF2', 0, NOW());

-- Seed: rooms (password: 1234)
INSERT INTO rooms (store_id, room_number, password, created_at) VALUES
(1, 1, '$2b$12$/0qBmk5ReQ1sRUZaFdIuqOGrfI3d7GYUtzVXiTZ6knh98kI83g/hq', NOW()),
(1, 2, '$2b$12$/0qBmk5ReQ1sRUZaFdIuqOGrfI3d7GYUtzVXiTZ6knh98kI83g/hq', NOW()),
(1, 3, '$2b$12$/0qBmk5ReQ1sRUZaFdIuqOGrfI3d7GYUtzVXiTZ6knh98kI83g/hq', NOW()),
(1, 4, '$2b$12$/0qBmk5ReQ1sRUZaFdIuqOGrfI3d7GYUtzVXiTZ6knh98kI83g/hq', NOW()),
(1, 5, '$2b$12$/0qBmk5ReQ1sRUZaFdIuqOGrfI3d7GYUtzVXiTZ6knh98kI83g/hq', NOW()),
(1, 6, '$2b$12$/0qBmk5ReQ1sRUZaFdIuqOGrfI3d7GYUtzVXiTZ6knh98kI83g/hq', NOW());

-- Seed: room sessions
INSERT INTO room_sessions (room_id, started_at, expires_at, active) VALUES
(1, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(2, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(3, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(4, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(5, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(6, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE);

-- Seed: categories
INSERT INTO categories (store_id, name, display_order) VALUES
(1, '주류', 0),
(1, '분식', 1),
(1, '면류', 2),
(1, '사이드', 3),
(1, '디저트', 4);

-- Seed: menus - 주류
INSERT INTO menus (category_id, name, price, description, image_url, display_order, available, created_at, updated_at) VALUES
((SELECT id FROM categories WHERE name='주류'), '가로', 5000, '가로 소주', '/uploads/soju-garo.png', 1, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '새로', 5000, '새로 소주', '/uploads/soju-saero.png', 2, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '거꾸로', 5000, '거꾸로 소주', '/uploads/soju-gekkuro.png', 3, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '카스 생맥주 500ml', 5000, '시원한 생맥주', 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop', 4, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '테라 생맥주 500ml', 5000, '청정라거 테라', 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop', 5, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '켈리 생맥주 500ml', 5000, '켈리 생맥주', 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400&h=400&fit=crop', 6, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '소주 (참이슬)', 5000, '참이슬 후레쉬 360ml', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop', 7, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '소주 (처음처럼)', 5000, '처음처럼 360ml', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop', 8, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '맥주 (카스)', 5000, '카스 프레시 355ml', 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400&h=400&fit=crop', 9, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '맥주 (테라)', 5000, '테라 355ml', 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=400&fit=crop', 10, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '하이볼', 8000, '위스키 하이볼', 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=400&fit=crop', 11, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '과일소주 (청포도)', 7000, '청포도에이슬', 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=400&fit=crop', 12, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='주류'), '칵테일 (모히또)', 9000, '상큼한 모히또', 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=400&fit=crop', 13, TRUE, NOW(), NOW());

-- Seed: menus - 분식
INSERT INTO menus (category_id, name, price, description, display_order, available, created_at, updated_at) VALUES
((SELECT id FROM categories WHERE name='분식'), '핫도그 세트', 5000, NULL, 1, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='분식'), '떡꼬치', 4000, NULL, 2, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='분식'), '소고기 김밥', 4500, NULL, 3, TRUE, NOW(), NOW());

-- Seed: menus - 면류
INSERT INTO menus (category_id, name, price, description, display_order, available, created_at, updated_at) VALUES
((SELECT id FROM categories WHERE name='면류'), '만두 라면', 7000, NULL, 1, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='면류'), '토마토 파스타', 8500, NULL, 2, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='면류'), '비빔면', 6000, NULL, 3, TRUE, NOW(), NOW());

-- Seed: menus - 사이드
INSERT INTO menus (category_id, name, price, description, display_order, available, created_at, updated_at) VALUES
((SELECT id FROM categories WHERE name='사이드'), '군만두', 5500, NULL, 1, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='사이드'), '새우튀김', 7500, NULL, 2, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='사이드'), '감자구이', 5000, NULL, 3, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='사이드'), '브로콜리 소시지', 4500, NULL, 4, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='사이드'), '잉글리시 브렉퍼스트', 9000, NULL, 5, TRUE, NOW(), NOW());

-- Seed: menus - 디저트
INSERT INTO menus (category_id, name, price, description, display_order, available, created_at, updated_at) VALUES
((SELECT id FROM categories WHERE name='디저트'), '말차 초코빵', 3500, NULL, 1, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='디저트'), '딸기 토스트', 5500, NULL, 2, TRUE, NOW(), NOW()),
((SELECT id FROM categories WHERE name='디저트'), '탕후루', 4000, NULL, 3, TRUE, NOW(), NOW());
