import { Observable } from 'rxjs';
import { Institution } from '../models/institution.model';

export interface InstitutionPort {
  getAll(): Observable<Institution[]>;
  searchByName(name: string): Observable<Institution[]>;
}
