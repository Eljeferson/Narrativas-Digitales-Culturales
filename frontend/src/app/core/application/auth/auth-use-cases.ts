import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';

export const AUTH_PORT = new InjectionToken<AuthPort>('AUTH_PORT');

@Injectable({
  providedIn: 'root'
})
export class RegisterStudentUseCase {
  constructor(@Inject(AUTH_PORT) private authPort: AuthPort) {}

  execute(user: Partial<User>): Observable<User> {
    return this.authPort.register(user);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SyncSessionUseCase {
  constructor(@Inject(AUTH_PORT) private authPort: AuthPort) {}

  execute(email: string): Observable<User> {
    return this.authPort.syncSession(email);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetCurrentUserUseCase {
  constructor(@Inject(AUTH_PORT) private authPort: AuthPort) {}

  execute(): Observable<User | null> {
    return this.authPort.getCurrentUser();
  }
}

@Injectable({
  providedIn: 'root'
})
export class LogoutUseCase {
  constructor(@Inject(AUTH_PORT) private authPort: AuthPort) {}

  execute(): Observable<void> {
    return this.authPort.logout();
  }
}
