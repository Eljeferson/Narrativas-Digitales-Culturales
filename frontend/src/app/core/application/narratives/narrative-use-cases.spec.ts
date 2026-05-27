import { of } from 'rxjs';
import {
  CreateNarrativeUseCase,
  GenerateOutlineUseCase,
  GetNarrativeByIdUseCase,
  ListNarrativesUseCase,
  SaveNarrativeUseCase
} from './narrative-use-cases';
import { NarrativePort } from '../../domain/ports/narrative.port';

describe('Narrative use cases', () => {
  const port: NarrativePort = {
    generateOutline: vi.fn((culture) => of(`Esquema ${culture}`)),
    create: vi.fn((narrative) => of(narrative)),
    save: vi.fn((narrative) => of(narrative)),
    getById: vi.fn((id) => of({ id, titulo: 'Uno', contenido: '', regionCultural: '', autor: { id: 'a1' } })),
    getAllByAuthor: vi.fn((authorId) => of([{ id: 'n1', titulo: 'Lista', contenido: '', regionCultural: '', autor: { id: authorId } }])),
    delete: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GenerateOutlineUseCase delega al puerto', () => {
    const useCase = new GenerateOutlineUseCase(port);

    useCase.execute('Puno').subscribe((value) => {
      expect(value).toBe('Esquema Puno');
    });

    expect(port.generateOutline).toHaveBeenCalledWith('Puno');
  });

  it('CreateNarrativeUseCase delega la creacion', () => {
    const useCase = new CreateNarrativeUseCase(port);
    const narrative = { titulo: 'Nueva', contenido: 'Texto', regionCultural: 'Cusco', autor: { id: 'a1' } };

    useCase.execute(narrative).subscribe((value) => {
      expect(value.titulo).toBe('Nueva');
    });

    expect(port.create).toHaveBeenCalledWith(narrative);
  });

  it('SaveNarrativeUseCase delega el guardado', () => {
    const useCase = new SaveNarrativeUseCase(port);
    const narrative = { id: 'n1', titulo: 'Guardada', contenido: 'Texto', regionCultural: 'Cusco', autor: { id: 'a1' } };

    useCase.execute(narrative).subscribe((value) => {
      expect(value.id).toBe('n1');
    });

    expect(port.save).toHaveBeenCalledWith(narrative);
  });

  it('GetNarrativeByIdUseCase delega la consulta', () => {
    const useCase = new GetNarrativeByIdUseCase(port);

    useCase.execute('n2').subscribe((value) => {
      expect(value?.id).toBe('n2');
    });

    expect(port.getById).toHaveBeenCalledWith('n2');
  });

  it('ListNarrativesUseCase delega el listado por autor', () => {
    const useCase = new ListNarrativesUseCase(port);

    useCase.execute('autor-1').subscribe((items) => {
      expect(items[0].autor.id).toBe('autor-1');
    });

    expect(port.getAllByAuthor).toHaveBeenCalledWith('autor-1');
  });
});
