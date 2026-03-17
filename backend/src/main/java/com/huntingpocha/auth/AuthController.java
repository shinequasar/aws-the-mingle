package com.huntingpocha.auth;

import com.huntingpocha.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/admin/login")
    public ApiResponse<LoginResponse> adminLogin(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.ok(authService.adminLogin(request));
    }

    @PostMapping("/room/login")
    public ApiResponse<LoginResponse> roomLogin(@Valid @RequestBody RoomLoginRequest request) {
        return ApiResponse.ok(authService.roomLogin(request));
    }
}
