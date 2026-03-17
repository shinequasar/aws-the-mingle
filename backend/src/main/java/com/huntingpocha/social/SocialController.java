package com.huntingpocha.social;

import com.huntingpocha.common.dto.ApiResponse;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SocialController {

    private final SocialService socialService;

    @PostMapping("/api/rooms/{roomId}/send-menu")
    public ApiResponse<SendMenuRequest> sendMenu(@PathVariable Long roomId,
                                                  @AuthenticationPrincipal Claims claims,
                                                  @RequestBody Map<String, Object> body) {
        Long storeId = claims.get("storeId", Long.class);
        Long receiverRoomId = Long.valueOf(body.get("targetRoomId").toString());
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) body.get("menuItems");
        return ApiResponse.ok(socialService.sendMenu(roomId, receiverRoomId, storeId, items));
    }

    @PutMapping("/api/rooms/{roomId}/send-menu/{requestId}/respond")
    public ApiResponse<Void> respondSendMenu(@PathVariable Long requestId,
                                              @RequestBody Map<String, Boolean> body) {
        socialService.respondSendMenu(requestId, body.get("accept"));
        return ApiResponse.ok(null);
    }

    @PostMapping("/api/rooms/{roomId}/messages")
    public ApiResponse<Message> sendMessage(@PathVariable Long roomId,
                                            @AuthenticationPrincipal Claims claims,
                                            @RequestBody Map<String, Object> body) {
        Long storeId = claims.get("storeId", Long.class);
        Long receiverRoomId = Long.valueOf(body.get("targetRoomId").toString());
        return ApiResponse.ok(socialService.sendMessage(roomId, receiverRoomId, storeId, body.get("content").toString()));
    }

    @PostMapping("/api/rooms/{roomId}/photos")
    public ApiResponse<Photo> sendPhoto(@PathVariable Long roomId,
                                        @AuthenticationPrincipal Claims claims,
                                        @RequestParam Long targetRoomId,
                                        @RequestParam MultipartFile photo) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(socialService.sendPhoto(roomId, targetRoomId, storeId, photo));
    }

    @PostMapping("/api/rooms/{roomId}/reports")
    public ApiResponse<Report> report(@PathVariable Long roomId,
                                      @AuthenticationPrincipal Claims claims,
                                      @RequestBody Map<String, Object> body) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(socialService.report(roomId, storeId,
                body.get("targetType").toString(), Long.valueOf(body.get("targetId").toString()),
                body.getOrDefault("reason", "").toString()));
    }

    @GetMapping("/api/admin/reports")
    public ApiResponse<List<Report>> getReports(@AuthenticationPrincipal Claims claims) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(socialService.getPendingReports(storeId));
    }

    @PutMapping("/api/admin/reports/{reportId}/handle")
    public ApiResponse<Void> handleReport(@PathVariable Long reportId) {
        socialService.handleReport(reportId);
        return ApiResponse.ok("신고 처리 완료", null);
    }
}
