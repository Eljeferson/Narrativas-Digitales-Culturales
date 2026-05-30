package com.pollitocorp.backendCulturaStory.modules.auth.domain.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BulkRegistrationResult {
    private int total;
    private int registrados;
    private List<String> emails;
}
