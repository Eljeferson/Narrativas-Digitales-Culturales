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
<aside class="fixed left-0 top-0 h-screen w-64 bg-[#1A120B] flex flex-col p-8 z-50 shadow-2xl border-r border-white/5">
  <div class="mb-12 flex items-center gap-4 group cursor-pointer">
    <div class="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-[#1A120B] shadow-lg shadow-secondary/20 group-hover:rotate-6 transition-transform duration-300">
      <span class="material-symbols-outlined text-2xl font-bold">auto_stories</span>
    </div>
    <div>
      <h1 class="text-xl font-headline font-bold text-[#F4EBD0] tracking-tight leading-none">CulturaStory</h1>
      <p class="text-[10px] uppercase tracking-widest text-[#F4EBD0]/40 font-black mt-1">Estudiante</p>
    </div>
  </div>

  <nav class="flex-1 flex flex-col gap-2">
    <a (click)="setActiveTab('inicio')" 
       [class.active]="activeTab === 'inicio'" 
       class="sidebar-link group">
      <span class="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">dashboard</span>
      <span class="font-bold">Inicio</span>
    </a>
    <a (click)="setActiveTab('historias')" 
       [class.active]="activeTab === 'historias'" 
       class="sidebar-link group">
      <span class="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">auto_stories</span>
      <span class="font-bold">Mis Historias</span>
    </a>
  </nav>

  <div class="mt-auto pt-8 border-t border-white/5 space-y-4">
    <button (click)="createNew()" class="w-full btn-premium">
      <span class="material-symbols-outlined">add_circle</span>
      <span>Nueva Historia</span>
    </button>
    <button (click)="logout()" class="w-full flex items-center gap-4 text-white/30 px-6 py-4 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all font-black cursor-pointer border-0 bg-transparent">
      <span class="material-symbols-outlined">logout</span>
      <span>Cerrar Sesión</span>
    </button>
  </div>
</aside>

<!-- Main Content Canvas -->
<main class="md:ml-64 relative min-h-screen bg-[#FCF9F5]">
  <!-- Sticky Top Header -->
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-xl px-12 py-8 flex justify-between items-center border-b border-outline-variant/20 shadow-sm">
    <div class="flex flex-col gap-1">
      <h2 *ngIf="activeTab === 'inicio'" class="text-primary text-4xl font-headline italic font-black tracking-tight animate-slide-up">
        ¡Hola, <span class="text-secondary-dark not-italic">{{ userName }}</span>!
      </h2>
      <h2 *ngIf="activeTab === 'historias'" class="text-on-surface text-4xl font-headline font-black tracking-tight animate-slide-up">
        Mis Historias
      </h2>
      <p class="text-on-surface-variant text-sm font-medium opacity-60">Hoy es un gran día para preservar tus raíces.</p>
    </div>
    
    <div class="flex items-center gap-8">
      <button (click)="editProfile()" class="hidden sm:flex btn-secondary !px-6 !py-3 !text-sm">
        <span class="material-symbols-outlined text-sm">edit</span> Editar Perfil
      </button>
      <div class="w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer hover:scale-110 transition-all ring-2 ring-primary/10" (click)="editProfile()">
        <img *ngIf="userAvatar" [src]="userAvatar" class="w-full h-full object-cover" alt="User Avatar">
        <span *ngIf="!userAvatar" class="material-symbols-outlined text-primary text-3xl flex items-center justify-center h-full">person</span>
      </div>
    </div>
  </header>

  <div class="px-12 py-12">
    <!-- Bento Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      <!-- Left Column: Actions & Wisdom -->
      <div *ngIf="activeTab === 'inicio'" class="lg:col-span-4 space-y-12">
        
        <!-- Create New Story Hero Card -->
        <button (click)="createNew()" class="w-full group relative overflow-hidden aspect-[4/3] rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-700 hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98] border-0 shadow-xl">
          <div class="absolute inset-0 bg-gradient-to-br from-[#823B18] via-[#5D2B12] to-[#1A120B] transition-transform duration-700 group-hover:scale-110"></div>
          <div class="absolute inset-0 opacity-10 textile-pattern mix-blend-overlay"></div>
          <div class="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-full border border-white/20 shadow-inner group-hover:rotate-12 transition-transform duration-500">
            <span class="material-symbols-outlined text-6xl text-white font-bold">add</span>
          </div>
          <h3 class="relative z-10 text-3xl font-headline font-bold text-white mt-8 drop-shadow-2xl">Crear Nueva Historia</h3>
          <p class="relative z-10 text-[#F4EBD0]/60 text-sm font-bold mt-2 uppercase tracking-widest">Inicia tu legado</p>
        </button>

        <!-- Wisdom Card -->
        <div class="premium-card p-10 relative overflow-hidden group border-l-8 border-l-secondary">
          <div class="absolute -right-8 -top-8 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors"></div>
          <div class="flex items-center gap-3 mb-6">
            <span class="material-symbols-outlined text-secondary text-2xl font-black">auto_awesome</span>
            <h3 class="text-secondary-dark font-headline font-black text-xl">Sabiduría Cultural</h3>
          </div>
          <p class="text-xl text-on-surface-variant italic font-medium leading-relaxed opacity-80">
            "Preservar nuestra cultura es asegurar el camino de los que vendrán."
          </p>
        </div>

        <!-- Vocational Card -->
        <div *ngIf="vocationPrediction" class="premium-card p-10 border-l-8 border-l-accent animate-slide-up" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-primary font-headline font-black text-2xl flex items-center gap-3">
              <span class="material-symbols-outlined text-accent text-3xl font-black">psychology</span>
              Tu Pasión
            </h3>
            <span class="bg-accent/10 text-accent text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">AI Prediction</span>
          </div>
          
          <div class="space-y-6">
            <div class="text-4xl font-headline font-black text-secondary-dark leading-tight">{{ vocationPrediction.passion }}</div>
            <p class="text-base text-on-surface-variant leading-relaxed font-medium opacity-70">{{ vocationPrediction.description }}</p>
            
            <div class="pt-6 border-t border-outline-variant/30">
              <p class="text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-4">Caminos sugeridos</p>
              <div class="flex flex-wrap gap-3">
                <span *ngFor="let career of vocationPrediction.suggested_careers" 
                      class="px-5 py-3 bg-primary/5 text-xs font-black rounded-2xl border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all cursor-default shadow-sm">
                  {{ career }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Stories List -->
      <div id="stories-section" [class.lg:col-span-8]="activeTab === 'inicio'" [class.lg:col-span-12]="activeTab === 'historias'" class="space-y-12">
        <div class="flex justify-between items-end pb-8 border-b-2 border-outline-variant/20">
          <div>
            <h3 class="text-4xl font-headline font-black text-on-surface tracking-tight">Mis historias creadas</h3>
            <p class="text-on-surface-variant font-bold text-base mt-2 opacity-60">Tu legado digital está creciendo con cada palabra.</p>
          </div>
          <div class="flex items-center gap-8">
            <button (click)="loadNarratives()" class="w-14 h-14 rounded-2xl hover:bg-primary/5 text-primary transition-all active:rotate-180 duration-500 border-2 border-primary/10 flex items-center justify-center shadow-lg bg-white" title="Sincronizar">
              <span class="material-symbols-outlined text-3xl">sync</span>
            </button>
            <div class="flex flex-col items-end">
              <span class="text-5xl font-headline font-black text-primary leading-none">{{ narratives.length }}</span>
              <span class="text-[10px] uppercase font-black tracking-widest text-outline mt-2">Historias en total</span>
            </div>
          </div>
        </div>

        <!-- Cards Container -->
        <div *ngIf="!isLoading; else loadingTpl" class="space-y-8">
          <div *ngFor="let nar of (activeTab === 'inicio' ? narratives.slice(0, 3) : narratives)" 
               class="premium-card p-10 flex flex-col md:flex-row gap-10 items-start hover:border-primary/30 group">
            <div class="flex-1 w-full">
              <div class="flex justify-between items-start mb-6">
                <h4 class="text-3xl font-headline font-black text-primary group-hover:text-secondary-dark transition-colors tracking-tight">{{ nar.titulo }}</h4>
                <span class="px-5 py-2 bg-primary/5 text-primary text-xs font-black uppercase tracking-widest rounded-2xl border border-primary/10 shadow-sm">
                  {{ getNarrativeStatusLabel(nar) }}
                </span>
              </div>
              
              <div class="flex gap-8 text-xs font-black text-on-surface-variant mb-8 uppercase tracking-widest">
                <span class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary text-xl">location_on</span> {{ nar.regionCultural }}
                </span>
                <span class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-secondary text-xl">history_edu</span> {{ nar.tipoRelato || 'Cuento' }}
                </span>
              </div>

              <p class="text-lg text-on-surface-variant mb-10 line-clamp-3 leading-relaxed font-medium opacity-80">{{ nar.contenido }}</p>
              
              <div class="flex gap-6 pt-8 border-t border-outline-variant/10">
                <button class="btn-secondary !px-10">
                  <span class="material-symbols-outlined text-xl">visibility</span> Ver
                </button>
                <button (click)="editNarrative(nar)" class="btn-premium !px-12">
                  <span class="material-symbols-outlined text-xl">edit</span> Continuar
                </button>
              </div>
            </div>
          </div>

          <div *ngIf="activeTab === 'inicio' && narratives.length > 3" class="flex justify-center pt-8">
            <button (click)="setActiveTab('historias')" class="group px-12 py-5 border-4 border-primary text-primary rounded-[2rem] font-black text-xl hover:bg-primary hover:text-white transition-all flex items-center gap-4 shadow-2xl hover:shadow-primary/30">
              <span>Ver todas mis historias</span>
              <span class="material-symbols-outlined text-2xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>

          <!-- Empty State -->
          <div *ngIf="narratives.length === 0" class="relative p-24 text-center premium-card flex flex-col items-center justify-center border-4 border-dashed border-primary/20 hover:border-primary/40 group animate-slide-up shadow-2xl">
              <div class="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none group-hover:scale-105 transition-transform duration-1000">
                <span class="material-symbols-outlined text-[30rem]">draw</span>
              </div>
              
              <div class="relative z-10">
                <div class="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mb-12 mx-auto shadow-inner border-2 border-primary/10">
                   <span class="material-symbols-outlined text-7xl text-primary animate-bounce font-black">history_edu</span>
                </div>
                <h4 class="text-4xl font-headline font-black text-primary mb-8 leading-tight">Tu voz es el puente entre el <br/>pasado y el futuro</h4>
                <p class="text-on-surface-variant max-w-2xl mb-16 text-xl leading-relaxed font-medium opacity-70">
                  Cada rincón de tu comunidad guarda un secreto, una leyenda o una tradición esperando ser contada. 
                  <span class="font-black text-secondary-dark">¿Serás tú quien la preserve para siempre?</span>
                </p>
                <button (click)="createNew()" class="btn-premium !px-16 !py-6 !text-2xl shadow-2xl shadow-primary/40">
                   <span class="material-symbols-outlined text-3xl font-black">add_circle</span>
                   Comenzar mi Legado
                </button>
              </div>
          </div>
        </div>

        <ng-template #loadingTpl>
            <div class="p-32 text-center space-y-8">
                <div class="relative w-24 h-24 mx-auto">
                  <div class="absolute inset-0 border-8 border-primary/10 rounded-full"></div>
                  <div class="absolute inset-0 border-8 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p class="text-primary font-black text-2xl animate-pulse">Buscando tus historias en el tiempo...</p>
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

