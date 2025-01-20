package net.engineeringdigest.journalApp.ApiResponse;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GeminiApiResponse {
    private List<Candidate> candidates; // Output from the API

    @Getter
    @Setter
    public static class Candidate {
        private Content content;

        @Getter
        @Setter
        public static class Content {
            private List<Part> parts;

            @Getter
            @Setter
            public static class Part {
                private String text; // The "text" field containing main content
            }
        }
    }
}
