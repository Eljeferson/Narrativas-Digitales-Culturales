import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthPort } from '../../../domain/ports/auth.port';
import { User } from '../../../domain/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthAdapter implements AuthPort {
  login(email: string, password: string, role: string): Observable<User> {
    console.log(`[SupabaseAuthAdapter] Iniciando sesión para ${email} como ${role}`);
    const mockUser: User = {
      id: 'mock-uuid-123',
      email: email,
      nombreCompleto: 'Usuario de Pruebas',
      rol: role as any
    };
    return of(mockUser);
  }

  register(user: Partial<User>): Observable<User> {
    console.log('[SupabaseAuthAdapter] Mock Registro:', user);
    return of(user as User);
  }

  syncSession(email: string): Observable<User> {
    console.log('[SupabaseAuthAdapter] Mock SyncSession:', email);
    return of({ id: 'mock-user-123', email, nombreCompleto: 'Mock User', rol: 'ESTUDIANTE' });
  }

  logout(): Observable<void> {
    console.log('[SupabaseAuthAdapter] Cerrando sesión');
    return of(undefined);
  }

  getCurrentUser(): Observable<User | null> {
    return of(null);
  }
}
