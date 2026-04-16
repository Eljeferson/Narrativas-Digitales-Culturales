import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersUseCase, ChangeRoleUseCase } from '../../core/application/admin/admin-use-cases';
import { User } from '../../core/domain/models/user.model';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="thread-scroll hidden lg:block"></div>
<!-- SideNavBar Component -->
<aside class="fixed left-0 top-0 h-full flex flex-col p-6 space-y-4 bg-[#FFF8EF] dark:bg-[#1E1B13] h-screen w-64 border-r-0 z-40">
<div class="mb-8 flex items-center gap-3">
<div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-container" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
</div>
<div>
<h2 class="text-lg font-headline text-[#823B18] leading-none">The Weaver's Hub</h2>
<p class="text-xs font-medium opacity-60">Portal de Administrador</p>
</div>
</div>
<nav class="flex-1 space-y-1">
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all text-sm font-medium" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 bg-[#823B18] text-[#FFF8EF] rounded-md px-4 py-3 shadow-sm text-sm font-medium translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined">group</span>
                Gestión de Usuarios
            </a>
<a class="flex items-center gap-3 text-[#1E1B13] dark:text-[#FFF8EF] px-4 py-3 opacity-70 hover:bg-[#795900]/10 transition-all text-sm font-medium" href="#">
<span class="material-symbols-outlined">auto_stories</span>
                Narrativas
            </a>
</nav>
<button class="w-full py-3 px-4 bg-primary text-on-primary rounded-xl font-semibold flex items-center justify-center gap-2 mb-6 hover:bg-primary/90 transition-colors">
<span class="material-symbols-outlined">person_add</span>
            Invitar usuario
        </button>
<div class="pt-6 border-t border-outline-variant/30 space-y-1">
<a class="flex items-center gap-3 text-error px-4 py-3 opacity-70 hover:bg-error/5 transition-all text-sm font-medium cursor-pointer" href="/">
<span class="material-symbols-outlined">logout</span>
                Cerrar Sesión
            </a>
</div>
</aside>
<main class="ml-64 min-h-screen p-8 lg:p-12 relative">
<!-- Header Section -->
<header class="mb-12">
<h1 class="font-headline text-4xl text-primary font-bold italic mb-2 tracking-tight">Gestión de Usuarios</h1>
<p class="text-on-surface-variant max-w-2xl">Administra la comunidad de CulturaStory AI. Supervisa roles y accesos.</p>
</header>
<!-- Stats Bento Grid -->
<section class="grid grid-cols-12 gap-6 mb-12">
<div class="col-span-12 md:col-span-4 bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden border border-outline-variant/10">
<div class="relative z-10">
<p class="text-secondary font-semibold text-sm mb-1">Total Usuarios registrados</p>
<h3 class="text-5xl font-headline font-bold text-on-surface">{{ users.length }}</h3>
</div>
</div>
<div class="col-span-12 md:col-span-8 bg-surface-container-low p-8 rounded-xl flex items-end justify-between border-b-4 border-secondary/20">
<div class="space-y-4">
<p class="text-sm font-medium opacity-70">Distribución de accesos en tiempo real</p>
</div>
<div class="text-right">
<span class="material-symbols-outlined text-6xl text-primary opacity-20">diversity_3</span>
</div>
</div>
</section>
<!-- Main Content Area -->
<section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
<!-- Filter Bar -->
<div class="p-6 border-b border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
<div class="flex items-center gap-3">
<span class="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Filtrar:</span>
<div class="flex gap-2">
<button class="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">Todos</button>
</div>
</div>
<div class="relative min-w-[300px]">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface-variant border-none border-b-2 border-outline-variant focus:ring-0 focus:border-tertiary transition-colors text-sm rounded-t-lg" placeholder="Buscar por email..." type="text"/>
</div>
</div>
<!-- Table -->
<div class="overflow-x-auto" *ngIf="!isLoading; else loadingTpl">
<table class="w-full text-left border-collapse">
<thead class="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-[0.2em] font-bold">
<tr>
<th class="px-8 py-4">Usuario</th>
<th class="px-6 py-4">Rol Actual</th>
<th class="px-6 py-4">Región</th>
<th class="px-6 py-4 text-right">Acciones</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<tr *ngFor="let user of users" class="hover:bg-surface-bright transition-colors group">
<td class="px-8 py-5">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center font-bold text-primary">
    {{ user.nombreCompleto?.charAt(0) || 'U' }}
</div>
<div>
<p class="font-bold text-on-surface">{{ user.nombreCompleto }}</p>
<p class="text-xs text-on-surface-variant">{{ user.email }}</p>
</div>
</div>
</td>
<td class="px-6 py-5">
<span [ngClass]="{
    'bg-primary/10 text-primary': user.rol === 'DOCENTE',
    'bg-tertiary/10 text-tertiary': user.rol === 'ESTUDIANTE',
    'bg-secondary/10 text-secondary': user.rol === 'ADMINISTRADOR'
}" class="px-2.5 py-1 rounded text-xs font-bold uppercase">{{ user.rol }}</span>
</td>
<td class="px-6 py-5">
    <span class="text-xs font-medium">{{ user.regionCultural || 'No especificada' }}</span>
</td>
<td class="px-6 py-5 text-right">
<div class="flex items-center justify-end gap-2">
<button (click)="promoteToTeacher(user)" *ngIf="user.rol === 'ESTUDIANTE'" class="p-2 hover:bg-secondary-container rounded-lg transition-colors text-secondary" title="Promover a Docente">
<span class="material-symbols-outlined text-lg">grade</span>
</button>
<button class="p-2 hover:bg-error-container rounded-lg transition-colors text-error" title="Bloquear Acceso">
<span class="material-symbols-outlined text-lg">block</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<ng-template #loadingTpl>
    <div class="p-20 text-center space-y-4">
        <span class="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
        <p class="text-on-surface-variant">Cargando tejedores...</p>
    </div>
</ng-template>
</section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class UserAdmin implements OnInit {
  private listUsersUseCase = inject(ListUsersUseCase);
  private changeRoleUseCase = inject(ChangeRoleUseCase);

  users: User[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.listUsersUseCase.execute().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.isLoading = false;
      }
    });
  }

  promoteToTeacher(user: User) {
    if (!user.id) return;
    if (confirm(`¿Estás seguro de promover a ${user.nombreCompleto} a DOCENTE?`)) {
      this.changeRoleUseCase.execute(user.id, 'DOCENTE').subscribe({
        next: () => {
            alert('Rol actualizado con éxito');
            this.loadUsers();
        },
        error: (err) => alert('Error al actualizar rol')
      });
    }
  }
}
