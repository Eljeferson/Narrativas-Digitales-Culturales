import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserProfilePort } from '../../domain/ports/user-profile.port';
import { UserProfile } from '../../domain/models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class HttpUserProfileAdapter implements UserProfilePort {
  register(profile: UserProfile): Observable<UserProfile> {
    console.log('[HttpUserProfileAdapter] Registrando perfil:', profile.fullName);
    return of({ ...profile, id: `user-${Date.now()}` });
  }

  getProfile(userId: string): Observable<UserProfile | null> {
    console.log('[HttpUserProfileAdapter] Obteniendo perfil:', userId);
    return of(null);
  }

  updateProfile(userId: string, profile: Partial<UserProfile>): Observable<UserProfile> {
    console.log('[HttpUserProfileAdapter] Actualizando perfil:', userId);
    return of({ id: userId, fullName: '', email: '', role: 'student', ...profile });
  }
}
