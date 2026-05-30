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
  <!-- Print-only Header -->
  <div class="hidden comic-print-header">
    <h1>CulturaStory - Cómic Digital</h1>
    <p>Cultura: {{ culture }} | Tema: {{ theme }}</p>
  </div>

  <section class="mx-auto max-w-7xl">
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
    const element = this.culturalElements[this.culture][index % this.culturalElements[this.culture].length];
    const beats = ['Llamado', 'Encuentro', 'Prueba', 'Celebración'];
    const currentBeat = beats[index % beats.length];
    
    let drawingContent = '';
    let bgDecoration = '';
    
    if (this.culture === 'Andina') {
      bgDecoration = `
        <path d="M 100 450 L 300 200 L 500 450 Z" fill="none" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="4,4"/>
        <path d="M 400 450 L 550 280 L 700 450 Z" fill="none" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="4,4"/>
      `;
    } else if (this.culture === 'Amazónica') {
      bgDecoration = `
        <path d="M 50 380 Q 200 300, 400 380 T 750 380" fill="none" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="4,4"/>
        <path d="M 50 410 Q 200 330, 400 410 T 750 410" fill="none" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="4,4"/>
      `;
    } else if (this.culture === 'Costeña') {
      bgDecoration = `
        <path d="M 50 420 L 150 320 L 250 320 L 350 220 L 450 220 L 550 320 L 650 320 L 750 420 Z" fill="none" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="4,4"/>
      `;
    } else if (this.culture === 'Afroperuana') {
      bgDecoration = `
        <path d="M 600 150 Q 610 130, 620 150 T 630 150" fill="none" stroke="#7f8c8d" stroke-width="2"/>
        <line x1="620" y1="140" x2="620" y2="100" stroke="#7f8c8d" stroke-width="2"/>
        <circle cx="600" cy="110" r="10" stroke="#7f8c8d" stroke-width="2" fill="none"/>
      `;
    }

    if (currentBeat === 'Llamado') {
      drawingContent = `
        ${bgDecoration}
        <!-- Stick figure calling -->
        <circle cx="300" cy="280" r="20" fill="none" stroke="#2c3e50" stroke-width="4"/>
        <line x1="300" y1="300" x2="300" y2="390" stroke="#2c3e50" stroke-width="4"/>
        <path d="M 300 320 Q 340 310 330 280" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <line x1="300" y1="320" x2="260" y2="350" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <line x1="300" y1="390" x2="280" y2="460" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <line x1="300" y1="390" x2="320" y2="460" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <path d="M 360 250 C 400 230, 440 270, 480 250" fill="none" stroke="#2c3e50" stroke-width="3" stroke-dasharray="2,2"/>
        <path d="M 370 275 C 410 255, 450 295, 490 275" fill="none" stroke="#2c3e50" stroke-width="3" stroke-dasharray="2,2"/>
        <line x1="50" y1="460" x2="750" y2="460" stroke="#2c3e50" stroke-width="4"/>
      `;
    } else if (currentBeat === 'Encuentro') {
      drawingContent = `
        ${bgDecoration}
        <!-- Stick figure 1 (left) -->
        <circle cx="280" cy="290" r="20" fill="none" stroke="#2c3e50" stroke-width="4"/>
        <line x1="280" y1="310" x2="280" y2="390" stroke="#2c3e50" stroke-width="4"/>
        <line x1="280" y1="330" x2="340" y2="320" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <line x1="280" y1="390" x2="260" y2="460" stroke="#2c3e50" stroke-width="4"/>
        <line x1="280" y1="390" x2="295" y2="460" stroke="#2c3e50" stroke-width="4"/>

        <!-- Stick figure 2 (right) -->
        <circle cx="480" cy="290" r="20" fill="none" stroke="#2c3e50" stroke-width="4"/>
        <line x1="480" y1="310" x2="480" y2="390" stroke="#2c3e50" stroke-width="4"/>
        <line x1="480" y1="330" x2="420" y2="320" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <line x1="480" y1="390" x2="465" y2="460" stroke="#2c3e50" stroke-width="4"/>
        <line x1="480" y1="390" x2="500" y2="460" stroke="#2c3e50" stroke-width="4"/>

        <!-- Handshake / Exchanged Object -->
        <circle cx="380" cy="320" r="8" fill="none" stroke="#e74c3c" stroke-width="3"/>
        <line x1="50" y1="460" x2="750" y2="460" stroke="#2c3e50" stroke-width="4"/>
      `;
    } else if (currentBeat === 'Prueba') {
      drawingContent = `
        ${bgDecoration}
        <path d="M 350 460 C 450 400, 500 300, 650 250 L 750 250 L 750 460 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="320" cy="320" r="20" fill="none" stroke="#2c3e50" stroke-width="4"/>
        <path d="M 320 340 L 340 390 L 370 410" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
        <line x1="330" y1="350" x2="400" y2="330" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <path d="M 370 410 L 350 450 L 380 460" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
        <path d="M 370 410 L 380 430 L 410 435" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
        <line x1="50" y1="460" x2="750" y2="460" stroke="#2c3e50" stroke-width="4"/>
      `;
    } else {
      drawingContent = `
        ${bgDecoration}
        <circle cx="280" cy="270" r="18" fill="none" stroke="#2c3e50" stroke-width="4"/>
        <line x1="280" y1="288" x2="280" y2="360" stroke="#2c3e50" stroke-width="4"/>
        <path d="M 280 305 L 240 260" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <path d="M 280 305 L 320 260" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <path d="M 280 360 L 260 420 L 245 425" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
        <path d="M 280 360 L 300 420 L 315 425" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>

        <circle cx="480" cy="270" r="18" fill="none" stroke="#2c3e50" stroke-width="4"/>
        <line x1="480" y1="288" x2="480" y2="360" stroke="#2c3e50" stroke-width="4"/>
        <path d="M 480 305 L 440 260" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <path d="M 480 305 L 520 260" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        <path d="M 480 360 L 460 420 L 445 425" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
        <path d="M 480 360 L 500 420 L 515 425" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>

        <circle cx="380" cy="180" r="25" fill="none" stroke="#e67e22" stroke-width="4"/>
        <line x1="380" y1="145" x2="380" y2="135" stroke="#e67e22" stroke-width="3"/>
        <line x1="380" y1="215" x2="380" y2="225" stroke="#e67e22" stroke-width="3"/>
        <line x1="345" y1="180" x2="335" y2="180" stroke="#e67e22" stroke-width="3"/>
        <line x1="415" y1="180" x2="425" y2="180" stroke="#e67e22" stroke-width="3"/>

        <line x1="50" y1="440" x2="750" y2="440" stroke="#2c3e50" stroke-width="4"/>
      `;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ebe9e3" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="#fcfbf9"/>
        <rect width="800" height="600" fill="url(#grid)"/>
        <rect x="25" y="25" width="750" height="550" fill="none" stroke="#bdc3c7" stroke-width="2" stroke-dasharray="8,8"/>
        ${drawingContent}
        <rect x="40" y="525" width="450" height="35" rx="5" fill="#2c3e50" opacity=".95"/>
        <text x="55" y="548" fill="#fff" font-family="Courier New, monospace" font-size="16" font-weight="bold">${this.culture.toUpperCase()} · ${element.toUpperCase()} [${currentBeat.toUpperCase()}]</text>
      </svg>`;
      
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
}
