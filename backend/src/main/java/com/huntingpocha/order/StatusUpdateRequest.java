package com.huntingpocha.order;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StatusUpdateRequest {
    private OrderStatus status;
}
