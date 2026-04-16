export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  grade?: string;
  region?: string;
  nativeLanguage?: string;
  photoUrl?: string;
  role: 'student' | 'teacher' | 'admin';
}
