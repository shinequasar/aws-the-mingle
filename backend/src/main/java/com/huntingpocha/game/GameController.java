package com.huntingpocha.game;

import com.huntingpocha.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping("/icebreaker")
    public ApiResponse<GameQuestion> icebreaker(@RequestParam(required = false) String category) {
        return ApiResponse.ok(gameService.getIcebreaker(category));
    }

    @GetMapping("/balance")
    public ApiResponse<GameQuestion> balance() {
        return ApiResponse.ok(gameService.getBalance());
    }

    @GetMapping("/truth-or-lie")
    public ApiResponse<GameQuestion> truthOrLie() {
        return ApiResponse.ok(gameService.getTruthOrLie());
    }

    @GetMapping("/topic")
    public ApiResponse<GameQuestion> topic(@RequestParam(required = false) String category) {
        return ApiResponse.ok(gameService.getTopic(category));
    }

    @GetMapping("/roulette")
    public ApiResponse<Map<String, Object>> roulette(@RequestParam int playerCount) {
        return ApiResponse.ok(gameService.getRoulette(playerCount));
    }

    @GetMapping("/ladder")
    public ApiResponse<Map<String, Object>> ladder(@RequestParam int playerCount) {
        return ApiResponse.ok(gameService.getLadder(playerCount));
    }
}
