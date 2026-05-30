import { Observable } from 'rxjs';
import { VocationResponse } from '../models/vocation.model';

export interface VocationPort {
  analyzeVocation(studentName: string, storyContent: string): Observable<VocationResponse>;
}
