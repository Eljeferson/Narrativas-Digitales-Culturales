import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewPort } from '../../domain/ports/review.port';
import { Narrative } from '../../domain/models/narrative.model';

export const REVIEW_PORT = new InjectionToken<ReviewPort>('REVIEW_PORT');

@Injectable({ providedIn: 'root' })
export class GetPendingReviewsUseCase {
  constructor(@Inject(REVIEW_PORT) private reviewPort: ReviewPort) {}

  execute(teacherId: string): Observable<Narrative[]> {
    return this.reviewPort.getPendingReviews(teacherId);
  }
}

@Injectable({ providedIn: 'root' })
export class ApproveNarrativeUseCase {
  constructor(@Inject(REVIEW_PORT) private reviewPort: ReviewPort) {}

  execute(narrativeId: string, feedback?: string): Observable<Narrative> {
    return this.reviewPort.approve(narrativeId, feedback);
  }
}

@Injectable({ providedIn: 'root' })
export class RejectNarrativeUseCase {
  constructor(@Inject(REVIEW_PORT) private reviewPort: ReviewPort) {}

  execute(narrativeId: string, feedback: string): Observable<Narrative> {
    return this.reviewPort.reject(narrativeId, feedback);
  }
}
