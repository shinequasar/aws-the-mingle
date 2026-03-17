package com.huntingpocha.room;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter @AllArgsConstructor
public class RoomTimeResponse {
    private LocalDateTime startedAt;
    private LocalDateTime expiresAt;
    private long remainingSeconds;
}
