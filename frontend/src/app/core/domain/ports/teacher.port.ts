import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Narrative } from '../models/narrative.model';

export interface TeacherPort {
  listStudents(grade?: string): Observable<User[]>;
  getStudentNarratives(authorId: string): Observable<Narrative[]>;
}
