import { of } from 'rxjs';
import { ApproveNarrativeUseCase, GetPendingReviewsUseCase, RejectNarrativeUseCase } from './review.use-cases';
import { ReviewPort } from '../../domain/ports/review.port';
import { Narrative } from '../../domain/models/narrative.model';

describe('Review use cases', () => {
  const port: ReviewPort = {
    getPendingReviews: vi.fn(() => of<Narrative[]>([{ id: 'n1', titulo: 'Pendiente', contenido: '', regionCultural: '', autor: { id: 'a1' } }])),
    approve: vi.fn((narrativeId: string) => of<Narrative>({ id: narrativeId, titulo: '', contenido: '', regionCultural: '', autor: { id: 'a1' }, status: 'published' })),
    reject: vi.fn((narrativeId: string) => of<Narrative>({ id: narrativeId, titulo: '', contenido: '', regionCultural: '', autor: { id: 'a1' }, status: 'rejected' }))
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GetPendingReviewsUseCase delega el docente', () => {
    const useCase = new GetPendingReviewsUseCase(port);

    useCase.execute('doc-1').subscribe((items) => {
      expect(items).toHaveLength(1);
    });

    expect(port.getPendingReviews).toHaveBeenCalledWith('doc-1');
  });

  it('ApproveNarrativeUseCase delega aprobacion', () => {
    const useCase = new ApproveNarrativeUseCase(port);

    useCase.execute('n1', 'Muy bien').subscribe((item) => {
      expect(item.status).toBe('published');
    });

    expect(port.approve).toHaveBeenCalledWith('n1', 'Muy bien');
  });

  it('RejectNarrativeUseCase delega rechazo', () => {
    const useCase = new RejectNarrativeUseCase(port);

    useCase.execute('n2', 'Corrige introduccion').subscribe((item) => {
      expect(item.status).toBe('rejected');
    });

    expect(port.reject).toHaveBeenCalledWith('n2', 'Corrige introduccion');
  });
});
