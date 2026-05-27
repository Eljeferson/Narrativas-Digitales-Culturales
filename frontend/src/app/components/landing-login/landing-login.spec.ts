import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginUseCase } from '../../core/application/auth/login.use-case';
import { LandingLogin } from './landing-login';

describe('LandingLogin', () => {
  let fixture: ComponentFixture<LandingLogin>;
  let component: LandingLogin;
  let loginUseCase: { execute: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    loginUseCase = { execute: vi.fn() };
    router = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [LandingLogin],
      providers: [
        { provide: LoginUseCase, useValue: loginUseCase },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingLogin);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('bloquea login si faltan credenciales', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.email = '';
    component.password = '';
    component.onSubmit();

    expect(loginUseCase.execute).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Ingresa tu correo y contrasena.');
  });

  it('redirige estudiantes a su panel luego de login valido', () => {
    loginUseCase.execute.mockReturnValue(of({ id: 'user-1', email: 'ana@cultura.edu', rol: 'ESTUDIANTE' }));
    component.email = 'ana@cultura.edu';
    component.password = 'Clave-123';

    component.onSubmit();

    expect(loginUseCase.execute).toHaveBeenCalledWith('ana@cultura.edu', 'Clave-123', 'student');
    expect(router.navigate).toHaveBeenCalledWith(['/panel-del-estudiante']);
  });

  it('redirige docentes y administradores al panel correcto por rol', () => {
    component.email = 'docente@cultura.edu';
    component.password = 'Clave-123';
    component.setRole('teacher');
    loginUseCase.execute.mockReturnValue(of({ id: 'docente-1', email: component.email, rol: 'DOCENTE' }));

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/panel-del-docente']);

    router.navigate.mockClear();
    component.email = 'admin@cultura.edu';
    loginUseCase.execute.mockReturnValue(of({ id: 'admin-1', email: component.email, rol: 'ADMINISTRADOR' }));

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/gestion-de-usuarios']);
  });

  it('muestra mensaje claro cuando el backend rechaza credenciales', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    loginUseCase.execute.mockReturnValue(throwError(() => ({ status: 401, error: { message: 'Credenciales invalidas' } })));
    component.email = 'ana@cultura.edu';
    component.password = 'mala';

    component.onSubmit();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('No se pudo iniciar sesion. Verifica tus credenciales.');
  });

  it('envia al registro con el rol elegido', () => {
    component.setRole('teacher');

    component.goToRegistration();

    expect(router.navigate).toHaveBeenCalledWith(['/registro-de-estudiante'], { queryParams: { role: 'teacher' } });
  });
});
