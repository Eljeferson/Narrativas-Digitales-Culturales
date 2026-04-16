import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';

export const AUTH_PORT = new InjectionToken<AuthPort>('AUTH_PORT');

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  constructor(@Inject(AUTH_PORT) private authPort: AuthPort) {}

  execute(email: string, password: string, role: string): Observable<User> {
    // Aquí se podría añadir lógica de dominio adicional si fuera necesario
    return this.authPort.login(email, password, role);
  }
}
