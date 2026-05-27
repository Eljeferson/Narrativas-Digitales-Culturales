import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Culture = 'Andina' | 'Amazónica' | 'Afroperuana' | 'Costeña';

@Component({
  selector: 'app-editor-mejorado-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<main class="min-h-screen bg-background px-4 py-6 text-on-surface md:px-10">
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

  constructor() {
    this.generateIllustrations();
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
    const palette: Record<Culture, string[]> = {
      Andina: ['#823b18', '#f6be3b', '#00595c'],
      Amazónica: ['#00595c', '#90f2f7', '#795900'],
      Afroperuana: ['#1e1b13', '#f6be3b', '#ba1a1a'],
      Costeña: ['#007377', '#ffdbcd', '#a0522d']
    };
    const [a, b, c] = palette[this.culture];
    const element = this.elements[this.culture][(index + seed) % this.elements[this.culture].length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540">
      <rect width="720" height="540" fill="${b}"/>
      <circle cx="${180 + (seed % 180)}" cy="160" r="90" fill="${c}" opacity=".8"/>
      <path d="M0 410 C180 280 300 470 470 310 S640 250 720 360 L720 540 L0 540Z" fill="${a}"/>
      <g stroke="${c}" stroke-width="12" fill="none" opacity=".8"><path d="M80 80h80v80h-80zM520 310h90v90h-90zM285 115l65 95l-130 0z"/></g>
      <text x="36" y="500" fill="#fff" font-family="Arial" font-size="34" font-weight="700">${this.culture} · ${element}</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
}
