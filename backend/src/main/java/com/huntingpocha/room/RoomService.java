package com.huntingpocha.room;

import com.huntingpocha.common.exception.BusinessException;
import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.order.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomSessionRepository roomSessionRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderHistoryRepository orderHistoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    public Room create(RoomCreateRequest request) {
        Room room = Room.builder()
                .storeId(request.getStoreId())
                .roomNumber(request.getRoomNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        return roomRepository.save(room);
    }

    public List<Room> findByStoreId(Long storeId) {
        return roomRepository.findByStoreId(storeId);
    }

    public RoomSession getOrCreateSession(Long roomId) {
        return roomSessionRepository.findByRoomIdAndActiveTrue(roomId)
                .orElseGet(() -> {
                    LocalDateTime now = LocalDateTime.now();
                    RoomSession session = RoomSession.builder()
                            .roomId(roomId)
                            .startedAt(now)
                            .expiresAt(now.plusHours(2))
                            .build();
                    return roomSessionRepository.save(session);
                });
    }

    public RoomTimeResponse getTimeInfo(Long roomId) {
        return roomSessionRepository.findByRoomIdAndActiveTrue(roomId)
                .map(s -> new RoomTimeResponse(s.getStartedAt(), s.getExpiresAt(),
                        java.time.Duration.between(LocalDateTime.now(), s.getExpiresAt()).getSeconds()))
                .orElse(new RoomTimeResponse(null, null, 0));
    }

    @Transactional
    public void completeSession(Long roomId) {
        RoomSession session = roomSessionRepository.findByRoomIdAndActiveTrue(roomId)
                .orElseThrow(() -> new BusinessException("활성 세션이 없습니다."));

        LocalDateTime now = LocalDateTime.now();
        List<Order> orders = orderRepository.findByRoomSessionIdOrderByCreatedAt(session.getId());

        for (Order order : orders) {
            List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
            String itemsJson;
            try { itemsJson = objectMapper.writeValueAsString(items); }
            catch (JsonProcessingException e) { itemsJson = "[]"; }

            OrderHistory history = OrderHistory.builder()
                    .roomId(roomId).storeId(order.getStoreId()).sessionId(session.getId())
                    .orderNumber(order.getOrderNumber()).totalAmount(order.getTotalAmount())
                    .status(order.getStatus()).items(itemsJson)
                    .orderedAt(order.getCreatedAt()).completedAt(now)
                    .build();
            orderHistoryRepository.save(history);
            orderItemRepository.deleteByOrderId(order.getId());
        }
        orderRepository.deleteAll(orders);

        session.setActive(false);
        session.setCompletedAt(now);
        roomSessionRepository.save(session);
    }

    public List<OrderHistory> getHistory(Long roomId, LocalDateTime from, LocalDateTime to) {
        if (from != null && to != null) {
            return orderHistoryRepository.findByRoomIdAndCompletedAtBetweenOrderByCompletedAtDesc(roomId, from, to);
        }
        return orderHistoryRepository.findByRoomIdOrderByCompletedAtDesc(roomId);
    }
}
