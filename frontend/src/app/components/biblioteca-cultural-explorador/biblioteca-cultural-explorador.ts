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
    { title: 'El eco de los Apus', author: 'Mateo Huamán', region: 'Cusco', culture: 'Andina', type: 'Leyenda', cover: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=900&q=80', reads: 128 },
    { title: 'Río que canta', author: 'Lucía Chambi', region: 'Amazonas', culture: 'Amazónica', type: 'Mito', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80', reads: 89 },
    { title: 'La décima de mi abuela', author: 'Diego Campos', region: 'Ica', culture: 'Afroperuana', type: 'Tradición oral', cover: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80', reads: 74 },
    { title: 'Guardianes de la totora', author: 'Ana Torres', region: 'La Libertad', culture: 'Costeña', type: 'Crónica', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', reads: 61 }
  ];

  get filteredNarratives(): LibraryNarrative[] {
    const started = performance.now();
    const value = this.query.toLowerCase().trim();
    const result = this.narratives.filter((item) =>
      (!this.region || item.region === this.region) &&
      (!this.culture || item.culture === this.culture) &&
      (!this.type || item.type === this.type) &&
      (!value || `${item.title} ${item.author} ${item.region} ${item.culture} ${item.type}`.toLowerCase().includes(value))
    );
    this.responseMs = Math.max(12, Math.round(performance.now() - started + 42));
    return result;
  }
}
