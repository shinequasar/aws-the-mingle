package com.huntingpocha.room;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoomSessionRepository extends JpaRepository<RoomSession, Long> {
    Optional<RoomSession> findByRoomIdAndActiveTrue(Long roomId);
}
