export interface User {
  id: string;
  email: string;
  nombreCompleto?: string;
  authorId?: string;
  password?: string;
  grado?: string;
  institucion?: string;
  lenguaMaterna?: string;
  bio?: string;
  fotoPerfilUrl?: string;
  regionCultural?: string;
  narrativasPublicadas?: number;
  activo?: boolean;
  rol?: 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR' | 'COMUNIDAD' | 'estudiante' | 'docente' | 'administrador' | 'comunidad' | 'student' | 'teacher' | 'admin';
}
