import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AdminPort } from '../../../domain/ports/admin.port';
import { User } from '../../../domain/models/user.model';
import { BACKEND_CONFIG } from '../../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpAdminAdapter implements AdminPort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/admin/usuarios`;

  private normalizeRole(role?: string): User['rol'] {
    switch (role?.toLowerCase()) {
      case 'docente':
        return 'DOCENTE';
      case 'administrador':
        return 'ADMINISTRADOR';
      case 'comunidad':
        return 'COMUNIDAD';
      case 'estudiante':
      default:
        return 'ESTUDIANTE';
    }
  }

  private buildDisplayName(email: string, fallback?: string): string {
    if (fallback?.trim()) {
      return fallback.trim();
    }

    const localPart = email.split('@')[0] ?? 'Usuario';
    return localPart
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Usuario';
  }

  private mapUser(user: any): User {
    return {
      id: user?.id ?? '',
      email: user?.email ?? '',
      nombreCompleto: this.buildDisplayName(user?.email ?? '', user?.nombreCompleto),
      regionCultural: user?.regionCultural,
      activo: user?.activo,
      rol: this.normalizeRole(user?.rol)
    };
  }

  listUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.map((user) => this.mapUser(user)))
    );
  }

  changeRole(id: string, role: string, reason?: string, adminId?: string): Observable<void> {
    const normalizedRole = role.toLowerCase();

    return this.http.patch<void>(`${this.apiUrl}/${id}/rol`, {
      rol: normalizedRole,
      motivo: reason ?? 'Actualizacion de rol desde panel administrativo',
      adminId: adminId ?? localStorage.getItem('currentUserId')
    });
  }
}
