package com.pollitocorp.backendCulturaStory.infrastructure.config;

import com.pollitocorp.backendCulturaStory.application.service.AdminService;
import com.pollitocorp.backendCulturaStory.application.service.AuthService;
import com.pollitocorp.backendCulturaStory.application.service.DocenteService;
import com.pollitocorp.backendCulturaStory.application.service.InstitucionService;
import com.pollitocorp.backendCulturaStory.application.service.NarrativaService;
import com.pollitocorp.backendCulturaStory.application.service.RevisionService;
import com.pollitocorp.backendCulturaStory.domain.port.out.AIPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.InstitucionRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.NarrativaRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.RolChangeLogRepositoryPort;
import com.pollitocorp.backendCulturaStory.domain.port.out.UsuarioRepositoryPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    @Bean
    public NarrativaService narrativaService(NarrativaRepositoryPort repositoryPort, AutorRepositoryPort autorRepositoryPort, AIPort aiPort) {
        return new NarrativaService(repositoryPort, autorRepositoryPort, aiPort);
    }

    @Bean
    public RevisionService revisionService(NarrativaRepositoryPort repositoryPort) {
        return new RevisionService(repositoryPort);
    }

    @Bean
    public AuthService authService(UsuarioRepositoryPort usuarioRepository, AutorRepositoryPort autorRepository) {
        return new AuthService(usuarioRepository, autorRepository);
    }

    @Bean
    public AdminService adminService(UsuarioRepositoryPort usuarioRepository, RolChangeLogRepositoryPort rolChangeLogRepository) {
        return new AdminService(usuarioRepository, rolChangeLogRepository);
    }

    @Bean
    public DocenteService docenteService(AutorRepositoryPort autorRepository, NarrativaRepositoryPort narrativaRepository) {
        return new DocenteService(autorRepository, narrativaRepository);
    }

    @Bean
    public InstitucionService institucionService(InstitucionRepositoryPort repositoryPort) {
        return new InstitucionService(repositoryPort);
    }
}
