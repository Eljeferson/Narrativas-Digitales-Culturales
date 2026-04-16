export interface User {
  id: string;
  email: string;
  nombreCompleto: string;
  grado?: string;
  regionCultural?: string;
  role?: 'student' | 'teacher' | 'admin';
}
