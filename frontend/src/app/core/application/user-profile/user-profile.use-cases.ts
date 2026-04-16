import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfilePort } from '../../domain/ports/user-profile.port';
import { UserProfile } from '../../domain/models/user-profile.model';

export const USER_PROFILE_PORT = new InjectionToken<UserProfilePort>('USER_PROFILE_PORT');

@Injectable({ providedIn: 'root' })
export class RegisterUserUseCase {
  constructor(@Inject(USER_PROFILE_PORT) private userProfilePort: UserProfilePort) {}

  execute(profile: UserProfile): Observable<UserProfile> {
    return this.userProfilePort.register(profile);
  }
}

@Injectable({ providedIn: 'root' })
export class GetUserProfileUseCase {
  constructor(@Inject(USER_PROFILE_PORT) private userProfilePort: UserProfilePort) {}

  execute(userId: string): Observable<UserProfile | null> {
    return this.userProfilePort.getProfile(userId);
  }
}
