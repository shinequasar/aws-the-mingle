package com.huntingpocha.game;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.bean.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GameController.class)
class GameControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private GameService gameService;

    @Test
    void icebreaker_returnsOk() throws Exception {
        GameQuestion q = GameQuestion.builder().id(1L).type("ICEBREAKER").content("질문").build();
        when(gameService.getIcebreaker(null)).thenReturn(q);
        mockMvc.perform(get("/api/games/icebreaker"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").value("질문"));
    }

    @Test
    void roulette_returnsResult() throws Exception {
        when(gameService.getRoulette(4)).thenReturn(Map.of("selectedPlayer", 2, "totalPlayers", 4, "penalty", "원샷!"));
        mockMvc.perform(get("/api/games/roulette").param("playerCount", "4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.selectedPlayer").value(2));
    }
}
