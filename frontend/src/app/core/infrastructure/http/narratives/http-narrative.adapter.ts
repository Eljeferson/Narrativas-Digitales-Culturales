import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NarrativePort } from '../../domain/ports/narrative.port';
import { Narrative } from '../../domain/models/narrative.model';
import { BACKEND_CONFIG } from '../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpNarrativeAdapter implements NarrativePort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/narrativas`;

  generateOutline(culture: string): Observable<string> {
    return this.http.get<{ esquema: string }>(`${this.apiUrl}/generar-esquema`, {
      params: { cultura: culture }
    }).pipe(map(res => res.esquema));
  }

  create(narrative: Narrative): Observable<Narrative> {
    return this.http.post<Narrative>(this.apiUrl, narrative);
  }

  save(narrative: Narrative): Observable<Narrative> {
    return this.http.put<Narrative>(this.apiUrl, narrative);
  }

  getById(id: string): Observable<Narrative | null> {
    return this.http.get<Narrative>(`${this.apiUrl}/${id}`);
  }

  getAllByAuthor(authorId: string): Observable<Narrative[]> {
    return this.http.get<Narrative[]>(`${this.apiUrl}/autor/${authorId}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
