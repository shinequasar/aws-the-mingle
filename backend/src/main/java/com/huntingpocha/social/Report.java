package com.huntingpocha.social;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Report {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long reporterRoomId;
    @Column(nullable = false) private String targetType;
    @Column(nullable = false) private Long targetId;
    @Column(nullable = false) private Long storeId;
    private String reason;
    @Builder.Default private Boolean handled = false;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
}
