package com.project.financemanager.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.project.financemanager.entity.EmailOutboxEntity;
import com.project.financemanager.repository.EmailOutboxRepository;
import com.project.financemanager.service.Enums.EmailStatus;
import com.project.financemanager.service.Enums.EmailType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailOutboxWorker {

    private final EmailOutboxRepository emailOutboxRepository;
    private final EmailService emailService;

    @Value("${financemanager.activation.uri}")
    private String activationBaseUrl;

    @Scheduled(fixedDelay = 10000) // runs every 10 seconds
    public void processOutbox() {
        List<EmailOutboxEntity> pendingEmails = emailOutboxRepository
                .findPendingEmails(LocalDateTime.now());

        for (EmailOutboxEntity outbox : pendingEmails) {
            try {
                String subject = buildSubject(outbox);
                String body = buildBody(outbox);

                emailService.sendEmail(outbox.getRecipient(), subject, body);

                // mark as sent
                outbox.setStatus(EmailStatus.SENT);
                outbox.setProcessedAt(LocalDateTime.now());
                log.info("Email sent successfully to {} (type: {})", outbox.getRecipient(),
                        outbox.getEmailType());

            } catch (Exception e) {
                // increment retry count
                outbox.setRetryCount(outbox.getRetryCount() + 1);
                outbox.setErrorMessage(e.getMessage());

                if (outbox.getRetryCount() >= outbox.getMaxRetries()) {
                    outbox.setStatus(EmailStatus.FAILED);
                    log.error("Email permanently failed for {} after {} retries (type: {})",
                            outbox.getRecipient(), outbox.getMaxRetries(), outbox.getEmailType(), e);
                } else {
                    // backoff: retryCount * 30 seconds
                    outbox.setNextRetryAt(
                            LocalDateTime.now().plusSeconds(outbox.getRetryCount() * 30L));
                    log.warn("Email failed for {} (attempt {}/{}), will retry at {}",
                            outbox.getRecipient(), outbox.getRetryCount(), outbox.getMaxRetries(),
                            outbox.getNextRetryAt());
                }
            }

            emailOutboxRepository.save(outbox);
        }
    }

    private String buildSubject(EmailOutboxEntity outbox) {
        if (outbox.getEmailType() == EmailType.ACTIVATION) {
            return "Activate your personal money manager account :)";
        }
        return "Finance Manager Notification";
    }

    private String buildBody(EmailOutboxEntity outbox) {
        if (outbox.getEmailType() == EmailType.ACTIVATION) {
            String activationToken = extractPayloadValue(outbox.getPayload(), "activationToken");
            String activationLink = activationBaseUrl + "/api/v1/activate?token=" + activationToken;
            return "Please click the link below to activate your account:\n\n" + activationLink;
        }

        return "You have a notification from Finance Manager.";
    }

    /**
     * Extracts a value from a simple JSON payload like
     * {"activationToken":"some-uuid-value"}
     */
    private String extractPayloadValue(String payload, String key) {
        String searchKey = "\"" + key + "\":\"";
        int startIndex = payload.indexOf(searchKey);
        if (startIndex == -1) {
            throw new IllegalArgumentException("Key '" + key + "' not found in payload: " + payload);
        }
        startIndex += searchKey.length();
        int endIndex = payload.indexOf("\"", startIndex);
        return payload.substring(startIndex, endIndex);
    }
}
