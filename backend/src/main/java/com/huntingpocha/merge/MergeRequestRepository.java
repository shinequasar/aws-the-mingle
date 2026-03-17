package com.huntingpocha.merge;

import com.huntingpocha.social.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MergeRequestRepository extends JpaRepository<MergeRequest, Long> {
    Optional<MergeRequest> findByRequesterRoomIdAndStatus(Long roomId, RequestStatus status);
    Optional<MergeRequest> findByTargetRoomIdAndStatus(Long roomId, RequestStatus status);
    List<MergeRequest> findByStoreIdAndStatus(Long storeId, RequestStatus status);
}
