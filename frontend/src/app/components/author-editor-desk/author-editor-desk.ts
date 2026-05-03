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
<nav class="sticky top-0 z-50 flex justify-between items-center px-8 py-4 w-full bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm">
  <div class="flex items-center gap-10">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
        <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
      </div>
      <span class="text-2xl font-headline font-bold tracking-tight text-primary italic">CulturaStory AI</span>
    </div>
    
    <div class="hidden md:flex gap-8">
      <a (click)="goTo('/panel-del-estudiante')" class="text-on-surface/60 hover:text-primary transition-all font-bold text-sm cursor-pointer border-b-2 border-transparent hover:border-primary pb-1">Narrativas</a>
      <a class="text-on-surface/60 hover:text-primary transition-all font-bold text-sm cursor-pointer border-b-2 border-transparent hover:border-primary pb-1">Regiones</a>
      <a (click)="goTo('/biblioteca')" class="text-on-surface/60 hover:text-primary transition-all font-bold text-sm cursor-pointer border-b-2 border-transparent hover:border-primary pb-1">Biblioteca</a>
    </div>
  </div>

  <div class="flex items-center gap-6">
    <button class="p-2.5 rounded-xl hover:bg-primary/5 transition-all text-primary border border-primary/5">
      <span class="material-symbols-outlined">notifications</span>
    </button>
    <button (click)="goTo('/perfil-creativo-estudiante')" class="p-2.5 rounded-xl hover:bg-primary/5 transition-all text-primary border border-primary/5">
      <span class="material-symbols-outlined">settings</span>
    </button>
    <div class="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer hover:border-primary hover:scale-110 transition-all shadow-md" (click)="goTo('/perfil-creativo-estudiante')">
      <img *ngIf="userAvatar" [src]="userAvatar" class="w-full h-full object-cover" alt="User Avatar">
      <span *ngIf="!userAvatar" class="material-symbols-outlined text-primary flex items-center justify-center h-full text-xl" style="font-variation-settings: 'FILL' 1;">person</span>
    </div>
  </div>
</nav>

<main class="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
  <!-- Header Actions -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
    <div>
      <button (click)="goTo('/panel-del-estudiante')" class="group flex items-center gap-3 px-6 py-3 bg-white text-primary rounded-2xl font-bold hover:shadow-xl transition-all duration-300 mb-8 active:scale-95 border border-primary/10 shadow-md">
        <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span>Volver al Panel</span>
      </button>
      <h1 class="text-6xl font-headline font-bold text-primary tracking-tighter leading-tight">Mi Escritorio <br/><span class="text-secondary-dark italic">Creativo</span></h1>
      <p class="text-on-surface-variant mt-4 text-lg font-medium opacity-80">Donde las leyendas cobran vida a través de tu pluma.</p>
    </div>
    
    <div class="flex items-center gap-6 bg-white/50 backdrop-blur-md p-5 rounded-3xl border border-primary/10 shadow-premium">
      <div class="flex flex-col items-end">
        <span class="text-[10px] font-black uppercase tracking-widest text-outline">Estado de Obra</span>
        <span class="text-lg font-bold text-secondary-dark">{{ status === 'ready_for_review' ? 'Lista para Revisión' : 'En Construcción' }}</span>
      </div>
      <div class="w-[2px] h-10 bg-primary/10"></div>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
          <span class="material-symbols-outlined text-primary" [class.animate-spin]="isSaving">
            {{ isSaving ? 'sync' : 'auto_stories' }}
          </span>
        </div>
        <span class="text-xs font-bold text-on-surface-variant">{{ lastSavedMsg || 'Sesión iniciada' }}</span>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <!-- Main Editor Area -->
    <div class="lg:col-span-8 space-y-10">
      <!-- Editor Container -->
      <div class="premium-card overflow-hidden !shadow-2xl">
        <!-- Metadata Bar -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 bg-white">
          <div class="space-y-4">
            <label class="block text-[10px] font-black uppercase tracking-widest text-primary/60 font-label">Título de la Narrativa</label>
            <input [(ngModel)]="title" (ngModelChange)="onContentChange()" name="title" 
                   class="w-full bg-transparent border-0 border-b-2 border-primary/10 focus:ring-0 focus:border-primary transition-all text-3xl font-headline font-bold placeholder:text-outline-variant/40 py-3" 
                   placeholder="Nombra tu creación..." type="text"/>
          </div>
          <div class="space-y-4">
            <label class="block text-[10px] font-black uppercase tracking-widest text-primary/60 font-label">Inspiración Regional</label>
            <div class="relative group">
              <select [(ngModel)]="region" (ngModelChange)="onContentChange()" name="region" 
                      class="w-full appearance-none bg-primary/5 border-0 border-b-2 border-primary/10 focus:ring-0 focus:border-primary transition-all py-4 px-6 rounded-t-2xl text-on-surface font-bold text-sm cursor-pointer group-hover:bg-primary/10">
                <option value="andina">Tradición Andina</option>
                <option value="amazónica">Misterios Amazónicos</option>
                <option value="afroperuana">Ritmo Afroperuano</option>
                <option value="costeña">Relatos de la Costa</option>
              </select>
              <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none group-hover:translate-y-[-40%] transition-transform">expand_more</span>
            </div>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="flex items-center justify-between px-10 py-5 bg-background border-y border-outline-variant/10">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-sm border border-primary/5">
              <button class="p-2.5 hover:bg-primary/10 hover:text-primary rounded-lg transition-all" title="Negrita"><span class="material-symbols-outlined text-xl">format_bold</span></button>
              <button class="p-2.5 hover:bg-primary/10 hover:text-primary rounded-lg transition-all" title="Cursiva"><span class="material-symbols-outlined text-xl">format_italic</span></button>
            </div>
            <button (click)="improveWithAI()" [disabled]="isGenerating || !content.trim()" 
                    class="group relative flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl hover:shadow-xl transition-all disabled:opacity-50 overflow-hidden active:scale-95 shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined text-xl" [class.animate-spin]="isGenerating">auto_fix_high</span>
              <span class="text-sm font-black tracking-wide">{{ isGenerating ? 'Inspirando...' : 'IA: Perfeccionar Relato' }}</span>
              <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
          <div class="hidden sm:flex items-center gap-3 text-outline text-[10px] font-black uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-primary/5 shadow-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            Escritura en Vivo
          </div>
        </div>

        <!-- Text Content Area -->
        <div class="paper-texture p-12 min-h-[700px] relative bg-white">
          <div class="absolute top-12 right-12 opacity-5 pointer-events-none">
            <span class="material-symbols-outlined text-[200px] text-primary rotate-12">history_edu</span>
          </div>
          <div class="max-w-3xl mx-auto relative z-10">
            <textarea [(ngModel)]="content" (ngModelChange)="onContentChange()" name="content" 
                      class="w-full min-h-[600px] bg-transparent border-none focus:ring-0 text-2xl leading-[2] text-on-surface font-serif placeholder:text-outline-variant/30 resize-none font-medium" 
                      placeholder="Había una vez, entre las sombras de los cerros..."></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Resources Area -->
    <div class="lg:col-span-4 space-y-10 animate-slide-up" style="animation-delay: 0.2s">
      <!-- Baúl del Autor -->
      <div class="premium-card p-10 space-y-8 bg-white">
        <div class="flex items-center gap-4 border-b border-outline-variant/10 pb-6">
          <div class="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary-dark">
            <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">backpack</span>
          </div>
          <h3 class="font-headline font-bold text-2xl text-primary">Baúl del Autor</h3>
        </div>
        
        <!-- Word Counter & Stats -->
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-background p-6 rounded-2xl border border-primary/5 shadow-inner transition-transform hover:scale-105">
            <span class="block text-[10px] font-black uppercase tracking-widest text-outline mb-2">Palabras</span>
            <span class="text-3xl font-headline font-bold text-secondary-dark">{{ content.trim() ? content.trim().split(/\s+/).length : 0 }}</span>
          </div>
          <div class="bg-background p-6 rounded-2xl border border-primary/5 shadow-inner transition-transform hover:scale-105">
            <span class="block text-[10px] font-black uppercase tracking-widest text-outline mb-2">Lectura</span>
            <span class="text-3xl font-headline font-bold text-secondary-dark">~{{ content.trim() ? Math.ceil(content.trim().split(/\s+/).length / 200) : 0 }} <span class="text-xs">min</span></span>
          </div>
        </div>

        <!-- Regional Tips -->
        <div class="space-y-5 pt-4">
          <div class="flex items-center gap-3 text-base font-bold text-primary">
            <span class="material-symbols-outlined text-xl text-secondary" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
            Inspiración Regional
          </div>
          <div class="space-y-4">
            <div *ngIf="region === 'andina'" class="text-sm bg-primary/5 p-5 rounded-2xl border-l-4 border-primary italic leading-relaxed text-on-surface-variant font-medium">"Menciona los Apus o guardianes de los cerros para dar más fuerza a tu relato."</div>
            <div *ngIf="region === 'amazónica'" class="text-sm bg-primary/5 p-5 rounded-2xl border-l-4 border-primary italic leading-relaxed text-on-surface-variant font-medium">"El sonido de la lluvia y los misterios del río pueden ser protagonistas de tu historia."</div>
            <div *ngIf="region === 'afroperuana'" class="text-sm bg-primary/5 p-5 rounded-2xl border-l-4 border-primary italic leading-relaxed text-on-surface-variant font-medium">"Integra el ritmo del cajón o historias de la costa sur para enriquecer la narrativa."</div>
            <div *ngIf="region === 'costeña'" class="text-sm bg-primary/5 p-5 rounded-2xl border-l-4 border-primary italic leading-relaxed text-on-surface-variant font-medium">"Los valles y las huacas olvidadas son excelentes escenarios para un relato costero."</div>
          </div>
        </div>

        <!-- Vocabulary -->
        <div class="space-y-5 pt-4">
          <div class="flex items-center gap-3 text-base font-bold text-primary">
            <span class="material-symbols-outlined text-xl text-secondary" style="font-variation-settings: 'FILL' 1;">translate</span>
            Vocabulario Sugerido
          </div>
          <div class="flex flex-wrap gap-3">
            <span *ngFor="let word of ['Ancestro', 'Memoria', 'Identidad', 'Raíces', 'Legado']" 
                  class="px-5 py-2.5 bg-secondary/10 text-xs font-black rounded-xl text-secondary-dark border border-secondary/20 hover:bg-secondary-dark hover:text-white transition-all cursor-default">
              {{ word }}
            </span>
          </div>
        </div>
      </div>

      <!-- Finalize Action -->
      <div class="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl shadow-primary/40 space-y-8 relative overflow-hidden group">
        <div class="absolute -right-12 -bottom-12 opacity-10 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-1000">
          <span class="material-symbols-outlined text-[220px]">send</span>
        </div>
        <div class="relative z-10">
          <h4 class="font-headline font-bold text-3xl mb-4">¿Tu obra está lista?</h4>
          <p class="text-base opacity-90 mb-10 leading-relaxed font-medium">Una vez enviada, tu docente podrá leerla y ayudarte a pulir los detalles finales de tu legado.</p>
          <button (click)="submitToTeacher()" [disabled]="isSaving || !currentId || !content.trim()" 
                  class="w-full py-5 bg-white text-primary rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:bg-secondary-dark hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50">
            <span>Enviar a Revisión</span>
            <span class="material-symbols-outlined text-2xl">rocket_launch</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</main>
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

