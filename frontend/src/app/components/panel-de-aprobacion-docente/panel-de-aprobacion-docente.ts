import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ReviewStatus = 'En revision' | 'Aprobada' | 'Rechazada' | 'Solicita revision';

interface ReviewItem {
  id: string;
  title: string;
  author: string;
  culture: string;
  fragment: string;
  status: ReviewStatus;
  reason: string;
  comments: string[];
  notifications: string[];
}

@Component({
  selector: 'app-panel-de-aprobacion-docente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-de-aprobacion-docente.html',
  styleUrl: './panel-de-aprobacion-docente.css',
})
export class PanelDeAprobacionDocente {
  feedback = '';
  newComment = '';
  teacherName = 'Rosa Quispe';
  items: ReviewItem[] = [
    {
      id: 'n1',
      title: 'El eco de los Apus',
      author: 'Mateo Huaman',
      culture: 'Andina',
      fragment: 'Las montanas comenzaron a respirar cuando la abuela dejo sus hojas de coca sobre la piedra.',
      status: 'En revision',
      reason: '',
      comments: [],
      notifications: []
    },
    {
      id: 'n2',
      title: 'Rio que canta',
      author: 'Lucia Chambi',
      culture: 'Amazonica',
      fragment: 'El rio guardaba nombres antiguos bajo los remolinos de la tarde.',
      status: 'En revision',
      reason: '',
      comments: [],
      notifications: []
    }
  ];

  decide(item: ReviewItem, status: ReviewStatus): void {
    item.status = status;
    item.reason = this.feedback || 'Revision pedagogica registrada.';
    item.notifications.unshift(`${new Date().toLocaleString('es-PE')}: resultado enviado a ${item.author} (${status}). Motivo: ${item.reason}`);
    this.feedback = '';
  }

  addComment(item: ReviewItem): void {
    const text = this.newComment.trim();
    if (!text) return;
    item.comments.unshift(`${this.teacherName} - ${new Date().toLocaleString('es-PE')}: ${text}`);
    item.notifications.unshift(`${new Date().toLocaleString('es-PE')}: ${item.author} recibio una notificacion de nuevo comentario.`);
    this.newComment = '';
  }

  isPublished(item: ReviewItem): boolean {
    return item.status === 'Aprobada';
  }

  get approvedCount(): number {
    return this.items.filter((item) => this.isPublished(item)).length;
  }
}
