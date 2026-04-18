import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Institution } from '../../domain/models/institution.model';
import { InstitutionPort } from '../../domain/ports/institution.port';

export const INSTITUTION_PORT = new InjectionToken<InstitutionPort>('InstitutionPort');

@Injectable({
  providedIn: 'root'
})
export class GetInstitutionsUseCase {
  constructor(@Inject(INSTITUTION_PORT) private port: InstitutionPort) {}
  
  execute(): Observable<Institution[]> {
    return this.port.getAll();
  }
}

@Injectable({
  providedIn: 'root'
})
export class SearchInstitutionsUseCase {
  constructor(@Inject(INSTITUTION_PORT) private port: InstitutionPort) {}

  execute(name: string, grado?: string): Observable<Institution[]> {
    return this.port.searchByName(name, grado);
  }
}
