# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: culturastory-critical.spec.ts >> calidad responsive: pantallas criticas no desbordan horizontalmente
- Location: tests\e2e\culturastory-critical.spec.ts:149:5

# Error details

```
Error: / no debe tener overflow horizontal

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - img "CulturaStory AI Logo" [ref=e6]
      - generic [ref=e7]: Historia Cultural
    - generic [ref=e8]:
      - link "Narrativas" [ref=e9] [cursor=pointer]:
        - /url: "#"
      - link "Regiones" [ref=e10] [cursor=pointer]:
        - /url: "#"
      - link "Library" [ref=e11] [cursor=pointer]:
        - /url: "#"
    - generic [ref=e12]:
      - button "notifications" [ref=e13]:
        - generic [ref=e14]: notifications
      - button "settings" [ref=e15]:
        - generic [ref=e16]: settings
  - main [ref=e18]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e24]: auto_awesome
        - text: Tejiendo el futuro del aprendizaje cultural
      - heading "Preserva la Memoria, Crea el Manana." [level=1] [ref=e25]
      - paragraph [ref=e26]: Descubre una plataforma educativa donde la inteligencia artificial se encuentra con la herencia ancestral para tejer narrativas culturales inolvidables.
      - generic [ref=e27]:
        - generic [ref=e28]:
          - text: 500+
          - paragraph [ref=e29]: Historias Ancestrales Digitalizadas
        - generic [ref=e30]:
          - text: "12"
          - paragraph [ref=e31]: Regiones Culturales Activas
    - generic [ref=e32]:
      - generic [ref=e34]: texture
      - generic [ref=e35]:
        - generic [ref=e36]:
          - heading "Bienvenido al Telar" [level=2] [ref=e37]
          - paragraph [ref=e38]: Ingresa para continuar tu historia
        - generic [ref=e39]:
          - generic [ref=e40]:
            - text: Tipo de Perfil
            - generic [ref=e41]:
              - button "school Estudiante" [ref=e42]:
                - generic [ref=e43]: school
                - generic [ref=e44]: Estudiante
              - button "co_present Docente" [ref=e45]:
                - generic [ref=e46]: co_present
                - generic [ref=e47]: Docente
          - generic [ref=e48]:
            - text: Correo Institucional
            - generic [ref=e49]:
              - generic [ref=e50]: mail
              - textbox "Correo Institucional" [ref=e51]:
                - /placeholder: usuario@cultura.edu
          - generic [ref=e52]:
            - text: Contrasena
            - generic [ref=e53]:
              - generic [ref=e54]: lock
              - textbox "Contrasena" [ref=e55]:
                - /placeholder: ••••••••
            - link "Olvidaste tu clave?" [ref=e56] [cursor=pointer]:
              - /url: "#"
          - button "Entrar al Weaver's Hub arrow_right_alt" [ref=e57]:
            - generic [ref=e58]:
              - text: Entrar al Weaver's Hub
              - generic [ref=e59]: arrow_right_alt
          - paragraph [ref=e61]: Nuevo en el telar? Registrate como Estudiante
        - generic [ref=e62]:
          - paragraph [ref=e63]: O accede via
          - button "Google Logo" [ref=e65]:
            - img "Google Logo" [ref=e66]
  - contentinfo [ref=e67]:
    - generic [ref=e68]:
      - generic [ref=e69]:
        - generic [ref=e70]: fingerprint
        - generic [ref=e71]: Autenticacion Segura
      - paragraph [ref=e72]: © 2024 CulturaStory AI. Tejiendo identidades digitales.
    - generic [ref=e73]:
      - link "Privacidad" [ref=e74] [cursor=pointer]:
        - /url: "#"
      - link "Terminos del Gremio" [ref=e75] [cursor=pointer]:
        - /url: "#"
      - link "Soporte" [ref=e76] [cursor=pointer]:
        - /url: "#"
```

# Test source

```ts
  58  |         status: 200,
  59  |         contentType: 'application/json',
  60  |         body: JSON.stringify([
  61  |           {
  62  |             idInstitucion: 'inst-1',
  63  |             institucionEducativa: 'Colegio Cultura Viva',
  64  |             nivel: 'Secundaria'
  65  |           }
  66  |         ])
  67  |       });
  68  |       return;
  69  |     }
  70  | 
  71  |     if (url.includes('/narrativas/autor/')) {
  72  |       await route.fulfill({
  73  |         status: 200,
  74  |         contentType: 'application/json',
  75  |         body: JSON.stringify([
  76  |           {
  77  |             id: 'nar-1',
  78  |             titulo: 'Relato de la comunidad',
  79  |             contenido: 'Contenido publicado',
  80  |             regionCultural: 'andina',
  81  |             autor: { id: 'autor-estudiante-1' },
  82  |             estado: 'PUBLICADA'
  83  |           }
  84  |         ])
  85  |       });
  86  |       return;
  87  |     }
  88  | 
  89  |     await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  90  |   });
  91  | });
  92  | 
  93  | test('E2E-01 registro de estudiante en tres pasos', async ({ page }) => {
  94  |   await page.goto('/');
  95  |   await page.getByText(/Registrate como Estudiante/i).click();
  96  | 
  97  |   await expect(page).toHaveURL(/registro-de-estudiante/);
  98  | 
  99  |   await page.locator('#firstname').fill('Ana Maria');
  100 |   await page.locator('#lastname').fill('Quispe Paz');
  101 |   await page.locator('#email').fill(`ana.${Date.now()}@cultura.edu`);
  102 |   await page.locator('#password').fill('Clave-123');
  103 |   await page.locator('#confirmPassword').fill('Clave-123');
  104 |   await page.getByRole('button', { name: /Siguiente Paso/i }).click();
  105 | 
  106 |   await page.getByText('Selecciona nivel').click();
  107 |   await page.getByRole('button', { name: 'Secundaria' }).click();
  108 |   await page.getByText('Selecciona grado').click();
  109 |   await page.getByRole('button', { name: '5to de Secundaria' }).click();
  110 |   await page.locator('#institution').fill('Colegio Cultura Viva');
  111 |   await page.getByRole('button', { name: /Siguiente Paso/i }).click();
  112 | 
  113 |   await page.locator('#motherTongue').fill('Quechua');
  114 |   await page.getByText(/Selecciona/).click();
  115 |   await page.getByRole('button', { name: 'andina' }).click();
  116 |   await page.locator('#bio').fill('Comparto relatos de mi comunidad');
  117 | 
  118 |   page.once('dialog', (dialog) => dialog.accept());
  119 |   await page.getByRole('button', { name: /Crear mi perfil/i }).click();
  120 | 
  121 |   await expect(page).toHaveURL(/\/\?role=student/);
  122 | });
  123 | 
  124 | test('E2E-02 login por rol carga el panel correcto', async ({ page }) => {
  125 |   await page.goto('/');
  126 |   await page.locator('#email').fill('estudiante@cultura.edu');
  127 |   await page.locator('#password').fill('Clave-123');
  128 |   await page.getByRole('button', { name: /Entrar/i }).click();
  129 | 
  130 |   await expect(page).toHaveURL(/panel-del-estudiante/);
  131 | 
  132 |   await page.goto('/');
  133 |   await page.getByRole('button', { name: /Docente/i }).click();
  134 |   await page.locator('#email').fill('docente@cultura.edu');
  135 |   await page.locator('#password').fill('Clave-123');
  136 |   await page.getByRole('button', { name: /Entrar/i }).click();
  137 | 
  138 |   await expect(page).toHaveURL(/panel-del-docente/);
  139 | });
  140 | 
  141 | test('E2E-05 biblioteca publica y detalle son navegables', async ({ page }) => {
  142 |   await page.goto('/biblioteca-cultural-explorador');
  143 |   await expect(page.locator('body')).toContainText(/Biblioteca|Explorador|Narrativa/i);
  144 | 
  145 |   await page.goto('/vista-detalle-de-narrativa-publica');
  146 |   await expect(page.locator('body')).toContainText(/Narrativa|Cultura|Relato/i);
  147 | });
  148 | 
  149 | test('calidad responsive: pantallas criticas no desbordan horizontalmente', async ({ page }) => {
  150 |   const routes = ['/', '/registro-de-estudiante', '/biblioteca-cultural-explorador'];
  151 | 
  152 |   for (const route of routes) {
  153 |     await page.goto(route);
  154 |     const hasHorizontalOverflow = await page.evaluate(() =>
  155 |       document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  156 |     );
  157 | 
> 158 |     expect(hasHorizontalOverflow, `${route} no debe tener overflow horizontal`).toBe(false);
      |                                                                                 ^ Error: / no debe tener overflow horizontal
  159 |   }
  160 | });
  161 | 
```