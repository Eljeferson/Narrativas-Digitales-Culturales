package com.pollitocorp.backendCulturaStory.infrastructure.adapter.in.rest.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BulkRegistrationResponse {
    private int total;
    private int registrados;
    private List<String> emails;
}
