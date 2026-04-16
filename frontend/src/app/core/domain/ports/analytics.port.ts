export interface AnalyticsData {
  totalNarratives: number;
  aiUsagePercent: number;
  avgWritingTimeMinutes: number;
  totalAudiosGenerated: number;
  weeklyActivity: number[];
  topStudents: { name: string; narrativeCount: number; progress: number }[];
}

export interface AnalyticsPort {
  getDashboardData(teacherId: string): import('rxjs').Observable<AnalyticsData>;
}
