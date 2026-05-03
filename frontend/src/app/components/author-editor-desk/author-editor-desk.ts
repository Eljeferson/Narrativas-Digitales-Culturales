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
<nav class="sticky top-0 z-50 flex justify-between items-center px-12 py-6 w-full bg-white/90 backdrop-blur-2xl border-b-2 border-outline-variant/30 shadow-sm">
  <div class="flex items-center gap-12">
    <div class="flex items-center gap-4 group cursor-pointer" (click)="goTo('/panel-del-estudiante')">
      <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform">
        <span class="material-symbols-outlined text-2xl font-bold">auto_stories</span>
      </div>
      <span class="text-3xl font-headline font-black tracking-tighter text-primary italic">CulturaStory AI</span>
    </div>
    
    <div class="hidden md:flex gap-10">
      <a (click)="goTo('/panel-del-estudiante')" class="text-on-surface-variant font-black text-sm uppercase tracking-widest hover:text-primary transition-all cursor-pointer">Narrativas</a>
      <a class="text-on-surface-variant font-black text-sm uppercase tracking-widest hover:text-primary transition-all cursor-pointer opacity-40">Regiones</a>
      <a (click)="goTo('/biblioteca')" class="text-on-surface-variant font-black text-sm uppercase tracking-widest hover:text-primary transition-all cursor-pointer opacity-40">Biblioteca</a>
    </div>
  </div>

  <div class="flex items-center gap-8">
    <button class="w-12 h-12 rounded-2xl hover:bg-primary/5 transition-all text-primary border-2 border-primary/10 flex items-center justify-center">
      <span class="material-symbols-outlined text-2xl">notifications</span>
    </button>
    <div class="w-14 h-14 rounded-full border-4 border-white shadow-2xl ring-2 ring-primary/5 overflow-hidden">
      <img *ngIf="userAvatar" [src]="userAvatar" class="w-full h-full object-cover">
      <span *ngIf="!userAvatar" class="material-symbols-outlined text-primary text-3xl flex items-center justify-center h-full">person</span>
    </div>
  </div>
</nav>

<main class="max-w-[1600px] mx-auto px-12 py-12">
  <!-- Editor Header -->
  <header class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 animate-slide-up">
    <div class="space-y-4">
      <button (click)="goTo('/panel-del-estudiante')" class="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] hover:gap-5 transition-all group">
        <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Volver al Panel
      </button>
      <h2 class="text-6xl font-headline font-black text-primary leading-none tracking-tight">Mi Escritorio <br/> <span class="text-secondary-dark italic">Creativo</span></h2>
      <p class="text-on-surface-variant text-xl font-medium opacity-60">Donde las leyendas cobran vida a través de tu pluma.</p>
    </div>

    <div class="flex flex-col items-end gap-4">
       <div class="bg-white border-2 border-outline-variant/30 rounded-3xl p-6 shadow-xl flex items-center gap-8">
          <div class="flex flex-col">
            <span class="text-[10px] font-black uppercase tracking-widest text-outline mb-1">Estado de Obra</span>
            <span class="text-lg font-black text-primary flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              En Construcción
            </span>
          </div>
          <div class="w-px h-10 bg-outline-variant/30"></div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-secondary text-2xl font-black">draw</span>
            </div>
            <span class="text-sm font-black text-on-surface-variant">Sesión Iniciada</span>
          </div>
       </div>
    </div>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
    <!-- Writing Area -->
    <div class="lg:col-span-8 space-y-10 animate-slide-up" style="animation-delay: 0.1s">
      <div class="premium-card !p-0 overflow-hidden shadow-2xl border-2 border-outline-variant/20">
        <!-- Toolbar -->
        <div class="bg-[#F8F5F1] px-10 py-8 border-b-2 border-outline-variant/30 flex flex-wrap items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="flex bg-white rounded-2xl shadow-sm p-1.5 border border-outline-variant/30">
               <button class="p-4 rounded-xl hover:bg-primary/5 text-primary transition-all font-black">B</button>
               <button class="p-4 rounded-xl hover:bg-primary/5 text-primary transition-all italic font-serif">I</button>
            </div>
            <button (click)="improveWithAI()" [disabled]="isSaving || !content.trim()" 
                    class="btn-premium !py-4 !px-8 shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50">
              <span class="material-symbols-outlined font-black">magic_button</span>
              IA: Perfeccionar Relato
            </button>
          </div>
          
          <div class="flex items-center gap-4">
             <span class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 bg-white px-4 py-2 rounded-full border border-outline-variant/30">
               <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
               Escritura en vivo
             </span>
          </div>
        </div>

        <!-- Inputs -->
        <div class="p-12 space-y-10 bg-white paper-texture">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-outline ml-1">Título de la Narrativa</label>
              <input [(ngModel)]="title" placeholder="Nombra tu creación..." 
                     class="w-full text-4xl font-headline font-black bg-transparent border-0 border-b-4 border-outline-variant/20 focus:border-secondary transition-all outline-none pb-4 placeholder:opacity-20 text-primary">
            </div>
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-outline ml-1">Inspiración Regional</label>
              <select [(ngModel)]="region" class="w-full p-6 rounded-2xl bg-[#F8F5F1] border-2 border-outline-variant/20 font-black text-on-surface-variant outline-none focus:border-primary transition-all cursor-pointer appearance-none shadow-sm">
                <option value="andina">Tradición Andina</option>
                <option value="amazónica">Misterio Amazónico</option>
                <option value="afroperuana">Ritmo Afroperuano</option>
                <option value="costeña">Relato de la Costa</option>
              </select>
            </div>
          </div>

          <div class="relative pt-8">
            <div class="absolute -left-6 top-8 w-1 h-full bg-secondary/10 rounded-full"></div>
            <textarea [(ngModel)]="content" placeholder="Había una vez, entre las sombras de los cerros..."
                      class="w-full min-h-[600px] text-2xl leading-relaxed font-medium bg-transparent border-0 focus:ring-0 outline-none placeholder:opacity-20 text-on-surface-variant resize-none"
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
    <div class="lg:col-span-4 space-y-12 animate-slide-up" style="animation-delay: 0.2s">
      <div class="premium-card p-10 space-y-12 border-t-8 border-t-primary shadow-2xl">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border-2 border-primary/10">
            <span class="material-symbols-outlined text-3xl font-black">inventory_2</span>
          </div>
          <h3 class="text-3xl font-headline font-black text-primary tracking-tight">Baúl del Autor</h3>
        </div>

        <!-- Metrics -->
        <div class="grid grid-cols-2 gap-8">
          <div class="bg-[#F8F5F1] p-8 rounded-3xl border-2 border-outline-variant/20 shadow-inner group hover:border-secondary transition-all">
            <span class="block text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-4 group-hover:text-secondary transition-colors">Palabras</span>
            <span class="text-5xl font-headline font-black text-primary">{{ content.trim() ? content.trim().split(/\s+/).length : 0 }}</span>
          </div>
          <div class="bg-[#F8F5F1] p-8 rounded-3xl border-2 border-outline-variant/20 shadow-inner group hover:border-secondary transition-all">
            <span class="block text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-4 group-hover:text-secondary transition-colors">Lectura</span>
            <span class="text-5xl font-headline font-black text-primary">~{{ content.trim() ? Math.ceil(content.trim().split(/\s+/).length / 200) : 0 }} <span class="text-xs uppercase tracking-widest">min</span></span>
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
      <div class="bg-[#1A120B] p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border-2 border-white/5">
        <div class="absolute -right-20 -bottom-20 opacity-5 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-1000">
          <span class="material-symbols-outlined text-[300px] font-black">rocket_launch</span>
        </div>
        <div class="relative z-10 space-y-8">
          <h4 class="font-headline font-black text-4xl leading-tight">¿Tu obra está <br/> <span class="text-secondary italic">lista</span>?</h4>
          <p class="text-lg opacity-60 leading-relaxed font-medium">Una vez enviada, tu docente podrá leerla y ayudarte a pulir los detalles finales de tu legado.</p>
          <button (click)="submitToTeacher()" [disabled]="isSaving || !currentId || !content.trim()" 
                  class="w-full py-6 bg-secondary text-[#1A120B] rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-white hover:text-primary transition-all shadow-2xl active:scale-95 disabled:opacity-50">
            <span>Enviar a Revisión</span>
            <span class="material-symbols-outlined text-3xl font-black">send</span>
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

