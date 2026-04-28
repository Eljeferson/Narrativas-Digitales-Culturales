import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListNarrativesUseCase } from '../../core/application/narratives/narrative-use-cases';
import { Narrative } from '../../core/domain/models/narrative.model';

@Component({
  selector: 'app-student-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
<!-- Thread Scroll Guide -->
<div class="thread-scroll hidden md:block"></div>
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-4 bg-[#FFF8EF] dark:bg-[#1E1B13] h-screen w-64 border-r-0 z-50 border-r border-outline-variant/10">
<div class="mb-8">
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-lg bg-primary-container overflow-hidden flex items-center justify-center text-on-primary-container shadow-sm border border-primary/20">
  <img *ngIf="userAvatar" [src]="userAvatar" class="w-full h-full object-cover" alt="User Avatar">
  <span *ngIf="!userAvatar" class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
</div>
<div>
<h1 class="text-lg font-headline font-bold text-[#823B18] leading-none">CulturaStory</h1>
<span class="text-xs opacity-60">Panel del Estudiante</span>
</div>
</div>
</div>
<nav class="flex-1 space-y-2 text-sm font-medium">
<a class="flex items-center gap-3 bg-[#823B18] text-[#FFF8EF] rounded-md px-4 py-3 shadow-sm translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span>Inicio</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all" href="#">
<span class="material-symbols-outlined">auto_stories</span>
<span>Mis Historias</span>
</a>
</nav>
<div class="pt-6 mt-6 border-t border-outline-variant/20 space-y-2">
<button (click)="createNew()" class="w-full bg-primary text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined">add</span>
<span>+ Nueva Narrativa</span>
</button>
<a class="flex items-center gap-3 text-error px-4 py-3 opacity-70 hover:bg-error/5 transition-all font-bold cursor-pointer" href="/">
<span class="material-symbols-outlined">logout</span>
<span>Cerrar Sesión</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-64 p-8 lg:p-12">
<!-- Personalized Greeting Section -->
<header class="mb-12 relative">
<div class="max-w-4xl">
<h2 class="text-primary text-5xl font-headline italic font-bold tracking-tight mb-2">¡Hola, {{ userName }}!</h2>
<p class="text-on-surface-variant text-xl max-w-2xl">
    Tu hilo narrativo está listo para continuar. Hoy es un gran día para tejer nuevas historias sobre tus raíces.
</p>
</div>
</header>
<!-- Main Bento Grid Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Primary Action & Status Summary -->
<div class="lg:col-span-4 space-y-8">
<button (click)="createNew()" class="w-full group relative overflow-hidden aspect-video bg-[#823B18] text-white rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#823B18]/20 active:scale-95 border-0">
<div class="absolute inset-0 bg-gradient-to-br from-[#823B18] to-[#56423c] opacity-90 group-hover:opacity-100 transition-opacity"></div>
<div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
<div class="relative z-10 bg-white/10 backdrop-blur-md p-5 rounded-full border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/20">
<span class="material-symbols-outlined text-4xl text-white" style="font-variation-settings: 'FILL' 1;">add</span>
</div>
<span class="relative z-10 text-2xl font-headline font-bold text-white drop-shadow-md tracking-wide">Crear Nueva Historia</span>
</button>
<div class="bg-surface-container-low p-6 rounded-xl relative overflow-hidden">
<h3 class="text-tertiary font-headline font-bold text-lg mb-4">Sabiduría Cultural</h3>
<p class="text-sm text-on-surface-variant italic mb-6">"Preservar nuestra cultura es asegurar el camino de los que vendrán."</p>
</div>
</div>
<!-- Narrative Cards List -->
<div class="lg:col-span-8 space-y-6">
<div class="flex justify-between items-end mb-4">
<h3 class="text-2xl font-headline font-bold text-on-surface">Mis historias tejidas</h3>
<span class="text-sm font-medium text-on-surface-variant border-b-2 border-secondary pb-1">Todas ({{ narratives.length }})</span>
</div>
<div *ngIf="!isLoading; else loadingTpl">
<div *ngFor="let nar of narratives" class="bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start transition-all hover:bg-surface-container shadow-sm border-l-4 border-tertiary mb-4">
<div class="flex-1">
<div class="flex justify-between items-start mb-1">
<h4 class="text-xl font-headline font-bold text-primary">{{ nar.titulo }}</h4>
<span class="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest rounded-full">{{ getNarrativeStatusLabel(nar) }}</span>
</div>
<div class="flex gap-4 text-xs text-on-surface-variant mb-4">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span> {{ nar.regionCultural }}</span>
</div>
<p class="text-sm text-on-surface-variant mb-4 line-clamp-2">{{ nar.contenido }}</p>
<div class="flex gap-3">
<button class="flex items-center gap-2 px-4 py-2 bg-surface-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-outline-variant/30 transition-colors">
<span class="material-symbols-outlined text-sm">visibility</span> Ver
</button>
<button (click)="editNarrative(nar)" class="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined text-sm">edit</span> Editar
</button>
</div>
</div>
</div>
<div *ngIf="narratives.length === 0" class="p-12 text-center bg-surface-container-lowest rounded-xl flex flex-col items-center justify-center shadow-sm border border-outline-variant/30 transition-all hover:shadow-md">
    <div class="w-20 h-20 bg-[#823B18]/10 rounded-full flex items-center justify-center mb-6">
       <span class="material-symbols-outlined text-5xl text-[#823B18]">history_edu</span>
    </div>
    <h4 class="text-xl font-headline font-bold text-on-surface mb-3">No tienes historias tejidas</h4>
    <p class="text-on-surface-variant max-w-md mb-8 text-sm leading-relaxed">Aún no has comenzado a documentar la riqueza cultural de tu región. ¡Empieza hoy mismo a crear tu primera narrativa y comparte tus raíces!</p>
    <button (click)="createNew()" class="px-8 py-3.5 bg-[#823B18] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#56423c] transition-colors shadow-lg shadow-[#823B18]/30">
       <span class="material-symbols-outlined text-sm">add</span>
       Crear mi primera historia
    </button>
</div>
</div>
<ng-template #loadingTpl>
    <div class="p-20 text-center space-y-4">
        <span class="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
        <p class="text-on-surface-variant">Buscando tus historias...</p>
    </div>
</ng-template>
</div>
</div>
</main>
  `,
  styles: `:host { display: block; }`
})
export class StudentPanel implements OnInit {
  private listNarrativesUseCase = inject(ListNarrativesUseCase);
  private router = inject(Router);

  narratives: Narrative[] = [];
  isLoading = true;
  userName = 'Tejedor';
  userAvatar = '';

  ngOnInit() {
    this.loadUserData();
    this.loadNarratives();
  }

  loadUserData() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
         const user = JSON.parse(userStr);
         // Capitalizamos la primera letra del nombre
         const rawName = user.nombre || 'Tejedor';
         this.userName = rawName.charAt(0).toUpperCase() + rawName.slice(1).split(' ')[0];
         this.userAvatar = user.fotoPerfilUrl || '';
      } catch(e) {
         console.error('Error parseando usuario local', e);
      }
    }
  }

  loadNarratives() {
    this.isLoading = true;
    const authorId = localStorage.getItem('currentAuthorId') || 'fbdf4968-3ac3-43f1-9457-36e4f3a9e2f4';
    
    this.listNarrativesUseCase.execute(authorId).subscribe({
      next: (data) => {
        this.narratives = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando narrativas:', err);
        this.isLoading = false;
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
}

