import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsPort, AnalyticsData } from '../../domain/ports/analytics.port';

export const ANALYTICS_PORT = new InjectionToken<AnalyticsPort>('ANALYTICS_PORT');

@Injectable({ providedIn: 'root' })
export class GetDashboardDataUseCase {
  constructor(@Inject(ANALYTICS_PORT) private analyticsPort: AnalyticsPort) {}

  execute(teacherId: string): Observable<AnalyticsData> {
    return this.analyticsPort.getDashboardData(teacherId);
  }
}
