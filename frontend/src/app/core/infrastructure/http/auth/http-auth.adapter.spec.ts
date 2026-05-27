import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpAuthAdapter } from './http-auth.adapter';

describe('HttpAuthAdapter', () => {
  let httpMock: HttpTestingController;
  let adapter: HttpAuthAdapter;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpMock = TestBed.inject(HttpTestingController);
    adapter = TestBed.runInInjectionContext(() => new HttpAuthAdapter());
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('normaliza el rol al iniciar sesion y persiste el usuario', () => {
    let actualEmail = '';

    adapter.login('ana@test.com', 'secreta', 'teacher').subscribe((user) => {
      actualEmail = user.email;
      expect(user.rol).toBe('DOCENTE');
      expect(user.nombreCompleto).toBe('Ana Docente');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/auth/login'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body.rol).toBe('docente');
    req.flush({
      usuario: { id: 'u1', email: 'ana@test.com', rol: 'docente', activo: true },
      autor: { id: 'a1', nombreCompleto: 'Ana Docente' }
    });

    expect(actualEmail).toBe('ana@test.com');
    expect(localStorage.getItem('currentUserRole')).toBe('DOCENTE');
    expect(localStorage.getItem('currentAuthorId')).toBe('a1');
  });

  it('envia aliases de password en el registro y guarda la sesion', () => {
    adapter.register({
      email: 'registro@test.com',
      password: 'clave123',
      rol: 'estudiante',
      nombreCompleto: 'Registro Test'
    }).subscribe((user) => {
      expect(user.email).toBe('registro@test.com');
      expect(user.rol).toBe('ESTUDIANTE');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/auth/registro'));
    expect(req.request.body.password).toBe('clave123');
    expect(req.request.body.contrasena).toBe('clave123');
    expect(req.request.body.clave).toBe('clave123');
    expect(req.request.body.role).toBe('estudiante');
    req.flush({
      usuario: { id: 'u2', email: 'registro@test.com', rol: 'estudiante', activo: true },
      autor: { id: 'a2', nombreCompleto: 'Registro Test', grado: '5to' }
    });

    expect(localStorage.getItem('currentUserEmail')).toBe('registro@test.com');
  });

  it('sincroniza sesion usando el perfil remoto', () => {
    adapter.syncSession('perfil@test.com').subscribe((user) => {
      expect(user.nombreCompleto).toBe('Perfil Remoto');
      expect(user.authorId).toBe('a3');
    });

    const req = httpMock.expectOne((request) => request.url.endsWith('/auth/perfil/perfil@test.com'));
    expect(req.request.method).toBe('GET');
    req.flush({
      usuario: { id: 'u3', email: 'perfil@test.com', rol: 'estudiante', activo: true },
      autor: { id: 'a3', nombreCompleto: 'Perfil Remoto', regionCultural: 'Puno' }
    });
  });

  it('cierra sesion limpiando almacenamiento local', () => {
    localStorage.setItem('culturastory.currentUser', '{}');
    localStorage.setItem('currentUserId', 'u1');
    localStorage.setItem('currentAuthorId', 'a1');

    adapter.logout().subscribe();

    expect(localStorage.getItem('culturastory.currentUser')).toBeNull();
    expect(localStorage.getItem('currentUserId')).toBeNull();
    expect(localStorage.getItem('currentAuthorId')).toBeNull();
  });

  it('recupera el usuario actual desde almacenamiento local', () => {
    localStorage.setItem('culturastory.currentUser', JSON.stringify({ id: 'u4', email: 'local@test.com' }));

    adapter.getCurrentUser().subscribe((user) => {
      expect(user?.email).toBe('local@test.com');
    });
  });
});
