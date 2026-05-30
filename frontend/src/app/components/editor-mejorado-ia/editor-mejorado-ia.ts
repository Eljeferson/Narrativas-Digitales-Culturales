import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Culture = 'Andina' | 'Amazónica' | 'Afroperuana' | 'Costeña';

@Component({
  selector: 'app-editor-mejorado-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<main class="min-h-screen bg-background px-4 py-6 text-on-surface md:px-10">
  <button (click)="goBack()" class="mb-6 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all group cursor-pointer border-0 bg-transparent p-0">
    <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
    Volver al panel
  </button>
  <section class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_380px]">
    <section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <p class="text-xs font-bold uppercase tracking-widest text-tertiary">HU-03 · Asistente IA creativo</p>
      <h1 class="font-headline text-4xl font-bold text-primary">Editor narrativo con sugerencias e ilustraciones</h1>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <input [(ngModel)]="title" class="rounded-lg border border-outline-variant bg-surface px-4 py-3 text-lg font-bold" placeholder="Título">
        <select [(ngModel)]="culture" (ngModelChange)="generateIllustrations()" class="rounded-lg border border-outline-variant bg-surface px-4 py-3">
          <option>Andina</option>
          <option>Amazónica</option>
          <option>Afroperuana</option>
          <option>Costeña</option>
        </select>
        <button type="button" (click)="suggestStructure()" class="rounded-lg bg-primary px-4 py-3 font-bold text-on-primary">Estructurar historia</button>
      </div>
      <textarea [(ngModel)]="story" rows="18" class="mt-5 w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 text-lg leading-relaxed"></textarea>
    </section>

    <aside class="space-y-6">
      <section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
        <h2 class="font-headline text-2xl font-bold text-primary">Sugerencias IA</h2>
        <div class="mt-4 space-y-3">
          <button type="button" (click)="suggestCharacters()" class="w-full rounded-lg border border-outline-variant px-4 py-3 text-left font-bold text-primary">Sugerir personajes culturales</button>
          <button type="button" (click)="suggestDetails()" class="w-full rounded-lg border border-outline-variant px-4 py-3 text-left font-bold text-primary">Agregar detalles de región</button>
        </div>
        <div *ngIf="suggestion" class="mt-4 rounded-lg bg-tertiary/10 p-4 text-sm leading-relaxed text-tertiary">{{ suggestion }}</div>
      </section>

      <section class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-headline text-2xl font-bold text-primary">Ilustraciones IA</h2>
          <span class="rounded bg-secondary-container px-2 py-1 text-xs font-bold">2 mín.</span>
        </div>
        <div class="space-y-4">
          <article *ngFor="let image of illustrations; let i = index" class="overflow-hidden rounded-lg border border-outline-variant">
            <img [src]="image" [alt]="'Ilustración cultural IA ' + (i + 1)" class="aspect-[4/3] w-full object-cover">
            <button type="button" (click)="regenerateIllustration(i)" class="flex w-full items-center justify-center gap-2 bg-surface px-3 py-2 text-sm font-bold text-primary">
              <span class="material-symbols-outlined text-lg">refresh</span>
              Regenerar imagen {{ i + 1 }}
            </button>
          </article>
        </div>
        <p class="mt-3 text-xs text-on-surface-variant">Elementos: {{ elements[culture].join(', ') }}.</p>
      </section>
    </aside>
  </section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class EditorMejoradoIa {
  title = 'El secreto del cóndor herido';
  culture: Culture = 'Andina';
  story = localStorage.getItem('pm2_transcribed_story') || 'Las nubes se aferraban a los picos del valle. Mi abuela decía que cada cerro guarda una voz y que, si uno escucha con respeto, puede encontrar el camino de regreso a casa.';
  suggestion = '';
  illustrations: string[] = [];

  elements: Record<Culture, string[]> = {
    Andina: ['Apus', 'cóndor', 'textiles', 'andenes'],
    Amazónica: ['río', 'maloca', 'patrones shipibo', 'aves'],
    Afroperuana: ['cajón', 'zapateo', 'décimas', 'fiesta comunitaria'],
    Costeña: ['huaca', 'mar', 'totora', 'cerámica mochica']
  };

  private router = inject(Router);

  realImages: Record<Culture, Record<string, string>> = {
    Andina: {
      'Apus': 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80',
      'cóndor': 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&q=80',
      'textiles': 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&q=80',
      'andenes': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80'
    },
    Amazónica: {
      'río': 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=600&q=80',
      'maloca': 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600&q=80',
      'patrones shipibo': 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=600&q=80',
      'aves': 'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?w=600&q=80'
    },
    Afroperuana: {
      'cajón': 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&q=80',
      'zapateo': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80',
      'décimas': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80',
      'fiesta comunitaria': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80'
    },
    Costeña: {
      'huaca': 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=80',
      'mar': 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80',
      'totora': 'https://images.unsplash.com/photo-1601999109332-542b18dbec57?w=600&q=80',
      'cerámica mochica': 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80'
    }
  };

  constructor() {
    this.generateIllustrations();
  }

  goBack(): void {
    this.router.navigate(['/panel-del-estudiante']);
  }

  suggestCharacters(): void {
    this.suggestion = `Personajes sugeridos: una abuela guardiana de memoria oral, un estudiante que registra el relato y un guía simbólico asociado a ${this.elements[this.culture][0]}.`;
  }

  suggestStructure(): void {
    this.suggestion = 'Estructura sugerida: origen familiar, conflicto cultural, encuentro con una señal del territorio, decisión del protagonista y cierre con aprendizaje comunitario.';
  }

  suggestDetails(): void {
    this.suggestion = `Incluye referencias visuales y sonoras de la cultura ${this.culture}: ${this.elements[this.culture].join(', ')}.`;
  }

  generateIllustrations(): void {
    this.illustrations = [this.makeImage(0), this.makeImage(1)];
  }

  regenerateIllustration(index: number): void {
    this.illustrations[index] = this.makeImage(index, Date.now());
  }

  private makeImage(index: number, seed = 0): string {
    const element = this.elements[this.culture][(index + seed) % this.elements[this.culture].length];
    return this.realImages[this.culture][element] || '';
  }
}
