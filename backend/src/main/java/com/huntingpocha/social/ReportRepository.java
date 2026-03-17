package com.huntingpocha.social;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByStoreIdAndHandledFalseOrderByCreatedAt(Long storeId);
}
