# -*- coding: utf-8 -*-
"""Automatización del flujo de Ingeniería Inversa

Este script recorre las 7 fases descritas, ejecuta cada *prompt* mediante una llamada a
una LLM (OpenAI, Anthropic, o cualquier API compatible) y guarda la salida en los
archivos markdown bajo la carpeta `evidencias/`. Finalmente, consolida todas las
evidencias en `docs/ingenieria_inversa.md`.

Requisitos:
- Python >= 3.8
- Paquetes: `openai` (u otro cliente de LLM) y `tqdm`
- Variable de entorno `LLM_API_KEY` con la clave de la API.
- (Opcional) `LLM_ENDPOINT` para usar un endpoint alternativo.

Uso rápido:
    python run_reverse_engineering.py

Puedes adaptar los *prompts* editando el diccionario `PROMPTS` en la sección
Correspondiente.
"""

import os
import sys
from pathlib import Path
from typing import List
from tqdm import tqdm

# ---------------------------------------------------------------------------
# Configuración de la LLM
# ---------------------------------------------------------------------------

LLM_API_KEY = os.getenv("LLM_API_KEY")
LLM_ENDPOINT = os.getenv("LLM_ENDPOINT", "https://api.openai.com/v1/chat/completions")

if not LLM_API_KEY:
    sys.stderr.write("[ERROR] La variable de entorno LLM_API_KEY no está definida.\n")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Definición de prompts y rutas de evidencia
# ---------------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
EVIDENCE_ROOT = BASE_DIR / "evidencias"

PROMPTS: List[dict] = [
    # FASE 1
    {"name": "Descubrimiento Tecnológico", "prompt": "el pront de Descubrimiento Tecnológico", "out": "auditoria/inventario_archivos.md"},
    {"name": "Detección Arquitectónica", "prompt": "el pront de Descubrimiento Tecnológico", "out": "auditoria/arquitectura_detectada.md"},
    # FASE 2
    {"name": "Dependencias Backend", "prompt": "el pront de Dependencias", "out": "dependencias/backend.md"},
    {"name": "Dependencias Frontend", "prompt": "el pront de Dependencias", "out": "dependencias/frontend.md"},
    {"name": "Infraestructura", "prompt": "el pront de Dependencias", "out": "dependencias/infraestructura.md"},
    # FASE 3
    {"name": "Reconstrucción del Entorno", "prompt": "el pront de Reconstrucción del Entorno", "out": "configuracion/instalacion.md"},
    {"name": "Variables de Entorno", "prompt": "el pront de Variables de Entorno", "out": "configuracion/variables_entorno.md"},
    {"name": "Servicios", "prompt": "el pront de Reconstrucción del Entorno", "out": "configuracion/servicios.md"},
    # FASE 4
    {"name": "Análisis de Logs Backend", "prompt": "el pront de Análisis de Logs", "out": "ejecucion/backend_logs.md"},
    {"name": "Análisis de Logs Frontend", "prompt": "el pront de Análisis de Logs", "out": "ejecucion/frontend_logs.md"},
    {"name": "Endpoints Detectados", "prompt": "el pront de Descubrimiento Funcional", "out": "ejecucion/endpoints_detectados.md"},
    # FASE 5
    {"name": "Reconstrucción del Dominio", "prompt": "el pront de Reconstrucción del Dominio", "out": "analisis/dominio.md"},
    {"name": "Reconstrucción Arquitectónica - Modulos", "prompt": "el pront de Reconstrucción Arquitectónica", "out": "analisis/modulos.md"},
    {"name": "Casos de Uso", "prompt": "el pront de Reconstrucción Arquitectónica", "out": "analisis/casos_uso.md"},
    {"name": "Arquitectura Real", "prompt": "el pront de Reconstrucción Arquitectónica", "out": "analisis/arquitectura_real.md"},
    # FASE 6
    {"name": "Evaluación Arquitectónica", "prompt": "el pront de Evaluación Arquitectónica", "out": "analisis/calidad_arquitectura.md"},
    {"name": "Hallazgos", "prompt": "el pront de Hallazgos", "out": "analisis/hallazgos.md"},
    # FASE 7
    {"name": "Generador Final", "prompt": "el pront de Generador Final", "out": "docs/ingenieria_inversa.md"}
]

# ---------------------------------------------------------------------------
# Funciones auxiliares
# ---------------------------------------------------------------------------

def ensure_parent_dir(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)

def call_llm(prompt: str) -> str:
    import openai
    openai.api_key = LLM_API_KEY
    openai.api_base = LLM_ENDPOINT.rstrip("/chat/completions")
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )
        return resp.choices[0].message.content.strip()
    except Exception as e:
        sys.stderr.write(f"[ERROR] LLM call failed: {e}\n")
        return ""

def write_evidence(rel_path: str, content: str):
    target = (BASE_DIR / rel_path).resolve()
    ensure_parent_dir(target)
    with open(target, "w", encoding="utf-8") as f:
        f.write(content)
    # Print path; use relative if possible, else absolute
    try:
        rel = target.relative_to(BASE_DIR)
    except ValueError:
        rel = target
    print(f"[INFO] Written: {rel}")

# ---------------------------------------------------------------------------
# Main execution
# ---------------------------------------------------------------------------

def main():
    print("=== Iniciando flujo de Ingeniería Inversa ===")
    for step in tqdm(PROMPTS, desc="Ejecutando prompts"):
        name = step["name"]
        prompt = step["prompt"]
        out_rel = step["out"]
        response = call_llm(prompt)
        if not response:
            response = "*Sin respuesta de la LLM.*"
        write_evidence(out_rel, f"# {name}\n\n{response}\n")
    print("=== Flujo completado ===")

if __name__ == "__main__":
    main()
