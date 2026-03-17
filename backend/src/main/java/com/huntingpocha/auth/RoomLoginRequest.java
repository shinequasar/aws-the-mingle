package com.huntingpocha.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RoomLoginRequest {
    @NotBlank(message = "매장 코드는 필수입니다")
    private String storeCode;
    @NotNull(message = "룸 번호는 필수입니다")
    private Integer roomNumber;
    @NotBlank(message = "비밀번호는 필수입니다")
    private String password;
}
