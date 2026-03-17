package com.huntingpocha.game;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "game_questions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GameQuestion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String type;
    private String category;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    private String optionA;
    private String optionB;
}
