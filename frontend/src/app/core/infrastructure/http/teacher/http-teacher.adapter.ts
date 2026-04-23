import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TeacherPort } from '../../../domain/ports/teacher.port';
import { User } from '../../../domain/models/user.model';
import { Narrative } from '../../../domain/models/narrative.model';
import { BACKEND_CONFIG } from '../../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpTeacherAdapter implements TeacherPort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/docente/estudiantes`;

  private mapStudent(student: any): User {
    return {
      id: student?.userId ?? student?.id ?? '',
      authorId: student?.id,
      email: student?.email ?? '',
      nombreCompleto: student?.nombreCompleto ?? 'Estudiante',
      grado: student?.grado,
      institucion: student?.institucion,
      regionCultural: student?.regionCultural,
      lenguaMaterna: student?.lenguaMaterna,
      bio: student?.bio,
      fotoPerfilUrl: student?.fotoPerfilUrl,
      narrativasPublicadas: student?.narrativasPublicadas,
      rol: 'ESTUDIANTE'
    };
  }

  private mapNarrative(item: any): Narrative {
    const estado = item?.estado;

    return {
      id: item?.id,
      titulo: item?.titulo ?? '',
      contenido: item?.contenido ?? '',
      regionCultural: item?.regionCultural ?? '',
      autor: { id: item?.autor?.id ?? '' },
      estado,
      status: estado?.toLowerCase() === 'en_revision'
        ? 'ready_for_review'
        : estado?.toLowerCase() === 'publicada'
          ? 'published'
          : 'draft'
    };
  }

  listStudents(grade?: string): Observable<User[]> {
    const params: Record<string, string> = {};
    if (grade) {
      params['grado'] = grade;
    }

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      map((students) => students.map((student) => this.mapStudent(student)))
    );
  }

  getStudentNarratives(authorId: string): Observable<Narrative[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${authorId}/narrativas`).pipe(
      map((narratives) => narratives.map((item) => this.mapNarrative(item)))
    );
  }
}
