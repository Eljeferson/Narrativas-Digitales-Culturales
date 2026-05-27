import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDashboardDataUseCase } from '../../core/application/analytics/get-dashboard-data.use-case';
import { ListStudentsUseCase } from '../../core/application/teacher/teacher-use-cases';
import { AnalyticsData } from '../../core/domain/ports/analytics.port';
import { User } from '../../core/domain/models/user.model';

@Component({
  selector: 'app-dashboard-analitico-docente',
  standalone: true,
  imports: [CommonModule],
  template: `
<!-- TopNavBar -->
<header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-[#fff9ed] dark:bg-[#1a1614] border-none shadow-none">
<div class="flex items-center gap-8">
<span class="text-2xl font-bold font-serif text-[#99411c] dark:text-[#b85932]">CulturaStory</span>
<nav class="hidden md:flex items-center gap-6">
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors" href="#">Dashboard</a>
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors" href="#">Narrativas</a>
<a class="text-[#56423c] dark:text-[#eae2cd] hover:text-[#99411c] transition-colors" href="#">Storyboards</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative bg-[#fbf3de] dark:bg-[#2a2420] rounded-full px-4 py-1.5 flex items-center gap-2">
<span class="material-symbols-outlined text-[#99411c] text-xl">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-32 md:w-64 text-[#56423c]" placeholder="Buscar..." type="text"/>
</div>
<button class="material-symbols-outlined text-[#99411c] p-2 hover:bg-[#f5edd8] rounded-full transition-colors">notifications</button>
<button class="material-symbols-outlined text-[#99411c] p-2 hover:bg-[#f5edd8] rounded-full transition-colors">settings</button>
<img alt="User avatar" class="w-8 h-8 rounded-full border-2 border-primary/20" data-alt="professional portrait of a teacher in a modern bright classroom setting with warm lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwOl66ZRYr4RtjSvHxpxj6bw6N56RU6iu-kIcfweh4tnV1GfuNYl5nyuDWEX-N26Kr2cyys6TY8w38-88bVlonXtRRmqlcTk4Uuk9VsAY6nObBl1hQxE8T41hjn3_EcppWNJI4-Z-WZ_yQc6dhd5kJakljBE4eiFnXTjBVBPLT4rLW-rkxpS6jiNkRF2A3wRg8gJXClBxoGdksv7gyC2i7t8fY6nm_T4Eqh2s_-nV360yYrDtu6jsDT-6IsDfyFQ9w-5nK6ppbQwg-"/>
</div>
</header>
<!-- SideNavBar -->
<aside class="fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col p-4 bg-[#fbf3de] dark:bg-[#1a1614] border-r border-[#99411c]/15 w-64">
<div class="mb-8 px-2">
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
<span class="material-symbols-outlined">auto_stories</span>
</div>
<div>
<p class="text-lg font-serif text-[#99411c] font-bold">Project Alpha</p>
<p class="text-xs text-[#56423c] opacity-70">Cultural Narrative</p>
</div>
</div>
<button class="w-full mt-4 bg-primary text-white py-2.5 rounded-xl font-medium shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-sm">add</span>
                New Narrative
            </button>
</div>
<nav class="flex flex-col gap-1">
<a class="text-[#56423c] px-4 py-2 hover:bg-[#eae2cd]/50 flex items-center gap-3 rounded-lg font-sans text-sm font-medium transition-colors" href="#">
<span class="material-symbols-outlined">dashboard</span>
                General
            </a>
<a class="text-[#56423c] px-4 py-2 hover:bg-[#eae2cd]/50 flex items-center gap-3 rounded-lg font-sans text-sm font-medium transition-colors" href="#">
<span class="material-symbols-outlined">analytics</span>
                Student Progress
            </a>
<a class="bg-[#eae2cd] dark:bg-[#3d332d] text-[#99411c] dark:text-[#fbf3de] rounded-lg px-4 py-2 flex items-center gap-3 font-sans text-sm font-bold" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                IA Metrics
            </a>
</nav>
</aside>
<!-- Main Content -->
<main class="ml-64 pt-20 p-8 min-h-screen">
<header class="mb-10">
<h1 class="text-4xl font-headline font-bold text-primary tracking-tight mb-2">Métricas de Inteligencia Artificial</h1>
<p class="text-on-surface-variant max-w-2xl">Visualización avanzada del impacto pedagógico de la IA en la creación de narrativas culturales. Análisis en tiempo real de la actividad estudiantil.</p>
</header>
<!-- Section Superior: KPI Cards -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-primary">
<div class="flex justify-between items-start mb-4">
<span class="material-symbols-outlined text-primary bg-primary-fixed/30 p-2 rounded-lg">history_edu</span>
<span class="text-xs font-bold text-primary px-2 py-1 bg-primary-fixed/20 rounded-full">+12% hoy</span>
</div>
<p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Total Narrativas</p>
<p class="text-4xl font-headline font-bold text-on-surface mt-1">{{ analytics?.totalNarratives || 0 }}</p>
</div>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-tertiary">
<div class="flex justify-between items-start mb-4">
<span class="material-symbols-outlined text-tertiary bg-tertiary-fixed/30 p-2 rounded-lg">psychology_alt</span>
<span class="text-xs font-bold text-tertiary px-2 py-1 bg-tertiary-fixed/20 rounded-full">Óptimo</span>
</div>
<p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Uso IA</p>
<p class="text-4xl font-headline font-bold text-on-surface mt-1">{{ analytics?.aiUsagePercent || 0 }}%</p>
</div>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-secondary">
<div class="flex justify-between items-start mb-4">
<span class="material-symbols-outlined text-secondary-fixed-variant bg-secondary-fixed/30 p-2 rounded-lg">timer</span>
<span class="text-xs font-bold text-secondary px-2 py-1 bg-secondary-fixed/20 rounded-full">-5m media</span>
</div>
<p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Tiempo Promedio</p>
<p class="text-4xl font-headline font-bold text-on-surface mt-1">{{ analytics?.avgWritingTimeMinutes || 0 }}m</p>
</div>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-[#89726a]">
<div class="flex justify-between items-start mb-4">
<span class="material-symbols-outlined text-outline bg-outline-variant/30 p-2 rounded-lg">spatial_audio_off</span>
<span class="text-xs font-bold text-outline px-2 py-1 bg-outline-variant/20 rounded-full">Nuevo hito</span>
</div>
<p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Audios Generados</p>
<p class="text-4xl font-headline font-bold text-on-surface mt-1">{{ analytics?.totalAudiosGenerated || 0 }}</p>
</div>
</section>
<!-- Section Inferior: Tabla Detallada -->
<section class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(153,65,28,0.06)]">
<div class="p-8 border-b border-outline-variant/15 flex justify-between items-center bg-surface-bright">
<h3 class="text-2xl font-headline font-bold text-primary">Detalle por Estudiante</h3>
<div class="flex gap-4">
<button class="px-4 py-2 text-sm font-bold border border-primary/20 text-primary rounded-lg hover:bg-primary/5 transition-colors">Exportar CSV</button>
<button class="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg shadow-md active:scale-95 transition-transform">Ver Todos</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead class="bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">
<tr>
<th class="px-8 py-4">Estudiante</th>
<th class="px-8 py-4">Grado</th>
<th class="px-8 py-4">Narrativas Publicadas</th>
<th class="px-8 py-4 text-right">Acciones</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<tr *ngFor="let student of students" class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-bold text-xs">{{ student.nombreCompleto?.substring(0, 2)?.toUpperCase() }}</div>
<span class="font-bold text-on-surface">{{ student.nombreCompleto }}</span>
</div>
</td>
<td class="px-8 py-5 text-on-surface-variant font-medium">{{ student.grado }}</td>
<td class="px-8 py-5">
<span class="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-bold">{{ student.narrativasPublicadas || 0 }}</span>
</td>
<td class="px-8 py-5 text-right">
<div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-primary hover:bg-primary-fixed rounded-lg transition-colors" title="Ver Perfil"><span class="material-symbols-outlined">person</span></button>
<button class="p-2 text-tertiary hover:bg-tertiary-fixed rounded-lg transition-colors" title="Feedback"><span class="material-symbols-outlined">rate_review</span></button>
</div>
</td>
</tr>
<tr *ngIf="students.length === 0">
  <td colspan="4" class="px-8 py-8 text-center text-on-surface-variant">No hay estudiantes registrados en tu grado.</td>
</tr>
</tbody>
</table>
</div>
<div class="p-6 bg-surface-container-lowest flex justify-between items-center text-sm text-on-surface-variant">
<span>Mostrando {{ students.length }} estudiantes</span>
</div>
</section>
</main>
<!-- Floating Action Button for AI Help -->
<div class="fixed bottom-8 right-8 z-[60]">
<button class="w-16 h-16 rounded-full bg-tertiary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
<span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<span class="absolute right-full mr-4 bg-surface-container-highest text-tertiary font-bold text-xs py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Analizar Tendencias con IA</span>
</button>
</div>
  `,
  styles: `
    :host { display: block; }
  `
})
export class DashboardAnaliticoDocente implements OnInit {
  private getDashboardDataUseCase = inject(GetDashboardDataUseCase);
  private listStudentsUseCase = inject(ListStudentsUseCase);

  analytics: AnalyticsData | null = null;
  students: User[] = [];

  ngOnInit() {
    this.getDashboardDataUseCase.execute('current-teacher-id').subscribe({
      next: (data) => { this.analytics = data; console.log('Dashboard cargado:', data); },
      error: (err) => console.error('Error cargando dashboard:', err)
    });

    const teacherGrade = localStorage.getItem('currentUserGrade') || '5to de Secundaria'; // Defaulting for MVP
    this.listStudentsUseCase.execute(teacherGrade).subscribe({
      next: (data) => { this.students = data; console.log('Estudiantes cargados:', data); },
      error: (err) => console.error('Error cargando estudiantes:', err)
    });
  }
}

