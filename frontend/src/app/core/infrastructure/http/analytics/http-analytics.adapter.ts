import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AnalyticsPort, AnalyticsData } from '../../../domain/ports/analytics.port';

@Injectable({ providedIn: 'root' })
export class HttpAnalyticsAdapter implements AnalyticsPort {
  getDashboardData(teacherId: string): Observable<AnalyticsData> {
    console.log('[HttpAnalyticsAdapter] Cargando métricas para docente:', teacherId);
    return of({
      totalNarratives: 1284,
      aiUsagePercent: 87.5,
      avgWritingTimeMinutes: 42,
      totalAudiosGenerated: 942,
      weeklyActivity: [40, 70, 90, 55, 82, 25, 15],
      topStudents: [
        { name: 'Miguel A. de Cervantes', narrativeCount: 12, progress: 85 },
        { name: 'Sor Juana Inés de la Cruz', narrativeCount: 18, progress: 95 },
        { name: 'Gabriel García Márquez', narrativeCount: 5, progress: 30 }
      ]
    });
  }
}
