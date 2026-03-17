package com.huntingpocha.room;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "room_sessions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RoomSession {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long roomId;
    @Column(nullable = false)
    private LocalDateTime startedAt;
    @Column(nullable = false)
    private LocalDateTime expiresAt;
    private LocalDateTime completedAt;
    @Builder.Default
    private Boolean active = true;
}
