package com.huntingpocha.menu;

import com.huntingpocha.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/api/stores/{storeId}/categories")
    public ApiResponse<List<Category>> getCategories(@PathVariable Long storeId) {
        return ApiResponse.ok(menuService.getCategories(storeId));
    }

    @GetMapping("/api/stores/{storeId}/menus")
    public ApiResponse<List<Menu>> getMenus(@PathVariable Long storeId,
                                            @RequestParam(required = false) Long categoryId) {
        return ApiResponse.ok(menuService.getMenusByStore(storeId, categoryId));
    }

    @PostMapping("/api/admin/menus")
    public ApiResponse<Menu> create(@Valid @ModelAttribute MenuCreateRequest request,
                                    @RequestParam(required = false) MultipartFile image) {
        return ApiResponse.ok(menuService.create(request, image));
    }

    @PutMapping("/api/admin/menus/{id}")
    public ApiResponse<Menu> update(@PathVariable Long id,
                                    @Valid @ModelAttribute MenuCreateRequest request,
                                    @RequestParam(required = false) MultipartFile image) {
        return ApiResponse.ok(menuService.update(id, request, image));
    }

    @DeleteMapping("/api/admin/menus/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        menuService.delete(id);
        return ApiResponse.ok("메뉴가 삭제되었습니다.", null);
    }
}
