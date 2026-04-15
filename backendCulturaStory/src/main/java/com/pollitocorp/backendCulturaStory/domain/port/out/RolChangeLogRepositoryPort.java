package com.pollitocorp.backendCulturaStory.domain.port.out;

import com.pollitocorp.backendCulturaStory.domain.model.RolChangeLog;

public interface RolChangeLogRepositoryPort {
    void save(RolChangeLog log);
}
