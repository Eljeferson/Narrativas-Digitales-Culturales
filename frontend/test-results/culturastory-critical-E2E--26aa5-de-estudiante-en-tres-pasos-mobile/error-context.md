# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: culturastory-critical.spec.ts >> E2E-01 registro de estudiante en tres pasos
- Location: tests\e2e\culturastory-critical.spec.ts:93:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText(/Selecciona/)
    - locator resolved to <span _ngcontent-ng-c3144478014="" class="font-medium text-on-surface-variant/40"> Selecciona región </span>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button type="button" _ngcontent-ng-c3144478014="" class="w-full text-left px-6 py-3 hover:bg-[#FDF8F3] text-black font-bold text-base transition-all"> Quechua </button> from <div class="group relative" _ngcontent-ng-c3144478014="">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button type="button" _ngcontent-ng-c3144478014="" class="w-full text-left px-6 py-3 hover:bg-[#FDF8F3] text-black font-bold text-base transition-all"> Quechua </button> from <div class="group relative" _ngcontent-ng-c3144478014="">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    50 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <button type="button" _ngcontent-ng-c3144478014="" class="w-full text-left px-6 py-3 hover:bg-[#FDF8F3] text-black font-bold text-base transition-all"> Quechua </button> from <div class="group relative" _ngcontent-ng-c3144478014="">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - main [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - img "CulturaStory Logo" [ref=e7]
        - generic [ref=e8]: Historia Cultural
      - generic [ref=e9]:
        - heading "Inicia tu viaje como Tejedor de Historias" [level=1] [ref=e10]
        - paragraph [ref=e11]: Cada gran narrativa comienza con un autor. Cuéntanos un poco sobre ti para personalizar tu experiencia.
    - generic [ref=e12]:
      - generic:
        - generic: texture
      - generic [ref=e15]:
        - generic [ref=e17]:
          - heading "diversity_3 Cultura e Identidad" [level=1] [ref=e18]:
            - generic [ref=e19]: diversity_3
            - text: Cultura e Identidad
          - generic [ref=e20]:
            - generic [ref=e21]: Escoge tu identidad de Autor
            - generic [ref=e22]:
              - button "arrow_back_ios_new" [ref=e23]:
                - generic [ref=e24]: arrow_back_ios_new
              - button "arrow_forward_ios" [ref=e25]:
                - generic [ref=e26]: arrow_forward_ios
              - generic [ref=e27]:
                - button "Avatar option" [ref=e29]:
                  - img "Avatar option" [ref=e30]
                - button "Avatar option" [ref=e32]:
                  - img "Avatar option" [ref=e33]
                - button "Avatar option" [ref=e35]:
                  - img "Avatar option" [ref=e36]
                - button "Avatar option" [ref=e38]:
                  - img "Avatar option" [ref=e39]
                - button "Avatar option" [ref=e41]:
                  - img "Avatar option" [ref=e42]
                - button "Avatar option" [ref=e44]:
                  - img "Avatar option" [ref=e45]
                - button "Avatar option" [ref=e47]:
                  - img "Avatar option" [ref=e48]
                - button "Avatar option" [ref=e50]:
                  - img "Avatar option" [ref=e51]
                - button "Avatar option" [ref=e53]:
                  - img "Avatar option" [ref=e54]
                - button "Avatar option" [ref=e56]:
                  - img "Avatar option" [ref=e57]
                - button "Avatar option" [ref=e59]:
                  - img "Avatar option" [ref=e60]
                - button "Avatar option" [ref=e62]:
                  - img "Avatar option" [ref=e63]
                - button "Avatar option" [ref=e65]:
                  - img "Avatar option" [ref=e66]
          - generic [ref=e67]:
            - generic [ref=e68]:
              - generic [ref=e69]: Lengua Materna
              - generic [ref=e70]:
                - generic [ref=e71]:
                  - textbox "Castellano, Quechua..." [active] [ref=e72]: Quechua
                  - button "expand_more" [ref=e73]:
                    - generic [ref=e74]: expand_more
                - list [ref=e76]:
                  - listitem [ref=e77]:
                    - button "Quechua" [ref=e78]
            - generic [ref=e79]:
              - generic [ref=e80]: Región Cultural
              - generic [ref=e82] [cursor=pointer]:
                - generic [ref=e83]: Selecciona región
                - generic [ref=e84]: expand_more
          - generic [ref=e85]:
            - generic [ref=e86]: Biografía / Sobre ti
            - textbox "Biografía / Sobre ti" [ref=e87]:
              - /placeholder: Comparte un poco de tu historia...
            - paragraph [ref=e89]: 0 / 200 palabras
        - generic [ref=e90]:
          - button "arrow_back Anterior" [ref=e91]:
            - generic [ref=e92]: arrow_back
            - text: Anterior
          - button "Crear mi perfil auto_stories" [ref=e93]:
            - generic [ref=e94]: Crear mi perfil
            - generic [ref=e95]: auto_stories
        - paragraph [ref=e97]: Paso 3 de 3
  - generic:
    - generic:
      - generic: landscape
      - generic: park
      - generic: water
```

# Test source

```ts
  14  |       await route.fulfill({
  15  |         status: 200,
  16  |         contentType: 'application/json',
  17  |         body: JSON.stringify({
  18  |           usuario: {
  19  |             id: role === 'docente' ? 'docente-1' : 'estudiante-1',
  20  |             email: payload.email,
  21  |             rol: role,
  22  |             activo: true
  23  |           },
  24  |           autor: {
  25  |             id: role === 'docente' ? 'autor-docente-1' : 'autor-estudiante-1',
  26  |             nombreCompleto: role === 'docente' ? 'Docente Cultura' : 'Estudiante Cultura',
  27  |             grado: '5to de Secundaria',
  28  |             institucion: 'Colegio Cultura Viva'
  29  |           }
  30  |         })
  31  |       });
  32  |       return;
  33  |     }
  34  | 
  35  |     if (url.includes('/auth/registro') && method === 'POST') {
  36  |       const payload = route.request().postDataJSON();
  37  | 
  38  |       await route.fulfill({
  39  |         status: 200,
  40  |         contentType: 'application/json',
  41  |         body: JSON.stringify({
  42  |           usuario: {
  43  |             id: 'estudiante-registrado',
  44  |             email: payload.email,
  45  |             rol: payload.rol
  46  |           },
  47  |           autor: {
  48  |             id: 'autor-registrado',
  49  |             nombreCompleto: payload.nombreCompleto
  50  |           }
  51  |         })
  52  |       });
  53  |       return;
  54  |     }
  55  | 
  56  |     if (url.includes('/instituciones')) {
  57  |       await route.fulfill({
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
> 114 |   await page.getByText(/Selecciona/).click();
      |                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  158 |     expect(hasHorizontalOverflow, `${route} no debe tener overflow horizontal`).toBe(false);
  159 |   }
  160 | });
  161 | 
```