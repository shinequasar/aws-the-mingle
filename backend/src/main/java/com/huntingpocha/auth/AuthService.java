package com.huntingpocha.auth;

import com.huntingpocha.common.config.JwtTokenProvider;
import com.huntingpocha.common.exception.BusinessException;
import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.room.Room;
import com.huntingpocha.room.RoomRepository;
import com.huntingpocha.store.Store;
import com.huntingpocha.store.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository adminRepository;
    private final StoreRepository storeRepository;
    private final RoomRepository roomRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private static final int MAX_LOGIN_ATTEMPTS = 5;
    private static final int LOCK_MINUTES = 15;

    @Transactional
    public LoginResponse adminLogin(LoginRequest request) {
        Store store = storeRepository.findByStoreCode(request.getStoreCode())
                .orElseThrow(() -> new NotFoundException("매장을 찾을 수 없습니다."));

        Admin admin = adminRepository.findByStoreIdAndUsername(store.getId(), request.getUsername())
                .orElseThrow(() -> new NotFoundException("관리자 계정을 찾을 수 없습니다."));

        if (admin.getLockedUntil() != null && admin.getLockedUntil().isAfter(LocalDateTime.now())) {
            throw new BusinessException("계정이 잠겨있습니다. 잠시 후 다시 시도해주세요.");
        }

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            admin.setLoginAttempts(admin.getLoginAttempts() + 1);
            if (admin.getLoginAttempts() >= MAX_LOGIN_ATTEMPTS) {
                admin.setLockedUntil(LocalDateTime.now().plusMinutes(LOCK_MINUTES));
            }
            adminRepository.save(admin);
            throw new BusinessException("비밀번호가 일치하지 않습니다.");
        }

        admin.setLoginAttempts(0);
        admin.setLockedUntil(null);
        adminRepository.save(admin);

        String token = jwtTokenProvider.generateToken(admin.getId(), store.getId(), "ADMIN");
        return new LoginResponse(token, "ADMIN", store.getId());
    }

    public LoginResponse roomLogin(RoomLoginRequest request) {
        Store store = storeRepository.findByStoreCode(request.getStoreCode())
                .orElseThrow(() -> new NotFoundException("매장을 찾을 수 없습니다."));

        Room room = roomRepository.findByStoreIdAndRoomNumber(store.getId(), request.getRoomNumber())
                .orElseThrow(() -> new NotFoundException("룸을 찾을 수 없습니다."));

        if (!passwordEncoder.matches(request.getPassword(), room.getPassword())) {
            throw new BusinessException("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtTokenProvider.generateToken(room.getId(), store.getId(), "ROOM");
        return new LoginResponse(token, "ROOM", store.getId());
    }
}
