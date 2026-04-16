export interface User {
  id: string;
  email: string;
  nombreCompleto: string;
  grado?: string;
  regionCultural?: string;
  rol?: 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR' | 'student' | 'teacher' | 'admin';
}
