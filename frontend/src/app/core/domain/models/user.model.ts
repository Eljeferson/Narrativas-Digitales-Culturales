export interface User {
  id: string;
  email: string;
  nombreCompleto: string;
  grado?: string;
  institucion?: string;
  lenguaMaterna?: string;
  bio?: string;
  fotoPerfilUrl?: string;
  regionCultural?: string;
  narrativasPublicadas?: number;
  rol?: 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR' | 'student' | 'teacher' | 'admin';
}
