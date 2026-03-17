package com.huntingpocha.store;

import com.huntingpocha.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    public Store create(StoreCreateRequest request) {
        Store store = Store.builder()
                .storeCode(request.getStoreCode())
                .name(request.getName())
                .address(request.getAddress())
                .phone(request.getPhone())
                .build();
        return storeRepository.save(store);
    }

    public Store update(Long id, StoreCreateRequest request) {
        Store store = findById(id);
        store.setName(request.getName());
        store.setAddress(request.getAddress());
        store.setPhone(request.getPhone());
        return storeRepository.save(store);
    }

    public void delete(Long id) {
        storeRepository.deleteById(id);
    }

    public List<Store> findAll() {
        return storeRepository.findAll();
    }

    public Store findById(Long id) {
        return storeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("매장을 찾을 수 없습니다."));
    }
}
