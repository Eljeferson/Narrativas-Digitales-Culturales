import { of } from 'rxjs';
import { RegisterStudentUseCase, SyncSessionUseCase } from './auth-use-cases';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';

describe('Auth use cases', () => {
  const authPort: AuthPort = {
    login: vi.fn(),
    register: vi.fn((user: Partial<User>) => of<User>({ id: 'u1', email: user.email ?? '', rol: 'ESTUDIANTE' })),
    syncSession: vi.fn((email: string) => of<User>({ id: 'u2', email, rol: 'ESTUDIANTE' })),
    logout: vi.fn(),
    getCurrentUser: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('RegisterStudentUseCase delega el registro al puerto', () => {
    const useCase = new RegisterStudentUseCase(authPort);

    useCase.execute({ email: 'nuevo@test.com' }).subscribe((user) => {
      expect(user.email).toBe('nuevo@test.com');
    });

    expect(authPort.register).toHaveBeenCalledWith({ email: 'nuevo@test.com' });
  });

  it('SyncSessionUseCase delega la sincronizacion al puerto', () => {
    const useCase = new SyncSessionUseCase(authPort);

    useCase.execute('perfil@test.com').subscribe((user) => {
      expect(user.email).toBe('perfil@test.com');
    });

    expect(authPort.syncSession).toHaveBeenCalledWith('perfil@test.com');
  });
});
