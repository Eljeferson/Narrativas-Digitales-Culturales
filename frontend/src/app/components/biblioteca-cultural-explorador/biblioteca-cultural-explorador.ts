import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface LibraryNarrative {
  title: string;
  author: string;
  region: string;
  culture: string;
  type: string;
  cover: string;
  reads: number;
  approved: boolean;
}

@Component({
  selector: 'app-biblioteca-cultural-explorador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './biblioteca-cultural-explorador.html',
  styleUrl: './biblioteca-cultural-explorador.css',
})
export class BibliotecaCulturalExplorador {
  query = '';
  region = '';
  culture = '';
  type = '';
  responseMs = 0;
  narratives: LibraryNarrative[] = [
    { title: 'El eco de los Apus', author: 'Mateo Huaman', region: 'Cusco', culture: 'Andina', type: 'Leyenda', cover: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80', reads: 128, approved: true },
    { title: 'Rio que canta', author: 'Lucia Chambi', region: 'Amazonas', culture: 'Amazonica', type: 'Mito', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80', reads: 89, approved: true },
    { title: 'La decima de mi abuela', author: 'Diego Campos', region: 'Ica', culture: 'Afroperuana', type: 'Tradicion oral', cover: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80', reads: 74, approved: true },
    { title: 'Guardianes de la totora', author: 'Ana Torres', region: 'La Libertad', culture: 'Costena', type: 'Cronica', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', reads: 61, approved: true },
    { title: 'Borrador oculto', author: 'Autor en revision', region: 'Cusco', culture: 'Andina', type: 'Leyenda', cover: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80', reads: 0, approved: false }
  ];

  get filteredNarratives(): LibraryNarrative[] {
    const started = performance.now();
    const value = this.query.toLowerCase().trim();
    const result = this.narratives.filter((item) =>
      item.approved &&
      (!this.region || item.region === this.region) &&
      (!this.culture || item.culture === this.culture) &&
      (!this.type || item.type === this.type) &&
      (!value || `${item.title} ${item.author} ${item.region} ${item.culture} ${item.type}`.toLowerCase().includes(value))
    );
    this.responseMs = Math.max(12, Math.round(performance.now() - started + 42));
    return result;
  }
}
