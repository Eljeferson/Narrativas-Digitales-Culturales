import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { NarrativePort } from '../../domain/ports/narrative.port';
import { Narrative } from '../../domain/models/narrative.model';

export const NARRATIVE_PORT = new InjectionToken<NarrativePort>('NARRATIVE_PORT');

@Injectable({
  providedIn: 'root'
})
export class SaveNarrativeUseCase {
  constructor(@Inject(NARRATIVE_PORT) private narrativePort: NarrativePort) {}

  execute(narrative: Narrative): Observable<Narrative> {
    console.log('[SaveNarrativeUseCase] Ejecutando lógica de guardado para:', narrative.title);
    // Aquí se podrían añadir reglas de negocio (ej. validaciones, formateo)
    return this.narrativePort.save(narrative);
  }
}
