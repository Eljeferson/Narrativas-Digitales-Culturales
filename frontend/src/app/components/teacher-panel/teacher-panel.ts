import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ProgressState = 'Borrador' | 'En revisión' | 'Publicada';

interface StudentRow {
  id: string;
  name: string;
  grade: string;
  narratives: number;
  lastActivity: string;
  progress: ProgressState;
  culture: string;
}

interface NarrativeRow {
  title: string;
  author: string;
  culture: string;
  date: string;
  status: ProgressState;
}

@Component({
  selector: 'app-teacher-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<main class="min-h-screen bg-background px-4 py-6 text-on-surface md:px-10">
  <section class="mx-auto max-w-7xl">
    <header class="mb-8">
      <p class="text-xs font-bold uppercase tracking-widest text-tertiary">HU-09 y HU-10 · Seguimiento docente</p>
      <h1 class="font-headline text-4xl font-bold text-primary">Panel del docente</h1>
      <p class="mt-2 text-on-surface-variant">Listado de estudiantes, perfiles y narrativas con filtros móviles.</p>
    </header>

    <section class="mb-6 grid gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-5 md:grid-cols-3">
      <select [(ngModel)]="gradeFilter" class="rounded-lg border border-outline-variant bg-surface px-4 py-3">
        <option value="">Todos los grados</option>
        <option>4to de Secundaria</option>
        <option>5to de Secundaria</option>
      </select>
      <select [(ngModel)]="stateFilter" class="rounded-lg border border-outline-variant bg-surface px-4 py-3">
        <option value="">Todos los estados</option>
        <option>Borrador</option>
        <option>En revisión</option>
        <option>Publicada</option>
      </select>
      <button type="button" (click)="exportCsv()" class="rounded-lg bg-primary px-4 py-3 font-bold text-on-primary">Exportar seguimiento CSV</button>
    </section>

    <div class="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <section class="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
        <h2 class="border-b border-outline-variant p-5 font-headline text-2xl font-bold text-primary">Estudiantes</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-surface-container text-xs uppercase tracking-widest text-on-surface-variant">
              <tr><th class="px-5 py-3">Nombre</th><th class="px-5 py-3">Narrativas</th><th class="px-5 py-3">Última actividad</th><th class="px-5 py-3">Perfil</th></tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/40">
              <tr *ngFor="let student of filteredStudents">
                <td class="px-5 py-4">
                  <p class="font-bold">{{ student.name }}</p>
                  <p class="text-xs text-on-surface-variant">{{ student.grade }} · {{ student.progress }}</p>
                </td>
                <td class="px-5 py-4">{{ student.narratives }}</td>
                <td class="px-5 py-4">{{ student.lastActivity }}</td>
                <td class="px-5 py-4"><button type="button" (click)="selectedStudent = student" class="rounded bg-tertiary/10 px-3 py-2 text-sm font-bold text-tertiary">Abrir</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
        <h2 class="border-b border-outline-variant p-5 font-headline text-2xl font-bold text-primary">Narrativas</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-surface-container text-xs uppercase tracking-widest text-on-surface-variant">
              <tr><th class="px-5 py-3">Título</th><th class="px-5 py-3">Autor</th><th class="px-5 py-3">Cultura</th><th class="px-5 py-3">Estado</th></tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/40">
              <tr *ngFor="let narrative of filteredNarratives">
                <td class="px-5 py-4">
                  <p class="font-bold">{{ narrative.title }}</p>
                  <p class="text-xs text-on-surface-variant">{{ narrative.date }}</p>
                </td>
                <td class="px-5 py-4">{{ narrative.author }}</td>
                <td class="px-5 py-4">{{ narrative.culture }}</td>
                <td class="px-5 py-4"><span class="rounded bg-secondary-container px-2 py-1 text-xs font-bold text-on-secondary-container">{{ narrative.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <section *ngIf="selectedStudent" class="mt-6 rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <h2 class="font-headline text-2xl font-bold text-primary">Perfil de {{ selectedStudent.name }}</h2>
      <p class="mt-2 text-on-surface-variant">Cultura trabajada: {{ selectedStudent.culture }} · Narrativas creadas: {{ selectedStudent.narratives }} · Última actividad: {{ selectedStudent.lastActivity }}.</p>
    </section>
  </section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class TeacherPanel {
  gradeFilter = '';
  stateFilter: '' | ProgressState = '';
  selectedStudent?: StudentRow;
  students: StudentRow[] = [
    { id: 's1', name: 'Mateo Huamán', grade: '5to de Secundaria', narratives: 4, lastActivity: 'Hoy 09:20', progress: 'En revisión', culture: 'Andina' },
    { id: 's2', name: 'Lucía Chambi', grade: '5to de Secundaria', narratives: 2, lastActivity: 'Ayer 17:12', progress: 'Borrador', culture: 'Amazónica' },
    { id: 's3', name: 'Diego Campos', grade: '4to de Secundaria', narratives: 3, lastActivity: '22/05/2026', progress: 'Publicada', culture: 'Afroperuana' }
  ];
  narratives: NarrativeRow[] = [
    { title: 'El eco de los Apus', author: 'Mateo Huamán', culture: 'Andina', date: '24/05/2026', status: 'En revisión' },
    { title: 'Río que canta', author: 'Lucía Chambi', culture: 'Amazónica', date: '23/05/2026', status: 'Borrador' },
    { title: 'La décima de mi abuela', author: 'Diego Campos', culture: 'Afroperuana', date: '22/05/2026', status: 'Publicada' }
  ];

  get filteredStudents(): StudentRow[] {
    return this.students.filter((student) => (!this.gradeFilter || student.grade === this.gradeFilter) && (!this.stateFilter || student.progress === this.stateFilter));
  }

  get filteredNarratives(): NarrativeRow[] {
    return this.narratives.filter((narrative) => !this.stateFilter || narrative.status === this.stateFilter);
  }

  exportCsv(): void {
    const csv = ['nombre,grado,narrativas,ultima_actividad,estado', ...this.filteredStudents.map((s) => `${s.name},${s.grade},${s.narratives},${s.lastActivity},${s.progress}`)].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'seguimiento-estudiantes.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
