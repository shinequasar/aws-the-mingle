package com.huntingpocha.file;

import com.huntingpocha.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {

    private final Path uploadPath;
    private final List<String> allowedExtensions;

    public FileService(@Value("${app.upload.path}") String uploadDir,
                       @Value("${app.upload.allowed-extensions}") String extensions) {
        this.uploadPath = Paths.get(uploadDir).toAbsolutePath();
        this.allowedExtensions = List.of(extensions.split(","));
        try { Files.createDirectories(this.uploadPath); } catch (IOException ignored) {}
    }

    public String upload(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;
        String ext = getExtension(file.getOriginalFilename());
        if (!allowedExtensions.contains(ext.toLowerCase())) {
            throw new BusinessException("허용되지 않는 파일 형식입니다.");
        }
        String filename = UUID.randomUUID() + "." + ext;
        try {
            Files.copy(file.getInputStream(), uploadPath.resolve(filename));
        } catch (IOException e) {
            throw new BusinessException("파일 업로드에 실패했습니다.");
        }
        return "/uploads/" + filename;
    }

    public void delete(String fileUrl) {
        if (fileUrl == null) return;
        try {
            String filename = fileUrl.replace("/uploads/", "");
            Files.deleteIfExists(uploadPath.resolve(filename));
        } catch (IOException ignored) {}
    }

    private String getExtension(String filename) {
        if (filename == null) return "";
        int dot = filename.lastIndexOf('.');
        return dot >= 0 ? filename.substring(dot + 1) : "";
    }
}
