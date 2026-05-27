import { Component, inject, OnInit } from '@angular/core';
import { SearchNarrativesUseCase, GetPublishedNarrativesUseCase } from '../../core/application/library/library.use-cases';
import { Narrative } from '../../core/domain/models/narrative.model';

@Component({
  selector: 'app-biblioteca-cultural-explorador',
  standalone: true,
  imports: [],
  templateUrl: './biblioteca-cultural-explorador.html',
  styleUrl: './biblioteca-cultural-explorador.css',
})
export class BibliotecaCulturalExplorador implements OnInit {
  private searchNarrativesUseCase = inject(SearchNarrativesUseCase);
  private getPublishedNarrativesUseCase = inject(GetPublishedNarrativesUseCase);

  narratives: Narrative[] = [];

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.getPublishedNarrativesUseCase.execute().subscribe({
      next: (list) => this.narratives = list,
      error: (err) => console.error('Error loading library narratives:', err)
    });
  }

  search(query: string, region?: string) {
    this.searchNarrativesUseCase.execute(query, region).subscribe({
      next: (list) => this.narratives = list,
      error: (err) => console.error('Error searching narratives:', err)
    });
  }
}
