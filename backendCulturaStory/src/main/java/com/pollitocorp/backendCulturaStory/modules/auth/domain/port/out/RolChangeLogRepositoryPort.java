package com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out;

import com.pollitocorp.backendCulturaStory.modules.auth.domain.model.RolChangeLog;

public interface RolChangeLogRepositoryPort {
    void save(RolChangeLog log);
}
