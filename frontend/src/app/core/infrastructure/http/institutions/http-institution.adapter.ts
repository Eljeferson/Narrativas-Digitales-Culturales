import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstitutionPort } from '../../../domain/ports/institution.port';
import { Institution } from '../../../domain/models/institution.model';
import { BACKEND_CONFIG } from '../../config/backend.config';

@Injectable({
  providedIn: 'root'
})
export class HttpInstitutionAdapter implements InstitutionPort {
  private http = inject(HttpClient);
  private apiUrl = `${BACKEND_CONFIG.baseUrl}/instituciones`;

  getAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.apiUrl);
  }

  searchByName(name: string, grado?: string): Observable<Institution[]> {
    let url = `${this.apiUrl}?nombre=${name}`;
    if (grado) {
      url += `&grado=${grado}`;
    }
    return this.http.get<Institution[]>(url);
  }
}
