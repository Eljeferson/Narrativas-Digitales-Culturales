import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ReviewItem {
  id: string;
  title: string;
  author: string;
  culture: string;
  fragment: string;
  status: 'En revisión' | 'Aprobada' | 'Rechazada' | 'Solicita revisión';
  reason: string;
  comments: string[];
}

@Component({
  selector: 'app-panel-de-aprobacion-docente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-de-aprobacion-docente.html',
  styleUrl: './panel-de-aprobacion-docente.css',
})
export class PanelDeAprobacionDocente {
  selected?: ReviewItem;
  feedback = '';
  newComment = '';
  teacherName = 'Rosa Quispe';
  items: ReviewItem[] = [
    { id: 'n1', title: 'El eco de los Apus', author: 'Mateo Huamán', culture: 'Andina', fragment: 'Las montañas comenzaron a respirar cuando la abuela dejó sus hojas de coca sobre la piedra.', status: 'En revisión', reason: '', comments: [] },
    { id: 'n2', title: 'Río que canta', author: 'Lucía Chambi', culture: 'Amazónica', fragment: 'El río guardaba nombres antiguos bajo los remolinos de la tarde.', status: 'En revisión', reason: '', comments: [] }
  ];

  decide(item: ReviewItem, status: ReviewItem['status']): void {
    item.status = status;
    item.reason = this.feedback || 'Revisión pedagógica registrada.';
    this.feedback = '';
  }

  addComment(item: ReviewItem): void {
    const text = this.newComment.trim();
    if (!text) return;
    item.comments.unshift(`${this.teacherName} · ${new Date().toLocaleString('es-PE')}: ${text}`);
    this.newComment = '';
  }
}
