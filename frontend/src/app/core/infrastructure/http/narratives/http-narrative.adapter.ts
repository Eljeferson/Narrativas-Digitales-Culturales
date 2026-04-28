import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NarrativePort } from '../../../domain/ports/narrative.port';
import { Narrative } from '../../../domain/models/narrative.model';
import { BACKEND_CONFIG } from '../../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpNarrativeAdapter implements NarrativePort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/narrativas`;

  private mapStatusFromBackend(status?: string): Narrative['status'] {
    const normalized = status?.toLowerCase();

    switch (normalized) {
      case 'en_revision':
        return 'ready_for_review';
      case 'publicada':
        return 'published';
      case 'rechazada':
        return 'rejected';
      case 'aprobada':
        return 'published';
      case 'borrador':
      default:
        return 'draft';
    }
  }

  private mapStatusToBackend(status?: Narrative['status']): string | undefined {
    switch (status) {
      case 'ready_for_review':
        return 'EN_REVISION';
      case 'published':
        return 'PUBLICADA';
      case 'rejected':
        return 'RECHAZADA';
      case 'draft':
      default:
        return 'BORRADOR';
    }
  }

  private mapNarrativeFromApi(item: any): Narrative {
    return {
      id: item?.id,
      titulo: item?.titulo ?? '',
      contenido: item?.contenido ?? '',
      regionCultural: item?.regionCultural ?? '',
      autor: { id: item?.autor?.id ?? '' },
      estado: item?.estado,
      status: this.mapStatusFromBackend(item?.estado ?? item?.status),
      createdAt: item?.createdAt,
      updatedAt: item?.updatedAt
    };
  }

  private mapNarrativeToApi(narrative: Narrative): any {
    const payload: any = {
      titulo: narrative.titulo,
      contenido: narrative.contenido,
      regionCultural: narrative.regionCultural,
      autor: narrative.autor
    };

    if (narrative.id) {
      payload.id = narrative.id;
    }

    const estado = this.mapStatusToBackend(narrative.status);
    if (estado) {
      payload.estado = estado;
    }

    return payload;
  }

  generateOutline(culture: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/generar-esquema`, {
      params: { cultura: culture },
      responseType: 'text'
    });
  }

  create(narrative: Narrative): Observable<Narrative> {
    return this.http.post<any>(this.apiUrl, this.mapNarrativeToApi(narrative)).pipe(
      map((response) => this.mapNarrativeFromApi(response))
    );
  }

  save(narrative: Narrative): Observable<Narrative> {
    return this.http.put<any>(this.apiUrl, this.mapNarrativeToApi(narrative)).pipe(
      map((response) => this.mapNarrativeFromApi(response))
    );
  }

  getById(id: string): Observable<Narrative | null> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((response) => this.mapNarrativeFromApi(response))
    );
  }

  getAllByAuthor(authorId: string): Observable<Narrative[]> {
    return this.http.get<any[]>(`${this.apiUrl}/autor/${authorId}`).pipe(
      map((response) => response.map((item) => this.mapNarrativeFromApi(item)))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  improveNarrative(title: string, culture: string, content: string): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/mejorar-narrativa`, {
      titulo: title,
      cultura: culture,
      contenido: content
    }).pipe(
      map(response => response.respuesta)
    );
  }
}
