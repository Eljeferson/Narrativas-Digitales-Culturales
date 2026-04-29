import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
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
<button (click)="goTo('/panel-del-estudiante')" class="group flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r from-[#823B18] to-[#A0522D] text-white rounded-full font-bold hover:shadow-lg hover:shadow-[#823B18]/30 transition-all duration-300 mb-6 active:scale-95 border-0">
  <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
  <span>Volver al Inicio</span>
</button>
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
<input [(ngModel)]="title" (ngModelChange)="onContentChange()" name="title" class="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors text-xl font-headline placeholder:text-outline-variant py-2" placeholder="Escribe el nombre de tu historia..." type="text"/>
</div>
<div class="space-y-2">
<label class="block text-xs font-bold uppercase tracking-widest text-secondary font-label">Región Cultural</label>
<div class="flex gap-2">
<select [(ngModel)]="region" (ngModelChange)="onContentChange()" name="region" class="flex-1 bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors py-2 text-on-surface">
<option value="andina">Andina</option>
<option value="amazónica">Amazónica</option>
<option value="afroperuana">Afroperuana</option>
<option value="costeña">Costeña</option>
</select>
<button (click)="generateFromAI()" [disabled]="isGenerating" class="px-3 py-1 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-all disabled:opacity-50 text-xs font-bold border border-secondary/20 flex items-center gap-1" title="Generar esquema base con IA">
<span class="material-symbols-outlined text-sm" [class.animate-spin]="isGenerating">magic_button</span>
<span>Esquema IA</span>
</button>
</div>
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
<textarea [(ngModel)]="content" (ngModelChange)="onContentChange()" name="content" class="w-full min-h-[500px] bg-transparent border-none focus:ring-0 text-lg leading-relaxed text-on-surface font-serif placeholder:text-outline-variant/30" placeholder="Hace mucho tiempo..."></textarea>
</div>
</div>
</div>
<!-- Footer Actions -->
<div class="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
<div class="flex items-center gap-4 text-on-surface-variant text-sm italic">
<span class="material-symbols-outlined text-secondary" [class.animate-spin]="isSaving">
{{ isSaving ? 'sync' : 'cloud_done' }}
</span>
<span *ngIf="lastSavedMsg">{{ lastSavedMsg }}</span>
<span *ngIf="!lastSavedMsg">Sin cambios guardados</span>
</div>
<div class="flex items-center gap-4 w-full md:w-auto">
<button (click)="saveDraft()" [disabled]="isSaving" class="flex-1 md:flex-none px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
<span class="material-symbols-outlined">{{ currentId ? 'save' : 'add_circle' }}</span>
{{ isSaving ? 'Guardando...' : (currentId ? 'Guardar' : 'Crear Historia') }}
</button>
<button (click)="submitToTeacher()" [disabled]="isSaving || !currentId" class="flex-1 md:flex-none px-8 py-3 rounded-lg bg-primary text-on-primary font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50">
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
export class AuthorEditorDesk implements OnInit, OnDestroy {
  private generateUseCase = inject(GenerateOutlineUseCase);
  private improveUseCase = inject(ImproveNarrativeUseCase);
  private createUseCase = inject(CreateNarrativeUseCase);
  private saveUseCase = inject(SaveNarrativeUseCase);
  private getByIdUseCase = inject(GetNarrativeByIdUseCase);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  title = '';
  content = '';
  region = 'andina';
  tipoRelato = 'cuento';
  status: 'draft' | 'ready_for_review' | 'published' = 'draft';
  lastSavedMsg = '';
  isGenerating = false;
  isSaving = false;
  currentId: string | undefined = undefined;
  userName = 'Creador';
  userAvatar = '';

  private destroy$ = new Subject<void>();
  private autoSave$ = new Subject<void>();

  ngOnInit() {
    this.loadUserData();
    this.setupAutoSave();
    
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
        this.tipoRelato = narrative.tipoRelato || 'cuento';
        this.status = narrative.status === 'ready_for_review' ? 'ready_for_review' : 'draft';
      },
      error: (err) => console.error('Error loading narrative:', err)
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupAutoSave() {
    this.autoSave$.pipe(
      debounceTime(5000), // 5 segundos de inactividad
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.title.trim() || this.content.trim()) {
        this.saveDraft();
      }
    });
  }

  onContentChange() {
    this.autoSave$.next();
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

  generateFromAI() {
    if (!this.region) return;
    
    this.isGenerating = true;
    this.generateUseCase.execute(this.region).subscribe({
      next: (outline) => {
        this.content = outline;
        this.isGenerating = false;
        if (!this.title) this.title = `Nueva historia de la región ${this.region}`;
        this.saveDraft(); // Guardar automáticamente al generar
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error generating outline:', err);
        this.isGenerating = false;
        alert('Error al generar el esquema con IA.');
      }
    });
  }

  improveWithAI() {
    if (!this.content.trim()) return;
    
    this.isGenerating = true;
    this.improveUseCase.execute(this.title, this.region, this.content).subscribe({
      next: (improved) => {
        this.content = improved;
        this.isGenerating = false;
        this.saveDraft(); // Guardar automáticamente tras la mejora
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error improving narrative with IA:', err);
        this.isGenerating = false;
        alert('Error al mejorar la narrativa con IA.');
      }
    });
  }

  private buildNarrative(): Narrative {
    const authorId = localStorage.getItem('currentAuthorId') || 'aaaaaaaa-0000-0000-0000-000000000001';
    return {
      id: this.currentId,
      titulo: this.title,
      contenido: this.content,
      regionCultural: this.region,
      tipoRelato: this.tipoRelato,
      autor: { id: authorId },
      status: this.status
    };
  }

  saveDraft() {
    if (this.isSaving) return;
    
    const narrative = this.buildNarrative();
    this.isSaving = true;
    this.lastSavedMsg = 'Guardando...';
    
    const obs = this.currentId ? this.saveUseCase.execute(narrative) : this.createUseCase.execute(narrative);
    
    obs.subscribe({
      next: (saved) => {
        this.currentId = saved.id;
        this.isSaving = false;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        this.lastSavedMsg = `Guardado a las ${time}`;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error saving narrative:', err);
        this.isSaving = false;
        this.lastSavedMsg = 'Error al guardar';
        this.cdr.detectChanges();
      }
    });
  }

  submitToTeacher() {
    this.status = 'ready_for_review';
    this.saveDraft();
  }
}

