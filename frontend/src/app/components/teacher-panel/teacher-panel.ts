import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStudentsUseCase, GetStudentNarrativesUseCase } from '../../core/application/teacher/teacher-use-cases';
import { User } from '../../core/domain/models/user.model';
import { Narrative } from '../../core/domain/models/narrative.model';

@Component({
  selector: 'app-teacher-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="thread-line"></div>
<!-- SideNavBar -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-4 bg-[#FFF8EF] dark:bg-[#1E1B13] h-screen w-64 border-r-0 z-40 hidden md:flex border-r border-outline-variant/10">
<div class="mb-8">
<h2 class="text-xl font-headline text-[#823B18] font-bold italic">CulturaStory AI</h2>
<p class="text-xs opacity-60 font-medium">Panel del Docente</p>
</div>
<nav class="flex-1 space-y-2">
<a class="flex items-center gap-3 bg-[#823B18] text-[#FFF8EF] rounded-md px-4 py-3 shadow-sm transition-all duration-200 translate-x-1" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-medium">Dashboard</span>
</a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all font-medium" href="#">
<span class="material-symbols-outlined">group</span>
<span>Mis Estudiantes</span>
</a>
</nav>
<div class="pt-6 border-t border-outline-variant/30 space-y-1">
<a class="flex items-center gap-3 text-error px-4 py-2 opacity-70 hover:bg-error/5 transition-all text-sm font-bold cursor-pointer" href="/">
<span class="material-symbols-outlined text-base">logout</span>
                Cerrar Sesión
            </a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="md:ml-64 min-h-screen p-8 lg:p-12 relative overflow-hidden">
<!-- Top Navigation -->
<header class="sticky top-0 z-50 flex justify-between items-center px-0 py-4 w-full bg-[#FFF8EF]/80 backdrop-blur-md mb-12">
<div>
<h1 class="text-3xl font-headline italic font-bold tracking-tight text-primary">Dashboard del Docente</h1>
<p class="text-on-surface-variant font-medium">Bienvenido al telar educativo</p>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-secondary/5 transition-colors text-primary">
<span class="material-symbols-outlined">notifications</span>
</button>
<div class="w-10 h-10 rounded-full bg-surface-container-high border-2 border-primary-container overflow-hidden">
<img alt="User profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8FUKLPrxgEBOcY3f7sNTc0xNj7uqY575ZsHswUHmXtf2P9vkiraUHZWkvP-vGWY8XE76MHCClv-LQ8FWoP7kHRcozjYcmbfOb0UwTmu4SNpu0ar9otG7EHJvyPFbJ7j3zxC9q1vuZui5K5-0N9GkndP79NnGBgRxRtL8EffD2kRWK3ryfP5gSb2fTJLVqKuyEiLLfiEt0SSyCNNDu2rhQ6-dfZ_VrIAP-ZnXZ9fHslVcXuVF4wIs7HxtpSqaf5gdRL-i3tJ_5"/>
</div>
</div>
</header>
<!-- Stats Overview -->
<section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
<div class="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden shadow-sm group border border-outline-variant/10">
<div class="relative z-10">
<span class="text-secondary font-bold text-sm tracking-widest uppercase">Estudiantes a cargo</span>
<div class="flex items-end gap-3 mt-2">
<span class="text-5xl font-headline text-primary font-bold">{{ students.length }}</span>
</div>
</div>
</div>
<div class="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden shadow-sm group border border-outline-variant/10">
<div class="relative z-10">
<span class="text-secondary font-bold text-sm tracking-widest uppercase">Narrativas totales</span>
<div class="flex items-end gap-3 mt-2">
<span class="text-5xl font-headline text-primary font-bold">{{ totalNarratives }}</span>
</div>
</div>
</div>
</section>
<!-- Students List -->
<section class="bg-surface-container-low rounded-xl p-1 relative">
<div class="bg-surface-container-lowest rounded-lg p-6 shadow-sm border border-outline-variant/10">
<h3 class="text-xl font-headline text-primary font-bold mb-8">Mis Estudiantes y sus Narrativas</h3>
<div class="overflow-x-auto" *ngIf="!isLoading; else loadingTpl">
<table class="w-full text-left border-separate border-spacing-y-4">
<thead>
<tr class="text-secondary text-xs font-bold tracking-widest uppercase px-4">
<th class="pb-2 px-4">Estudiante</th>
<th class="pb-2 px-4">Correo</th>
<th class="pb-2 px-4">Grado</th>
<th class="pb-2 px-4 text-right">Acciones</th>
</tr>
</thead>
<tbody>
<ng-container *ngFor="let student of students">
<tr class="bg-surface hover:bg-surface-container-bright transition-colors">
<td class="py-4 px-4 rounded-l-xl">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
    {{ student.nombreCompleto?.charAt(0) }}
</div>
<div class="font-bold text-on-surface">{{ student.nombreCompleto }}</div>
</div>
</td>
<td class="py-4 px-4 text-sm text-on-surface-variant">{{ student.email }}</td>
<td class="py-4 px-4">
<span class="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold">{{ student.grado }}</span>
</td>
<td class="py-4 px-4 rounded-r-xl text-right">
<button (click)="viewNarratives(student)" class="p-2 rounded-lg hover:bg-tertiary/10 text-tertiary transition-colors" title="Ver Narrativas">
<span class="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
<!-- Expandible: Narrativas del estudiante -->
<tr *ngIf="selectedStudentId === student.id">
    <td colspan="4" class="p-4 bg-surface-variant/20 rounded-xl">
        <div class="space-y-4">
            <h4 class="text-sm font-bold text-primary uppercase tracking-wider">Narrativas de {{ student.nombreCompleto }}</h4>
            <div *ngIf="studentNarratives.length > 0; else noNarratives" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div *ngFor="let nar of studentNarratives" class="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-sm">
                    <p class="font-serif italic text-primary font-bold mb-1">{{ nar.titulo }}</p>
                    <p class="text-xs text-on-surface-variant mb-3 line-clamp-2">{{ nar.contenido }}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] px-2 py-0.5 rounded bg-outline-variant/20">{{ nar.status }}</span>
                        <button class="text-xs font-bold text-tertiary">Revisar</button>
                    </div>
                </div>
            </div>
            <ng-template #noNarratives>
                <p class="text-xs italic text-on-surface-variant">Este estudiante aún no ha tejido historias.</p>
            </ng-template>
        </div>
    </td>
</tr>
</ng-container>
</tbody>
</table>
</div>
<ng-template #loadingTpl>
    <div class="p-20 text-center space-y-4">
        <span class="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
        <p class="text-on-surface-variant">Cargando salón de clases...</p>
    </div>
</ng-template>
</div>
</section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class TeacherPanel implements OnInit {
  private listStudentsUseCase = inject(ListStudentsUseCase);
  private getNarrativesUseCase = inject(GetStudentNarrativesUseCase);

  students: User[] = [];
  studentNarratives: Narrative[] = [];
  selectedStudentId: string | undefined = undefined;
  isLoading = true;
  totalNarratives = 0;

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.isLoading = true;
    this.listStudentsUseCase.execute().subscribe({
      next: (students) => {
        this.students = students;
        this.isLoading = false;
        // Mock total narratives count for stats
        this.totalNarratives = students.length * 2; 
      },
      error: (err) => {
        console.error('Error loading students:', err);
        this.isLoading = false;
      }
    });
  }

  viewNarratives(student: User) {
    if (this.selectedStudentId === student.id) {
        this.selectedStudentId = undefined;
        return;
    }

    if (!student.id) return;
    
    this.selectedStudentId = student.id;
    this.getNarrativesUseCase.execute(student.id).subscribe({
      next: (narratives) => {
        this.studentNarratives = narratives;
      },
      error: (err) => console.error('Error fetching narratives:', err)
    });
  }
}
