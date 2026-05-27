import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Role = 'ESTUDIANTE' | 'DOCENTE' | 'COMUNIDAD' | 'ADMINISTRADOR';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  region: string;
}

interface RoleLog {
  date: string;
  responsible: string;
  user: string;
  previousRole: Role;
  nextRole: Role;
}

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<main class="min-h-screen bg-background px-4 py-6 text-on-surface md:px-10">
  <section class="mx-auto max-w-7xl">
    <header class="mb-8">
      <p class="text-xs font-bold uppercase tracking-widest text-tertiary">HU-08 · Administración</p>
      <h1 class="font-headline text-4xl font-bold text-primary">Gestión de usuarios y roles</h1>
      <p class="mt-2 text-on-surface-variant">Cambios de rol inmediatos con registro de fecha y responsable.</p>
    </header>

    <section class="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div class="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant p-4">
          <input [(ngModel)]="query" class="rounded-lg border border-outline-variant bg-surface px-4 py-2" placeholder="Buscar usuario">
          <span class="text-sm font-bold text-primary">{{ filteredUsers.length }} usuarios</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-surface-container text-xs uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th class="px-5 py-3">Usuario</th>
                <th class="px-5 py-3">Región</th>
                <th class="px-5 py-3">Rol</th>
                <th class="px-5 py-3">Cambiar rol</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/40">
              <tr *ngFor="let user of filteredUsers">
                <td class="px-5 py-4">
                  <p class="font-bold">{{ user.name }}</p>
                  <p class="text-xs text-on-surface-variant">{{ user.email }}</p>
                </td>
                <td class="px-5 py-4 text-sm">{{ user.region }}</td>
                <td class="px-5 py-4"><span class="rounded bg-tertiary/10 px-2 py-1 text-xs font-bold text-tertiary">{{ user.role }}</span></td>
                <td class="px-5 py-4">
                  <select [ngModel]="user.role" (ngModelChange)="changeRole(user, $event)" class="rounded-lg border border-outline-variant bg-surface px-3 py-2">
                    <option value="ESTUDIANTE">Estudiante</option>
                    <option value="DOCENTE">Docente</option>
                    <option value="COMUNIDAD">Comunidad</option>
                    <option value="ADMINISTRADOR">Administrador</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <aside class="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
        <h2 class="font-headline text-2xl font-bold text-primary">Log de cambios</h2>
        <div class="mt-4 space-y-3">
          <article *ngFor="let item of logs" class="rounded-lg bg-surface-container p-4 text-sm">
            <p class="font-bold">{{ item.user }}: {{ item.previousRole }} → {{ item.nextRole }}</p>
            <p class="text-on-surface-variant">{{ item.date }} · Responsable: {{ item.responsible }}</p>
          </article>
        </div>
      </aside>
    </section>
  </section>
</main>
  `,
  styles: `:host { display: block; }`
})
export class UserAdmin {
  query = '';
  responsible = 'admin@culturastory.edu.pe';
  users: ManagedUser[] = [
    { id: 'u1', name: 'Mateo Huamán', email: 'mateo@colegio.edu.pe', role: 'ESTUDIANTE', region: 'Cusco' },
    { id: 'u2', name: 'Rosa Quispe', email: 'rosa@colegio.edu.pe', role: 'DOCENTE', region: 'Puno' },
    { id: 'u3', name: 'Colectivo Memoria Viva', email: 'comunidad@memoria.pe', role: 'COMUNIDAD', region: 'Amazonas' }
  ];
  logs: RoleLog[] = [
    { date: new Date().toLocaleString('es-PE'), responsible: 'admin@culturastory.edu.pe', user: 'Rosa Quispe', previousRole: 'ESTUDIANTE', nextRole: 'DOCENTE' }
  ];

  get filteredUsers(): ManagedUser[] {
    const value = this.query.toLowerCase().trim();
    return this.users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(value));
  }

  changeRole(user: ManagedUser, nextRole: Role): void {
    if (user.role === nextRole) return;
    const previousRole = user.role;
    user.role = nextRole;
    this.logs.unshift({
      date: new Date().toLocaleString('es-PE'),
      responsible: this.responsible,
      user: user.name,
      previousRole,
      nextRole
    });
  }
}
