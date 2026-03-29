package com.project.financemanager.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.financemanager.security.AuthCodeStore;
import com.project.financemanager.service.ProfileService;
import com.project.financemanager.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OAuth2Controller {

    private final AuthCodeStore authCodeStore;
    private final JwtUtil jwtUtil;
    private final ProfileService profileService;

    @PostMapping("/oauth2/exchange")
    public ResponseEntity<Map<String, Object>> exchangeCode(@RequestBody Map<String, String> request) {
        String code = request.get("code");

        if (code == null || code.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Code is required"));
        }

        String jwt = authCodeStore.exchangeCode(code);

        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid or expired code"));
        }

        String email = jwtUtil.extractUsername(jwt);

        return ResponseEntity.ok(Map.of(
                "token", jwt,
                "user", profileService.getPublicProfile(email)));
    }
}
