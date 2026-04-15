package com.pollitocorp.backendCulturaStory;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendCulturaStoryApplication {

	public static void main(String[] args) {
		try {
			// Intenta leer el archivo .env manualmente
			List<String> lines = Files.readAllLines(Paths.get(".env"));
			for (String line : lines) {
				if (!line.startsWith("#") && line.contains("=")) {
					String[] parts = line.split("=", 2);
					System.setProperty(parts[0].trim(), parts[1].trim());
				}
			}
		} catch (Exception e) {
			System.out.println("No se encontró el archivo .env, usando variables del sistema.");
		}
		SpringApplication.run(BackendCulturaStoryApplication.class, args);
	}

}
