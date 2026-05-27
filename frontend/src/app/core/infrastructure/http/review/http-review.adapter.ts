import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ReviewPort } from '../../../domain/ports/review.port';
import { Narrative } from '../../../domain/models/narrative.model';
import { BACKEND_CONFIG } from '../../config/backend.config';

@Injectable({ providedIn: 'root' })
export class HttpReviewAdapter implements ReviewPort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/revision`;

  private mapNarrativeFromApi(item: any): Narrative {
    return {
      id: item?.id,
      titulo: item?.titulo ?? '',
      contenido: item?.contenido ?? '',
      regionCultural: item?.regionCultural ?? '',
      autor: { id: item?.autor?.id ?? '' },
      estado: item?.estado,
      status: this.mapStatusFromBackend(item?.estado ?? item?.status)
    };
  }

  private mapStatusFromBackend(status?: string): Narrative['status'] {
    switch (status?.toLowerCase()) {
      case 'en_revision':
        return 'ready_for_review';
      case 'publicada':
      case 'aprobada':
        return 'published';
      case 'rechazada':
        return 'rejected';
      case 'borrador':
      default:
        return 'draft';
    }
  }

  getPendingReviews(teacherId: string): Observable<Narrative[]> {
    return this.http.get<any[]>(`${this.apiUrl}/grado/${encodeURIComponent(teacherId)}`).pipe(
      map((response) => response.map((item) => this.mapNarrativeFromApi(item)))
    );
  }

  approve(narrativeId: string, feedback?: string): Observable<Narrative> {
    return this.http.post<void>(`${this.apiUrl}/${narrativeId}/aprobar`, null, {
      params: { docenteId: localStorage.getItem('currentUserId') ?? '' }
    }).pipe(
      map(() => ({ id: narrativeId, titulo: '', contenido: '', regionCultural: '', autor: { id: '' }, status: 'published' }))
    );
  }

  reject(narrativeId: string, feedback: string): Observable<Narrative> {
    return this.http.post<void>(`${this.apiUrl}/${narrativeId}/rechazar`, null, {
      params: { docenteId: localStorage.getItem('currentUserId') ?? '', motivo: feedback }
    }).pipe(
      map(() => ({ id: narrativeId, titulo: '', contenido: '', regionCultural: '', autor: { id: '' }, status: 'rejected' }))
    );
  }
}
