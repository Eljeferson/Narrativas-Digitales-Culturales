export interface Narrative {
  id?: string;
  titulo: string;
  contenido: string;
  regionCultural: string;
  autor: { id: string };
  status?: 'draft' | 'ready_for_review' | 'published' | 'rejected';
  estado?: 'BORRADOR' | 'EN_REVISION' | 'APROBADA' | 'RECHAZADA' | 'PUBLICADA' | 'borrador' | 'en_revision' | 'aprobada' | 'rechazada' | 'publicada';
  createdAt?: Date;
  updatedAt?: Date;
}
