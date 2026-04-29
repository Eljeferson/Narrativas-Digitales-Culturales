import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// Auth
import { AUTH_PORT } from './core/application/auth/auth-use-cases';
import { HttpAuthAdapter } from './core/infrastructure/http/auth/http-auth.adapter';

// Narratives
import { NARRATIVE_PORT } from './core/application/narratives/narrative-use-cases';
import { HttpNarrativeAdapter } from './core/infrastructure/http/narratives/http-narrative.adapter';

// Admin
import { ADMIN_PORT } from './core/application/admin/admin-use-cases';
import { HttpAdminAdapter } from './core/infrastructure/http/admin/http-admin.adapter';

// Teacher
import { TEACHER_PORT } from './core/application/teacher/teacher-use-cases';
import { HttpTeacherAdapter } from './core/infrastructure/http/teacher/http-teacher.adapter';

// User Profile
import { USER_PROFILE_PORT } from './core/application/user-profile/user-profile.use-cases';
import { HttpUserProfileAdapter } from './core/infrastructure/http/user-profile/http-user-profile.adapter';

// Review
import { REVIEW_PORT } from './core/application/review/review.use-cases';
import { HttpReviewAdapter } from './core/infrastructure/http/review/http-review.adapter';

// Library
import { LIBRARY_PORT } from './core/application/library/library.use-cases';
import { HttpLibraryAdapter } from './core/infrastructure/http/library/http-library.adapter';

// Analytics
import { ANALYTICS_PORT } from './core/application/analytics/get-dashboard-data.use-case';
import { HttpAnalyticsAdapter } from './core/infrastructure/http/analytics/http-analytics.adapter';

// Institutions
import { INSTITUTION_PORT } from './core/application/institutions/institution.use-cases';
import { HttpInstitutionAdapter } from './core/infrastructure/http/institutions/http-institution.adapter';

// Vocation IA
import { VOCATION_PORT } from './core/domain/ports/vocation.port';
import { HttpVocationAdapter } from './core/infrastructure/http/vocation/http-vocation.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    { provide: AUTH_PORT,         useClass: HttpAuthAdapter },
    { provide: NARRATIVE_PORT,    useClass: HttpNarrativeAdapter },
    { provide: ADMIN_PORT,        useClass: HttpAdminAdapter },
    { provide: TEACHER_PORT,      useClass: HttpTeacherAdapter },
    { provide: USER_PROFILE_PORT, useClass: HttpUserProfileAdapter },
    { provide: REVIEW_PORT,       useClass: HttpReviewAdapter },
    { provide: LIBRARY_PORT,      useClass: HttpLibraryAdapter },
    { provide: ANALYTICS_PORT,    useClass: HttpAnalyticsAdapter },
    { provide: INSTITUTION_PORT,   useClass: HttpInstitutionAdapter },
    { provide: VOCATION_PORT,      useClass: HttpVocationAdapter }
  ]
};

