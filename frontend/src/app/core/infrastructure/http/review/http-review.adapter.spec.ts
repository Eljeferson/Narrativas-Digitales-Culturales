import { firstValueFrom } from 'rxjs';
import { HttpReviewAdapter } from './http-review.adapter';

describe('HttpReviewAdapter', () => {
  let adapter: HttpReviewAdapter;

  beforeEach(() => {
    adapter = new HttpReviewAdapter();
  });

  it('devuelve una lista vacia para revisiones pendientes en el mock actual', async () => {
    await expect(firstValueFrom(adapter.getPendingReviews('doc-1'))).resolves.toEqual([]);
  });

  it('marca una narrativa como publicada al aprobar', async () => {
    await expect(firstValueFrom(adapter.approve('nar-1', 'Buen trabajo'))).resolves.toMatchObject({
      id: 'nar-1',
      status: 'published'
    });
  });

  it('devuelve una narrativa en borrador al rechazar', async () => {
    await expect(firstValueFrom(adapter.reject('nar-2', 'Corrige el cierre'))).resolves.toMatchObject({
      id: 'nar-2',
      status: 'draft'
    });
  });
});
