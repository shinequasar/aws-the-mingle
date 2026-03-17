package com.huntingpocha.store;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StoreCreateRequest {
    @NotBlank(message = "매장 코드는 필수입니다")
    private String storeCode;
    @NotBlank(message = "매장명은 필수입니다")
    private String name;
    private String address;
    private String phone;
}
