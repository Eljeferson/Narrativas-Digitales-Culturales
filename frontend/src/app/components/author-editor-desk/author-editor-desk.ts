import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerateOutlineUseCase, CreateNarrativeUseCase, SaveNarrativeUseCase, GetNarrativeByIdUseCase, ImproveNarrativeUseCase } from '../../core/application/narratives/narrative-use-cases';
import { Narrative } from '../../core/domain/models/narrative.model';

@Component({
  selector: 'app-author-editor-desk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="story-thread"></div>
<!-- TopNavBar -->
<nav class="sticky top-0 z-50 flex justify-between items-center px-8 py-4 w-full bg-[#FFF8EF]/80 dark:bg-[#1E1B13]/80 backdrop-blur-md">
<div class="flex items-center gap-8">
<span class="text-2xl font-headline font-bold tracking-tight text-[#823B18] dark:text-[#A0522D] italic">CulturaStory AI</span>
<div class="hidden md:flex gap-6">
<a (click)="goTo('/panel-del-estudiante')" class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium cursor-pointer">Narrativas</a>
<a class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium cursor-pointer">Regiones</a>
<a (click)="goTo('/biblioteca')" class="text-[#1E1B13]/70 dark:text-[#FFF8EF]/70 hover:text-[#823B18] transition-colors font-medium cursor-pointer">Biblioteca</a>
</div>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-[#823B18]/5 transition-colors">
<span class="material-symbols-outlined text-[#823B18]">notifications</span>
</button>
<button (click)="goTo('/perfil-creativo-estudiante')" class="p-2 rounded-full hover:bg-[#823B18]/5 transition-colors">
<span class="material-symbols-outlined text-[#823B18]">settings</span>
</button>
<div class="h-8 w-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary transition-all" (click)="goTo('/perfil-creativo-estudiante')">
  <img *ngIf="userAvatar" [src]="userAvatar" class="w-full h-full object-cover" alt="User Avatar">
  <span *ngIf="!userAvatar" class="material-symbols-outlined text-[#823B18] flex items-center justify-center h-full" style="font-variation-settings: 'FILL' 1;">person</span>
</div>
</div>
<div class="bg-gradient-to-r from-transparent via-[#795900]/20 to-transparent h-[1px] w-full absolute bottom-0"></div>
</nav>
<main class="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-24">
<!-- Header Actions -->
<div class="flex justify-between items-end mb-12">
<div>
<nav class="flex items-center gap-2 text-sm text-outline mb-4">
<span class="hover:text-primary cursor-pointer">CulturaStory Hub</span>
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
<button (click)="improveWithAI()" [disabled]="isGenerating || !content.trim()" class="flex items-center gap-2 px-3 py-1.5 bg-tertiary/10 text-tertiary rounded-lg hover:bg-tertiary/20 transition-all disabled:opacity-50 shadow-sm border border-tertiary/20">
<span class="material-symbols-outlined" [class.animate-spin]="isGenerating">auto_fix_high</span>
<span class="text-xs font-bold">{{ isGenerating ? 'Mejorando...' : 'IA: Mejorar Narrativa' }}</span>
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
export class AuthorEditorDesk implements OnInit {
  private generateUseCase = inject(GenerateOutlineUseCase);
  private improveUseCase = inject(ImproveNarrativeUseCase);
  private createUseCase = inject(CreateNarrativeUseCase);
  private saveUseCase = inject(SaveNarrativeUseCase);
  private getByIdUseCase = inject(GetNarrativeByIdUseCase);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  title = '';
  content = '';
  region = 'andina';
  status: 'draft' | 'ready_for_review' | 'published' = 'draft';
  lastSavedMsg = '';
  isGenerating = false;
  currentId: string | undefined = undefined;
  userName = 'Creador';
  userAvatar = '';

  ngOnInit() {
    this.loadUserData();
    const narrativeId = this.route.snapshot.queryParamMap.get('id');
    if (!narrativeId) {
      return;
    }

    this.getByIdUseCase.execute(narrativeId).subscribe({
      next: (narrative) => {
        if (!narrative) {
          return;
        }

        this.currentId = narrative.id;
        this.title = narrative.titulo;
        this.content = narrative.contenido;
        this.region = narrative.regionCultural;
        this.status = narrative.status === 'ready_for_review' ? 'ready_for_review' : 'draft';
      },
      error: (err) => console.error('Error loading narrative:', err)
    });
  }

  setStatus(s: 'draft' | 'ready_for_review') {
    this.status = s;
  }

  loadUserData() {
    const userStr = localStorage.getItem('culturastory.currentUser');
    if (userStr) {
      try {
         const user = JSON.parse(userStr);
         this.userName = user.nombreCompleto || user.nombre || 'Creador';
         this.userAvatar = user.fotoPerfilUrl || '';
      } catch(e) {
         console.error('Error parseando usuario local', e);
      }
    }
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  improveWithAI() {
    if (!this.content.trim()) return;
    
    this.isGenerating = true;
    this.improveUseCase.execute(this.title, this.region, this.content).subscribe({
      next: (improved) => {
        this.content = improved;
        this.isGenerating = false;
      },
      error: (err) => {
        console.error('Error improving narrative with AI:', err);
        this.isGenerating = false;
        alert('Error al mejorar la narrativa con IA.');
      }
    });
  }

  private buildNarrative(): Narrative {
    const authorId = localStorage.getItem('currentAuthorId') || 'fbdf4968-3ac3-43f1-9457-36e4f3a9e2f4';
    return {
      id: this.currentId,
      titulo: this.title,
      contenido: this.content,
      regionCultural: this.region,
      autor: { id: authorId },
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

