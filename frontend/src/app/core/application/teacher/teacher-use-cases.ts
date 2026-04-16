import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherPort } from '../../domain/ports/teacher.port';
import { User } from '../../domain/models/user.model';
import { Narrative } from '../../domain/models/narrative.model';

export const TEACHER_PORT = new InjectionToken<TeacherPort>('TEACHER_PORT');

@Injectable({
  providedIn: 'root'
})
export class ListStudentsUseCase {
  constructor(@Inject(TEACHER_PORT) private teacherPort: TeacherPort) {}

  execute(grade?: string): Observable<User[]> {
    return this.teacherPort.listStudents(grade);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetStudentNarrativesUseCase {
  constructor(@Inject(TEACHER_PORT) private teacherPort: TeacherPort) {}

  execute(authorId: string): Observable<Narrative[]> {
    return this.teacherPort.getStudentNarratives(authorId);
  }
}
