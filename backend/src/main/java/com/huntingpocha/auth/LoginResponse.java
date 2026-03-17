package com.huntingpocha.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class LoginResponse {
    private String token;
    private String role;
    private Long storeId;
    private Long roomId;
    private String storeName;
}
