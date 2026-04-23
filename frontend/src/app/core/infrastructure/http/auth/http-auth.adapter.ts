import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { AuthPort } from '../../../domain/ports/auth.port';
import { User } from '../../../domain/models/user.model';
import { BACKEND_CONFIG } from '../../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthAdapter implements AuthPort {
  private static readonly STORAGE_KEY = 'culturastory.currentUser';

  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/auth`;

  private normalizeRole(role?: string): User['rol'] {
    const normalized = role?.toLowerCase();

    switch (normalized) {
      case 'docente':
      case 'teacher':
        return 'DOCENTE';
      case 'administrador':
      case 'admin':
        return 'ADMINISTRADOR';
      case 'comunidad':
        return 'COMUNIDAD';
      case 'estudiante':
      case 'student':
      default:
        return 'ESTUDIANTE';
    }
  }

  private buildDisplayName(email: string, providedName?: string): string {
    if (providedName?.trim()) {
      return providedName.trim();
    }

    const localPart = email.split('@')[0] ?? 'Usuario';
    return localPart
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Usuario';
  }

  private mapResponseToUser(response: any): User {
    const usuario = response?.usuario ?? response;
    const autor = response?.autor;

    return {
      id: usuario?.id ?? autor?.userId ?? '',
      email: usuario?.email ?? '',
      nombreCompleto: autor?.nombreCompleto ?? response?.nombreCompleto ?? this.buildDisplayName(usuario?.email ?? ''),
      authorId: autor?.id ?? response?.authorId,
      grado: autor?.grado ?? response?.grado,
      institucion: autor?.institucion ?? response?.institucion,
      lenguaMaterna: autor?.lenguaMaterna ?? response?.lenguaMaterna,
      bio: autor?.bio ?? response?.bio,
      fotoPerfilUrl: autor?.fotoPerfilUrl ?? response?.fotoPerfilUrl,
      regionCultural: autor?.regionCultural ?? response?.regionCultural,
      narrativasPublicadas: autor?.narrativasPublicadas ?? response?.narrativasPublicadas,
      activo: usuario?.activo ?? response?.activo,
      rol: this.normalizeRole(usuario?.rol ?? response?.rol)
    };
  }

  private persistUser(user: User): void {
    localStorage.setItem(HttpAuthAdapter.STORAGE_KEY, JSON.stringify(user));

    if (user.id) {
      localStorage.setItem('currentUserId', user.id);
    }
    if (user.email) {
      localStorage.setItem('currentUserEmail', user.email);
    }
    if (user.rol) {
      localStorage.setItem('currentUserRole', user.rol);
    }
    if (user.authorId) {
      localStorage.setItem('currentAuthorId', user.authorId);
    }
  }

  login(email: string, password: string, role: string): Observable<User> {
    const normalizedRole = email.trim().toLowerCase() === 'admin'
      ? 'admin'
      : this.normalizeRole(role)?.toString().toLowerCase();

    return this.http.post<any>(`${this.apiUrl}/login`, {
      email,
      password,
      rol: normalizedRole
    }).pipe(
      map((response) => this.mapResponseToUser(response)),
      tap((user) => this.persistUser(user))
    );
  }

  register(user: Partial<User>): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/registro`, user).pipe(
      map((response) => this.mapResponseToUser(response)),
      tap((savedUser) => this.persistUser(savedUser))
    );
  }

  syncSession(email: string): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/perfil/${email}`).pipe(
      map((response) => this.mapResponseToUser(response)),
      tap((user) => this.persistUser(user))
    );
  }

  logout(): Observable<void> {
    console.log('[HttpAuthAdapter] Logout');
    localStorage.removeItem(HttpAuthAdapter.STORAGE_KEY);
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserRole');
    localStorage.removeItem('currentAuthorId');
    return of(undefined);
  }

  getCurrentUser(): Observable<User | null> {
    const rawUser = localStorage.getItem(HttpAuthAdapter.STORAGE_KEY);
    if (!rawUser) {
      return of(null);
    }

    return of(JSON.parse(rawUser) as User);
  }
}
