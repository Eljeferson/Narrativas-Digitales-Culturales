import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';
import { BACKEND_CONFIG } from '../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthAdapter implements AuthPort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/auth`;

  login(email: string, password: string, role: string): Observable<User> {
    // Por ahora simulamos el login, ya que no hay endpoint de login en la lista
    // pero guardamos el correo en el estado local para sincronizar el perfil después.
    console.log(`[HttpAuthAdapter] Mock Login para ${email}`);
    return this.syncSession(email);
  }

  register(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/registro`, user);
  }

  syncSession(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/perfil/${email}`);
  }

  logout(): Observable<void> {
    console.log('[HttpAuthAdapter] Logout');
    return of(undefined);
  }

  getCurrentUser(): Observable<User | null> {
    // Aquí se podría implementar una verificación de sesión persistente con Supabase o localStorage
    return of(null);
  }
}
