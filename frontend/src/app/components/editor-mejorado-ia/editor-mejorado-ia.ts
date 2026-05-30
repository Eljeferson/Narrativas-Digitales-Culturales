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
    const element = this.elements[this.culture][(index + seed) % this.elements[this.culture].length];
    let drawingContent = '';
    
    if (this.culture === 'Andina') {
      if (element === 'Apus') {
        drawingContent = `
          <!-- Mountains -->
          <path d="M 150 400 L 300 180 L 450 400 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <path d="M 245 260 L 300 240 L 355 260 L 330 300 L 300 280 L 270 300 Z" fill="none" stroke="#2c3e50" stroke-width="3" stroke-linejoin="round"/>
          <path d="M 380 400 L 480 250 L 580 400 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Stick figure -->
          <circle cx="200" cy="320" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="200" y1="336" x2="200" y2="390" stroke="#2c3e50" stroke-width="4"/>
          <!-- Pointing arm -->
          <line x1="200" y1="345" x2="250" y2="320" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="200" y1="345" x2="170" y2="370" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <!-- Legs -->
          <line x1="200" y1="390" x2="180" y2="440" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="200" y1="390" x2="220" y2="440" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <!-- Ground -->
          <line x1="50" y1="440" x2="670" y2="440" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        `;
      } else if (element === 'cóndor') {
        drawingContent = `
          <!-- Big Bird (Cóndor) in sky -->
          <path d="M 280 150 C 320 120, 400 120, 440 150 C 420 170, 380 180, 360 170 C 340 180, 300 170, 280 150 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <path d="M 330 162 L 360 195 L 390 162" fill="none" stroke="#2c3e50" stroke-width="3"/>
          <line x1="360" y1="135" x2="360" y2="160" stroke="#2c3e50" stroke-width="4"/>
          <!-- Stick figure looking up -->
          <circle cx="480" cy="330" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="480" y1="346" x2="480" y2="400" stroke="#2c3e50" stroke-width="4"/>
          <!-- Shielding eyes arm -->
          <path d="M 480 355 Q 510 330 500 315" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="480" y1="355" x2="450" y2="380" stroke="#2c3e50" stroke-width="4"/>
          <!-- Legs -->
          <line x1="480" y1="400" x2="460" y2="450" stroke="#2c3e50" stroke-width="4"/>
          <line x1="480" y1="400" x2="500" y2="450" stroke="#2c3e50" stroke-width="4"/>
          <!-- Ground -->
          <line x1="50" y1="450" x2="670" y2="450" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else if (element === 'textiles') {
        drawingContent = `
          <!-- Loom frame -->
          <rect x="350" y="220" width="160" height="200" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Loom lines (threads) -->
          <line x1="380" y1="220" x2="380" y2="420" stroke="#2c3e50" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="410" y1="220" x2="410" y2="420" stroke="#2c3e50" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="440" y1="220" x2="440" y2="420" stroke="#2c3e50" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="470" y1="220" x2="470" y2="420" stroke="#2c3e50" stroke-width="2" stroke-dasharray="4,4"/>
          <!-- Geometric weaving pattern in middle -->
          <path d="M 350 320 L 380 290 L 410 320 L 440 290 L 470 320 L 510 290" fill="none" stroke="#2c3e50" stroke-width="3"/>
          <path d="M 350 340 L 380 370 L 410 340 L 440 370 L 470 340 L 510 370" fill="none" stroke="#2c3e50" stroke-width="3"/>
          <!-- Stick figure weaver -->
          <circle cx="260" cy="290" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="260" y1="306" x2="260" y2="370" stroke="#2c3e50" stroke-width="4"/>
          <!-- Hands weaving -->
          <line x1="260" y1="320" x2="360" y2="310" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="260" y1="330" x2="360" y2="340" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <!-- Sitting legs -->
          <path d="M 260 370 L 220 400 L 280 420" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <line x1="50" y1="430" x2="670" y2="430" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else {
        drawingContent = `
          <!-- Terraces lines -->
          <path d="M 50 440 L 200 440 L 200 370 L 350 370 L 350 300 L 500 300 L 500 230 L 670 230" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Stick figure walking up andenes -->
          <circle cx="280" cy="310" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="326" x2="280" y2="370" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="335" x2="260" y2="350" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="335" x2="305" y2="325" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="370" x2="270" y2="410" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="370" x2="295" y2="410" stroke="#2c3e50" stroke-width="4"/>
        `;
      }
    } else if (this.culture === 'Amazónica') {
      if (element === 'río') {
        drawingContent = `
          <!-- Wavy River -->
          <path d="M 50 350 Q 200 250, 350 350 T 650 350" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <path d="M 50 380 Q 200 280, 350 380 T 650 380" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <!-- Canoe -->
          <path d="M 280 325 C 310 320, 390 320, 420 325 L 400 345 L 300 345 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Stick figure in canoe -->
          <circle cx="350" cy="275" r="14" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="350" y1="289" x2="350" y2="330" stroke="#2c3e50" stroke-width="4"/>
          <!-- Oar -->
          <line x1="320" y1="290" x2="380" y2="360" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
        `;
      } else if (element === 'maloca') {
        drawingContent = `
          <!-- Maloca structure -->
          <path d="M 200 420 L 250 200 L 450 200 L 500 420 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <path d="M 250 200 L 350 120 L 450 200" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Door -->
          <path d="M 310 420 L 310 340 L 390 340 L 390 420" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Straw lines on roof -->
          <line x1="300" y1="160" x2="320" y2="200" stroke="#2c3e50" stroke-width="2"/>
          <line x1="350" y1="140" x2="350" y2="200" stroke="#2c3e50" stroke-width="2"/>
          <line x1="400" y1="160" x2="380" y2="200" stroke="#2c3e50" stroke-width="2"/>
          <!-- Stick figure -->
          <circle cx="150" cy="340" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="150" y1="356" x2="150" y2="420" stroke="#2c3e50" stroke-width="4"/>
          <line x1="150" y1="370" x2="180" y2="380" stroke="#2c3e50" stroke-width="4"/>
          <line x1="150" y1="370" x2="120" y2="380" stroke="#2c3e50" stroke-width="4"/>
          <line x1="150" y1="420" x2="130" y2="470" stroke="#2c3e50" stroke-width="4"/>
          <line x1="150" y1="420" x2="170" y2="470" stroke="#2c3e50" stroke-width="4"/>
          <line x1="50" y1="470" x2="670" y2="470" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else if (element === 'patrones shipibo') {
        drawingContent = `
          <!-- Tribal Pattern background -->
          <path d="M 100 150 L 620 150 M 100 250 L 620 250 M 100 350 L 620 350" fill="none" stroke="#2c3e50" stroke-width="2" stroke-dasharray="5,5"/>
          <path d="M 120 150 L 170 250 L 220 150 L 270 250 L 320 150 L 370 250 L 420 150 L 470 250 L 520 150 L 570 250" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <path d="M 170 250 L 220 350 L 270 250 L 320 350 L 370 250 L 420 350 L 470 250 L 520 350 L 570 250" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Stick figure tracing patterns -->
          <circle cx="580" cy="310" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="580" y1="326" x2="580" y2="390" stroke="#2c3e50" stroke-width="4"/>
          <line x1="580" y1="340" x2="520" y2="300" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="580" y1="390" x2="560" y2="440" stroke="#2c3e50" stroke-width="4"/>
          <line x1="580" y1="390" x2="600" y2="440" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else {
        drawingContent = `
          <!-- Tree branches -->
          <path d="M 150 450 L 150 250 L 250 180 M 150 310 L 80 260" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Bird outlines on branches -->
          <path d="M 230 180 Q 250 160, 270 180 Q 260 200, 230 180 Z" fill="none" stroke="#2c3e50" stroke-width="3"/>
          <path d="M 90 260 Q 110 240, 130 260 Q 120 280, 90 260 Z" fill="none" stroke="#2c3e50" stroke-width="3"/>
          <!-- Stick figure feeding/pointing -->
          <circle cx="360" cy="330" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="360" y1="346" x2="360" y2="410" stroke="#2c3e50" stroke-width="4"/>
          <line x1="360" y1="360" x2="260" y2="310" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="360" y1="410" x2="340" y2="460" stroke="#2c3e50" stroke-width="4"/>
          <line x1="360" y1="410" x2="380" y2="460" stroke="#2c3e50" stroke-width="4"/>
          <line x1="50" y1="460" x2="670" y2="460" stroke="#2c3e50" stroke-width="4"/>
        `;
      }
    } else if (this.culture === 'Afroperuana') {
      if (element === 'cajón') {
        drawingContent = `
          <!-- Cajón (box instrument) -->
          <rect x="320" y="320" width="80" height="110" rx="4" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <circle cx="360" cy="380" r="12" fill="none" stroke="#2c3e50" stroke-width="3"/>
          <!-- Stick figure sitting on cajón -->
          <circle cx="360" cy="230" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="360" y1="246" x2="360" y2="320" stroke="#2c3e50" stroke-width="4"/>
          <!-- Hands playing -->
          <line x1="360" y1="265" x2="325" y2="340" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="360" y1="265" x2="395" y2="340" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <!-- Sitting legs -->
          <path d="M 360 320 L 300 350 L 300 430" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <path d="M 360 320 L 420 350 L 420 430" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <line x1="50" y1="430" x2="670" y2="430" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else if (element === 'zapateo') {
        drawingContent = `
          <!-- Dancing stick figure -->
          <circle cx="360" cy="220" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="360" y1="236" x2="360" y2="310" stroke="#2c3e50" stroke-width="4"/>
          <!-- Happy/expressive arms -->
          <line x1="360" y1="250" x2="300" y2="210" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="360" y1="250" x2="420" y2="210" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <!-- Zapateo action legs -->
          <path d="M 360 310 L 330 350 L 350 395" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <path d="M 360 310 L 390 350 L 370 395" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Motion lines -->
          <path d="M 330 405 L 340 405 M 325 410 L 345 410" stroke="#2c3e50" stroke-width="2"/>
          <path d="M 370 405 L 380 405 M 365 410 L 385 410" stroke="#2c3e50" stroke-width="2"/>
          <line x1="50" y1="400" x2="670" y2="400" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else if (element === 'décimas') {
        drawingContent = `
          <!-- Paper scroll -->
          <path d="M 350 150 L 520 150 L 520 380 L 350 380 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Writing lines -->
          <line x1="380" y1="190" x2="490" y2="190" stroke="#2c3e50" stroke-width="2"/>
          <line x1="380" y1="230" x2="490" y2="230" stroke="#2c3e50" stroke-width="2"/>
          <line x1="380" y1="270" x2="470" y2="270" stroke="#2c3e50" stroke-width="2"/>
          <line x1="380" y1="310" x2="490" y2="310" stroke="#2c3e50" stroke-width="2"/>
          <!-- Stick figure writing -->
          <circle cx="240" cy="270" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="240" y1="286" x2="240" y2="360" stroke="#2c3e50" stroke-width="4"/>
          <!-- Writing arm -->
          <line x1="240" y1="300" x2="350" y2="270" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <!-- Quill -->
          <line x1="350" y1="270" x2="370" y2="230" stroke="#2c3e50" stroke-width="3"/>
          <!-- Legs -->
          <line x1="240" y1="360" x2="220" y2="420" stroke="#2c3e50" stroke-width="4"/>
          <line x1="240" y1="360" x2="260" y2="420" stroke="#2c3e50" stroke-width="4"/>
          <line x1="50" y1="420" x2="670" y2="420" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else {
        drawingContent = `
          <!-- Fire in the middle -->
          <path d="M 330 380 Q 360 300, 390 380 Z" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <path d="M 350 380 Q 360 330, 370 380 Z" fill="none" stroke="#2c3e50" stroke-width="2"/>
          <line x1="310" y1="390" x2="410" y2="390" stroke="#2c3e50" stroke-width="4"/>
          <!-- Stick figure 1 (left) -->
          <circle cx="230" cy="270" r="14" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="230" y1="284" x2="230" y2="350" stroke="#2c3e50" stroke-width="4"/>
          <path d="M 230 300 L 290 280" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="230" y1="350" x2="210" y2="400" stroke="#2c3e50" stroke-width="4"/>
          <line x1="230" y1="350" x2="250" y2="400" stroke="#2c3e50" stroke-width="4"/>
          <!-- Stick figure 2 (right) -->
          <circle cx="490" cy="270" r="14" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="490" y1="284" x2="490" y2="350" stroke="#2c3e50" stroke-width="4"/>
          <path d="M 490 300 L 430 280" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="490" y1="350" x2="470" y2="400" stroke="#2c3e50" stroke-width="4"/>
          <line x1="490" y1="350" x2="510" y2="400" stroke="#2c3e50" stroke-width="4"/>
          <line x1="50" y1="400" x2="670" y2="400" stroke="#2c3e50" stroke-width="4"/>
        `;
      }
    } else {
      if (element === 'huaca') {
        drawingContent = `
          <!-- Huaca (Stepped pyramid) -->
          <path d="M 120 420 L 180 320 L 260 320 L 320 220 L 440 220 L 500 320 L 580 320 L 640 420 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Huaca gate -->
          <rect x="350" y="320" width="60" height="100" rx="2" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <!-- Stick figure -->
          <circle cx="280" cy="360" r="14" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="374" x2="280" y2="420" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="385" x2="310" y2="400" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="420" x2="260" y2="460" stroke="#2c3e50" stroke-width="4"/>
          <line x1="280" y1="420" x2="300" y2="460" stroke="#2c3e50" stroke-width="4"/>
          <line x1="50" y1="460" x2="670" y2="460" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else if (element === 'mar') {
        drawingContent = `
          <!-- Ocean Waves -->
          <path d="M 50 300 Q 150 250, 250 300 T 450 300 T 650 300" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <path d="M 50 340 Q 150 290, 250 340 T 450 340 T 650 340" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <path d="M 50 380 Q 150 330, 250 380 T 450 380 T 650 380" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <!-- Stick figure surfing -->
          <circle cx="350" cy="200" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="350" y1="216" x2="350" y2="280" stroke="#2c3e50" stroke-width="4"/>
          <!-- Balancing arms -->
          <line x1="350" y1="230" x2="290" y2="230" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="350" y1="230" x2="410" y2="220" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <!-- Surfboard -->
          <path d="M 260 295 C 300 290, 400 290, 440 295 L 420 310 L 280 310 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
        `;
      } else if (element === 'totora') {
        drawingContent = `
          <!-- Reeds (Totora) background -->
          <line x1="120" y1="420" x2="100" y2="150" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="150" y1="420" x2="140" y2="120" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="180" y1="420" x2="190" y2="180" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="210" y1="420" x2="220" y2="130" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <!-- Caballito de totora boat -->
          <path d="M 380 390 C 430 390, 520 350, 570 280 C 530 330, 440 370, 380 370 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Stick figure building boat -->
          <circle cx="320" cy="310" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="320" y1="326" x2="320" y2="390" stroke="#2c3e50" stroke-width="4"/>
          <line x1="320" y1="340" x2="380" y2="370" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="320" y1="390" x2="300" y2="440" stroke="#2c3e50" stroke-width="4"/>
          <line x1="320" y1="390" x2="340" y2="440" stroke="#2c3e50" stroke-width="4"/>
          <line x1="50" y1="440" x2="670" y2="440" stroke="#2c3e50" stroke-width="4"/>
        `;
      } else {
        drawingContent = `
          <!-- Stirrup mouth jar -->
          <path d="M 330 360 C 310 320, 310 260, 350 220 Q 380 180, 410 220 C 450 260, 450 320, 430 360 Z M 350 220 L 410 220" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <path d="M 380 200 L 380 160 M 350 160 L 410 160" stroke="#2c3e50" stroke-width="4"/>
          <path d="M 300 360 L 460 360 L 440 420 L 320 420 Z" fill="none" stroke="#2c3e50" stroke-width="4" stroke-linejoin="round"/>
          <!-- Stick figure painting jar -->
          <circle cx="210" cy="300" r="16" fill="none" stroke="#2c3e50" stroke-width="4"/>
          <line x1="210" y1="316" x2="210" y2="380" stroke="#2c3e50" stroke-width="4"/>
          <line x1="210" y1="330" x2="320" y2="320" stroke="#2c3e50" stroke-width="4" stroke-linecap="round"/>
          <line x1="210" y1="380" x2="190" y2="430" stroke="#2c3e50" stroke-width="4"/>
          <line x1="210" y1="380" x2="230" y2="430" stroke="#2c3e50" stroke-width="4"/>
          <line x1="50" y1="430" x2="670" y2="430" stroke="#2c3e50" stroke-width="4"/>
        `;
      }
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540">
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#eaeaeb" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="720" height="540" fill="#faf9f6"/>
      <rect width="720" height="540" fill="url(#grid)"/>
      <rect x="20" y="20" width="680" height="500" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="6,6"/>
      ${drawingContent}
      <rect x="35" y="475" width="300" height="35" rx="5" fill="#2c3e50" opacity=".95"/>
      <text x="50" y="498" fill="#fff" font-family="Courier New, monospace" font-size="16" font-weight="bold">${this.culture.toUpperCase()} - ${element.toUpperCase()}</text>
    </svg>`;
    
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
}
