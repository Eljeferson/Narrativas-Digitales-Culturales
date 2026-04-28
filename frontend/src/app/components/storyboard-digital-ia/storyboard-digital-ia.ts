import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenerateOutlineUseCase } from '../../core/application/narratives/narrative-use-cases';

@Component({
  selector: 'app-storyboard-digital-ia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<!-- Top Navigation Anchor -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fff9ed] dark:bg-[#1a1614] border-b border-primary/5">
<div class="flex items-center gap-8">
<span class="text-2xl font-bold font-headline text-primary dark:text-[#b85932]">CulturaStory</span>
<nav class="hidden md:flex gap-6">
<a class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Dashboard</a>
<a class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="#">Narrativas</a>
<a class="text-primary border-b-2 border-primary font-bold text-sm" href="#">Storyboards</a>
</nav>
</div>
</header>
<!-- Main Canvas -->
<main class="pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
<!-- Header Panel -->
<section class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
<div>
<span class="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Proyecto Actual</span>
<h1 class="text-4xl md:text-5xl font-headline font-bold text-on-surface leading-tight">Nueva Narrativa</h1>
<p class="text-on-surface-variant mt-2 max-w-xl">Genera un esquema narrativo inicial basado en la cultura local de tu región.</p>
</div>
</section>

<!-- Cultura Selector & Generation -->
<section class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/15 mb-12">
  <div class="flex flex-col md:flex-row gap-6 items-end">
    <div class="flex-1 w-full">
      <label class="block text-sm font-bold text-primary mb-2">Región Cultural</label>
      <select [(ngModel)]="selectedCulture" class="w-full bg-surface-container border-2 border-outline-variant rounded-xl px-4 py-3 focus:border-primary transition-colors">
        <option value="" disabled selected>Selecciona tu región...</option>
        <option value="andina">Andina</option>
        <option value="amazónica">Amazónica</option>
        <option value="afroperuana">Afroperuana</option>
        <option value="costeña">Costeña</option>
      </select>
    </div>
    <button (click)="generateOutline()" [disabled]="!selectedCulture || isGenerating" class="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2">
      <span class="material-symbols-outlined" [class.animate-spin]="isGenerating">auto_awesome</span>
      <span>{{ isGenerating ? 'Generando...' : 'Generar Esquema con IA' }}</span>
    </button>
  </div>
</section>

<!-- Generated Result (Vignette 1 Style) -->
<div *ngIf="generatedText || isGenerating" class="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
<article class="group relative bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 torn-edge border border-outline-variant/15 col-span-1 md:col-span-2">
<div class="relative z-10">
<div class="flex justify-between items-center mb-4">
<span class="flex items-center gap-2 text-primary font-headline font-bold text-xl">
  <span class="material-symbols-outlined">edit_note</span> Esquema Narrativo
</span>
</div>
<div class="space-y-4">
<div class="p-4 bg-surface-container/50 rounded-xl border border-primary/10">
  <textarea *ngIf="!isGenerating" [(ngModel)]="generatedText" rows="12" class="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-on-surface leading-relaxed resize-y"></textarea>
  <div *ngIf="isGenerating" class="flex flex-col items-center justify-center py-12 gap-4">
    <div class="w-12 h-12 rounded-full border-4 border-tertiary/20 border-t-tertiary animate-spin"></div>
    <p class="text-sm font-bold text-tertiary animate-pulse">Consultando a los ancestros digitales...</p>
  </div>
</div>
<div class="flex justify-end gap-3" *ngIf="!isGenerating">
  <button class="px-6 py-2 rounded-lg bg-surface-container text-on-surface font-bold hover:bg-surface-variant transition-colors">Descartar</button>
  <button class="px-6 py-2 rounded-lg bg-tertiary text-on-tertiary font-bold shadow-md hover:scale-[1.02] transition-transform">Guardar Esquema</button>
</div>
</div>
</div>
</article>
</div>
</main>
  `,
  styles: `
    :host { display: block; }
  `
})
export class StoryboardDigitalIa {
  private generateOutlineUseCase = inject(GenerateOutlineUseCase);

  selectedCulture: string = '';
  isGenerating: boolean = false;
  generatedText: string = '';

  generateOutline() {
    if (!this.selectedCulture) return;
    
    this.isGenerating = true;
    this.generatedText = '';

    this.generateOutlineUseCase.execute(this.selectedCulture).subscribe({
      next: (result) => {
        this.generatedText = result;
        this.isGenerating = false;
      },
      error: (err) => {
        console.error('Error generando esquema:', err);
        this.generatedText = 'Hubo un error al generar el esquema. Por favor, inténtalo de nuevo.';
        this.isGenerating = false;
      }
    });
  }
}
