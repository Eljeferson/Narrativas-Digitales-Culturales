import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface AdminPort {
  listUsers(): Observable<User[]>;
  changeRole(id: string, role: string, reason?: string, adminId?: string): Observable<void>;
}
