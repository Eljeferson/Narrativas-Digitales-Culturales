import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthAdapter implements AuthPort {
  login(email: string, password: string, role: string): Observable<User> {
    console.log(`[SupabaseAuthAdapter] Iniciando sesión para ${email} como ${role}`);
    // Simulamos una respuesta existosa por ahora
    const mockUser: User = {
      id: 'mock-uuid-123',
      email: email,
      name: 'Usuario de Pruebas',
      role: role as any
    };
    return of(mockUser);
  }

  logout(): Observable<void> {
    console.log('[SupabaseAuthAdapter] Cerrando sesión');
    return of(undefined);
  }

  getCurrentUser(): Observable<User | null> {
    // Aquí se consultaría la sesión actual de Supabase
    return of(null);
  }
}
