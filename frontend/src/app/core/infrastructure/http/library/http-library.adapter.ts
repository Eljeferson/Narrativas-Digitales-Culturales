import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LibraryPort } from '../../../domain/ports/library.port';
import { Narrative } from '../../../domain/models/narrative.model';

@Injectable({ providedIn: 'root' })
export class HttpLibraryAdapter implements LibraryPort {
  search(query: string, region?: string): Observable<Narrative[]> {
    console.log('[HttpLibraryAdapter] Buscando:', query, 'región:', region);
    return of([]);
  }

  getPublished(): Observable<Narrative[]> {
    console.log('[HttpLibraryAdapter] Obteniendo narrativas publicadas');
    return of([]);
  }

  getById(id: string): Observable<Narrative | null> {
    console.log('[HttpLibraryAdapter] Obteniendo narrativa:', id);
    return of(null);
  }
}
