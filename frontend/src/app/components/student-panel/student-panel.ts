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

<!-- Decorative Background Elements -->
<div class="fixed top-0 right-0 w-96 h-96 bg-secondary/30 rotate-45 translate-x-32 -translate-y-32 pointer-events-none z-0"></div>


<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col p-6 z-50 border-r border-outline-variant/30">
  <div class="mb-10 flex flex-col gap-1 group cursor-pointer">
    <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform duration-300">
            <span class="material-symbols-outlined text-lg font-bold">menu_book</span>
        </div>
        <h1 class="text-lg font-serif font-bold text-primary tracking-tight leading-none">El Telar</h1>
    </div>
    <p class="text-[10px] uppercase tracking-widest text-on-sidebar font-bold ml-11">Portal del Estudiante</p>
  </div>

  <nav class="flex-1 flex flex-col gap-0.5">
    <a (click)="setActiveTab('inicio')" 
       [class.active]="activeTab === 'inicio'" 
       class="sidebar-link group !py-3 !px-4">
      <span class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">dashboard</span>
      <span class="font-bold text-sm">Panel Principal</span>
    </a>
    <a (click)="setActiveTab('historias')" 
       [class.active]="activeTab === 'historias'" 
       class="sidebar-link group !py-3 !px-4">
      <span class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">auto_stories</span>
      <span class="font-bold text-sm">Mis Historias</span>
    </a>
    <a class="sidebar-link group opacity-50 !py-3 !px-4">
      <span class="material-symbols-outlined text-xl">school</span>
      <span class="font-bold text-sm">Aula Virtual</span>
    </a>
    <a class="sidebar-link group opacity-50 !py-3 !px-4">
      <span class="material-symbols-outlined text-xl">map</span>
      <span class="font-bold text-sm">Mapa Cultural</span>
    </a>
    <a class="sidebar-link group opacity-50 !py-3 !px-4">
      <span class="material-symbols-outlined text-xl">analytics</span>
      <span class="font-bold text-sm">Estadísticas</span>
    </a>
  </nav>

  <div class="mt-auto pt-6 space-y-2">
    <button (click)="createNew()" class="w-full btn-premium !py-2.5 !text-xs">
      <span class="material-symbols-outlined text-base">add</span>
      <span>+ Nueva Narrativa</span>
    </button>
    <button class="w-full flex items-center gap-3 text-on-sidebar px-4 py-2 hover:text-primary hover:bg-primary/5 rounded-xl transition-all font-bold cursor-pointer border-0 bg-transparent text-xs">
      <span class="material-symbols-outlined text-lg">help</span>
      <span>Soporte</span>
    </button>
    <button (click)="logout()" class="w-full flex items-center gap-3 text-on-sidebar px-4 py-2 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold cursor-pointer border-0 bg-transparent text-xs">
      <span class="material-symbols-outlined text-lg">logout</span>
      <span>Cerrar Sesión</span>
    </button>
  </div>
</aside>

<!-- Main Content Canvas -->
<main class="md:ml-64 relative min-h-screen bg-background z-10">
  <!-- Sticky Top Header -->
  <header class="sticky top-0 z-40 bg-background/80 backdrop-blur-xl px-10 py-2 flex justify-between items-center border-b border-outline-variant/10">
    <div class="flex flex-col gap-1">
      <h2 *ngIf="activeTab === 'inicio'" class="text-primary text-4xl font-serif italic font-bold tracking-tight animate-slide-up">
        ¡Hola, <span class="text-primary not-italic">{{ userName }}!</span>
      </h2>
      <h2 *ngIf="activeTab === 'historias'" class="text-primary text-4xl font-serif font-bold tracking-tight animate-slide-up">
        Mis Historias
      </h2>
      <p class="text-on-surface-variant text-sm font-medium max-w-2xl">
        Tu hilo narrativo fluye desde la <span class="text-accent font-bold">región Amazónica</span>. Hoy es un buen día para tejer historias.
      </p>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="w-11 h-11 rounded-full overflow-hidden border border-outline-variant shadow-lg cursor-pointer hover:scale-105 transition-all" (click)="editProfile()">
        <img *ngIf="userAvatar" [src]="userAvatar" class="w-full h-full object-cover" alt="User Avatar">
        <span *ngIf="!userAvatar" class="material-symbols-outlined text-primary text-2xl flex items-center justify-center h-full">person</span>
      </div>
    </div>
  </header>

  <div class="px-8 py-3">
    <!-- Bento Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Left Column: Actions & Wisdom -->
      <div *ngIf="activeTab === 'inicio'" class="lg:col-span-4 space-y-4">
        
        <!-- Compact Create New Story -->
        <button (click)="createNew()" class="w-full btn-premium !py-3 !text-sm shadow-md">
            <span class="material-symbols-outlined text-xl">add_circle</span>
            <span>Nueva Narrativa</span>
        </button>

        <!-- Minimal Wisdom Card -->
        <div class="bg-secondary/20 p-4 rounded-xl border border-outline-variant/30 flex items-center gap-4">
           <span class="material-symbols-outlined text-accent text-2xl">water_drop</span>
           <p class="text-[11px] text-on-surface-variant italic font-medium leading-tight opacity-90">
             "El río no solo lleva agua, lleva los susurros de los abuelos."
           </p>
        </div>

        <!-- Super Compact Vocational Card -->
        <div *ngIf="vocationPrediction" class="premium-card p-5 border-l-4 border-l-accent animate-slide-up" style="animation-delay: 0.3s">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-accent text-xl font-black">psychology</span>
              <h3 class="text-primary font-headline font-black text-lg">Tu Pasión</h3>
            </div>
            <span class="text-[9px] font-black text-accent border border-accent/20 px-2 py-0.5 rounded uppercase">IA</span>
          </div>
          
          <div class="space-y-3">
            <div class="text-xl font-headline font-black text-secondary-dark leading-tight">{{ vocationPrediction.passion }}</div>
            
            <div class="p-3 bg-primary/5 rounded-xl border border-primary/10 shadow-sm">
              <div class="flex justify-between items-baseline mb-1">
                <p class="text-[8px] font-black uppercase tracking-widest text-primary">Profesión Sugerida</p>
                <p class="text-sm font-black text-secondary-dark">{{ getTopCareer() }}</p>
              </div>
              <p class="text-[10px] text-on-surface-variant leading-tight font-medium italic opacity-80">{{ vocationPrediction.description }}</p>
            </div>

            <!-- Accuracy Metrics Compact -->
            <div class="flex gap-3">
              <div class="flex-1 bg-secondary/10 p-2 rounded-lg border border-secondary/20">
                <p class="text-[8px] font-black uppercase text-secondary-dark/60 mb-1">Exactitud</p>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1.5 bg-secondary/20 rounded-full overflow-hidden">
                    <div class="h-full bg-accent" [style.width.%]="vocationPrediction.accuracy"></div>
                  </div>
                  <span class="text-[9px] font-black text-accent">{{ vocationPrediction.accuracy }}%</span>
                </div>
              </div>
              <div class="flex-1 bg-primary/5 p-2 rounded-lg border border-primary/10">
                <p class="text-[8px] font-black uppercase text-primary/60 mb-1">Confianza</p>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1.5 bg-primary/10 rounded-full overflow-hidden">
                    <div class="h-full bg-primary" [style.width.%]="vocationPrediction.precision"></div>
                  </div>
                  <span class="text-[9px] font-black text-primary">{{ vocationPrediction.precision }}%</span>
                </div>
              </div>
            </div>
            
            <div class="pt-3 border-t border-outline-variant/30">
              <p class="text-[8px] font-black uppercase tracking-widest text-outline mb-2">Caminos sugeridos</p>
              <div class="flex flex-wrap gap-1.5">
                <span *ngFor="let career of getAllCareers()" 
                      class="px-2 py-1 bg-white text-[9px] font-bold rounded-lg border border-outline-variant/50 text-on-surface-variant">
                  {{ career }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Stories List -->
      <div id="stories-section" [class.lg:col-span-8]="activeTab === 'inicio'" [class.lg:col-span-12]="activeTab === 'historias'" class="space-y-6">
        <div class="flex justify-between items-center border-b border-outline-variant/30 pb-2">
            <h3 class="text-lg font-serif font-bold text-on-surface tracking-tight">Mis historias recientes</h3>
            <div class="flex gap-4 text-[11px] font-bold text-on-surface-variant/50">
                <span class="text-primary border-b-2 border-primary pb-1">Todas</span>
                <span class="hover:text-primary transition-colors cursor-pointer">Borradores</span>
                <span class="hover:text-primary transition-colors cursor-pointer">Publicadas</span>
            </div>
        </div>

        <!-- Cards Container -->
        <div *ngIf="!isLoading; else loadingTpl" class="space-y-4">
          <div *ngFor="let nar of (activeTab === 'inicio' ? narratives.slice(0, 3) : narratives)" 
               class="premium-card p-4 flex flex-col md:flex-row gap-6 items-center hover:border-primary/30 group border-l-[6px]"
               [class.border-l-accent]="nar.status === 'published'"
               [class.border-l-primary/20]="nar.status !== 'published'">
            
            <!-- Thumbnail Placeholder -->
            <div class="w-full md:w-32 h-24 rounded-lg bg-secondary/30 overflow-hidden relative shrink-0">
                <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400" class="w-full h-full object-cover" alt="Story cover">
                <div class="absolute inset-0 bg-black/10"></div>
            </div>

            <div class="flex-1 w-full min-w-0">
              <div class="flex justify-between items-start mb-1">
                <h4 class="text-xl font-serif font-bold text-primary tracking-tight truncate">{{ nar.titulo }}</h4>
                <span [class]="nar.status === 'published' ? 'bg-accent text-white' : 'bg-secondary text-on-surface-variant'" 
                      class="px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {{ getNarrativeStatusLabel(nar) }}
                </span>
              </div>
              
              <div class="flex gap-4 text-[10px] font-bold text-on-surface-variant/60 mb-3 uppercase tracking-widest">
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">location_on</span> {{ nar.regionCultural }}
                </span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">calendar_month</span> 12 Oct, 2023
                </span>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                <div class="flex gap-2">
                    <button class="flex items-center gap-2 text-[10px] font-bold bg-secondary/50 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors">
                      <span class="material-symbols-outlined text-base">visibility</span> Ver
                    </button>
                    <button (click)="editNarrative(nar)" class="flex items-center gap-2 text-[10px] font-bold bg-primary text-white px-3 py-1.5 rounded-lg hover:brightness-110 transition-colors">
                      <span class="material-symbols-outlined text-base">edit</span> {{ nar.status === 'published' ? 'Editar' : 'Continuar' }}
                    </button>
                </div>
                <button class="flex items-center gap-2 text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors">
                    <span class="material-symbols-outlined text-base">delete</span> Eliminar
                </button>
              </div>
            </div>
          </div>

          <div *ngIf="activeTab === 'inicio' && narratives.length > 3" class="hidden">
            <!-- Removed to save space in home tab -->
          </div>

          <!-- Empty State -->
          <div *ngIf="narratives.length === 0" class="relative p-12 text-center bg-white border border-outline-variant/30 rounded-xl flex flex-col items-center justify-center animate-slide-up shadow-sm">
              <div class="relative z-10">
                <div class="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-primary/10">
                   <span class="material-symbols-outlined text-4xl text-primary font-black">history_edu</span>
                </div>
                <h4 class="text-2xl font-serif font-bold text-primary mb-4 leading-tight">Tu voz es el puente entre el <br/>pasado y el futuro</h4>
                <p class="text-on-surface-variant max-w-lg mb-8 text-sm leading-relaxed font-medium opacity-70">
                  Cada rincón de tu comunidad guarda un secreto esperando ser contado. 
                  <span class="font-bold text-primary">¿Serás tú quien la preserve?</span>
                </p>
                <button (click)="createNew()" class="btn-premium !px-10 !py-3 !text-sm shadow-lg">
                   <span class="material-symbols-outlined text-xl">add_circle</span>
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

  getTopCareer(): string {
    if (!this.vocationPrediction) return '';
    const careers = this.vocationPrediction.suggested_careers;
    if (Array.isArray(careers)) return careers[0] || '';
    return careers.professional[0] || careers.technical[0] || careers.others[0] || '';
  }

  getAllCareers(): string[] {
    if (!this.vocationPrediction) return [];
    const careers = this.vocationPrediction.suggested_careers;
    if (Array.isArray(careers)) return careers;
    return [...careers.professional, ...careers.technical, ...careers.others];
  }
}

