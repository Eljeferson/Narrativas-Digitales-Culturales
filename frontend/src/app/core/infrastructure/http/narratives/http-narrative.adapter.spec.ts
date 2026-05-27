import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { BACKEND_CONFIG } from '../../config/backend.config';
import { HttpNarrativeAdapter } from './http-narrative.adapter';

describe('HttpNarrativeAdapter', () => {
  let adapter: HttpNarrativeAdapter;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpNarrativeAdapter,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    adapter = TestBed.inject(HttpNarrativeAdapter);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('crea narrativa y transforma el estado listo para revision al formato del backend', async () => {
    const result = firstValueFrom(adapter.create({
      titulo: 'El rio de mi comunidad',
      contenido: 'Una historia cultural',
      regionCultural: 'andina',
      autor: { id: 'author-1' },
      status: 'ready_for_review'
    }));

    const request = http.expectOne(`${BACKEND_CONFIG.baseUrl}/narrativas`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.estado).toBe('EN_REVISION');

    request.flush({
      id: 'nar-1',
      titulo: 'El rio de mi comunidad',
      contenido: 'Una historia cultural',
      regionCultural: 'andina',
      autor: { id: 'author-1' },
      estado: 'EN_REVISION'
    });

    expect((await result).status).toBe('ready_for_review');
  });

  it('actualiza narrativa publicada y conserva el id en el payload', async () => {
    const result = firstValueFrom(adapter.save({
      id: 'nar-2',
      titulo: 'Fiesta patronal',
      contenido: 'Relato actualizado',
      regionCultural: 'costena',
      autor: { id: 'author-1' },
      status: 'published'
    }));

    const request = http.expectOne(`${BACKEND_CONFIG.baseUrl}/narrativas`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toMatchObject({
      id: 'nar-2',
      estado: 'PUBLICADA'
    });

    request.flush({
      id: 'nar-2',
      titulo: 'Fiesta patronal',
      contenido: 'Relato actualizado',
      regionCultural: 'costena',
      autor: { id: 'author-1' },
      estado: 'PUBLICADA'
    });

    expect((await result).status).toBe('published');
  });

  it('recupera narrativas por autor y normaliza estados de aprobacion y rechazo', async () => {
    const result = firstValueFrom(adapter.getAllByAuthor('author-1'));

    const request = http.expectOne(`${BACKEND_CONFIG.baseUrl}/narrativas/autor/author-1`);
    request.flush([
      { id: 'nar-1', titulo: 'Aprobada', contenido: '', regionCultural: 'andina', autor: { id: 'author-1' }, estado: 'APROBADA' },
      { id: 'nar-2', titulo: 'Rechazada', contenido: '', regionCultural: 'andina', autor: { id: 'author-1' }, estado: 'RECHAZADA' }
    ]);

    const narratives = await result;

    expect(narratives.map((item) => item.status)).toEqual(['published', 'rejected']);
  });

  it('solicita esquema de IA como texto', async () => {
    const result = firstValueFrom(adapter.generateOutline('quechua'));

    const request = http.expectOne((req) =>
      req.url === `${BACKEND_CONFIG.baseUrl}/narrativas/generar-esquema` &&
      req.params.get('cultura') === 'quechua'
    );

    expect(request.request.responseType).toBe('text');
    request.flush('Inicio, conflicto y cierre');

    expect(await result).toContain('conflicto');
  });
});
