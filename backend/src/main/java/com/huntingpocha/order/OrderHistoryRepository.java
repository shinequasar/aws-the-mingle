package com.huntingpocha.order;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {
    List<OrderHistory> findByRoomIdAndCompletedAtBetweenOrderByCompletedAtDesc(Long roomId, LocalDateTime from, LocalDateTime to);
    List<OrderHistory> findByRoomIdOrderByCompletedAtDesc(Long roomId);
}
