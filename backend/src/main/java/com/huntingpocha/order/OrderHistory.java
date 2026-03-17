package com.huntingpocha.order;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_history")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long roomId;
    @Column(nullable = false)
    private Long storeId;
    @Column(nullable = false)
    private Long sessionId;
    @Column(nullable = false)
    private String orderNumber;
    @Column(nullable = false)
    private Integer totalAmount;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;
    @Column(columnDefinition = "JSON", nullable = false)
    private String items;
    @Column(nullable = false)
    private LocalDateTime orderedAt;
    @Column(nullable = false)
    private LocalDateTime completedAt;
}
