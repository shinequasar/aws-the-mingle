package com.huntingpocha.order;

import com.huntingpocha.common.exception.BusinessException;
import com.huntingpocha.menu.Menu;
import com.huntingpocha.menu.MenuRepository;
import com.huntingpocha.notification.NotificationService;
import com.huntingpocha.room.RoomService;
import com.huntingpocha.room.RoomSession;
import com.huntingpocha.store.Store;
import com.huntingpocha.store.StoreRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock private OrderRepository orderRepository;
    @Mock private OrderItemRepository orderItemRepository;
    @Mock private MenuRepository menuRepository;
    @Mock private StoreRepository storeRepository;
    @Mock private RoomService roomService;
    @Mock private NotificationService notificationService;
    @InjectMocks private OrderService orderService;

    @Test
    void createOrder_success() {
        RoomSession session = RoomSession.builder().id(1L).roomId(1L).build();
        Store store = Store.builder().id(1L).storeCode("HP01").build();
        Menu menu = Menu.builder().id(1L).name("맥주").price(5000).build();

        when(roomService.getOrCreateSession(1L)).thenReturn(session);
        when(storeRepository.findById(1L)).thenReturn(Optional.of(store));
        when(orderRepository.countByStoreIdAndCreatedAtBetween(eq(1L), any(), any())).thenReturn(0L);
        when(orderRepository.save(any())).thenAnswer(i -> { Order o = i.getArgument(0); o.setId(1L); return o; });
        when(menuRepository.findById(1L)).thenReturn(Optional.of(menu));
        when(orderItemRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        OrderCreateRequest req = new OrderCreateRequest();
        OrderCreateRequest.Item item = new OrderCreateRequest.Item();
        item.setMenuId(1L); item.setQuantity(2);
        req.setItems(List.of(item));

        Order result = orderService.createOrder(1L, 1L, req);
        assertEquals(10000, result.getTotalAmount());
        assertEquals(OrderStatus.PENDING, result.getStatus());
    }

    @Test
    void updateStatus_validTransition() {
        Order order = Order.builder().id(1L).storeId(1L).status(OrderStatus.PENDING).build();
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        Order result = orderService.updateStatus(1L, OrderStatus.PREPARING);
        assertEquals(OrderStatus.PREPARING, result.getStatus());
    }

    @Test
    void updateStatus_invalidTransition_throws() {
        Order order = Order.builder().id(1L).status(OrderStatus.COMPLETED).build();
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        assertThrows(BusinessException.class, () -> orderService.updateStatus(1L, OrderStatus.PENDING));
    }
}
