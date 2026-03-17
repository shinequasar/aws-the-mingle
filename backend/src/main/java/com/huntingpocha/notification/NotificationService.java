package com.huntingpocha.notification;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@Service
public class NotificationService {

    private final Map<Long, List<SseEmitter>> orderEmitters = new ConcurrentHashMap<>();
    private final Map<Long, List<SseEmitter>> callEmitters = new ConcurrentHashMap<>();

    public SseEmitter subscribeOrders(Long storeId) {
        return createEmitter(orderEmitters, storeId);
    }

    public SseEmitter subscribeCalls(Long storeId) {
        return createEmitter(callEmitters, storeId);
    }

    public void sendOrderEvent(Long storeId, String eventType, Object data) {
        sendEvent(orderEmitters, storeId, eventType, data);
    }

    public void sendCallEvent(Long storeId, String eventType, Object data) {
        sendEvent(callEmitters, storeId, eventType, data);
    }

    private SseEmitter createEmitter(Map<Long, List<SseEmitter>> emitterMap, Long storeId) {
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L);
        emitterMap.computeIfAbsent(storeId, k -> new CopyOnWriteArrayList<>()).add(emitter);
        emitter.onCompletion(() -> removeEmitter(emitterMap, storeId, emitter));
        emitter.onTimeout(() -> removeEmitter(emitterMap, storeId, emitter));
        emitter.onError(e -> removeEmitter(emitterMap, storeId, emitter));
        return emitter;
    }

    private void sendEvent(Map<Long, List<SseEmitter>> emitterMap, Long storeId, String eventType, Object data) {
        List<SseEmitter> emitters = emitterMap.get(storeId);
        if (emitters == null) return;
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event().name(eventType).data(data));
            } catch (IOException e) {
                removeEmitter(emitterMap, storeId, emitter);
            }
        });
    }

    private void removeEmitter(Map<Long, List<SseEmitter>> emitterMap, Long storeId, SseEmitter emitter) {
        List<SseEmitter> emitters = emitterMap.get(storeId);
        if (emitters != null) emitters.remove(emitter);
    }
}
