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
<nav class="sticky top-0 z-50 flex justify-between items-center px-10 py-4 w-full bg-sidebar/95 backdrop-blur-2xl border-b border-outline-variant/30 shadow-sm">
  <div class="flex items-center gap-10">
    <div class="flex items-center gap-3 group cursor-pointer" (click)="goTo('/panel-del-estudiante')">
      <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform duration-300">
        <span class="material-symbols-outlined text-xl font-bold">menu_book</span>
      </div>
      <span class="text-2xl font-serif font-bold text-primary tracking-tight">CulturaStory</span>
    </div>
    
    <div class="hidden md:flex gap-8">
      <a (click)="goTo('/panel-del-estudiante')" class="text-primary font-bold text-xs uppercase tracking-widest hover:opacity-70 transition-all cursor-pointer">Panel Principal</a>
      <a class="text-on-surface-variant font-bold text-xs uppercase tracking-widest hover:text-primary transition-all cursor-pointer opacity-40">Regiones</a>
      <a (click)="goTo('/biblioteca')" class="text-on-surface-variant font-bold text-xs uppercase tracking-widest hover:text-primary transition-all cursor-pointer opacity-40">Biblioteca</a>
    </div>
  </div>

  <div class="flex items-center gap-6">
    <button class="w-10 h-10 rounded-xl hover:bg-primary/5 transition-all text-primary border border-primary/10 flex items-center justify-center">
      <span class="material-symbols-outlined text-xl">notifications</span>
    </button>
    <div class="w-11 h-11 rounded-full border border-outline-variant shadow-lg overflow-hidden cursor-pointer" (click)="goTo('/perfil-creativo-estudiante')">
      <img *ngIf="userAvatar" [src]="userAvatar" class="w-full h-full object-cover">
      <span *ngIf="!userAvatar" class="material-symbols-outlined text-primary text-2xl flex items-center justify-center h-full">person</span>
    </div>
  </div>
</nav>

<main class="max-w-[1400px] mx-auto px-10 py-10">
  <!-- Editor Header -->
  <header class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 animate-slide-up">
    <div class="space-y-3">
      <button (click)="goTo('/panel-del-estudiante')" class="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all group">
        <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Volver al Panel
      </button>
      <h2 class="text-4xl font-serif font-bold text-primary leading-tight tracking-tight">Mi Escritorio <span class="italic text-primary-light">Creativo</span></h2>
      <p class="text-on-surface-variant text-sm font-medium">Donde las leyendas cobran vida a través de tu pluma.</p>
    </div>

    <div class="flex items-center gap-6">
       <div class="bg-surface border border-outline-variant/50 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-6">
          <div class="flex flex-col">
            <span class="text-[9px] font-bold uppercase tracking-widest text-primary/60 mb-1">Estado de Obra</span>
            <span class="text-sm font-bold text-primary flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
              En Construcción
            </span>
          </div>
          <div class="w-px h-8 bg-outline-variant/30"></div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-lg font-bold">draw</span>
            </div>
            <span class="text-xs font-bold text-primary">Sesión Iniciada</span>
          </div>
       </div>
    </div>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
    <!-- Writing Area -->
    <div class="lg:col-span-8 space-y-8 animate-slide-up" style="animation-delay: 0.1s">
      <div class="premium-card !p-0 overflow-hidden shadow-lg border border-outline-variant/30 !bg-surface">
        <!-- Toolbar -->
        <div class="bg-secondary/40 px-8 py-5 border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="flex bg-surface rounded-xl shadow-sm p-1 border border-outline-variant/30">
               <button class="p-3 rounded-lg hover:bg-primary/5 text-primary transition-all font-bold text-sm">B</button>
               <button class="p-3 rounded-lg hover:bg-primary/5 text-primary transition-all italic font-serif text-sm">I</button>
            </div>
            <button (click)="improveWithAI()" [disabled]="isSaving || !content.trim()" 
                    class="btn-premium !py-3 !px-6 shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50 !text-xs">
              <span class="material-symbols-outlined text-lg">magic_button</span>
              IA: Perfeccionar Relato
            </button>
          </div>
          
          <div class="flex items-center gap-4">
             <span class="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/60 bg-white px-3 py-1.5 rounded-full border border-outline-variant/30">
               <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
               Escritura en vivo
             </span>
          </div>
        </div>

        <!-- Inputs -->
        <div class="p-10 space-y-8 bg-white paper-texture">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2">
              <label class="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/60 ml-1">Título de la Narrativa</label>
              <input [(ngModel)]="title" placeholder="Nombra tu creación..." 
                     class="w-full text-2xl font-serif font-bold bg-transparent border-0 border-b border-outline-variant/50 focus:border-primary transition-all outline-none pb-2 placeholder:text-on-surface-variant/20 text-primary">
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/60 ml-1">Inspiración Regional</label>
              <select [(ngModel)]="region" class="w-full p-4 rounded-xl bg-secondary/10 border border-outline-variant/50 font-bold text-sm text-on-surface-variant outline-none focus:border-primary transition-all cursor-pointer appearance-none shadow-sm">
                <option value="andina">Tradición Andina</option>
                <option value="amazónica">Misterio Amazónico</option>
                <option value="afroperuana">Ritmo Afroperuano</option>
                <option value="costeña">Relato de la Costa</option>
              </select>
            </div>
          </div>

          <div class="relative pt-6">
            <textarea [(ngModel)]="content" placeholder="Había una vez, entre las sombras de los cerros..."
                      class="w-full min-h-[500px] text-lg leading-relaxed font-medium bg-transparent border-0 focus:ring-0 outline-none placeholder:text-on-surface-variant/20 text-on-surface-variant resize-none"
                      (ngModelChange)="onContentChange()"></textarea>
          </div>
        </div>
      </div>
      
      <!-- Auto-save Indicator -->
      <div class="flex justify-between items-center px-4">
        <span class="text-xs font-black uppercase tracking-widest text-outline flex items-center gap-3">
          <span class="material-symbols-outlined text-sm font-black">cloud_done</span>
          {{ lastSavedMsg || 'Listo para guardar' }}
        </span>
        <span class="text-xs font-black uppercase tracking-widest text-outline">
          Shift + Enter para nueva línea
        </span>
      </div>
    </div>

    <!-- Author's Resource Sidebar -->
    <div class="lg:col-span-4 space-y-10 animate-slide-up" style="animation-delay: 0.2s">
      <div class="premium-card p-8 space-y-10 border-t-4 border-t-primary shadow-lg !bg-surface">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <span class="material-symbols-outlined text-2xl font-bold">inventory_2</span>
          </div>
          <h3 class="text-xl font-serif font-bold text-primary tracking-tight">Baúl del Autor</h3>
        </div>

        <!-- Metrics -->
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-secondary/30 p-6 rounded-2xl border border-outline-variant/30 shadow-inner group hover:border-primary transition-all">
            <span class="block text-[9px] font-bold uppercase tracking-widest text-primary/60 mb-2 group-hover:text-primary transition-colors">Palabras</span>
            <span class="text-3xl font-serif font-bold text-primary">{{ content.trim() ? content.trim().split(/\s+/).length : 0 }}</span>
          </div>
          <div class="bg-secondary/30 p-6 rounded-2xl border border-outline-variant/30 shadow-inner group hover:border-primary transition-all">
            <span class="block text-[9px] font-bold uppercase tracking-widest text-primary/60 mb-2 group-hover:text-primary transition-colors">Lectura</span>
            <span class="text-3xl font-serif font-bold text-primary">~{{ content.trim() ? Math.ceil(content.trim().split(/\s+/).length / 200) : 0 }} <span class="text-[10px] uppercase tracking-widest">min</span></span>
          </div>
        </div>

        <!-- Inspiration -->
        <div class="space-y-6 pt-6">
          <div class="flex items-center gap-4 text-xl font-black text-primary">
            <span class="material-symbols-outlined text-secondary text-2xl font-black">lightbulb</span>
            Inspiración Regional
          </div>
          <div class="space-y-5">
            <div *ngIf="region === 'andina'" class="text-lg bg-secondary/5 p-8 rounded-3xl border-l-8 border-secondary italic leading-relaxed text-on-surface-variant font-medium shadow-sm">"Menciona los Apus o guardianes de los cerros para dar más fuerza a tu relato."</div>
            <div *ngIf="region === 'amazónica'" class="text-lg bg-secondary/5 p-8 rounded-3xl border-l-8 border-secondary italic leading-relaxed text-on-surface-variant font-medium shadow-sm">"El sonido de la lluvia y los misterios del río pueden ser protagonistas de tu historia."</div>
            <div *ngIf="region === 'afroperuana'" class="text-lg bg-secondary/5 p-8 rounded-3xl border-l-8 border-secondary italic leading-relaxed text-on-surface-variant font-medium shadow-sm">"Integra el ritmo del cajón o historias de la costa sur para enriquecer la narrativa."</div>
            <div *ngIf="region === 'costeña'" class="text-lg bg-secondary/5 p-8 rounded-3xl border-l-8 border-secondary italic leading-relaxed text-on-surface-variant font-medium shadow-sm">"Los valles y las huacas olvidadas son excelentes escenarios para un relato costero."</div>
          </div>
        </div>

        <!-- Vocabulary -->
        <div class="space-y-6 pt-6">
          <div class="flex items-center gap-4 text-xl font-black text-primary">
            <span class="material-symbols-outlined text-secondary text-2xl font-black">translate</span>
            Vocabulario Clave
          </div>
          <div class="flex flex-wrap gap-3">
            <span *ngFor="let word of ['Ancestro', 'Memoria', 'Identidad', 'Raíces', 'Legado']" 
                  class="px-6 py-3 bg-white text-xs font-black rounded-xl text-primary border-2 border-primary/10 hover:bg-primary hover:text-white transition-all cursor-default shadow-sm uppercase tracking-widest">
              {{ word }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Card -->
      <div class="bg-primary p-10 rounded-2xl text-white shadow-xl relative overflow-hidden group">
        <div class="absolute -right-16 -bottom-16 opacity-10 group-hover:scale-125 transition-transform duration-1000">
          <span class="material-symbols-outlined text-[200px] font-bold">rocket_launch</span>
        </div>
        <div class="relative z-10 space-y-6">
          <h4 class="font-serif font-bold text-2xl leading-tight">¿Tu obra está <span class="italic text-secondary">lista</span>?</h4>
          <p class="text-sm opacity-80 leading-relaxed font-medium">Una vez enviada, tu docente podrá leerla y ayudarte a pulir los detalles finales de tu legado.</p>
          <button (click)="submitToTeacher()" [disabled]="isSaving || !currentId || !content.trim()" 
                  class="w-full py-4 bg-secondary text-primary rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white transition-all shadow-lg active:scale-95 disabled:opacity-50">
            <span>Enviar a Revisión</span>
            <span class="material-symbols-outlined text-2xl">send</span>
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

