import { Provider } from '@angular/core';

import { ADMIN_PORT } from '../../application/admin/admin-use-cases';
import { ANALYTICS_PORT } from '../../application/analytics/get-dashboard-data.use-case';
import { AUTH_PORT } from '../../application/auth/auth-use-cases';
import { INSTITUTION_PORT } from '../../application/institutions/institution.use-cases';
import { LIBRARY_PORT } from '../../application/library/library.use-cases';
import { NARRATIVE_PORT } from '../../application/narratives/narrative-use-cases';
import { REVIEW_PORT } from '../../application/review/review.use-cases';
import { TEACHER_PORT } from '../../application/teacher/teacher-use-cases';
import { USER_PROFILE_PORT } from '../../application/user-profile/user-profile.use-cases';
import { VOCATION_PORT } from '../../application/vocation/analyze-vocation.use-case';
import { HttpAdminAdapter } from '../http/admin/http-admin.adapter';
import { HttpAnalyticsAdapter } from '../http/analytics/http-analytics.adapter';
import { HttpAuthAdapter } from '../http/auth/http-auth.adapter';
import { HttpInstitutionAdapter } from '../http/institutions/http-institution.adapter';
import { HttpLibraryAdapter } from '../http/library/http-library.adapter';
import { HttpNarrativeAdapter } from '../http/narratives/http-narrative.adapter';
import { HttpReviewAdapter } from '../http/review/http-review.adapter';
import { HttpTeacherAdapter } from '../http/teacher/http-teacher.adapter';
import { HttpUserProfileAdapter } from '../http/user-profile/http-user-profile.adapter';
import { HttpVocationAdapter } from '../http/vocation/http-vocation.adapter';

export const HEXAGONAL_ADAPTER_PROVIDERS: Provider[] = [
  { provide: AUTH_PORT, useClass: HttpAuthAdapter },
  { provide: NARRATIVE_PORT, useClass: HttpNarrativeAdapter },
  { provide: ADMIN_PORT, useClass: HttpAdminAdapter },
  { provide: TEACHER_PORT, useClass: HttpTeacherAdapter },
  { provide: USER_PROFILE_PORT, useClass: HttpUserProfileAdapter },
  { provide: REVIEW_PORT, useClass: HttpReviewAdapter },
  { provide: LIBRARY_PORT, useClass: HttpLibraryAdapter },
  { provide: ANALYTICS_PORT, useClass: HttpAnalyticsAdapter },
  { provide: INSTITUTION_PORT, useClass: HttpInstitutionAdapter },
  { provide: VOCATION_PORT, useClass: HttpVocationAdapter }
];
