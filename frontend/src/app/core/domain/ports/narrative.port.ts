import { Observable } from 'rxjs';
import { Narrative } from '../models/narrative.model';

export interface NarrativePort {
  generateOutline(culture: string): Observable<string>;
  create(narrative: Narrative): Observable<Narrative>;
  save(narrative: Narrative): Observable<Narrative>;
  getById(id: string): Observable<Narrative | null>;
  getAllByAuthor(authorId: string): Observable<Narrative[]>;
  delete(id: string): Observable<void>;
}
