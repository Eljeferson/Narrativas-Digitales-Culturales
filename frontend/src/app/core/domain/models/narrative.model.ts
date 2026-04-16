export interface Narrative {
  id?: string;
  titulo: string;
  contenido: string;
  regionCultural: string;
  autor: { id: string };
  status?: 'draft' | 'ready_for_review' | 'published';
  createdAt?: Date;
  updatedAt?: Date;
}
