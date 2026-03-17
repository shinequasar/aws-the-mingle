package com.huntingpocha.call;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "call_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CallRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long roomId;
    @Column(nullable = false)
    private Long storeId;
    @Column(nullable = false)
    private String reason;
    @Builder.Default
    private Boolean handled = false;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    private LocalDateTime handledAt;
    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}
