import { Routes } from '@angular/router';
import { LandingLogin } from './components/landing-login/landing-login';
import { AuthorEditorDesk } from './components/author-editor-desk/author-editor-desk';
import { UserAdmin } from './components/user-admin/user-admin';
import { TeacherPanel } from './components/teacher-panel/teacher-panel';
import { StudentPanel } from './components/student-panel/student-panel';
import { StudentRegistration } from './components/student-registration/student-registration';

import { DashboardAnaliticoDocente } from './components/dashboard-analitico-docente/dashboard-analitico-docente';
import { EditorMejoradoIa } from './components/editor-mejorado-ia/editor-mejorado-ia';
import { GrabacionVozStt } from './components/grabacion-voz-stt/grabacion-voz-stt';
import { PerfilCreativoEstudiante } from './components/perfil-creativo-estudiante/perfil-creativo-estudiante';
import { ReproductorNarrativaTts } from './components/reproductor-narrativa-tts/reproductor-narrativa-tts';
import { StoryboardDigitalIa } from './components/storyboard-digital-ia/storyboard-digital-ia';

export const routes: Routes = [
  { path: '', component: LandingLogin },
  { path: 'escritorio-del-autor', component: AuthorEditorDesk },
  { path: 'gestion-de-usuarios', component: UserAdmin },
  { path: 'panel-del-docente', component: TeacherPanel },
  { path: 'panel-del-estudiante', component: StudentPanel },
  { path: 'registro-de-estudiante', component: StudentRegistration },

  { path: 'dashboard-analitico-docente', component: DashboardAnaliticoDocente },
  { path: 'editor-mejorado-ia', component: EditorMejoradoIa },
  { path: 'grabacion-voz-stt', component: GrabacionVozStt },
  { path: 'perfil-creativo-estudiante', component: PerfilCreativoEstudiante },
  { path: 'reproductor-narrativa-tts', component: ReproductorNarrativaTts },
  { path: 'storyboard-digital-ia', component: StoryboardDigitalIa },

  { path: '**', redirectTo: '' }
];
