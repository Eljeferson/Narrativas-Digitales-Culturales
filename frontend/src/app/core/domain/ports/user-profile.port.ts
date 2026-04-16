import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

export interface UserProfilePort {
  register(profile: UserProfile): Observable<UserProfile>;
  getProfile(userId: string): Observable<UserProfile | null>;
  updateProfile(userId: string, profile: Partial<UserProfile>): Observable<UserProfile>;
}
