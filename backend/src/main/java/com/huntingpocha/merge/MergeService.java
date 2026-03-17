package com.huntingpocha.merge;

import com.huntingpocha.common.exception.BusinessException;
import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.room.RoomSession;
import com.huntingpocha.room.RoomSessionRepository;
import com.huntingpocha.social.RequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MergeService {

    private final MergeRequestRepository mergeRequestRepository;
    private final RoomSessionRepository roomSessionRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public MergeRequest requestMerge(Long requesterRoomId, Long targetRoomId, Long storeId) {
        MergeRequest req = MergeRequest.builder()
                .requesterRoomId(requesterRoomId).targetRoomId(targetRoomId)
                .storeId(storeId).status(RequestStatus.PENDING)
                .build();
        req = mergeRequestRepository.save(req);

        messagingTemplate.convertAndSend("/topic/room/" + targetRoomId + "/notifications",
                Map.of("type", "MERGE_REQUEST", "requestId", req.getId(), "requesterRoomId", requesterRoomId));
        return req;
    }

    @Transactional
    public void respondMerge(Long requestId, boolean accept) {
        MergeRequest req = mergeRequestRepository.findById(requestId)
                .orElseThrow(() -> new NotFoundException("합석 요청을 찾을 수 없습니다."));
        req.setStatus(accept ? RequestStatus.ACCEPTED : RequestStatus.REJECTED);

        if (accept) {
            req.setFreeExtensionUsed(true);
            extendSession(req.getRequesterRoomId(), 30);
            extendSession(req.getTargetRoomId(), 30);
        }
        mergeRequestRepository.save(req);

        String type = accept ? "MERGE_ACCEPTED" : "MERGE_REJECTED";
        messagingTemplate.convertAndSend("/topic/room/" + req.getRequesterRoomId() + "/notifications",
                Map.of("type", type, "requestId", requestId));
        if (accept) {
            messagingTemplate.convertAndSend("/topic/room/" + req.getTargetRoomId() + "/notifications",
                    Map.of("type", "MERGE_ACCEPTED", "requestId", requestId));
        }
    }

    @Transactional
    public void extendMerge(Long requestId) {
        MergeRequest req = mergeRequestRepository.findById(requestId)
                .orElseThrow(() -> new NotFoundException("합석 요청을 찾을 수 없습니다."));
        if (req.getStatus() != RequestStatus.ACCEPTED) {
            throw new BusinessException("합석이 성립되지 않았습니다.");
        }
        req.setExtensionCount(req.getExtensionCount() + 1);
        mergeRequestRepository.save(req);

        extendSession(req.getRequesterRoomId(), 30);
        extendSession(req.getTargetRoomId(), 30);
    }

    private void extendSession(Long roomId, int minutes) {
        RoomSession session = roomSessionRepository.findByRoomIdAndActiveTrue(roomId).orElse(null);
        if (session != null) {
            session.setExpiresAt(session.getExpiresAt().plusMinutes(minutes));
            roomSessionRepository.save(session);
        }
    }
}
