package com.project.financemanager.security;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Component;

@Component
public class AuthCodeStore {
    private final ConcurrentHashMap<String, String> codeToJwtMap = new ConcurrentHashMap<>();

    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    public String generateAuthCode(String jwt) {
        String code = UUID.randomUUID().toString();
        codeToJwtMap.put(code, jwt);

        scheduler.schedule(() -> codeToJwtMap.remove(code), 30, TimeUnit.SECONDS);

        return code;
    }

    public String exchangeCode(String code) {
        // This return the value and remove it from the map
        return codeToJwtMap.remove(code);
    }
}
