import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { NarrativePort } from '../../domain/ports/narrative.port';
import { Narrative } from '../../domain/models/narrative.model';

export const NARRATIVE_PORT = new InjectionToken<NarrativePort>('NARRATIVE_PORT');

@Injectable({
  providedIn: 'root'
})
export class GenerateOutlineUseCase {
  constructor(@Inject(NARRATIVE_PORT) private narrativePort: NarrativePort) {}

  execute(culture: string): Observable<string> {
    return this.narrativePort.generateOutline(culture);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CreateNarrativeUseCase {
  constructor(@Inject(NARRATIVE_PORT) private narrativePort: NarrativePort) {}

  execute(narrative: Narrative): Observable<Narrative> {
    return this.narrativePort.create(narrative);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SaveNarrativeUseCase {
  constructor(@Inject(NARRATIVE_PORT) private narrativePort: NarrativePort) {}

  execute(narrative: Narrative): Observable<Narrative> {
    return this.narrativePort.save(narrative);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetNarrativeByIdUseCase {
  constructor(@Inject(NARRATIVE_PORT) private narrativePort: NarrativePort) {}

  execute(id: string): Observable<Narrative | null> {
    return this.narrativePort.getById(id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListNarrativesUseCase {
  constructor(@Inject(NARRATIVE_PORT) private narrativePort: NarrativePort) {}

  execute(authorId: string): Observable<Narrative[]> {
    return this.narrativePort.getAllByAuthor(authorId);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ImproveNarrativeUseCase {
  constructor(@Inject(NARRATIVE_PORT) private narrativePort: NarrativePort) {}

  execute(title: string, culture: string, content: string): Observable<string> {
    return this.narrativePort.improveNarrative(title, culture, content);
  }
}
