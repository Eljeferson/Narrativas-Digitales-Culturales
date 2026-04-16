import { Component, inject, OnInit } from '@angular/core';
import { GetDashboardDataUseCase } from '../../core/application/analytics/get-dashboard-data.use-case';
import { AnalyticsData } from '../../core/domain/ports/analytics.port';


@Component({
  selector: 'app-dashboard-analitico-docente',
  standalone: true,
  imports: [],
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
<p class="text-4xl font-headline font-bold text-on-surface mt-1">1,284</p>
</div>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-tertiary">
<div class="flex justify-between items-start mb-4">
<span class="material-symbols-outlined text-tertiary bg-tertiary-fixed/30 p-2 rounded-lg">psychology_alt</span>
<span class="text-xs font-bold text-tertiary px-2 py-1 bg-tertiary-fixed/20 rounded-full">Óptimo</span>
</div>
<p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Uso IA</p>
<p class="text-4xl font-headline font-bold text-on-surface mt-1">87.5%</p>
</div>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-secondary">
<div class="flex justify-between items-start mb-4">
<span class="material-symbols-outlined text-secondary-fixed-variant bg-secondary-fixed/30 p-2 rounded-lg">timer</span>
<span class="text-xs font-bold text-secondary px-2 py-1 bg-secondary-fixed/20 rounded-full">-5m media</span>
</div>
<p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Tiempo Promedio</p>
<p class="text-4xl font-headline font-bold text-on-surface mt-1">42m</p>
</div>
<div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-[#89726a]">
<div class="flex justify-between items-start mb-4">
<span class="material-symbols-outlined text-outline bg-outline-variant/30 p-2 rounded-lg">spatial_audio_off</span>
<span class="text-xs font-bold text-outline px-2 py-1 bg-outline-variant/20 rounded-full">Nuevo hito</span>
</div>
<p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Audios Generados</p>
<p class="text-4xl font-headline font-bold text-on-surface mt-1">942</p>
</div>
</section>
<!-- Section Media: Gráficos (Bento Style) -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
<!-- Actividad Semanal -->
<div class="lg:col-span-7 bg-surface-container p-8 rounded-2xl relative overflow-hidden group">
<h3 class="text-xl font-headline font-bold text-primary mb-6">Actividad Semanal de Escritura</h3>
<div class="flex items-end justify-between h-48 gap-4">
<div class="w-full bg-primary-container h-[40%] rounded-t-lg relative group-hover:h-[45%] transition-all duration-500"><span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">Lun</span></div>
<div class="w-full bg-primary h-[70%] rounded-t-lg relative group-hover:h-[75%] transition-all duration-500"><span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">Mar</span></div>
<div class="w-full bg-tertiary h-[90%] rounded-t-lg relative group-hover:h-[95%] transition-all duration-500"><span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">Mié</span></div>
<div class="w-full bg-secondary h-[55%] rounded-t-lg relative group-hover:h-[60%] transition-all duration-500"><span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">Jue</span></div>
<div class="w-full bg-primary h-[82%] rounded-t-lg relative group-hover:h-[87%] transition-all duration-500"><span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">Vie</span></div>
<div class="w-full bg-tertiary-container h-[25%] rounded-t-lg relative group-hover:h-[30%] transition-all duration-500"><span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">Sáb</span></div>
<div class="w-full bg-outline-variant h-[15%] rounded-t-lg relative group-hover:h-[20%] transition-all duration-500"><span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">Dom</span></div>
</div>
</div>
<!-- Tipos de Relato (Dona) -->
<div class="lg:col-span-5 bg-surface-container-high p-8 rounded-2xl flex flex-col items-center justify-center">
<h3 class="text-xl font-headline font-bold text-primary mb-6 self-start">Tipos de Relato</h3>
<div class="relative w-48 h-48 rounded-full border-[20px] border-tertiary flex items-center justify-center">
<div class="absolute inset-0 rounded-full border-[20px] border-primary border-r-transparent border-b-transparent -rotate-45"></div>
<div class="absolute inset-0 rounded-full border-[20px] border-secondary border-l-transparent border-t-transparent rotate-12"></div>
<div class="text-center">
<span class="text-3xl font-headline font-bold text-on-surface">324</span>
<p class="text-[10px] font-bold uppercase tracking-tighter opacity-60">Activos</p>
</div>
</div>
<div class="mt-6 flex flex-wrap justify-center gap-4">
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-primary"></div><span class="text-xs font-medium">Histórico</span></div>
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-tertiary"></div><span class="text-xs font-medium">Mito/Leyenda</span></div>
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-secondary"></div><span class="text-xs font-medium">Contemporáneo</span></div>
</div>
</div>
<!-- Heatmap de Accesos -->
<div class="lg:col-span-12 bg-surface-container-lowest p-8 rounded-2xl">
<h3 class="text-xl font-headline font-bold text-primary mb-6">Mapa de Calor: Intensidad de Uso</h3>
<div class="grid grid-cols-12 gap-2 h-32">
<!-- Placeholder Heatmap Tiles -->
<div class="bg-tertiary/10 rounded-md"></div><div class="bg-tertiary/30 rounded-md"></div><div class="bg-tertiary/60 rounded-md"></div><div class="bg-tertiary/80 rounded-md"></div>
<div class="bg-tertiary/20 rounded-md"></div><div class="bg-tertiary/50 rounded-md"></div><div class="bg-tertiary/90 rounded-md"></div><div class="bg-tertiary/40 rounded-md"></div>
<div class="bg-tertiary/10 rounded-md"></div><div class="bg-tertiary/20 rounded-md"></div><div class="bg-tertiary/30 rounded-md"></div><div class="bg-tertiary/10 rounded-md"></div>
<!-- Repeat Row for visual -->
<div class="bg-tertiary/40 rounded-md"></div><div class="bg-tertiary/80 rounded-md"></div><div class="bg-primary/90 rounded-md"></div><div class="bg-primary/70 rounded-md"></div>
<div class="bg-primary/40 rounded-md"></div><div class="bg-primary/20 rounded-md"></div><div class="bg-tertiary/60 rounded-md"></div><div class="bg-tertiary/10 rounded-md"></div>
<div class="bg-tertiary/20 rounded-md"></div><div class="bg-tertiary/50 rounded-md"></div><div class="bg-tertiary/30 rounded-md"></div><div class="bg-tertiary/05 rounded-md"></div>
<!-- Row 3 -->
<div class="bg-secondary/10 rounded-md"></div><div class="bg-secondary/30 rounded-md"></div><div class="bg-secondary/60 rounded-md"></div><div class="bg-primary/80 rounded-md"></div>
<div class="bg-primary/20 rounded-md"></div><div class="bg-primary/50 rounded-md"></div><div class="bg-primary/90 rounded-md"></div><div class="bg-primary/40 rounded-md"></div>
<div class="bg-tertiary/10 rounded-md"></div><div class="bg-tertiary/20 rounded-md"></div><div class="bg-tertiary/30 rounded-md"></div><div class="bg-tertiary/10 rounded-md"></div>
</div>
<div class="flex justify-between mt-4 text-[10px] font-bold uppercase text-on-surface-variant">
<span>Madrugada</span><span>Mañana</span><span>Tarde</span><span>Noche</span>
</div>
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
<th class="px-8 py-4">Narrativas</th>
<th class="px-8 py-4">IA Usada</th>
<th class="px-8 py-4">Audio</th>
<th class="px-8 py-4">Storyboard</th>
<th class="px-8 py-4">Progreso</th>
<th class="px-8 py-4 text-right">Acciones</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-bold text-xs">MA</div>
<span class="font-bold text-on-surface">Miguel A. de Cervantes</span>
</div>
</td>
<td class="px-8 py-5 text-on-surface-variant font-medium">12</td>
<td class="px-8 py-5">
<span class="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-bold">Alta</span>
</td>
<td class="px-8 py-5"><span class="material-symbols-outlined text-green-600" style="font-variation-settings: 'FILL' 1;">check_circle</span></td>
<td class="px-8 py-5 text-on-surface-variant">8/12</td>
<td class="px-8 py-5">
<div class="w-24 bg-surface-variant h-1.5 rounded-full overflow-hidden">
<div class="bg-primary h-full w-[85%]"></div>
</div>
</td>
<td class="px-8 py-5 text-right">
<div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-primary hover:bg-primary-fixed rounded-lg transition-colors" title="Ver Perfil"><span class="material-symbols-outlined">person</span></button>
<button class="p-2 text-tertiary hover:bg-tertiary-fixed rounded-lg transition-colors" title="Feedback"><span class="material-symbols-outlined">rate_review</span></button>
</div>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">SM</div>
<span class="font-bold text-on-surface">Sor Juana Inés de la Cruz</span>
</div>
</td>
<td class="px-8 py-5 text-on-surface-variant font-medium">18</td>
<td class="px-8 py-5">
<span class="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold">Media</span>
</td>
<td class="px-8 py-5"><span class="material-symbols-outlined text-green-600" style="font-variation-settings: 'FILL' 1;">check_circle</span></td>
<td class="px-8 py-5 text-on-surface-variant">15/18</td>
<td class="px-8 py-5">
<div class="w-24 bg-surface-variant h-1.5 rounded-full overflow-hidden">
<div class="bg-primary h-full w-[95%]"></div>
</div>
</td>
<td class="px-8 py-5 text-right">
<div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-primary hover:bg-primary-fixed rounded-lg transition-colors" title="Ver Perfil"><span class="material-symbols-outlined">person</span></button>
<button class="p-2 text-tertiary hover:bg-tertiary-fixed rounded-lg transition-colors" title="Feedback"><span class="material-symbols-outlined">rate_review</span></button>
</div>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-low transition-colors group">
<td class="px-8 py-5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-outline/20 flex items-center justify-center text-outline font-bold text-xs">GL</div>
<span class="font-bold text-on-surface">Gabriel García Márquez</span>
</div>
</td>
<td class="px-8 py-5 text-on-surface-variant font-medium">5</td>
<td class="px-8 py-5">
<span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Crítica</span>
</td>
<td class="px-8 py-5"><span class="material-symbols-outlined text-outline-variant">cancel</span></td>
<td class="px-8 py-5 text-on-surface-variant">2/5</td>
<td class="px-8 py-5">
<div class="w-24 bg-surface-variant h-1.5 rounded-full overflow-hidden">
<div class="bg-primary h-full w-[30%]"></div>
</div>
</td>
<td class="px-8 py-5 text-right">
<div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-primary hover:bg-primary-fixed rounded-lg transition-colors" title="Ver Perfil"><span class="material-symbols-outlined">person</span></button>
<button class="p-2 text-tertiary hover:bg-tertiary-fixed rounded-lg transition-colors" title="Feedback"><span class="material-symbols-outlined">rate_review</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-6 bg-surface-container-lowest flex justify-between items-center text-sm text-on-surface-variant">
<span>Mostrando 3 de 45 estudiantes</span>
<div class="flex gap-2">
<button class="p-2 rounded-lg border border-outline-variant/30 hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-sm">chevron_left</span></button>
<button class="p-2 rounded-lg border border-outline-variant/30 bg-primary text-white transition-colors">1</button>
<button class="p-2 rounded-lg border border-outline-variant/30 hover:bg-surface-container transition-colors">2</button>
<button class="p-2 rounded-lg border border-outline-variant/30 hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-sm">chevron_right</span></button>
</div>
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

  analytics: AnalyticsData | null = null;

  ngOnInit() {
    this.getDashboardDataUseCase.execute('current-teacher-id').subscribe({
      next: (data) => { this.analytics = data; console.log('Dashboard cargado:', data); },
      error: (err) => console.error('Error cargando dashboard:', err)
    });
  }
}

