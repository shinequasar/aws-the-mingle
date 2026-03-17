-- Store
INSERT IGNORE INTO stores (id, store_code, name, address, phone, created_at, updated_at)
VALUES (1, 'POCHA001', '헌팅포차 강남점', '서울시 강남구 역삼동 123-45', '02-1234-5678', NOW(), NOW());

-- Admin (password: 1234)
INSERT IGNORE INTO admins (id, store_id, username, password, login_attempts, created_at)
VALUES (1, 1, 'admin', '$2b$10$huXf8xPetZav8Fhd3TwJge7T0wBDMYxc3usp8qJmk3sDCZNi22DHK', 0, NOW());

-- Rooms (password: 1234)
INSERT IGNORE INTO rooms (id, store_id, room_number, password, created_at) VALUES
(1, 1, 1, '$2b$10$huXf8xPetZav8Fhd3TwJge7T0wBDMYxc3usp8qJmk3sDCZNi22DHK', NOW()),
(2, 1, 2, '$2b$10$huXf8xPetZav8Fhd3TwJge7T0wBDMYxc3usp8qJmk3sDCZNi22DHK', NOW()),
(3, 1, 3, '$2b$10$huXf8xPetZav8Fhd3TwJge7T0wBDMYxc3usp8qJmk3sDCZNi22DHK', NOW()),
(4, 1, 4, '$2b$10$huXf8xPetZav8Fhd3TwJge7T0wBDMYxc3usp8qJmk3sDCZNi22DHK', NOW()),
(5, 1, 5, '$2b$10$huXf8xPetZav8Fhd3TwJge7T0wBDMYxc3usp8qJmk3sDCZNi22DHK', NOW()),
(6, 1, 6, '$2b$10$huXf8xPetZav8Fhd3TwJge7T0wBDMYxc3usp8qJmk3sDCZNi22DHK', NOW());

-- Room Sessions
INSERT IGNORE INTO room_sessions (id, room_id, started_at, expires_at, active) VALUES
(1, 1, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(2, 2, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(3, 3, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(4, 4, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(5, 5, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE),
(6, 6, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), TRUE);

-- Categories
INSERT IGNORE INTO categories (id, store_id, name, display_order) VALUES
(1, 1, '분식', 1),
(2, 1, '면류', 2),
(3, 1, '사이드', 3),
(4, 1, '디저트', 4);

-- Menus
INSERT IGNORE INTO menus (id, category_id, name, price, description, image_url, display_order, available, created_at, updated_at) VALUES
(1,  1, '핫도그 세트',    5000,  '바삭한 핫도그 3종 세트 (오리지널, 감자, 치즈)', '/uploads/ead6cf89b51fbb95046463ec027d280e.jpg', 1, TRUE, NOW(), NOW()),
(2,  1, '떡꼬치',        4000,  '매콤달콤 양념 떡꼬치',                          '/uploads/67556b38c19f00e78806a4bd8e13b96d.jpg', 2, TRUE, NOW(), NOW()),
(3,  1, '소고기 김밥',    4500,  '소고기와 신선한 야채가 가득한 김밥',             '/uploads/b914043912dfee77fc37772ce1d09667.jpg', 3, TRUE, NOW(), NOW()),
(4,  2, '만두 라면',      7000,  '푸짐한 만두가 올라간 얼큰한 라면',              '/uploads/e58e91d859cedc9b032fcdc1c6252241.jpg', 1, TRUE, NOW(), NOW()),
(5,  2, '토마토 파스타',   8500,  '방울토마토와 바질의 클래식 파스타',              '/uploads/33e03b6492c4629628afddf5c43881c1.jpg', 2, TRUE, NOW(), NOW()),
(6,  2, '비빔면',         6000,  '매콤새콤 비빔면',                               '/uploads/0cc543f06aaed68f5434aa7e08493ccf.jpg', 3, TRUE, NOW(), NOW()),
(7,  3, '군만두',         5500,  '노릇노릇 바삭한 군만두',                        '/uploads/b4b14477b497e09997d3a74671e7f71d.jpg', 1, TRUE, NOW(), NOW()),
(8,  3, '새우튀김',       7500,  '바삭한 황금빛 새우튀김',                        '/uploads/0f7a10b7c2f5f800c5f04e0a8cb75738.jpg', 2, TRUE, NOW(), NOW()),
(9,  3, '감자구이',       5000,  '허브 시즈닝 감자구이',                          '/uploads/d9473d541d0f0fc296fea36397ed1114.jpg', 3, TRUE, NOW(), NOW()),
(10, 3, '브로콜리 소시지', 4500,  '귀여운 브로콜리 소시지',                        '/uploads/b25e1b9e9623c7be06725014e90e0bd2.jpg', 4, TRUE, NOW(), NOW()),
(11, 3, '잉글리시 브렉퍼스트', 9000, '베이컨, 소시지, 계란후라이 플레이트',        '/uploads/029ef2347905111745e4f1fba1fe54f9.jpg', 5, TRUE, NOW(), NOW()),
(12, 4, '말차 초코빵',    3500,  '진한 말차 크림이 가득한 초코빵',                '/uploads/1eda9d47b2ef65e6bc5a5057a6a2653f.jpg', 1, TRUE, NOW(), NOW()),
(13, 4, '딸기 토스트',    5500,  '생크림과 딸기잼의 달콤한 토스트',               '/uploads/59418cc3ee39479f1d792691405638fe.jpg', 2, TRUE, NOW(), NOW()),
(14, 4, '탕후루',         4000,  '달콤 바삭한 과일 탕후루',                       '/uploads/6d9842a0c908c7c5f3c59596227467d0.jpg', 3, TRUE, NOW(), NOW());
