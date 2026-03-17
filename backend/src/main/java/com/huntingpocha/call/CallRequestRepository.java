package com.huntingpocha.call;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CallRequestRepository extends JpaRepository<CallRequest, Long> {
    List<CallRequest> findByStoreIdAndHandledFalseOrderByCreatedAt(Long storeId);
}
