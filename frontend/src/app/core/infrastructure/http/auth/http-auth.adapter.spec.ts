import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { BACKEND_CONFIG } from '../../config/backend.config';
import { HttpAuthAdapter } from './http-auth.adapter';

describe('HttpAuthAdapter', () => {
  let adapter: HttpAuthAdapter;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        HttpAuthAdapter,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    adapter = TestBed.inject(HttpAuthAdapter);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('inicia sesion, normaliza rol docente y persiste la sesion frontend', async () => {
    const result = firstValueFrom(adapter.login('docente@cultura.edu', 'Clave-123', 'teacher'));

    const request = http.expectOne(`${BACKEND_CONFIG.baseUrl}/auth/login`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      email: 'docente@cultura.edu',
      password: 'Clave-123',
      rol: 'docente'
    });

    request.flush({
      usuario: {
        id: 'user-1',
        email: 'docente@cultura.edu',
        rol: 'docente',
        activo: true
      },
      autor: {
        id: 'author-1',
        nombreCompleto: 'Maria Quispe',
        grado: '5to de Secundaria',
        institucion: 'Colegio Cultura'
      }
    });

    const user = await result;

    expect(user.rol).toBe('DOCENTE');
    expect(user.authorId).toBe('author-1');
    expect(localStorage.getItem('currentUserId')).toBe('user-1');
    expect(localStorage.getItem('currentAuthorId')).toBe('author-1');
    expect(localStorage.getItem('currentUserRole')).toBe('DOCENTE');
  });

  it('registra estudiante y construye nombre visible si el backend no lo envia', async () => {
    const result = firstValueFrom(adapter.register({
      email: 'ana.paz@cultura.edu',
      rol: 'estudiante'
    }));

    const request = http.expectOne(`${BACKEND_CONFIG.baseUrl}/auth/registro`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.email).toBe('ana.paz@cultura.edu');

    request.flush({
      usuario: {
        id: 'user-2',
        email: 'ana.paz@cultura.edu',
        rol: 'estudiante'
      }
    });

    const user = await result;

    expect(user.nombreCompleto).toBe('Ana Paz');
    expect(user.rol).toBe('ESTUDIANTE');
  });

  it('sincroniza perfil por correo y limpia los datos al cerrar sesion', async () => {
    const synced = firstValueFrom(adapter.syncSession('admin@cultura.edu'));

    const request = http.expectOne(`${BACKEND_CONFIG.baseUrl}/auth/perfil/admin@cultura.edu`);
    request.flush({
      id: 'admin-1',
      email: 'admin@cultura.edu',
      rol: 'administrador',
      nombreCompleto: 'Administradora Cultural'
    });

    expect((await synced).rol).toBe('ADMINISTRADOR');
    expect(localStorage.getItem('currentUserEmail')).toBe('admin@cultura.edu');

    await firstValueFrom(adapter.logout());

    expect(localStorage.getItem('currentUserEmail')).toBeNull();
    expect(await firstValueFrom(adapter.getCurrentUser())).toBeNull();
  });
});
