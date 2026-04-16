import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherPort } from '../../domain/ports/teacher.port';
import { User } from '../../domain/models/user.model';
import { Narrative } from '../../domain/models/narrative.model';
import { BACKEND_CONFIG } from '../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpTeacherAdapter implements TeacherPort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/docente/estudiantes`;

  listStudents(grade: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, {
      params: { grado: grade }
    });
  }

  getStudentNarratives(authorId: string): Observable<Narrative[]> {
    return this.http.get<Narrative[]>(`${this.apiUrl}/${authorId}/narrativas`);
  }
}
