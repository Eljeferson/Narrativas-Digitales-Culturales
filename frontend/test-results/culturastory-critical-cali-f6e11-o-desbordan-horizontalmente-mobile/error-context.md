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
      - button "notifications" [ref=e9]:
        - generic [ref=e10]: notifications
      - button "settings" [ref=e11]:
        - generic [ref=e12]: settings
  - main [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]: auto_awesome
          - text: Tejiendo el futuro del aprendizaje cultural
        - heading "Preserva la Memoria, Crea el Manana." [level=1] [ref=e20]
        - paragraph [ref=e21]: Descubre una plataforma educativa donde la inteligencia artificial se encuentra con la herencia ancestral para tejer narrativas culturales inolvidables.
        - generic [ref=e22]:
          - generic [ref=e23]:
            - text: 500+
            - paragraph [ref=e24]: Historias Ancestrales Digitalizadas
          - generic [ref=e25]:
            - text: "12"
            - paragraph [ref=e26]: Regiones Culturales Activas
      - img "stylized andean textile texture" [ref=e28]
    - generic [ref=e29]:
      - generic [ref=e31]: texture
      - generic [ref=e32]:
        - generic [ref=e33]:
          - heading "Bienvenido al Telar" [level=2] [ref=e34]
          - paragraph [ref=e35]: Ingresa para continuar tu historia
        - generic [ref=e36]:
          - generic [ref=e37]:
            - text: Tipo de Perfil
            - generic [ref=e38]:
              - button "school Estudiante" [ref=e39]:
                - generic [ref=e40]: school
                - generic [ref=e41]: Estudiante
              - button "co_present Docente" [ref=e42]:
                - generic [ref=e43]: co_present
                - generic [ref=e44]: Docente
          - generic [ref=e45]:
            - text: Correo Institucional
            - generic [ref=e46]:
              - generic [ref=e47]: mail
              - textbox "Correo Institucional" [ref=e48]:
                - /placeholder: usuario@cultura.edu
          - generic [ref=e49]:
            - text: Contrasena
            - generic [ref=e50]:
              - generic [ref=e51]: lock
              - textbox "Contrasena" [ref=e52]:
                - /placeholder: ••••••••
            - link "Olvidaste tu clave?" [ref=e53] [cursor=pointer]:
              - /url: "#"
          - button "Entrar al Weaver's Hub arrow_right_alt" [ref=e54]:
            - generic [ref=e55]:
              - text: Entrar al Weaver's Hub
              - generic [ref=e56]: arrow_right_alt
          - paragraph [ref=e58]: Nuevo en el telar? Registrate como Estudiante
        - generic [ref=e59]:
          - paragraph [ref=e60]: O accede via
          - button "Google Logo" [ref=e62]:
            - img "Google Logo" [ref=e63]
  - contentinfo [ref=e64]:
    - generic [ref=e65]:
      - generic [ref=e66]:
        - generic [ref=e67]: fingerprint
        - generic [ref=e68]: Autenticacion Segura
      - paragraph [ref=e69]: © 2024 CulturaStory AI. Tejiendo identidades digitales.
    - generic [ref=e70]:
      - link "Privacidad" [ref=e71] [cursor=pointer]:
        - /url: "#"
      - link "Terminos del Gremio" [ref=e72] [cursor=pointer]:
        - /url: "#"
      - link "Soporte" [ref=e73] [cursor=pointer]:
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