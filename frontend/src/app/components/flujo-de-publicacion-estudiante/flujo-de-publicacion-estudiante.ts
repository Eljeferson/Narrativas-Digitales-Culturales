import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flujo-de-publicacion-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flujo-de-publicacion-estudiante.html',
  styleUrl: './flujo-de-publicacion-estudiante.css',
})
export class FlujoDePublicacionEstudiante {
  published = false;
  reads = 0;

  publish(): void {
    this.published = true;
    this.reads = 1;
  }
}
