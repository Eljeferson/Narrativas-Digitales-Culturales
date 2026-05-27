import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpNarrativeAdapter } from './http-narrative.adapter';

describe('HttpNarrativeAdapter', () => {
  let httpMock: HttpTestingController;
  let adapter: HttpNarrativeAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpMock = TestBed.inject(HttpTestingController);
    adapter = TestBed.runInInjectionContext(() => new HttpNarrativeAdapter());
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('solicita un esquema de narrativa por cultura', () => {
    adapter.generateOutline('Cusco').subscribe((outline) => {
      expect(outline).toBe('Inicio, nudo y desenlace');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/narrativas/generar-esquema'));
    expect(req.request.params.get('cultura')).toBe('Cusco');
    expect(req.request.responseType).toBe('text');
    req.flush('Inicio, nudo y desenlace');
  });

  it('crea una narrativa mapeando el estado al backend y de regreso al frontend', () => {
    adapter.create({
      titulo: 'Relato',
      contenido: 'Contenido',
      regionCultural: 'Puno',
      autor: { id: 'autor-1' },
      status: 'ready_for_review'
    }).subscribe((narrative) => {
      expect(narrative.status).toBe('published');
      expect(narrative.estado).toBe('PUBLICADA');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/narrativas'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body.estado).toBe('EN_REVISION');
    req.flush({
      id: 'n1',
      titulo: 'Relato',
      contenido: 'Contenido',
      regionCultural: 'Puno',
      autor: { id: 'autor-1' },
      estado: 'PUBLICADA'
    });
  });

  it('guarda una narrativa existente conservando el id', () => {
    adapter.save({
      id: 'n2',
      titulo: 'Guardada',
      contenido: 'Texto',
      regionCultural: 'Ayacucho',
      autor: { id: 'autor-2' },
      status: 'draft'
    }).subscribe((narrative) => {
      expect(narrative.id).toBe('n2');
      expect(narrative.status).toBe('draft');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/narrativas'));
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.id).toBe('n2');
    expect(req.request.body.estado).toBe('BORRADOR');
    req.flush({
      id: 'n2',
      titulo: 'Guardada',
      contenido: 'Texto',
      regionCultural: 'Ayacucho',
      autor: { id: 'autor-2' },
      estado: 'BORRADOR'
    });
  });

  it('lista narrativas por autor con estados traducidos', () => {
    adapter.getAllByAuthor('autor-3').subscribe((items) => {
      expect(items).toHaveLength(2);
      expect(items[0].status).toBe('ready_for_review');
      expect(items[1].status).toBe('rejected');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/narrativas/autor/autor-3'));
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: 'n3', titulo: 'Uno', contenido: '', regionCultural: '', autor: { id: 'autor-3' }, estado: 'EN_REVISION' },
      { id: 'n4', titulo: 'Dos', contenido: '', regionCultural: '', autor: { id: 'autor-3' }, estado: 'RECHAZADA' }
    ]);
  });

  it('elimina una narrativa por id', () => {
    adapter.delete('n5').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/narrativas/n5'));
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
