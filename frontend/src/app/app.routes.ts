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

import { BibliotecaCulturalExplorador } from './components/biblioteca-cultural-explorador/biblioteca-cultural-explorador';
import { ExhibicionDigitalModoKiosko } from './components/exhibicion-digital-modo-kiosko/exhibicion-digital-modo-kiosko';
import { ExportacionDelCatalogoAdmin } from './components/exportacion-del-catalogo-admin/exportacion-del-catalogo-admin';
import { FlujoDePublicacionEstudiante } from './components/flujo-de-publicacion-estudiante/flujo-de-publicacion-estudiante';
import { PanelDeAprobacionDocente } from './components/panel-de-aprobacion-docente/panel-de-aprobacion-docente';
import { PortalDeComunidadHomePublico } from './components/portal-de-comunidad-home-publico/portal-de-comunidad-home-publico';
import { VistaDetalleDeNarrativaPublica } from './components/vista-detalle-de-narrativa-publica/vista-detalle-de-narrativa-publica';

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

  { path: 'biblioteca-cultural-explorador', component: BibliotecaCulturalExplorador },
  { path: 'exhibicion-digital-modo-kiosko', component: ExhibicionDigitalModoKiosko },
  { path: 'exportacion-del-catalogo-admin', component: ExportacionDelCatalogoAdmin },
  { path: 'flujo-de-publicacion-estudiante', component: FlujoDePublicacionEstudiante },
  { path: 'panel-de-aprobacion-docente', component: PanelDeAprobacionDocente },
  { path: 'portal-de-comunidad-home-publico', component: PortalDeComunidadHomePublico },
  { path: 'vista-detalle-de-narrativa-publica', component: VistaDetalleDeNarrativaPublica },

  { path: '**', redirectTo: '' }
];
