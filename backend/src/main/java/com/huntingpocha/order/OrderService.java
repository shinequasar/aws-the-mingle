package com.huntingpocha.order;

import com.huntingpocha.common.exception.BusinessException;
import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.menu.Menu;
import com.huntingpocha.menu.MenuRepository;
import com.huntingpocha.notification.NotificationService;
import com.huntingpocha.room.RoomService;
import com.huntingpocha.room.RoomSession;
import com.huntingpocha.store.Store;
import com.huntingpocha.store.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuRepository menuRepository;
    private final StoreRepository storeRepository;
    private final RoomService roomService;
    private final NotificationService notificationService;

    @Transactional
    public Order createOrder(Long roomId, Long storeId, OrderCreateRequest request) {
        RoomSession session = roomService.getOrCreateSession(roomId);

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new NotFoundException("매장을 찾을 수 없습니다."));

        String orderNumber = generateOrderNumber(store.getStoreCode(), storeId);

        int totalAmount = 0;
        Order order = Order.builder()
                .roomSessionId(session.getId()).roomId(roomId).storeId(storeId)
                .orderNumber(orderNumber).totalAmount(0).status(OrderStatus.PENDING)
                .build();
        order = orderRepository.save(order);

        for (OrderCreateRequest.Item item : request.getItems()) {
            Menu menu = menuRepository.findById(item.getMenuId())
                    .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다."));
            OrderItem orderItem = OrderItem.builder()
                    .orderId(order.getId()).menuId(menu.getId())
                    .menuName(menu.getName()).quantity(item.getQuantity()).unitPrice(menu.getPrice())
                    .build();
            orderItemRepository.save(orderItem);
            totalAmount += menu.getPrice() * item.getQuantity();
        }

        order.setTotalAmount(totalAmount);
        order = orderRepository.save(order);

        notificationService.sendOrderEvent(storeId, "NEW_ORDER",
                Map.of("orderId", order.getId(), "orderNumber", orderNumber,
                        "roomId", roomId, "totalAmount", totalAmount));
        return order;
    }

    public List<Order> getOrdersBySession(Long roomId) {
        RoomSession session = roomService.getOrCreateSession(roomId);
        return orderRepository.findByRoomSessionIdOrderByCreatedAt(session.getId());
    }

    public List<OrderItem> getOrderItems(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    @Transactional
    public Order updateStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("주문을 찾을 수 없습니다."));
        validateStatusTransition(order.getStatus(), newStatus);
        order.setStatus(newStatus);
        order = orderRepository.save(order);
        notificationService.sendOrderEvent(order.getStoreId(), "ORDER_STATUS_CHANGED",
                Map.of("orderId", orderId, "newStatus", newStatus));
        return order;
    }

    @Transactional
    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("주문을 찾을 수 없습니다."));
        orderItemRepository.deleteByOrderId(orderId);
        orderRepository.delete(order);
        notificationService.sendOrderEvent(order.getStoreId(), "ORDER_DELETED",
                Map.of("orderId", orderId, "roomId", order.getRoomId()));
    }

    public List<Order> getOrdersByStore(Long storeId) {
        return orderRepository.findByStoreIdOrderByCreatedAtDesc(storeId);
    }

    private void validateStatusTransition(OrderStatus current, OrderStatus next) {
        boolean valid = (current == OrderStatus.PENDING && next == OrderStatus.PREPARING)
                || (current == OrderStatus.PREPARING && next == OrderStatus.COMPLETED);
        if (!valid) throw new BusinessException("잘못된 상태 변경입니다: " + current + " → " + next);
    }

    private String generateOrderNumber(String storeCode, Long storeId) {
        LocalDate today = LocalDate.now();
        long count = orderRepository.countByStoreIdAndCreatedAtBetween(storeId,
                today.atStartOfDay(), today.atTime(LocalTime.MAX));
        return String.format("%s-%s-%03d", storeCode, today.toString().replace("-", ""), count + 1);
    }
}
