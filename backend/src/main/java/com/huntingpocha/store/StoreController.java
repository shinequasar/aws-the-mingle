package com.huntingpocha.store;

import com.huntingpocha.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @PostMapping
    public ApiResponse<Store> create(@Valid @RequestBody StoreCreateRequest request) {
        return ApiResponse.ok(storeService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<Store> update(@PathVariable Long id, @Valid @RequestBody StoreCreateRequest request) {
        return ApiResponse.ok(storeService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        storeService.delete(id);
        return ApiResponse.ok("매장이 삭제되었습니다.", null);
    }

    @GetMapping
    public ApiResponse<List<Store>> findAll() {
        return ApiResponse.ok(storeService.findAll());
    }
}
