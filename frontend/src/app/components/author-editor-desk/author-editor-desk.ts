import { Component, inject } from '@angular/core';
import { FormsModule, NgIf } from '@angular/common';
import { GenerateOutlineUseCase, CreateNarrativeUseCase, SaveNarrativeUseCase } from '../../core/application/narratives/narrative-use-cases';
import { Narrative } from '../../core/domain/models/narrative.model';

@Component({
  selector: 'app-author-editor-desk',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
<div class="loom-thread"></div>
<!-- TopNavBar -->
<nav class="sticky top-0 z-50 flex justify-between items-center px-8 py-4 w-full bg-[#FFF8EF]/80 dark:bg-[#1E1B13]/80 backdrop-blur-md">
<div class="flex items-center gap-8">
<span class="text-2xl font-headline font-bold tracking-tight text-[#823B18] dark:text-[#A0522D] italic">CulturaStory AI</span>
<div class="hidden md:flex gap-6">
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium cursor-pointer">Narrativas</a>
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium cursor-pointer">Regiones</a>
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium cursor-pointer">Biblioteca</a>
</div>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-[#823B18]/5 transition-colors">
<span class="material-symbols-outlined text-[#823B18]">notifications</span>
</button>
<button class="p-2 rounded-full hover:bg-[#823B18]/5 transition-colors">
<span class="material-symbols-outlined text-[#823B18]">settings</span>
</button>
<div class="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
<img alt="User profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj86HNumaISbWtDD8CLuzs951MJiQv6XayZG3I-o1i4jXtN9ZYwRdxPge6LvHgyMPtfGsddInJrKHFTdDSPMRmNeoNthr1z295Esjn4foelB3VhPUyZOErOY9BY8f18fxN_Oh9flfxbv_VqNu4Ai0OTHEq80P65nrhBumhSLrPjYRvbu78BJXij38N41QkwpZc5ythO2bZFo24z4BauInHnLKXtlZnA5TGtCL71Ve5C7rYu9wCwIaBTKTV_FzlbD3nLHtHXkZU"/>
</div>
</div>
<div class="bg-gradient-to-r from-transparent via-[#795900]/20 to-transparent h-[1px] w-full absolute bottom-0"></div>
</nav>
<main class="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-24">
<!-- Header Actions -->
<div class="flex justify-between items-end mb-12">
<div>
<nav class="flex items-center gap-2 text-sm text-outline mb-4">
<span class="hover:text-primary cursor-pointer">The Weaver's Hub</span>
<span class="material-symbols-outlined text-xs">chevron_right</span>
<span class="text-on-surface-variant font-medium">Editor de Narrativa</span>
</nav>
<h1 class="text-4xl font-headline font-bold text-primary tracking-tight">Escritorio del Autor</h1>
</div>
<div class="flex items-center gap-3 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/30">
<button (click)="setStatus('draft')" [class.bg-primary]="status === 'draft'" [class.text-on-primary]="status === 'draft'" class="px-4 py-2 text-sm font-bold rounded-lg shadow-sm transition-all">Borrador</button>
<button (click)="setStatus('ready_for_review')" [class.bg-primary]="status === 'ready_for_review'" [class.text-on-primary]="status === 'ready_for_review'" class="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all">Listo para revisión</button>
</div>
</div>
<!-- Editor Container -->
<div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
<!-- Metadata Bar -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 border-b border-surface-variant">
<div class="space-y-2">
<label class="block text-xs font-bold uppercase tracking-widest text-secondary font-label">Título de la Obra</label>
<input [(ngModel)]="title" name="title" class="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors text-xl font-headline placeholder:text-outline-variant py-2" placeholder="Escribe el nombre de tu historia..." type="text"/>
</div>
<div class="space-y-2">
<label class="block text-xs font-bold uppercase tracking-widest text-secondary font-label">Región Cultural</label>
<select [(ngModel)]="region" name="region" class="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors py-2 text-on-surface">
<option value="andina">Andina</option>
<option value="amazónica">Amazónica</option>
<option value="afroperuana">Afroperuana</option>
<option value="costeña">Costeña</option>
</select>
</div>
</div>
<!-- Toolbar -->
<div class="flex items-center justify-between px-8 py-3 bg-surface-container-low/50 border-b border-surface-variant">
<div class="flex items-center gap-2">
<button class="p-2 hover:bg-surface-variant rounded text-on-surface-variant"><span class="material-symbols-outlined">format_bold</span></button>
<button class="p-2 hover:bg-surface-variant rounded text-on-surface-variant"><span class="material-symbols-outlined">format_italic</span></button>
<div class="w-[1px] h-6 bg-outline-variant mx-2"></div>
<button (click)="generateAI()" [disabled]="isGenerating" class="flex items-center gap-2 px-3 py-1.5 bg-tertiary/10 text-tertiary rounded-lg hover:bg-tertiary/20 transition-all disabled:opacity-50">
<span class="material-symbols-outlined" [class.animate-spin]="isGenerating">auto_fix_high</span>
<span class="text-xs font-bold">{{ isGenerating ? 'Generando...' : 'IA: Generar Esquema' }}</span>
</button>
</div>
<span class="text-xs text-outline font-medium">Auto-guardado habilitado</span>
</div>
<!-- Text Content Area -->
<div class="paper-texture p-12 min-h-[600px] relative">
<div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
<span class="material-symbols-outlined text-[120px] text-primary">texture</span>
</div>
<div class="max-w-3xl mx-auto">
<textarea [(ngModel)]="content" name="content" class="w-full min-h-[500px] bg-transparent border-none focus:ring-0 text-lg leading-relaxed text-on-surface font-serif placeholder:text-outline-variant/30" placeholder="Hace mucho tiempo..."></textarea>
</div>
</div>
</div>
<!-- Footer Actions -->
<div class="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
<div class="flex items-center gap-4 text-on-surface-variant text-sm italic">
<span class="material-symbols-outlined text-secondary">cloud_done</span>
<span *ngIf="lastSavedMsg">{{ lastSavedMsg }}</span>
<span *ngIf="!lastSavedMsg">Sin cambios guardados</span>
</div>
<div class="flex items-center gap-4 w-full md:w-auto">
<button (click)="saveDraft()" class="flex-1 md:flex-none px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined">save</span>
Guardar
</button>
<button (click)="submitToTeacher()" class="flex-1 md:flex-none px-8 py-3 rounded-lg bg-primary text-on-primary font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group">
<span class="material-symbols-outlined">send</span>
Enviar a revisión
</button>
</div>
</div>
</main>
  `,
  styles: `
    :host { display: block; }
    .paper-texture {
      background: radial-gradient(#00000005 1px, transparent 0);
      background-size: 24px 24px;
    }
  `
})
export class AuthorEditorDesk {
  private generateUseCase = inject(GenerateOutlineUseCase);
  private createUseCase = inject(CreateNarrativeUseCase);
  private saveUseCase = inject(SaveNarrativeUseCase);

  title = '';
  content = '';
  region = 'andina';
  status: 'draft' | 'ready_for_review' | 'published' = 'draft';
  lastSavedMsg = '';
  isGenerating = false;
  currentId: string | undefined = undefined;

  setStatus(s: 'draft' | 'ready_for_review') {
    this.status = s;
  }

  generateAI() {
    this.isGenerating = true;
    this.generateUseCase.execute(this.region).subscribe({
      next: (esquema) => {
        this.content = esquema;
        this.isGenerating = false;
      },
      error: (err) => {
        console.error('Error generating AI outline:', err);
        this.isGenerating = false;
        alert('Error al generar el esquema con IA.');
      }
    });
  }

  private buildNarrative(): Narrative {
    return {
      id: this.currentId,
      titulo: this.title,
      contenido: this.content,
      regionCultural: this.region,
      autor: { id: 'author-uuid-mock' }, // Esto debería venir del servicio de sesión
      status: this.status
    };
  }

  saveDraft() {
    const narrative = this.buildNarrative();
    const obs = this.currentId ? this.saveUseCase.execute(narrative) : this.createUseCase.execute(narrative);
    
    obs.subscribe({
      next: (saved) => {
        this.currentId = saved.id;
        const time = new Date().toLocaleTimeString();
        this.lastSavedMsg = `Guardado a las ${time}`;
      },
      error: (err) => console.error('Error saving narrative:', err)
    });
  }

  submitToTeacher() {
    this.status = 'ready_for_review';
    this.saveDraft();
  }
}

