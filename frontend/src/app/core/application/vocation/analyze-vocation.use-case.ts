import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { VocationPort } from '../../domain/ports/vocation.port';
import { VocationResponse } from '../../domain/models/vocation.model';

export const VOCATION_PORT = new InjectionToken<VocationPort>('VOCATION_PORT');

@Injectable({
  providedIn: 'root'
})
export class AnalyzeVocationUseCase {
  constructor(@Inject(VOCATION_PORT) private vocationPort: VocationPort) {}

  execute(studentName: string, storyContent: string): Observable<VocationResponse> {
    return this.vocationPort.analyzeVocation(studentName, storyContent);
  }
}
