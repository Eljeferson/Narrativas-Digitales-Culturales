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
<main class="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
<!-- Header Actions -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
  <div>
    <button (click)="goTo('/panel-del-estudiante')" class="group flex items-center gap-3 px-6 py-2.5 bg-white/50 text-secondary rounded-full font-bold hover:bg-white hover:shadow-lg transition-all duration-300 mb-6 active:scale-95 border border-outline-variant/30">
      <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
      <span>Volver al Panel</span>
    </button>
    <h1 class="text-5xl font-headline font-bold text-primary tracking-tight">Mi Escritorio Creativo</h1>
    <p class="text-on-surface-variant mt-2">Donde las leyendas cobran vida a través de tu pluma.</p>
  </div>
  
  <div class="flex items-center gap-4 bg-white/30 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-sm">
    <div class="flex flex-col items-end">
      <span class="text-[10px] font-bold uppercase tracking-widest text-outline">Estado de Obra</span>
      <span class="text-sm font-bold text-secondary">{{ status === 'ready_for_review' ? 'Lista para Revisión' : 'En Construcción' }}</span>
    </div>
    <div class="w-1 h-8 bg-outline-variant/30"></div>
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-tertiary" [class.animate-spin]="isSaving">
        {{ isSaving ? 'sync' : 'auto_stories' }}
      </span>
      <span class="text-xs font-medium text-on-surface-variant">{{ lastSavedMsg || 'Sesión iniciada' }}</span>
    </div>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
  <!-- Main Editor Area -->
  <div class="lg:col-span-8 space-y-8">
    <!-- Editor Container -->
    <div class="bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/10 overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/5">
      <!-- Metadata Bar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 border-b border-surface-variant">
        <div class="space-y-3">
          <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 font-label">Título de la Narrativa</label>
          <input [(ngModel)]="title" (ngModelChange)="onContentChange()" name="title" class="w-full bg-transparent border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary transition-all text-2xl font-headline placeholder:text-outline-variant/40 py-2" placeholder="Nombra tu creación..." type="text"/>
        </div>
        <div class="space-y-3">
          <label class="block text-[10px] font-bold uppercase tracking-widest text-secondary/70 font-label">Inspiración Regional</label>
          <select [(ngModel)]="region" (ngModelChange)="onContentChange()" name="region" class="w-full bg-surface-variant/20 border-0 border-b-2 border-outline-variant/30 focus:ring-0 focus:border-primary transition-all py-3 px-4 rounded-t-lg text-on-surface font-medium">
            <option value="andina">Tradición Andina</option>
            <option value="amazónica">Misterios Amazónicos</option>
            <option value="afroperuana">Ritmo Afroperuano</option>
            <option value="costeña">Relatos de la Costa</option>
          </select>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="flex items-center justify-between px-10 py-4 bg-surface-container-low/30 border-b border-surface-variant">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 bg-white/50 rounded-lg p-1 border border-outline-variant/20">
            <button class="p-2 hover:bg-primary/10 hover:text-primary rounded transition-colors" title="Negrita"><span class="material-symbols-outlined text-lg">format_bold</span></button>
            <button class="p-2 hover:bg-primary/10 hover:text-primary rounded transition-colors" title="Cursiva"><span class="material-symbols-outlined text-lg">format_italic</span></button>
          </div>
          <button (click)="improveWithAI()" [disabled]="isGenerating || !content.trim()" class="group relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-tertiary to-secondary text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 overflow-hidden">
            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span class="material-symbols-outlined text-lg" [class.animate-spin]="isGenerating">auto_fix_high</span>
            <span class="text-xs font-bold">{{ isGenerating ? 'Inspirando...' : 'IA: Perfeccionar Relato' }}</span>
          </button>
        </div>
        <div class="hidden sm:flex items-center gap-2 text-outline text-[10px] font-bold uppercase tracking-widest">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Escritura en Vivo
        </div>
      </div>

      <!-- Text Content Area -->
      <div class="paper-texture p-12 min-h-[650px] relative">
        <div class="absolute top-8 right-8 opacity-5 pointer-events-none">
          <span class="material-symbols-outlined text-[150px] text-primary rotate-12">history_edu</span>
        </div>
        <div class="max-w-3xl mx-auto relative z-10">
          <textarea [(ngModel)]="content" (ngModelChange)="onContentChange()" name="content" class="w-full min-h-[550px] bg-transparent border-none focus:ring-0 text-xl leading-loose text-on-surface font-serif placeholder:text-outline-variant/20 resize-none" placeholder="Había una vez, entre las sombras de los cerros..."></textarea>
        </div>
      </div>
    </div>
  </div>

  <!-- Sidebar Resources Area -->
  <div class="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
    <!-- Baúl del Autor -->
    <div class="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg space-y-6">
      <div class="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
        <span class="material-symbols-outlined text-secondary">backpack</span>
        <h3 class="font-headline font-bold text-xl text-primary">Baúl del Autor</h3>
      </div>
      
      <!-- Word Counter & Stats -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/60 p-4 rounded-xl border border-outline-variant/10">
          <span class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Palabras</span>
          <span class="text-2xl font-headline font-bold text-secondary">{{ content.trim() ? content.trim().split(/\s+/).length : 0 }}</span>
        </div>
        <div class="bg-white/60 p-4 rounded-xl border border-outline-variant/10">
          <span class="block text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Lectura</span>
          <span class="text-2xl font-headline font-bold text-secondary">~{{ content.trim() ? Math.ceil(content.trim().split(/\s+/).length / 200) : 0 }} min</span>
        </div>
      </div>

      <!-- Regional Tips -->
      <div class="space-y-4 pt-4">
        <div class="flex items-center gap-2 text-sm font-bold text-primary">
          <span class="material-symbols-outlined text-sm">lightbulb</span>
          Inspiración para tu región:
        </div>
        <ul class="space-y-3">
          <li *ngIf="region === 'andina'" class="text-xs bg-white/50 p-3 rounded-lg border-l-4 border-primary italic">"Menciona los Apus o guardianes de los cerros para dar más fuerza a tu relato."</li>
          <li *ngIf="region === 'amazónica'" class="text-xs bg-white/50 p-3 rounded-lg border-l-4 border-primary italic">"El sonido de la lluvia y los misterios del río pueden ser protagonistas de tu historia."</li>
          <li *ngIf="region === 'afroperuana'" class="text-xs bg-white/50 p-3 rounded-lg border-l-4 border-primary italic">"Integra el ritmo del cajón o historias de la costa sur para enriquecer la narrativa."</li>
          <li *ngIf="region === 'costeña'" class="text-xs bg-white/50 p-3 rounded-lg border-l-4 border-primary italic">"Los valles y las huacas olvidadas son excelentes escenarios para un relato costero."</li>
        </ul>
      </div>

      <!-- Vocabulary -->
      <div class="space-y-3 pt-4">
        <div class="flex items-center gap-2 text-sm font-bold text-primary">
          <span class="material-symbols-outlined text-sm">translate</span>
          Vocabulario Sugerido:
        </div>
        <div class="flex flex-wrap gap-2">
          <span *ngFor="let word of ['Ancestro', 'Memoria', 'Identidad', 'Raíces', 'Legado']" class="px-3 py-1 bg-primary/10 text-[10px] font-bold rounded-full text-primary border border-primary/20">{{ word }}</span>
        </div>
      </div>
    </div>

    <!-- Finalize Action -->
    <div class="bg-primary p-8 rounded-2xl text-on-primary shadow-2xl shadow-primary/30 space-y-6 relative overflow-hidden group">
      <div class="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
        <span class="material-symbols-outlined text-[180px]">send</span>
      </div>
      <div class="relative z-10">
        <h4 class="font-headline font-bold text-xl mb-2">¿Tu obra está lista?</h4>
        <p class="text-sm opacity-80 mb-6">Una vez enviada, tu docente podrá leerla y ayudarte a pulir los detalles finales.</p>
        <button (click)="submitToTeacher()" [disabled]="isSaving || !currentId || !content.trim()" class="w-full py-4 bg-white text-primary rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-secondary hover:text-white transition-all shadow-lg disabled:opacity-50">
          <span>Enviar a Revisión Docente</span>
          <span class="material-symbols-outlined">rocket_launch</span>
        </button>
      </div>
    </div>
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
  Math = Math;

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

