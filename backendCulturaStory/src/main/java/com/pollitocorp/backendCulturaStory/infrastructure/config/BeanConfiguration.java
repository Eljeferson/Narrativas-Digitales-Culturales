package com.pollitocorp.backendCulturaStory.infrastructure.config;

import com.pollitocorp.backendCulturaStory.modules.auth.application.service.AdminService;
import com.pollitocorp.backendCulturaStory.modules.auth.application.service.AuthService;
import com.pollitocorp.backendCulturaStory.modules.narrativa.application.service.DocenteService;
import com.pollitocorp.backendCulturaStory.modules.institucion.application.service.InstitucionService;
import com.pollitocorp.backendCulturaStory.modules.narrativa.application.service.NarrativaService;
import com.pollitocorp.backendCulturaStory.modules.narrativa.application.service.RevisionService;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.out.AIPort;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.out.AutorRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.institucion.domain.port.out.InstitucionRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.narrativa.domain.port.out.NarrativaRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out.PasswordHasherPort;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out.RolChangeLogRepositoryPort;
import com.pollitocorp.backendCulturaStory.modules.auth.domain.port.out.UsuarioRepositoryPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeanConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public NarrativaService narrativaService(NarrativaRepositoryPort repositoryPort, AutorRepositoryPort autorRepositoryPort, AIPort aiPort) {
        return new NarrativaService(repositoryPort, autorRepositoryPort, aiPort);
    }

    @Bean
    public RevisionService revisionService(NarrativaRepositoryPort repositoryPort) {
        return new RevisionService(repositoryPort);
    }

    @Bean
    public AuthService authService(UsuarioRepositoryPort usuarioRepository, AutorRepositoryPort autorRepository, PasswordHasherPort passwordHasher) {
        return new AuthService(usuarioRepository, autorRepository, passwordHasher);
    }

    @Bean
    public AdminService adminService(UsuarioRepositoryPort usuarioRepository, RolChangeLogRepositoryPort rolChangeLogRepository) {
        return new AdminService(usuarioRepository, rolChangeLogRepository);
    }

    @Bean
    public DocenteService docenteService(AutorRepositoryPort autorRepository, NarrativaRepositoryPort narrativaRepository, UsuarioRepositoryPort usuarioRepository) {
        return new DocenteService(autorRepository, narrativaRepository, usuarioRepository);
    }

    @Bean
    public InstitucionService institucionService(InstitucionRepositoryPort repositoryPort) {
        return new InstitucionService(repositoryPort);
    }
}
