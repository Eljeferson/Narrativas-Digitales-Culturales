import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VocationPort } from '../../../domain/ports/vocation.port';
import { VocationResponse } from '../../../domain/models/vocation.model';
import { BACKEND_CONFIG } from '../../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpVocationAdapter implements VocationPort {
  private http = inject(HttpClient);
  private apiUrl = BACKEND_CONFIG.iaUrl;

  analyzeVocation(studentName: string, storyContent: string): Observable<VocationResponse> {
    return this.http.post<VocationResponse>(`${this.apiUrl}/analyze`, {
      student_name: studentName,
      content: storyContent
    });
  }
}
