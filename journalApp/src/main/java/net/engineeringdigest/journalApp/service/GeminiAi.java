package net.engineeringdigest.journalApp.service;

import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.ApiResponse.GeminiApiRequest;
import net.engineeringdigest.journalApp.ApiResponse.GeminiApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Slf4j
public class GeminiAi {

    @Autowired
    private RestTemplate restTemplate;

    private static final String API_KEY = "AIzaSyA_nl1rUM1HQ38HRgqhwrKZzj3-Hwv15hM";
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY;

    public GeminiApiResponse callGeminiApi(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> parts = new HashMap<>();
        parts.put("text", prompt);  // Text from the user's journal entry
        Map<String, Object> content = new HashMap<>();
        content.put("parts", Collections.singletonList(parts));
        contents.add(content);
        requestBody.put("contents", contents);

        // Set up the RestTemplate and headers
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Make the request to Gemini API
        try {
            ResponseEntity<GeminiApiResponse> response = restTemplate.exchange(
                    GEMINI_API_URL, HttpMethod.POST, entity, GeminiApiResponse.class
            );
            return response.getBody();  // Return the Gemini API response
        } catch (Exception e) {
            // Log the exception (if any)
            e.printStackTrace();
            return null;
        }
    }
}