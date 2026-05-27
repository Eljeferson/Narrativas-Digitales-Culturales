import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { BACKEND_CONFIG } from '../../config/backend.config';
import { HttpReviewAdapter } from './http-review.adapter';

describe('HttpReviewAdapter', () => {
  let adapter: HttpReviewAdapter;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        HttpReviewAdapter,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    adapter = TestBed.inject(HttpReviewAdapter);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('lista revisiones pendientes por grado y normaliza estados', async () => {
    const result = firstValueFrom(adapter.getPendingReviews('5to de Secundaria'));

    const request = http.expectOne(`${BACKEND_CONFIG.baseUrl}/revision/grado/5to%20de%20Secundaria`);
    expect(request.request.method).toBe('GET');
    request.flush([
      {
        id: 'nar-1',
        titulo: 'Relato pendiente',
        contenido: 'Contenido',
        regionCultural: 'andina',
        autor: { id: 'author-1' },
        estado: 'EN_REVISION'
      }
    ]);

    expect((await result)[0].status).toBe('ready_for_review');
  });

  it('aprueba narrativa usando el docente almacenado en frontend', async () => {
    localStorage.setItem('currentUserId', 'docente-1');

    const result = firstValueFrom(adapter.approve('nar-1'));

    const request = http.expectOne((req) =>
      req.url === `${BACKEND_CONFIG.baseUrl}/revision/nar-1/aprobar` &&
      req.params.get('docenteId') === 'docente-1'
    );
    expect(request.request.method).toBe('POST');
    request.flush(null);

    expect((await result).status).toBe('published');
  });

  it('rechaza narrativa con motivo y devuelve estado rechazado', async () => {
    localStorage.setItem('currentUserId', 'docente-1');

    const result = firstValueFrom(adapter.reject('nar-2', 'Falta evidencia cultural'));

    const request = http.expectOne((req) =>
      req.url === `${BACKEND_CONFIG.baseUrl}/revision/nar-2/rechazar` &&
      req.params.get('docenteId') === 'docente-1' &&
      req.params.get('motivo') === 'Falta evidencia cultural'
    );
    request.flush(null);

    expect((await result).status).toBe('rejected');
  });
});
