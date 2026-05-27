import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VOCATION_PORT, VocationPort } from '../../domain/ports/vocation.port';
import { VocationResponse } from '../../domain/models/vocation.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyzeVocationUseCase {
  constructor(@Inject(VOCATION_PORT) private vocationPort: VocationPort) {}

  execute(studentName: string, storyContent: string): Observable<VocationResponse> {
    return this.vocationPort.analyzeVocation(studentName, storyContent);
  }
}
