package com.huntingpocha.notification;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/admin/sse")
@RequiredArgsConstructor
public class SseController {

    private final NotificationService notificationService;

    @GetMapping("/orders")
    public SseEmitter subscribeOrders(@AuthenticationPrincipal Claims claims) {
        Long storeId = claims.get("storeId", Long.class);
        return notificationService.subscribeOrders(storeId);
    }

    @GetMapping("/calls")
    public SseEmitter subscribeCalls(@AuthenticationPrincipal Claims claims) {
        Long storeId = claims.get("storeId", Long.class);
        return notificationService.subscribeCalls(storeId);
    }
}
