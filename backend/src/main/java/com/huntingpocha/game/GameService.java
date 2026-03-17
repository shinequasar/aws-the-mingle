package com.huntingpocha.game;

import com.huntingpocha.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameQuestionRepository gameQuestionRepository;
    private final Random random = new Random();

    public GameQuestion getIcebreaker(String category) {
        return category != null
                ? gameQuestionRepository.findRandomByTypeAndCategory("ICEBREAKER", category).orElse(null)
                : gameQuestionRepository.findRandomByType("ICEBREAKER").orElse(null);
    }

    public GameQuestion getBalance() {
        return gameQuestionRepository.findRandomByType("BALANCE").orElse(null);
    }

    public GameQuestion getTruthOrLie() {
        return gameQuestionRepository.findRandomByType("TRUTH_OR_LIE").orElse(null);
    }

    public GameQuestion getTopic(String category) {
        return category != null
                ? gameQuestionRepository.findRandomByTypeAndCategory("TOPIC", category).orElse(null)
                : gameQuestionRepository.findRandomByType("TOPIC").orElse(null);
    }

    public Map<String, Object> getRoulette(int playerCount) {
        validatePlayerCount(playerCount);
        GameQuestion penalty = gameQuestionRepository.findRandomByType("PENALTY").orElse(null);
        int selected = random.nextInt(playerCount) + 1;
        return Map.of("selectedPlayer", selected, "totalPlayers", playerCount,
                "penalty", penalty != null ? penalty.getContent() : "원샷!");
    }

    public Map<String, Object> getLadder(int playerCount) {
        validatePlayerCount(playerCount);
        List<Integer> results = IntStream.rangeClosed(1, playerCount).boxed().collect(Collectors.toList());
        Collections.shuffle(results);
        List<GameQuestion> penalties = gameQuestionRepository.findByType("PENALTY");
        Collections.shuffle(penalties);
        Map<Integer, String> assignments = new HashMap<>();
        for (int i = 0; i < playerCount; i++) {
            String p = i < penalties.size() ? penalties.get(i).getContent() : "통과!";
            assignments.put(results.get(i), p);
        }
        return Map.of("results", assignments);
    }

    private void validatePlayerCount(int playerCount) {
        if (playerCount < 2 || playerCount > 20) {
            throw new BusinessException("참여 인원은 2~20명이어야 합니다.");
        }
    }
}
