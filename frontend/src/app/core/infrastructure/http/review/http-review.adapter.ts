import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReviewPort } from '../../../domain/ports/review.port';
import { Narrative } from '../../../domain/models/narrative.model';

@Injectable({ providedIn: 'root' })
export class HttpReviewAdapter implements ReviewPort {
  getPendingReviews(teacherId: string): Observable<Narrative[]> {
    console.log('[HttpReviewAdapter] Obteniendo revisiones pendientes para:', teacherId);
    return of([]);
  }

  approve(narrativeId: string, feedback?: string): Observable<Narrative> {
    console.log('[HttpReviewAdapter] Aprobando narrativa:', narrativeId, feedback);
    return of({ id: narrativeId, titulo: '', contenido: '', regionCultural: '', autor: { id: '' }, status: 'published' });
  }

  reject(narrativeId: string, feedback: string): Observable<Narrative> {
    console.log('[HttpReviewAdapter] Rechazando narrativa:', narrativeId, feedback);
    return of({ id: narrativeId, titulo: '', contenido: '', regionCultural: '', autor: { id: '' }, status: 'draft' });
  }
}
