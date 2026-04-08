import os
import re

mvp2_folders = [
    ("dashboard_anal_tico_docente", "dashboard-analitico-docente", "DashboardAnaliticoDocente"),
    ("editor_mejorado_con_ia", "editor-mejorado-ia", "EditorMejoradoIa"),
    ("grabaci_n_de_voz_stt", "grabacion-voz-stt", "GrabacionVozStt"),
    ("perfil_creativo_estudiante", "perfil-creativo-estudiante", "PerfilCreativoEstudiante"),
    ("reproductor_de_narrativa_tts", "reproductor-narrativa-tts", "ReproductorNarrativaTts"),
    ("storyboard_digital_ia", "storyboard-digital-ia", "StoryboardDigitalIa")
]

base_dir = "d:/TALLER DE PROYECTOS/ENTREGABLE 2"

for folder, comp_folder, comp_name in mvp2_folders:
    # read html
    html_file = os.path.join(base_dir, "MVP2", folder, "code.html")
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # extract body content. We find the opening <body> tag and the closing </body>
    # Since body tag might have classes, we use regex
    match = re.search(r'<body[^>]*>(.*)</body>', html_content, re.DOTALL | re.IGNORECASE)
    if match:
        body_content = match.group(1).strip()
    else:
        print(f"Warning: No body found in {html_file}")
        body_content = ""
        
    ts_content = f"""import {{ Component }} from '@angular/core';

@Component({{
  selector: 'app-{comp_folder}',
  standalone: true,
  imports: [],
  template: `
{body_content}
  `,
  styles: `
    :host {{ display: block; }}
  `
}})
export class {comp_name} {{}}
"""
    
    comp_dir = os.path.join(base_dir, "src", "app", "components", comp_folder)
    os.makedirs(comp_dir, exist_ok=True)
    
    ts_file = os.path.join(comp_dir, f"{comp_folder}.ts")
    with open(ts_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Generated {ts_file}")
