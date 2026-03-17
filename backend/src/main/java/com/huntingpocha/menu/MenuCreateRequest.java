package com.huntingpocha.menu;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MenuCreateRequest {
    @NotNull(message = "카테고리 ID는 필수입니다")
    private Long categoryId;
    @NotBlank(message = "메뉴명은 필수입니다")
    private String name;
    @NotNull(message = "가격은 필수입니다")
    @Min(value = 0, message = "가격은 0 이상이어야 합니다")
    private Integer price;
    private String description;
    private Integer displayOrder;
}
