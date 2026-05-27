import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface ParticipationRow {
  student: string;
  narratives: number;
  sessionMinutes: number;
  aiUsage: number;
}

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
      Progreso del estudiante
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
    <p class="text-xs font-bold uppercase tracking-widest text-[#99411c]">HU-13 · Analítica docente</p>
    <h1 class="text-4xl font-headline font-bold text-primary tracking-tight mb-2">Métricas de Inteligencia Artificial</h1>
    <p class="text-on-surface-variant max-w-2xl">Visualización avanzada del impacto pedagógico de la IA en la creación de narrativas culturales. Análisis en tiempo real de la actividad estudiantil.</p>
  </header>

  <!-- Section Superior: KPI Cards -->
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-primary">
      <div class="flex justify-between items-start mb-4">
        <span class="material-symbols-outlined text-primary bg-primary-fixed/30 p-2 rounded-lg">history_edu</span>
      </div>
      <p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Narrativas creadas</p>
      <p class="text-4xl font-headline font-bold text-on-surface mt-1">{{ totalNarratives }}</p>
    </div>
    <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-secondary">
      <div class="flex justify-between items-start mb-4">
        <span class="material-symbols-outlined text-secondary-fixed-variant bg-secondary-fixed/30 p-2 rounded-lg">timer</span>
      </div>
      <p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Tiempo de sesión</p>
      <p class="text-4xl font-headline font-bold text-on-surface mt-1">{{ totalMinutes }} min</p>
    </div>
    <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_10px_40px_rgba(153,65,28,0.03)] border-b-4 border-tertiary">
      <div class="flex justify-between items-start mb-4">
        <span class="material-symbols-outlined text-tertiary bg-tertiary-fixed/30 p-2 rounded-lg">psychology_alt</span>
      </div>
      <p class="text-on-surface-variant text-sm font-medium uppercase tracking-wider">Uso IA promedio</p>
      <p class="text-4xl font-headline font-bold text-on-surface mt-1">{{ averageAiUsage }}%</p>
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
  </section>

  <!-- Section Inferior: Tabla Detallada -->
  <section class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(153,65,28,0.06)]">
    <div class="p-8 border-b border-outline-variant/15 flex justify-between items-center bg-surface-bright">
      <h3 class="text-2xl font-headline font-bold text-primary">Detalle por Estudiante</h3>
      <div class="flex gap-4">
        <button (click)="exportCsv()" class="px-4 py-2 text-sm font-bold border border-primary/20 text-primary rounded-lg hover:bg-primary/5 transition-colors">Exportar CSV</button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-surface-container text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">
          <tr>
            <th class="px-8 py-4">Estudiante</th>
            <th class="px-8 py-4">Narrativas</th>
            <th class="px-8 py-4">Tiempo Sesión</th>
            <th class="px-8 py-4">Uso IA</th>
            <th class="px-8 py-4">Progreso</th>
            <th class="px-8 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-outline-variant/10">
          <tr *ngFor="let row of rows" class="hover:bg-surface-container-low transition-colors group">
            <td class="px-8 py-5">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-bold text-xs">
                  {{ row.student.substring(0, 2).toUpperCase() }}
                </div>
                <span class="font-bold text-on-surface">{{ row.student }}</span>
              </div>
            </td>
            <td class="px-8 py-5 text-on-surface-variant font-medium">{{ row.narratives }}</td>
            <td class="px-8 py-5 text-on-surface-variant font-medium">{{ row.sessionMinutes }} min</td>
            <td class="px-8 py-5">
              <span [class]="row.aiUsage > 75 ? 'bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold' : row.aiUsage > 50 ? 'bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-bold' : 'bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold'">
                {{ row.aiUsage }}%
              </span>
            </td>
            <td class="px-8 py-5">
              <div class="w-24 bg-surface-variant h-1.5 rounded-full overflow-hidden">
                <div class="bg-primary h-full" [style.width.%]="row.aiUsage"></div>
              </div>
            </td>
            <td class="px-8 py-5 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-2 text-primary hover:bg-primary-fixed rounded-lg transition-colors" title="Ver Perfil"><span class="material-symbols-outlined">person</span></button>
                <button class="p-2 text-tertiary hover:bg-tertiary-fixed rounded-lg transition-colors" title="Retroalimentación"><span class="material-symbols-outlined">rate_review</span></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class DashboardAnaliticoDocente implements OnInit, OnDestroy {
  rows: ParticipationRow[] = [
    { student: 'Mateo Huamán', narratives: 4, sessionMinutes: 42, aiUsage: 68 },
    { student: 'Lucía Chambi', narratives: 2, sessionMinutes: 31, aiUsage: 54 },
    { student: 'Diego Campos', narratives: 3, sessionMinutes: 37, aiUsage: 61 }
  ];
  private interval?: number;

  ngOnInit(): void {
    this.interval = window.setInterval(() => {
      this.rows = this.rows.map((row, index) => ({
        ...row,
        sessionMinutes: row.sessionMinutes + (index === 0 ? 1 : 0),
        aiUsage: Math.min(99, row.aiUsage + (index === 1 ? 1 : 0))
      }));
    }, 3000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.interval);
  }

  get totalNarratives(): number {
    return this.rows.reduce((sum, row) => sum + row.narratives, 0);
  }

  get totalMinutes(): number {
    return this.rows.reduce((sum, row) => sum + row.sessionMinutes, 0);
  }

  get averageAiUsage(): number {
    return Math.round(this.rows.reduce((sum, row) => sum + row.aiUsage, 0) / this.rows.length);
  }

  exportCsv(): void {
    const csv = ['estudiante,narrativas,tiempo_sesion_min,uso_ia', ...this.rows.map((row) => `${row.student},${row.narratives},${row.sessionMinutes},${row.aiUsage}`)].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard-participacion.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
