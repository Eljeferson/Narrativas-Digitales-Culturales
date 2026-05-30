# Resultado prueba de estres 1000 - prod-smoke-individual

## Configuracion

- Run ID: 2026-05-27T05-38-06-358Z
- API base: https://narrativas-digitales-culturales.onrender.com/sistema/api/v1
- Registros por escenario: 5
- Concurrencia: 2
- IA incluida: no
- Modo simulacion: no
- Registro masivo: si
- Respaldo individual: si
- Resultado general: PASA

## Cuello de botella identificado

- Escenario: registro
- Fallos: 0
- p95: 670 ms
- Tasa de error: 0.00%

## Metricas

| Escenario | Total | Exitosos | Fallidos | Error rate | Avg ms | p95 ms | p99 ms | Estado |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| registro | 5 | 5 | 0 | 0.00% | 601 | 670 | 670 | PASA |
| login | 5 | 5 | 0 | 0.00% | 298 | 329 | 329 | PASA |
| instituciones | 5 | 5 | 0 | 0.00% | 331 | 368 | 368 | PASA |
| biblioteca | 5 | 5 | 0 | 0.00% | 216 | 226 | 226 | PASA |

## Errores detallados para correccion

Se muestran los primeros 50 errores. El JSON contiene la lista completa.

| Registro | Endpoint | Status | Tipo | Email | Mensaje | Duracion ms |
|---:|---|---:|---|---|---|---:|
| - | - | - | - | - | Sin errores | - |

## Interpretacion

- Si la fase baseline falla, el resultado sirve como evidencia de como estaba el sistema.
- El escenario con mas fallos o mayor p95 se toma como cuello de botella principal.
- Despues de optimizar, ejecuta la fase optimized con la misma cantidad de registros y concurrencia.
- Para aprobar, cada escenario debe quedar bajo sus umbrales de p95 y error rate.
