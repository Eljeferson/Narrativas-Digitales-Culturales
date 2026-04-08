import { Routes } from '@angular/router';
import { LandingLogin } from './components/landing-login/landing-login';
import { AuthorEditorDesk } from './components/author-editor-desk/author-editor-desk';
import { UserAdmin } from './components/user-admin/user-admin';
import { TeacherPanel } from './components/teacher-panel/teacher-panel';
import { StudentPanel } from './components/student-panel/student-panel';
import { StudentRegistration } from './components/student-registration/student-registration';

export const routes: Routes = [
  { path: '', component: LandingLogin },
  { path: 'escritorio-del-autor', component: AuthorEditorDesk },
  { path: 'gestion-de-usuarios', component: UserAdmin },
  { path: 'panel-del-docente', component: TeacherPanel },
  { path: 'panel-del-estudiante', component: StudentPanel },
  { path: 'registro-de-estudiante', component: StudentRegistration },
  { path: '**', redirectTo: '' }
];
