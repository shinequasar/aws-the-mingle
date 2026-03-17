package com.huntingpocha.game;

import com.huntingpocha.common.exception.BusinessException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GameServiceTest {

    @Mock private GameQuestionRepository gameQuestionRepository;
    @InjectMocks private GameService gameService;

    @Test
    void getIcebreaker_withCategory_returnsQuestion() {
        GameQuestion q = GameQuestion.builder().id(1L).type("ICEBREAKER").category("light").content("test").build();
        when(gameQuestionRepository.findRandomByTypeAndCategory("ICEBREAKER", "light")).thenReturn(Optional.of(q));
        assertEquals("test", gameService.getIcebreaker("light").getContent());
    }

    @Test
    void getIcebreaker_noCategory_returnsRandom() {
        GameQuestion q = GameQuestion.builder().id(1L).type("ICEBREAKER").content("random").build();
        when(gameQuestionRepository.findRandomByType("ICEBREAKER")).thenReturn(Optional.of(q));
        assertEquals("random", gameService.getIcebreaker(null).getContent());
    }

    @Test
    void getBalance_returnsQuestion() {
        GameQuestion q = GameQuestion.builder().id(1L).type("BALANCE").content("q").optionA("A").optionB("B").build();
        when(gameQuestionRepository.findRandomByType("BALANCE")).thenReturn(Optional.of(q));
        assertNotNull(gameService.getBalance());
    }

    @Test
    void getRoulette_validPlayerCount_returnsResult() {
        GameQuestion p = GameQuestion.builder().id(1L).type("PENALTY").content("원샷!").build();
        when(gameQuestionRepository.findRandomByType("PENALTY")).thenReturn(Optional.of(p));
        Map<String, Object> result = gameService.getRoulette(4);
        int selected = (int) result.get("selectedPlayer");
        assertTrue(selected >= 1 && selected <= 4);
        assertEquals("원샷!", result.get("penalty"));
    }

    @Test
    void getRoulette_invalidPlayerCount_throws() {
        assertThrows(BusinessException.class, () -> gameService.getRoulette(1));
        assertThrows(BusinessException.class, () -> gameService.getRoulette(21));
    }

    @Test
    void getLadder_validPlayerCount_returnsAllPlayers() {
        when(gameQuestionRepository.findByType("PENALTY")).thenReturn(
                List.of(GameQuestion.builder().content("벌칙1").build(), GameQuestion.builder().content("벌칙2").build()));
        Map<String, Object> result = gameService.getLadder(3);
        @SuppressWarnings("unchecked")
        Map<Integer, String> assignments = (Map<Integer, String>) result.get("results");
        assertEquals(3, assignments.size());
    }

    @Test
    void getLadder_invalidPlayerCount_throws() {
        assertThrows(BusinessException.class, () -> gameService.getLadder(0));
    }
}
