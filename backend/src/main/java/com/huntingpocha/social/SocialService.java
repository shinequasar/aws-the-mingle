package com.huntingpocha.social;

import com.huntingpocha.common.exception.BusinessException;
import com.huntingpocha.common.exception.NotFoundException;
import com.huntingpocha.file.FileService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final SendMenuRequestRepository sendMenuRequestRepository;
    private final MessageRepository messageRepository;
    private final PhotoRepository photoRepository;
    private final ReportRepository reportRepository;
    private final FileService fileService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;

    public SendMenuRequest sendMenu(Long senderRoomId, Long receiverRoomId, Long storeId, List<Map<String, Object>> items) {
        String itemsJson;
        try { itemsJson = objectMapper.writeValueAsString(items); }
        catch (JsonProcessingException e) { throw new BusinessException("메뉴 데이터 오류"); }

        SendMenuRequest req = SendMenuRequest.builder()
                .senderRoomId(senderRoomId).receiverRoomId(receiverRoomId)
                .storeId(storeId).menuItems(itemsJson).status(RequestStatus.PENDING)
                .build();
        req = sendMenuRequestRepository.save(req);

        messagingTemplate.convertAndSend("/topic/room/" + receiverRoomId + "/notifications",
                Map.of("type", "SEND_MENU", "requestId", req.getId(),
                        "senderRoomId", senderRoomId, "menuItems", items));
        return req;
    }

    public void respondSendMenu(Long requestId, boolean accept) {
        SendMenuRequest req = sendMenuRequestRepository.findById(requestId)
                .orElseThrow(() -> new NotFoundException("요청을 찾을 수 없습니다."));
        req.setStatus(accept ? RequestStatus.ACCEPTED : RequestStatus.REJECTED);
        sendMenuRequestRepository.save(req);

        messagingTemplate.convertAndSend("/topic/room/" + req.getSenderRoomId() + "/notifications",
                Map.of("type", accept ? "SEND_MENU_ACCEPTED" : "SEND_MENU_REJECTED", "requestId", requestId));
    }

    public Message sendMessage(Long senderRoomId, Long receiverRoomId, Long storeId, String content) {
        Message msg = Message.builder()
                .senderRoomId(senderRoomId).receiverRoomId(receiverRoomId)
                .storeId(storeId).content(content)
                .build();
        msg = messageRepository.save(msg);

        messagingTemplate.convertAndSend("/topic/room/" + receiverRoomId + "/notifications",
                Map.of("type", "MESSAGE", "messageId", msg.getId(),
                        "senderRoomId", senderRoomId, "content", content));
        return msg;
    }

    public Photo sendPhoto(Long senderRoomId, Long receiverRoomId, Long storeId, MultipartFile file) {
        String imageUrl = fileService.upload(file);
        Photo photo = Photo.builder()
                .senderRoomId(senderRoomId).receiverRoomId(receiverRoomId)
                .storeId(storeId).imageUrl(imageUrl)
                .build();
        photo = photoRepository.save(photo);

        messagingTemplate.convertAndSend("/topic/room/" + receiverRoomId + "/notifications",
                Map.of("type", "PHOTO", "photoId", photo.getId(),
                        "senderRoomId", senderRoomId, "imageUrl", imageUrl));
        return photo;
    }

    public Report report(Long reporterRoomId, Long storeId, String targetType, Long targetId, String reason) {
        Report report = Report.builder()
                .reporterRoomId(reporterRoomId).targetType(targetType)
                .targetId(targetId).storeId(storeId).reason(reason)
                .build();
        return reportRepository.save(report);
    }

    public List<Report> getPendingReports(Long storeId) {
        return reportRepository.findByStoreIdAndHandledFalseOrderByCreatedAt(storeId);
    }

    public void handleReport(Long reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new NotFoundException("신고를 찾을 수 없습니다."));
        report.setHandled(true);
        reportRepository.save(report);
    }
}
