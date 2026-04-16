import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminPort } from '../../domain/ports/admin.port';
import { User } from '../../domain/models/user.model';

export const ADMIN_PORT = new InjectionToken<AdminPort>('ADMIN_PORT');

@Injectable({
  providedIn: 'root'
})
export class ListUsersUseCase {
  constructor(@Inject(ADMIN_PORT) private adminPort: AdminPort) {}

  execute(): Observable<User[]> {
    return this.adminPort.listUsers();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChangeRoleUseCase {
  constructor(@Inject(ADMIN_PORT) private adminPort: AdminPort) {}

  execute(id: string, role: string, reason: string, adminId: string): Observable<void> {
    return this.adminPort.changeRole(id, role, reason, adminId);
  }
}
