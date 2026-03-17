package com.huntingpocha.social;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "send_menu_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SendMenuRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long senderRoomId;
    @Column(nullable = false) private Long receiverRoomId;
    @Column(nullable = false) private Long storeId;
    @Column(columnDefinition = "JSON", nullable = false) private String menuItems;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private RequestStatus status;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
}
