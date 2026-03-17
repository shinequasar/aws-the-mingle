package com.huntingpocha.common.config;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    private final JwtTokenProvider provider = new JwtTokenProvider(
            "testSecretKeyForJwtTokenProviderTestMustBeAtLeast256Bits!!", 57600000);

    @Test
    void generateAndValidateToken() {
        String token = provider.generateToken(1L, 1L, "ADMIN");
        assertNotNull(token);
        assertTrue(provider.validateToken(token));
    }

    @Test
    void parseToken_extractsClaims() {
        String token = provider.generateToken(1L, 2L, "ROOM");
        var claims = provider.parseToken(token);
        assertEquals("1", claims.getSubject());
        assertEquals(2L, claims.get("storeId", Long.class));
        assertEquals("ROOM", claims.get("role", String.class));
    }

    @Test
    void validateToken_invalidToken_returnsFalse() {
        assertFalse(provider.validateToken("invalid.token.here"));
    }
}
