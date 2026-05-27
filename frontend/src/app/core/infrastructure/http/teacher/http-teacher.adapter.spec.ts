import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTeacherAdapter } from './http-teacher.adapter';

describe('HttpTeacherAdapter', () => {
  let httpMock: HttpTestingController;
  let adapter: HttpTeacherAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpMock = TestBed.inject(HttpTestingController);
    adapter = TestBed.runInInjectionContext(() => new HttpTeacherAdapter());
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('lista estudiantes filtrando por grado', () => {
    adapter.listStudents('5to').subscribe((students) => {
      expect(students).toHaveLength(1);
      expect(students[0].rol).toBe('ESTUDIANTE');
      expect(students[0].email).toBe('estudiante@test.com');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/docente/estudiantes'));
    expect(req.request.params.get('grado')).toBe('5to');
    req.flush([
      {
        id: 'autor-1',
        userId: 'u1',
        email: 'estudiante@test.com',
        nombreCompleto: 'Estudiante Test',
        grado: '5to',
        institucion: 'IE 123'
      }
    ]);
  });

  it('obtiene narrativas del estudiante con estado traducido', () => {
    adapter.getStudentNarratives('autor-2').subscribe((items) => {
      expect(items).toHaveLength(2);
      expect(items[0].status).toBe('ready_for_review');
      expect(items[1].status).toBe('published');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/docente/estudiantes/autor-2/narrativas'));
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: 'n1', titulo: 'Uno', contenido: '', regionCultural: '', autor: { id: 'autor-2' }, estado: 'EN_REVISION' },
      { id: 'n2', titulo: 'Dos', contenido: '', regionCultural: '', autor: { id: 'autor-2' }, estado: 'PUBLICADA' }
    ]);
  });
});
