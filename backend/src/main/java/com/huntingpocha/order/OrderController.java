package com.huntingpocha.order;

import com.huntingpocha.common.dto.ApiResponse;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/api/rooms/{roomId}/orders")
    public ApiResponse<Order> create(@PathVariable Long roomId,
                                     @AuthenticationPrincipal Claims claims,
                                     @Valid @RequestBody OrderCreateRequest request) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(orderService.createOrder(roomId, storeId, request));
    }

    @GetMapping("/api/rooms/{roomId}/orders")
    public ApiResponse<List<Order>> getByRoom(@PathVariable Long roomId) {
        return ApiResponse.ok(orderService.getOrdersBySession(roomId));
    }

    @GetMapping("/api/admin/orders")
    public ApiResponse<List<Order>> getByStore(@AuthenticationPrincipal Claims claims) {
        Long storeId = claims.get("storeId", Long.class);
        return ApiResponse.ok(orderService.getOrdersByStore(storeId));
    }

    @PutMapping("/api/admin/orders/{orderId}/status")
    public ApiResponse<Order> updateStatus(@PathVariable Long orderId,
                                           @RequestBody StatusUpdateRequest request) {
        return ApiResponse.ok(orderService.updateStatus(orderId, request.getStatus()));
    }

    @DeleteMapping("/api/admin/orders/{orderId}")
    public ApiResponse<Void> delete(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ApiResponse.ok("주문이 삭제되었습니다.", null);
    }
}
