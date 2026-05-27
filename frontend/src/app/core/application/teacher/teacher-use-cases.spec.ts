import { of } from 'rxjs';
import { GetStudentNarrativesUseCase, ListStudentsUseCase } from './teacher-use-cases';
import { TeacherPort } from '../../domain/ports/teacher.port';
import { User } from '../../domain/models/user.model';
import { Narrative } from '../../domain/models/narrative.model';

describe('Teacher use cases', () => {
  const port: TeacherPort = {
    listStudents: vi.fn((grade?: string) => of<User[]>([{ id: 'u1', email: `${grade}@test.com`, rol: 'ESTUDIANTE' }])),
    getStudentNarratives: vi.fn((authorId: string) => of<Narrative[]>([{ id: 'n1', titulo: 'Relato', contenido: '', regionCultural: '', autor: { id: authorId } }]))
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ListStudentsUseCase delega el filtro por grado', () => {
    const useCase = new ListStudentsUseCase(port);

    useCase.execute('5to').subscribe((students) => {
      expect(students[0].email).toBe('5to@test.com');
    });

    expect(port.listStudents).toHaveBeenCalledWith('5to');
  });

  it('GetStudentNarrativesUseCase delega el autor', () => {
    const useCase = new GetStudentNarrativesUseCase(port);

    useCase.execute('autor-9').subscribe((items) => {
      expect(items[0].autor.id).toBe('autor-9');
    });

    expect(port.getStudentNarratives).toHaveBeenCalledWith('autor-9');
  });
});
