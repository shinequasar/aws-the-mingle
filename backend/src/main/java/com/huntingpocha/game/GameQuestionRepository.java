package com.huntingpocha.game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface GameQuestionRepository extends JpaRepository<GameQuestion, Long> {
    List<GameQuestion> findByType(String type);
    List<GameQuestion> findByTypeAndCategory(String type, String category);

    @Query(value = "SELECT * FROM game_questions WHERE type = ?1 ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<GameQuestion> findRandomByType(String type);

    @Query(value = "SELECT * FROM game_questions WHERE type = ?1 AND category = ?2 ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<GameQuestion> findRandomByTypeAndCategory(String type, String category);
}
