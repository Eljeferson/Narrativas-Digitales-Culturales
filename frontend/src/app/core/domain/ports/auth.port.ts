import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface AuthPort {
  login(email: string, password: string, role: string): Observable<User>;
  register(user: Partial<User>): Observable<User>;
  syncSession(email: string): Observable<User>;
  logout(): Observable<void>;
  getCurrentUser(): Observable<User | null>;
}
