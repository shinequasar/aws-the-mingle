package com.huntingpocha.order;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByRoomSessionIdOrderByCreatedAt(Long roomSessionId);
    List<Order> findByStoreIdOrderByCreatedAtDesc(Long storeId);
    long countByStoreIdAndCreatedAtBetween(Long storeId, LocalDateTime start, LocalDateTime end);
}
