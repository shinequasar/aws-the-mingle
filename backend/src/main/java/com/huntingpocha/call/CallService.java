package com.huntingpocha.call;

import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.notification.NotificationService;
import com.huntingpocha.room.Room;
import com.huntingpocha.room.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CallService {

    private final CallRequestRepository callRequestRepository;
    private final RoomRepository roomRepository;
    private final NotificationService notificationService;

    public CallRequest create(Long roomId, Long storeId, String reason) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException("룸을 찾을 수 없습니다."));
        CallRequest call = CallRequest.builder()
                .roomId(roomId).storeId(storeId).reason(reason)
                .build();
        call = callRequestRepository.save(call);
        notificationService.sendCallEvent(storeId, "NEW_CALL",
                Map.of("callId", call.getId(), "roomNumber", room.getRoomNumber(), "reason", reason));
        return call;
    }

    public List<CallRequest> getPending(Long storeId) {
        return callRequestRepository.findByStoreIdAndHandledFalseOrderByCreatedAt(storeId);
    }

    public void complete(Long callId) {
        CallRequest call = callRequestRepository.findById(callId)
                .orElseThrow(() -> new NotFoundException("호출을 찾을 수 없습니다."));
        call.setHandled(true);
        call.setHandledAt(LocalDateTime.now());
        callRequestRepository.save(call);
        notificationService.sendCallEvent(call.getStoreId(), "CALL_HANDLED",
                Map.of("callId", callId));
    }
}
