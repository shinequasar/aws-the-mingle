package com.huntingpocha.merge;

import com.huntingpocha.social.RequestStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "merge_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MergeRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long requesterRoomId;
    @Column(nullable = false) private Long targetRoomId;
    @Column(nullable = false) private Long storeId;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private RequestStatus status;
    @Builder.Default private Boolean freeExtensionUsed = false;
    @Builder.Default private Integer extensionCount = 0;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
}
