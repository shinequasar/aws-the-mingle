package com.huntingpocha.social;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "photos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Photo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long senderRoomId;
    @Column(nullable = false) private Long receiverRoomId;
    @Column(nullable = false) private Long storeId;
    @Column(nullable = false) private String imageUrl;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
}
