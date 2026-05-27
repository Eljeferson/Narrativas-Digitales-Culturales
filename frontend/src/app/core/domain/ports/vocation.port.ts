import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { VocationResponse } from '../models/vocation.model';

export interface VocationPort {
  analyzeVocation(studentName: string, storyContent: string): Observable<VocationResponse>;
}

export const VOCATION_PORT = new InjectionToken<VocationPort>('VOCATION_PORT');
