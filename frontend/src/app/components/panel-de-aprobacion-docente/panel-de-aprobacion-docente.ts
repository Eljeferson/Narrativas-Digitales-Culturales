import { Component, inject, OnInit } from '@angular/core';
import { GetPendingReviewsUseCase, ApproveNarrativeUseCase, RejectNarrativeUseCase } from '../../core/application/review/review.use-cases';
import { Narrative } from '../../core/domain/models/narrative.model';

@Component({
  selector: 'app-panel-de-aprobacion-docente',
  standalone: true,
  imports: [],
  templateUrl: './panel-de-aprobacion-docente.html',
  styleUrl: './panel-de-aprobacion-docente.css',
})
export class PanelDeAprobacionDocente implements OnInit {
  private getPendingReviewsUseCase = inject(GetPendingReviewsUseCase);
  private approveNarrativeUseCase = inject(ApproveNarrativeUseCase);
  private rejectNarrativeUseCase = inject(RejectNarrativeUseCase);

  pendingNarratives: Narrative[] = [];

  ngOnInit() {
    this.loadPending();
  }

  loadPending() {
    this.getPendingReviewsUseCase.execute('current-teacher-id').subscribe({
      next: (list) => this.pendingNarratives = list,
      error: (err) => console.error('Error loading pending reviews:', err)
    });
  }

  approve(id: string) {
    this.approveNarrativeUseCase.execute(id).subscribe(() => this.loadPending());
  }

  reject(id: string, feedback: string) {
    this.rejectNarrativeUseCase.execute(id, feedback).subscribe(() => this.loadPending());
  }
}
