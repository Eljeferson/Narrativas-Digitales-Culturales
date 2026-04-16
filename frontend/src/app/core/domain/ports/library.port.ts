import { Observable } from 'rxjs';
import { Narrative } from '../models/narrative.model';

export interface LibraryPort {
  search(query: string, region?: string): Observable<Narrative[]>;
  getPublished(): Observable<Narrative[]>;
  getById(id: string): Observable<Narrative | null>;
}
