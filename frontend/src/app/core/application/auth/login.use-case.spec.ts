import { of } from 'rxjs';
import { LoginUseCase } from './login.use-case';
import { AuthPort } from '../../domain/ports/auth.port';
import { User } from '../../domain/models/user.model';

describe('LoginUseCase', () => {
  it('delegates login to auth port', () => {
    const authPort: AuthPort = {
      login: vi.fn(() => of<User>({ id: 'u1', email: 'login@test.com', rol: 'ESTUDIANTE' })),
      register: vi.fn(),
      syncSession: vi.fn(),
      logout: vi.fn(),
      getCurrentUser: vi.fn()
    };
    const useCase = new LoginUseCase(authPort);

    useCase.execute('login@test.com', '1234', 'student').subscribe((user) => {
      expect(user.email).toBe('login@test.com');
    });

    expect(authPort.login).toHaveBeenCalledWith('login@test.com', '1234', 'student');
  });
});
