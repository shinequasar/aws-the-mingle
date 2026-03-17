package com.huntingpocha.menu;

import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.file.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;
    private final CategoryRepository categoryRepository;
    private final FileService fileService;

    public List<Category> getCategories(Long storeId) {
        return categoryRepository.findByStoreIdOrderByDisplayOrder(storeId);
    }

    public List<Menu> getMenusByStore(Long storeId, Long categoryId) {
        if (categoryId != null) {
            return menuRepository.findByCategoryIdOrderByDisplayOrder(categoryId);
        }
        List<Long> catIds = categoryRepository.findByStoreIdOrderByDisplayOrder(storeId)
                .stream().map(Category::getId).toList();
        return menuRepository.findByCategoryIdInOrderByDisplayOrder(catIds);
    }

    public Menu create(MenuCreateRequest req, MultipartFile image) {
        String imageUrl = fileService.upload(image);
        Menu menu = Menu.builder()
                .categoryId(req.getCategoryId())
                .name(req.getName())
                .price(req.getPrice())
                .description(req.getDescription())
                .imageUrl(imageUrl)
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 0)
                .build();
        return menuRepository.save(menu);
    }

    public Menu update(Long id, MenuCreateRequest req, MultipartFile image) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다."));
        menu.setName(req.getName());
        menu.setPrice(req.getPrice());
        menu.setDescription(req.getDescription());
        menu.setCategoryId(req.getCategoryId());
        if (image != null && !image.isEmpty()) {
            fileService.delete(menu.getImageUrl());
            menu.setImageUrl(fileService.upload(image));
        }
        return menuRepository.save(menu);
    }

    public void delete(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다."));
        fileService.delete(menu.getImageUrl());
        menuRepository.delete(menu);
    }

    public void updateOrder(List<Long> menuIds, List<Integer> orders) {
        for (int i = 0; i < menuIds.size(); i++) {
            Menu menu = menuRepository.findById(menuIds.get(i)).orElse(null);
            if (menu != null) {
                menu.setDisplayOrder(orders.get(i));
                menuRepository.save(menu);
            }
        }
    }
}
