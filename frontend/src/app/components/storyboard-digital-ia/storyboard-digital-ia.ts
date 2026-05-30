import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  <!-- Print-only Header -->
  <div class="hidden comic-print-header">
    <h1>CulturaStory - Cómic Digital</h1>
    <p>Cultura: {{ culture }} | Tema: {{ theme }}</p>
  </div>

  <section class="mx-auto max-w-7xl">
    <button (click)="goBack()" class="print:hidden mb-6 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all group cursor-pointer border-0 bg-transparent p-0">
      <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
      Volver al panel
    </button>
    <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between print:hidden">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-tertiary">HU-03 y HU-05 · IA creativa multimedia</p>
        <h1 class="font-headline text-4xl font-bold text-primary">Storyboard digital con ilustraciones IA</h1>
        <p class="mt-2 max-w-3xl text-on-surface-variant">Genera al menos 4 viñetas ordenadas con imagen sugerida, texto editable, elementos culturales y regeneración visual.</p>
      </div>
      <button type="button" (click)="exportPdf()" class="rounded-lg bg-primary px-5 py-3 font-bold text-on-primary">Exportar PDF</button>
    </header>

    <section class="mb-6 grid gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm md:grid-cols-[1fr_1fr_auto] print:hidden">
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

    <section class="panels-grid grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <article *ngFor="let panel of panels; let i = index" class="comic-panel rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
        <div class="comic-panel-img-container relative aspect-[4/3] overflow-hidden rounded-t-lg bg-surface-container">
          <img [src]="panel.image" [alt]="'Ilustración IA de viñeta ' + (i + 1)" class="h-full w-full object-cover">
          <span class="comic-badge absolute left-3 top-3 rounded bg-primary px-2 py-1 text-xs font-bold text-on-primary">Viñeta {{ i + 1 }}</span>
        </div>
        <div class="comic-caption space-y-3 p-4">
          <input [(ngModel)]="panel.title" class="print:hidden w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 font-headline text-xl font-bold text-primary focus:border-primary focus:ring-0">
          <textarea [(ngModel)]="panel.text" rows="5" class="print:hidden w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm leading-relaxed"></textarea>
          <button type="button" (click)="regenerateImage(i)" class="print:hidden flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant px-3 py-2 text-sm font-bold text-primary">
            <span class="material-symbols-outlined text-lg">refresh</span>
            Regenerar imagen
          </button>

          <!-- Comic text fields (visible only in print mode) -->
          <h3 class="hidden print:block comic-title-text">{{ panel.title }}</h3>
          <p class="hidden print:block comic-desc-text">{{ panel.text }}</p>
        </div>
      </article>
    </section>

    <section class="mt-6 rounded-lg bg-tertiary/10 p-4 text-sm text-tertiary print:hidden">
      <strong>Elementos culturales incluidos:</strong> {{ culturalElements[culture].join(', ') }}.
    </section>
  </section>
</main>
  `,
  styles: `
    :host { display: block; }
    
    @media print {
      /* Hide layout shell controls */
      header,
      nav,
      select,
      input:not(.print\\:block),
      textarea:not(.print\\:block),
      button,
      .print\\:hidden,
      aside,
      section.mb-6,
      section.mt-6 {
        display: none !important;
      }
      
      body, main, :host {
        background: white !important;
        color: black !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
      
      .comic-print-header {
        display: block !important;
        text-align: center;
        border-bottom: 4px double #000;
        padding-bottom: 12px;
        margin-bottom: 24px;
      }
      
      .comic-print-header h1 {
        font-family: 'Arial Black', Impact, sans-serif;
        font-size: 24pt;
        text-transform: uppercase;
        margin: 0;
        color: black !important;
      }
      
      .comic-print-header p {
        font-family: Georgia, serif;
        font-size: 11pt;
        font-style: italic;
        margin: 5px 0 0 0;
        color: black !important;
      }
      
      .panels-grid {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
        width: 100% !important;
        page-break-inside: avoid;
      }
      
      .comic-panel {
        border: 4px solid #000000 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        background: #ffffff !important;
        overflow: hidden !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        page-break-inside: avoid;
        height: auto !important;
      }
      
      .comic-panel-img-container {
        border-bottom: 4px solid #000000 !important;
        border-radius: 0 !important;
        margin: 0 !important;
        position: relative !important;
      }
      
      .comic-panel img {
        width: 100% !important;
        display: block !important;
      }
      
      .comic-badge {
        position: absolute !important;
        left: 10px !important;
        top: 10px !important;
        background: #000000 !important;
        color: #ffffff !important;
        font-family: 'Courier New', monospace !important;
        font-size: 10pt !important;
        font-weight: bold !important;
        padding: 4px 8px !important;
        border: 2px solid #ffffff !important;
        text-transform: uppercase !important;
      }
      
      .comic-caption {
        padding: 12px !important;
        background: #ffffff !important;
        flex-grow: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: flex-start !important;
      }
      
      .comic-title-text {
        display: block !important;
        font-family: 'Arial Black', Impact, sans-serif !important;
        font-size: 13pt !important;
        text-transform: uppercase !important;
        margin-bottom: 6px !important;
        border-bottom: 2px solid #000000 !important;
        padding-bottom: 4px !important;
        color: #000000 !important;
      }
      
      .comic-desc-text {
        display: block !important;
        font-family: 'Courier New', monospace !important;
        font-size: 10pt !important;
        line-height: 1.4 !important;
        color: #000000 !important;
        margin: 0 !important;
      }
      
      @page {
        size: letter portrait;
        margin: 1.5cm;
      }
    }
  `
})
export class StoryboardDigitalIa {
  private router = inject(Router);

  culture: keyof typeof this.culturalElements = 'Andina';
  theme = 'el cóndor herido';
  panels: StoryboardPanel[] = [];

  culturalElements = {
    Andina: ['Apus', 'textiles geométricos', 'quena', 'cóndor', 'andenes'],
    Amazónica: ['río', 'chacra', 'shipibo-konibo', 'aves de colores', 'maloca'],
    Afroperuana: ['cajón', 'zapateo', 'décimas', 'costa sur', 'celebración comunitaria'],
    Costeña: ['caballito de totora', 'huaca', 'mar', 'redes de pesca', 'cerámica mochica']
  };

  realImages: Record<string, string[]> = {
    Andina: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
      'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&q=80',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80'
    ],
    Amazónica: [
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=80',
      'https://images.unsplash.com/photo-1552410260-0fd9b577afa6?w=800&q=80',
      'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&q=80'
    ],
    Afroperuana: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
    ],
    Costeña: [
      'https://images.unsplash.com/photo-1601999109332-542b18dbec57?w=800&q=80',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80'
    ]
  };

  constructor() {
    this.generateStoryboard();
  }

  goBack(): void {
    this.router.navigate(['/panel-del-estudiante']);
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
    const list = this.realImages[this.culture];
    const offset = (seed + index) % list.length;
    return list[offset];
  }
}
