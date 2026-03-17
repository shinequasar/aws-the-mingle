package com.huntingpocha.auth;

import com.huntingpocha.common.config.JwtTokenProvider;
import com.huntingpocha.common.exception.BusinessException;
import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.room.Room;
import com.huntingpocha.room.RoomRepository;
import com.huntingpocha.store.Store;
import com.huntingpocha.store.StoreRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private AdminRepository adminRepository;
    @Mock private StoreRepository storeRepository;
    @Mock private RoomRepository roomRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtTokenProvider jwtTokenProvider;
    @InjectMocks private AuthService authService;

    @Test
    void adminLogin_success() {
        Store store = Store.builder().id(1L).storeCode("HP01").build();
        Admin admin = Admin.builder().id(1L).storeId(1L).username("admin").password("hashed").loginAttempts(0).build();
        when(storeRepository.findByStoreCode("HP01")).thenReturn(Optional.of(store));
        when(adminRepository.findByStoreIdAndUsername(1L, "admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("pass", "hashed")).thenReturn(true);
        when(jwtTokenProvider.generateToken(1L, 1L, "ADMIN")).thenReturn("token");

        LoginRequest req = new LoginRequest();
        req.setStoreCode("HP01"); req.setUsername("admin"); req.setPassword("pass");
        LoginResponse res = authService.adminLogin(req);

        assertEquals("token", res.getToken());
        assertEquals("ADMIN", res.getRole());
    }

    @Test
    void adminLogin_wrongPassword_incrementsAttempts() {
        Store store = Store.builder().id(1L).storeCode("HP01").build();
        Admin admin = Admin.builder().id(1L).storeId(1L).password("hashed").loginAttempts(0).build();
        when(storeRepository.findByStoreCode("HP01")).thenReturn(Optional.of(store));
        when(adminRepository.findByStoreIdAndUsername(eq(1L), any())).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches(any(), eq("hashed"))).thenReturn(false);

        LoginRequest req = new LoginRequest();
        req.setStoreCode("HP01"); req.setUsername("admin"); req.setPassword("wrong");
        assertThrows(BusinessException.class, () -> authService.adminLogin(req));
        assertEquals(1, admin.getLoginAttempts());
    }

    @Test
    void adminLogin_lockedAccount_throwsException() {
        Store store = Store.builder().id(1L).storeCode("HP01").build();
        Admin admin = Admin.builder().id(1L).storeId(1L).lockedUntil(LocalDateTime.now().plusMinutes(10)).build();
        when(storeRepository.findByStoreCode("HP01")).thenReturn(Optional.of(store));
        when(adminRepository.findByStoreIdAndUsername(eq(1L), any())).thenReturn(Optional.of(admin));

        LoginRequest req = new LoginRequest();
        req.setStoreCode("HP01"); req.setUsername("admin"); req.setPassword("pass");
        assertThrows(BusinessException.class, () -> authService.adminLogin(req));
    }

    @Test
    void adminLogin_storeNotFound_throwsException() {
        when(storeRepository.findByStoreCode("INVALID")).thenReturn(Optional.empty());
        LoginRequest req = new LoginRequest();
        req.setStoreCode("INVALID"); req.setUsername("admin"); req.setPassword("pass");
        assertThrows(NotFoundException.class, () -> authService.adminLogin(req));
    }

    @Test
    void roomLogin_success() {
        Store store = Store.builder().id(1L).storeCode("HP01").build();
        Room room = Room.builder().id(1L).storeId(1L).roomNumber(1).password("hashed").build();
        when(storeRepository.findByStoreCode("HP01")).thenReturn(Optional.of(store));
        when(roomRepository.findByStoreIdAndRoomNumber(1L, 1)).thenReturn(Optional.of(room));
        when(passwordEncoder.matches("pass", "hashed")).thenReturn(true);
        when(jwtTokenProvider.generateToken(1L, 1L, "ROOM")).thenReturn("roomtoken");

        RoomLoginRequest req = new RoomLoginRequest();
        req.setStoreCode("HP01"); req.setRoomNumber(1); req.setPassword("pass");
        LoginResponse res = authService.roomLogin(req);

        assertEquals("roomtoken", res.getToken());
        assertEquals("ROOM", res.getRole());
    }
}
