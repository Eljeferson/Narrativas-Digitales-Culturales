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
<main class="min-h-screen bg-background px-4 py-6 text-on-surface md:px-10">
  <section class="mx-auto max-w-7xl">
    <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-tertiary">HU-13 · Analítica docente</p>
        <h1 class="font-headline text-4xl font-bold text-primary">Participación y desarrollo creativo</h1>
        <p class="mt-2 text-on-surface-variant">Datos actualizados en tiempo real por estudiante.</p>
      </div>
      <button type="button" (click)="exportCsv()" class="rounded-lg bg-primary px-5 py-3 font-bold text-on-primary">Exportar CSV</button>
    </header>

    <section class="mb-6 grid gap-4 md:grid-cols-3">
      <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
        <p class="text-sm font-bold uppercase text-on-surface-variant">Narrativas creadas</p>
        <p class="font-headline text-4xl font-bold text-primary">{{ totalNarratives }}</p>
      </div>
      <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
        <p class="text-sm font-bold uppercase text-on-surface-variant">Tiempo de sesión</p>
        <p class="font-headline text-4xl font-bold text-primary">{{ totalMinutes }} min</p>
      </div>
      <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5">
        <p class="text-sm font-bold uppercase text-on-surface-variant">Uso IA promedio</p>
        <p class="font-headline text-4xl font-bold text-primary">{{ averageAiUsage }}%</p>
      </div>
    </section>

    <section class="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
      <table class="w-full text-left">
        <thead class="bg-surface-container text-xs uppercase tracking-widest text-on-surface-variant">
          <tr><th class="px-5 py-3">Estudiante</th><th class="px-5 py-3">Narrativas</th><th class="px-5 py-3">Tiempo sesión</th><th class="px-5 py-3">Uso IA</th></tr>
        </thead>
        <tbody class="divide-y divide-outline-variant/40">
          <tr *ngFor="let row of rows">
            <td class="px-5 py-4 font-bold">{{ row.student }}</td>
            <td class="px-5 py-4">{{ row.narratives }}</td>
            <td class="px-5 py-4">{{ row.sessionMinutes }} min</td>
            <td class="px-5 py-4">{{ row.aiUsage }}%</td>
          </tr>
        </tbody>
      </table>
    </section>
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
