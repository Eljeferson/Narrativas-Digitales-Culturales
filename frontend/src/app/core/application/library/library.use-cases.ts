import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryPort } from '../../domain/ports/library.port';
import { Narrative } from '../../domain/models/narrative.model';

export const LIBRARY_PORT = new InjectionToken<LibraryPort>('LIBRARY_PORT');

@Injectable({ providedIn: 'root' })
export class SearchNarrativesUseCase {
  constructor(@Inject(LIBRARY_PORT) private libraryPort: LibraryPort) {}

  execute(query: string, region?: string): Observable<Narrative[]> {
    return this.libraryPort.search(query, region);
  }
}

@Injectable({ providedIn: 'root' })
export class GetPublishedNarrativesUseCase {
  constructor(@Inject(LIBRARY_PORT) private libraryPort: LibraryPort) {}

  execute(): Observable<Narrative[]> {
    return this.libraryPort.getPublished();
  }
}
