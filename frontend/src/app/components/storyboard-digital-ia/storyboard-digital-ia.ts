import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface StoryboardPanel {
  title: string;
  text: string;
  image: string;
}

@Component({
  selector: 'app-storyboard-digital-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<main class="min-h-screen bg-background px-4 py-6 text-on-surface md:px-10">
  <section class="mx-auto max-w-7xl">
    <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-tertiary">HU-03 y HU-05 · IA creativa multimedia</p>
        <h1 class="font-headline text-4xl font-bold text-primary">Storyboard digital con ilustraciones IA</h1>
        <p class="mt-2 max-w-3xl text-on-surface-variant">Genera al menos 4 viñetas ordenadas con imagen sugerida, texto editable, elementos culturales y regeneración visual.</p>
      </div>
      <button type="button" (click)="exportPdf()" class="rounded-lg bg-primary px-5 py-3 font-bold text-on-primary">Exportar PDF</button>
    </header>

    <section class="mb-6 grid gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm md:grid-cols-[1fr_1fr_auto]">
      <label>
        <span class="mb-2 block text-sm font-bold text-primary">Cultura seleccionada</span>
        <select [(ngModel)]="culture" class="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3">
          <option value="Andina">Andina</option>
          <option value="Amazónica">Amazónica</option>
          <option value="Afroperuana">Afroperuana</option>
          <option value="Costeña">Costeña</option>
        </select>
      </label>
      <label>
        <span class="mb-2 block text-sm font-bold text-primary">Tema de la narrativa</span>
        <input [(ngModel)]="theme" class="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3" placeholder="Ej. el cóndor herido">
      </label>
      <button type="button" (click)="generateStoryboard()" class="self-end rounded-lg bg-tertiary px-5 py-3 font-bold text-on-tertiary">Generar con IA</button>
    </section>

    <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <article *ngFor="let panel of panels; let i = index" class="rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
        <div class="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-surface-container">
          <img [src]="panel.image" [alt]="'Ilustración IA de viñeta ' + (i + 1)" class="h-full w-full object-cover">
          <span class="absolute left-3 top-3 rounded bg-primary px-2 py-1 text-xs font-bold text-on-primary">Viñeta {{ i + 1 }}</span>
        </div>
        <div class="space-y-3 p-4">
          <input [(ngModel)]="panel.title" class="w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 font-headline text-xl font-bold text-primary focus:border-primary focus:ring-0">
          <textarea [(ngModel)]="panel.text" rows="5" class="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm leading-relaxed"></textarea>
          <button type="button" (click)="regenerateImage(i)" class="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant px-3 py-2 text-sm font-bold text-primary">
            <span class="material-symbols-outlined text-lg">refresh</span>
            Regenerar imagen
          </button>
        </div>
      </article>
    </section>

    <section class="mt-6 rounded-lg bg-tertiary/10 p-4 text-sm text-tertiary">
      <strong>Elementos culturales incluidos:</strong> {{ culturalElements[culture].join(', ') }}.
    </section>
  </section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class StoryboardDigitalIa {
  culture: keyof typeof this.culturalElements = 'Andina';
  theme = 'el cóndor herido';
  panels: StoryboardPanel[] = [];

  culturalElements = {
    Andina: ['Apus', 'textiles geométricos', 'quena', 'cóndor', 'andenes'],
    Amazónica: ['río', 'chacra', 'shipibo-konibo', 'aves de colores', 'maloca'],
    Afroperuana: ['cajón', 'zapateo', 'décimas', 'costa sur', 'celebración comunitaria'],
    Costeña: ['caballito de totora', 'huaca', 'mar', 'redes de pesca', 'cerámica mochica']
  };

  constructor() {
    this.generateStoryboard();
  }

  generateStoryboard(): void {
    const beats = ['Llamado', 'Encuentro', 'Prueba', 'Celebración'];
    this.panels = beats.map((beat, index) => ({
      title: `${index + 1}. ${beat}`,
      text: this.panelText(beat),
      image: this.generateImage(index)
    }));
  }

  regenerateImage(index: number): void {
    this.panels[index].image = this.generateImage(index, Date.now());
  }

  exportPdf(): void {
    window.print();
  }

  private panelText(beat: string): string {
    const element = this.culturalElements[this.culture][0];
    return `${beat}: la historia sobre ${this.theme} incorpora ${element} y una decisión del protagonista que preserva la memoria de su comunidad.`;
  }

  private generateImage(index: number, seed = 1): string {
    const palettes: Record<string, string[]> = {
      Andina: ['#823b18', '#f6be3b', '#00595c', '#ffdbcd'],
      Amazónica: ['#00595c', '#72d6db', '#795900', '#fff8ef'],
      Afroperuana: ['#1e1b13', '#f6be3b', '#ba1a1a', '#ffffff'],
      Costeña: ['#007377', '#f5edde', '#a0522d', '#90f2f7']
    };
    const colors = palettes[this.culture];
    const element = this.culturalElements[this.culture][index % this.culturalElements[this.culture].length];
    const offset = (seed + index * 37) % 120;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <rect width="800" height="600" fill="${colors[3]}"/>
        <path d="M0 ${380 - offset} C160 ${260 + offset}, 280 ${480 - offset}, 420 ${330 + offset} S650 ${250 - offset}, 800 ${360 + offset}" fill="${colors[1]}" opacity=".65"/>
        <path d="M0 470 L160 360 L280 430 L420 290 L590 440 L800 330 L800 600 L0 600Z" fill="${colors[0]}"/>
        <g fill="${colors[2]}" opacity=".9">
          <circle cx="${160 + offset}" cy="170" r="46"/>
          <rect x="520" y="120" width="130" height="130" rx="10" transform="rotate(12 585 185)"/>
          <path d="M330 140 l60 90 l-120 0 z"/>
        </g>
        <g fill="none" stroke="${colors[2]}" stroke-width="10" opacity=".75">
          <path d="M80 80 h90 v90 h-90zM630 390 h90 v90 h-90z"/>
          <path d="M230 500 c70 -90 150 -90 220 0"/>
        </g>
        <text x="44" y="548" fill="#fff" font-family="Arial" font-size="38" font-weight="700">${this.culture}: ${element}</text>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
}
