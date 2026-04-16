import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminPort } from '../../../domain/ports/admin.port';
import { User } from '../../../domain/models/user.model';
import { BACKEND_CONFIG } from '../../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpAdminAdapter implements AdminPort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/admin/usuarios`;

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  changeRole(id: string, role: string, reason?: string, adminId?: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/rol`, {
      rol: role,
      motivo: reason,
      adminId: adminId
    });
  }
}
