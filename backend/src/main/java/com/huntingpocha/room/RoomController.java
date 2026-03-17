package com.huntingpocha.room;

import com.huntingpocha.common.dto.ApiResponse;
import com.huntingpocha.order.OrderHistory;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/api/admin/rooms")
    public ApiResponse<Room> create(@Valid @RequestBody RoomCreateRequest request) {
        return ApiResponse.ok(roomService.create(request));
    }

    @GetMapping("/api/admin/rooms")
    public ApiResponse<List<Room>> findAll(@AuthenticationPrincipal Claims claims) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(roomService.findByStoreId(storeId));
    }

    @PostMapping("/api/admin/rooms/{roomId}/complete")
    public ApiResponse<Void> complete(@PathVariable Long roomId) {
        roomService.completeSession(roomId);
        return ApiResponse.ok("이용 완료 처리되었습니다.", null);
    }

    @GetMapping("/api/admin/rooms/{roomId}/history")
    public ApiResponse<List<OrderHistory>> history(
            @PathVariable Long roomId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to) {
        return ApiResponse.ok(roomService.getHistory(roomId, from, to));
    }

    @GetMapping("/api/rooms/{roomId}/time")
    public ApiResponse<RoomTimeResponse> getTime(@PathVariable Long roomId) {
        return ApiResponse.ok(roomService.getTimeInfo(roomId));
    }
}
