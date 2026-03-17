package com.huntingpocha.call;

import com.huntingpocha.common.dto.ApiResponse;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CallController {

    private final CallService callService;

    @PostMapping("/api/rooms/{roomId}/calls")
    public ApiResponse<CallRequest> create(@PathVariable Long roomId,
                                           @AuthenticationPrincipal Claims claims,
                                           @RequestBody Map<String, String> body) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(callService.create(roomId, storeId, body.get("reason")));
    }

    @GetMapping("/api/admin/calls")
    public ApiResponse<List<CallRequest>> getPending(@AuthenticationPrincipal Claims claims) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(callService.getPending(storeId));
    }

    @PutMapping("/api/admin/calls/{callId}/complete")
    public ApiResponse<Void> complete(@PathVariable Long callId) {
        callService.complete(callId);
        return ApiResponse.ok("호출 처리 완료", null);
    }
}
