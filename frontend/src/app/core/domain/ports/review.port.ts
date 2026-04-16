import { Observable } from 'rxjs';
import { Narrative } from '../models/narrative.model';

export interface ReviewPort {
  getPendingReviews(teacherId: string): Observable<Narrative[]>;
  approve(narrativeId: string, feedback?: string): Observable<Narrative>;
  reject(narrativeId: string, feedback: string): Observable<Narrative>;
}
