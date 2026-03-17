package com.huntingpocha.merge;

import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.room.RoomSession;
import com.huntingpocha.room.RoomSessionRepository;
import com.huntingpocha.social.RequestStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MergeServiceTest {

    @Mock private MergeRequestRepository mergeRequestRepository;
    @Mock private RoomSessionRepository roomSessionRepository;
    @Mock private SimpMessagingTemplate messagingTemplate;
    @InjectMocks private MergeService mergeService;

    @Test
    void respondMerge_accept_extendsSessions() {
        MergeRequest req = MergeRequest.builder()
                .id(1L).requesterRoomId(1L).targetRoomId(2L).storeId(1L)
                .status(RequestStatus.PENDING).freeExtensionUsed(false)
                .build();
        LocalDateTime now = LocalDateTime.now();
        RoomSession s1 = RoomSession.builder().id(1L).roomId(1L).expiresAt(now).active(true).build();
        RoomSession s2 = RoomSession.builder().id(2L).roomId(2L).expiresAt(now).active(true).build();

        when(mergeRequestRepository.findById(1L)).thenReturn(Optional.of(req));
        when(roomSessionRepository.findByRoomIdAndActiveTrue(1L)).thenReturn(Optional.of(s1));
        when(roomSessionRepository.findByRoomIdAndActiveTrue(2L)).thenReturn(Optional.of(s2));

        mergeService.respondMerge(1L, true);

        assertEquals(RequestStatus.ACCEPTED, req.getStatus());
        assertTrue(req.getFreeExtensionUsed());
        assertEquals(now.plusMinutes(30), s1.getExpiresAt());
        assertEquals(now.plusMinutes(30), s2.getExpiresAt());
    }

    @Test
    void respondMerge_reject() {
        MergeRequest req = MergeRequest.builder()
                .id(1L).requesterRoomId(1L).targetRoomId(2L).status(RequestStatus.PENDING).build();
        when(mergeRequestRepository.findById(1L)).thenReturn(Optional.of(req));

        mergeService.respondMerge(1L, false);
        assertEquals(RequestStatus.REJECTED, req.getStatus());
    }

    @Test
    void respondMerge_notFound_throws() {
        when(mergeRequestRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> mergeService.respondMerge(99L, true));
    }
}
