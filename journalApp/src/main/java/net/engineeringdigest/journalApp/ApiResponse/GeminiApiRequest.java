package net.engineeringdigest.journalApp.ApiResponse;

import lombok.Getter;
import lombok.Setter;

// This class represents the payload sent to the Gemini API.
@Getter
@Setter
public class GeminiApiRequest {
    private String prompt; // The input text to send to the API
}
