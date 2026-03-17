package com.huntingpocha.social;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long senderRoomId;
    @Column(nullable = false) private Long receiverRoomId;
    @Column(nullable = false) private Long storeId;
    @Column(nullable = false, length = 200) private String content;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
}
