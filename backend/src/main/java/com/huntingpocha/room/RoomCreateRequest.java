package com.huntingpocha.room;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RoomCreateRequest {
    @NotNull(message = "매장 ID는 필수입니다")
    private Long storeId;
    @NotNull(message = "룸 번호는 필수입니다")
    private Integer roomNumber;
    @NotBlank(message = "비밀번호는 필수입니다")
    private String password;
}
