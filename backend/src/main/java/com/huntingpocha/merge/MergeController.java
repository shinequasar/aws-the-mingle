package com.huntingpocha.merge;

import com.huntingpocha.common.dto.ApiResponse;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MergeController {

    private final MergeService mergeService;

    @PostMapping("/api/rooms/{roomId}/merge-request")
    public ApiResponse<MergeRequest> request(@PathVariable Long roomId,
                                              @AuthenticationPrincipal Claims claims,
                                              @RequestBody Map<String, Long> body) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(mergeService.requestMerge(roomId, body.get("targetRoomId"), storeId));
    }

    @PutMapping("/api/rooms/{roomId}/merge-request/{requestId}/respond")
    public ApiResponse<Void> respond(@PathVariable Long requestId,
                                      @RequestBody Map<String, Boolean> body) {
        mergeService.respondMerge(requestId, body.get("accept"));
        return ApiResponse.ok(null);
    }

    @PostMapping("/api/rooms/{roomId}/merge/extend")
    public ApiResponse<Void> extend(@RequestBody Map<String, Long> body) {
        mergeService.extendMerge(body.get("requestId"));
        return ApiResponse.ok("합석 시간이 연장되었습니다.", null);
    }
}
