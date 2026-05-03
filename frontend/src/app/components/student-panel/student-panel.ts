import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ListNarrativesUseCase } from '../../core/application/narratives/narrative-use-cases';
import { AUTH_PORT } from '../../core/application/auth/auth-use-cases';
import { Narrative } from '../../core/domain/models/narrative.model';
import { AnalyzeVocationUseCase } from '../../core/application/vocation/analyze-vocation.use-case';
import { VocationPrediction } from '../../core/domain/models/vocation.model';

@Component({
  selector: 'app-student-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
<!-- Thread Scroll Guide -->
<div class="thread-scroll hidden md:block"></div>

<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-6 bg-sidebar h-screen w-64 z-50 shadow-sidebar">
  <div class="mb-10 px-2">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg rotate-3 group hover:rotate-0 transition-transform duration-500">
        <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
      </div>
      <div>
        <h1 class="text-xl font-headline font-bold text-white tracking-tight">CulturaStory</h1>
        <span class="text-[10px] uppercase tracking-widest text-white/40 font-bold">Portal Estudiantil</span>
      </div>
    </div>
  </div>

  <nav class="flex-1 space-y-2 text-sm font-medium">
    <a (click)="setActiveTab('inicio')" 
       [class.active]="activeTab === 'inicio'" 
       class="sidebar-link">
      <span class="material-symbols-outlined">dashboard</span>
      <span>Inicio</span>
    </a>
    <a (click)="setActiveTab('historias')" 
       [class.active]="activeTab === 'historias'" 
       class="sidebar-link">
      <span class="material-symbols-outlined">auto_stories</span>
      <span>Mis Historias</span>
    </a>
  </nav>

  <div class="pt-6 mt-6 border-t border-white/5 space-y-3">
    <button (click)="createNew()" class="w-full btn-premium py-4 shadow-xl">
      <span class="material-symbols-outlined">add</span>
      <span>Nueva Narrativa</span>
    </button>
    <button (click)="logout()" class="w-full flex items-center gap-3 text-white/40 px-4 py-3 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold cursor-pointer border-0 bg-transparent">
      <span class="material-symbols-outlined">logout</span>
      <span>Cerrar Sesión</span>
    </button>
  </div>
</aside>

<!-- Main Content Canvas -->
<main class="md:ml-64 relative min-h-screen bg-background">
  <!-- Sticky Top Header -->
  <header class="sticky top-0 z-40 bg-background/80 backdrop-blur-xl px-8 py-6 lg:px-12 flex justify-between items-center border-b border-outline-variant/10">
    <div class="flex flex-col">
      <h2 *ngIf="activeTab === 'inicio'" class="text-primary text-3xl lg:text-4xl font-headline italic font-bold tracking-tight animate-slide-up">
        ¡Hola, <span class="text-secondary-dark not-italic">{{ userName }}</span>!
      </h2>
      <h2 *ngIf="activeTab === 'historias'" class="text-on-surface text-3xl lg:text-4xl font-headline font-bold tracking-tight animate-slide-up">
        Mis Historias
      </h2>
    </div>
    
    <div class="flex items-center gap-6">
      <button (click)="editProfile()" class="hidden sm:flex text-sm font-bold text-primary hover:bg-primary/5 px-6 py-2.5 rounded-full transition-all border border-primary/20 items-center gap-2">
        <span class="material-symbols-outlined text-sm">edit</span> Editar Perfil
      </button>
      <div class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-primary/20 cursor-pointer hover:border-primary hover:scale-105 transition-all ring-4 ring-primary/5" (click)="editProfile()">
        <img *ngIf="userAvatar" [src]="userAvatar" class="w-full h-full object-cover" alt="User Avatar">
        <span *ngIf="!userAvatar" class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">person</span>
      </div>
    </div>
  </header>

  <div class="px-8 lg:px-12 py-10">
    <!-- Personalized Greeting Section -->
    <div *ngIf="activeTab === 'inicio'" class="mb-12 max-w-4xl animate-slide-up" style="animation-delay: 0.1s">
      <p class="text-on-surface-variant text-xl lg:text-2xl max-w-2xl leading-relaxed font-medium">
          Tu hilo narrativo está listo para continuar. Hoy es un gran día para crear nuevas historias sobre tus raíces.
      </p>
    </div>

    <!-- Main Bento Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <!-- Primary Action & Status Summary -->
      <div *ngIf="activeTab === 'inicio'" class="lg:col-span-4 space-y-10">
        <button (click)="createNew()" class="w-full group relative overflow-hidden aspect-[4/3] rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl active:scale-95 border-0">
          <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-secondary-dark transition-transform duration-700 group-hover:scale-110"></div>
          <div class="absolute inset-0 opacity-10 textile-pattern mix-blend-overlay"></div>
          <div class="relative z-10 bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <span class="material-symbols-outlined text-5xl text-white" style="font-variation-settings: 'FILL' 1;">add</span>
          </div>
          <span class="relative z-10 text-2xl font-headline font-bold text-white drop-shadow-lg tracking-wide">Crear Nueva Historia</span>
          <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </button>

        <div class="premium-card p-8 relative overflow-hidden group">
          <div class="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
          <h3 class="text-secondary-dark font-headline font-bold text-xl mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined">auto_awesome</span>
            Sabiduría Cultural
          </h3>
          <p class="text-base text-on-surface-variant italic mb-0 leading-relaxed">
            "Preservar nuestra cultura es asegurar el camino de los que vendrán."
          </p>
        </div>

        <!-- Vocational Prediction Card -->
        <div *ngIf="vocationPrediction" class="premium-card p-8 border-l-4 border-l-accent animate-slide-up" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-primary font-headline font-bold text-xl flex items-center gap-2">
              <span class="material-symbols-outlined text-accent" style="font-variation-settings: 'FILL' 1;">psychology</span>
              Pasión Detectada
            </h3>
            <span class="bg-accent/10 text-accent text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">AI Insight</span>
          </div>
          
          <div class="space-y-4 relative z-10">
            <div class="text-3xl font-headline font-bold text-secondary-dark">{{ vocationPrediction.passion }}</div>
            <p class="text-sm text-on-surface-variant leading-relaxed">{{ vocationPrediction.description }}</p>
            
            <div class="pt-4">
              <div class="text-[10px] font-black uppercase tracking-widest text-outline mb-3">Caminos sugeridos</div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let career of vocationPrediction.suggested_careers" 
                      class="px-4 py-2 bg-primary/5 text-xs font-bold rounded-xl border border-primary/10 text-primary hover:bg-primary hover:text-white transition-colors cursor-default">
                  {{ career }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Narrative Cards List -->
      <div id="stories-section" [class.lg:col-span-8]="activeTab === 'inicio'" [class.lg:col-span-12]="activeTab === 'historias'" class="space-y-8">
        <div class="flex justify-between items-end mb-6">
          <div>
            <h3 class="text-3xl font-headline font-bold text-on-surface">Mis historias creadas</h3>
            <p class="text-on-surface-variant text-sm mt-1">Tu legado digital está creciendo.</p>
          </div>
          <div class="flex items-center gap-6">
            <button (click)="loadNarratives()" class="p-3 rounded-xl hover:bg-primary/5 text-primary transition-all active:rotate-180 duration-500 border border-primary/10" title="Sincronizar">
              <span class="material-symbols-outlined text-2xl">sync</span>
            </button>
            <div class="flex flex-col items-end">
              <span class="text-2xl font-headline font-bold text-primary">{{ narratives.length }}</span>
              <span class="text-[10px] uppercase font-bold tracking-widest text-outline">Total</span>
            </div>
          </div>
        </div>

        <div *ngIf="!isLoading; else loadingTpl">
          <div *ngFor="let nar of (activeTab === 'inicio' ? narratives.slice(0, 3) : narratives)" 
               class="premium-card p-8 flex flex-col md:flex-row gap-8 items-start mb-6 border-l-8 border-l-secondary shadow-sm hover:translate-x-1">
            <div class="flex-1 w-full">
              <div class="flex justify-between items-start mb-4">
                <h4 class="text-2xl font-headline font-bold text-primary group-hover:text-secondary-dark transition-colors">{{ nar.titulo }}</h4>
                <span class="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/10">
                  {{ getNarrativeStatusLabel(nar) }}
                </span>
              </div>
              
              <div class="flex gap-6 text-xs font-bold text-on-surface-variant mb-6">
                <span class="flex items-center gap-2 bg-background px-3 py-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-sm text-secondary">location_on</span> {{ nar.regionCultural }}
                </span>
                <span class="flex items-center gap-2 bg-background px-3 py-1.5 rounded-lg">
                  <span class="material-symbols-outlined text-sm text-secondary">history_edu</span> {{ nar.tipoRelato || 'Cuento' }}
                </span>
              </div>

              <p class="text-base text-on-surface-variant mb-8 line-clamp-3 leading-relaxed">{{ nar.contenido }}</p>
              
              <div class="flex gap-4">
                <button class="flex-1 md:flex-none btn-secondary py-3 px-8">
                  <span class="material-symbols-outlined text-lg">visibility</span> Ver
                </button>
                <button (click)="editNarrative(nar)" class="flex-1 md:flex-none btn-premium py-3 px-10">
                  <span class="material-symbols-outlined text-lg">edit</span> Continuar
                </button>
              </div>
            </div>
          </div>

          <div *ngIf="activeTab === 'inicio' && narratives.length > 3" class="flex justify-center pt-6">
            <button (click)="setActiveTab('historias')" class="group px-10 py-4 border-2 border-primary text-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-3 shadow-lg hover:shadow-primary/20">
              <span>Ver todas mis historias</span>
              <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          <!-- Empty State -->
          <div *ngIf="narratives.length === 0" class="relative p-16 text-center premium-card flex flex-col items-center justify-center border-2 border-dashed border-primary/20 hover:border-primary/40 group animate-slide-up">
              <div class="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none group-hover:scale-105 transition-transform duration-1000">
                <span class="material-symbols-outlined text-[20rem]">draw</span>
              </div>
              
              <div class="relative z-10">
                <div class="w-28 h-28 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-10 mx-auto shadow-inner border border-primary/10">
                   <span class="material-symbols-outlined text-6xl text-primary animate-bounce">history_edu</span>
                </div>
                <h4 class="text-3xl font-headline font-bold text-primary mb-6">Tu voz es el puente entre el pasado y el futuro</h4>
                <p class="text-on-surface-variant max-w-xl mb-12 text-lg leading-relaxed">
                  Cada rincón de tu comunidad guarda un secreto, una leyenda o una tradición esperando ser contada. 
                  <span class="font-bold text-secondary-dark">¿Serás tú quien la preserve para siempre?</span>
                </p>
                <button (click)="createNew()" class="btn-premium px-12 py-5 text-lg shadow-2xl shadow-primary/30">
                   <span class="material-symbols-outlined group-hover:rotate-12 transition-transform text-2xl">add_circle</span>
                   Comenzar mi Legado Cultural
                </button>
              </div>
          </div>
        </div>

        <ng-template #loadingTpl>
            <div class="p-24 text-center space-y-6">
                <div class="relative w-16 h-16 mx-auto">
                  <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div class="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p class="text-on-surface-variant font-bold text-lg">Buscando tus historias en el tiempo...</p>
            </div>
        </ng-template>
      </div>
    </div>
  </div>
</main>
  `,
  styles: `:host { display: block; }`
})
export class StudentPanel implements OnInit {
  private listNarrativesUseCase = inject(ListNarrativesUseCase);
  private authPort = inject(AUTH_PORT);
  private router = inject(Router);
  private analyzeVocationUseCase = inject(AnalyzeVocationUseCase);

  narratives: Narrative[] = [];
  isLoading = true;
  userName = 'Creador';
  userAvatar = '';
  activeTab: 'inicio' | 'historias' = 'inicio';
  vocationPrediction: VocationPrediction | null = null;
  isAnalyzing = false;

  ngOnInit() {
    this.loadUserData();
    this.loadNarratives();
  }

  loadUserData() {
    const userStr = localStorage.getItem('culturastory.currentUser');
    if (userStr) {
      try {
         const user = JSON.parse(userStr);
         // Capitalizamos la primera letra del nombre
         const rawName = user.nombreCompleto || user.nombre || 'Creador';
         this.userName = rawName.charAt(0).toUpperCase() + rawName.slice(1).split(' ')[0];
         this.userAvatar = user.fotoPerfilUrl || '';
      } catch(e) {
         console.error('Error parseando usuario local', e);
      }
    }
  }

  loadNarratives() {
    this.isLoading = true;
    const authorId = localStorage.getItem('currentAuthorId') || 'aaaaaaaa-0000-0000-0000-000000000001';
    
    this.listNarrativesUseCase.execute(authorId).subscribe({
      next: (data) => {
        this.narratives = data;
        this.isLoading = false;
        
        if (data.length > 0 && !this.vocationPrediction) {
          this.analyzeStudentVocation(data[0]);
        }
      },
      error: (err) => {
        console.error('Error cargando narrativas:', err);
        this.isLoading = false;
      }
    });
  }

  analyzeStudentVocation(narrative: Narrative) {
    if (this.isAnalyzing) return;
    this.isAnalyzing = true;
    
    this.analyzeVocationUseCase.execute(this.userName, narrative.contenido).subscribe({
      next: (response) => {
        this.vocationPrediction = response.prediction;
        this.isAnalyzing = false;
      },
      error: (err) => {
        console.error('Error al analizar vocación:', err);
        this.isAnalyzing = false;
      }
    });
  }

  getNarrativeStatusLabel(narrative: Narrative): string {
    switch (narrative.status) {
      case 'ready_for_review':
        return 'En revision';
      case 'published':
        return 'Publicada';
      case 'rejected':
        return 'Rechazada';
      case 'draft':
      default:
        return 'Borrador';
    }
  }

  createNew() {
    this.router.navigate(['/escritorio-del-autor']);
  }

  editNarrative(narrative: Narrative) {
     this.router.navigate(['/escritorio-del-autor'], { queryParams: { id: narrative.id } });
  }

  editProfile() {
    this.router.navigate(['/perfil-creativo-estudiante']);
  }

  setActiveTab(tab: 'inicio' | 'historias') {
    this.activeTab = tab;
    if (tab === 'historias') {
      this.scrollToStories();
    }
  }

  scrollToStories() {
    const element = document.getElementById('stories-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  logout() {
    this.authPort.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

