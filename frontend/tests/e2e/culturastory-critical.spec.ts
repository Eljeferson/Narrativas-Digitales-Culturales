import { expect, test } from '@playwright/test';

const apiPattern = '**/sistema/api/v1/**';

test.beforeEach(async ({ page }) => {
  await page.route(apiPattern, async (route) => {
    const url = route.request().url();
    const method = route.request().method();

    if (url.includes('/auth/login') && method === 'POST') {
      const payload = route.request().postDataJSON();
      const role = payload.rol === 'docente' ? 'docente' : 'estudiante';

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          usuario: {
            id: role === 'docente' ? 'docente-1' : 'estudiante-1',
            email: payload.email,
            rol: role,
            activo: true
          },
          autor: {
            id: role === 'docente' ? 'autor-docente-1' : 'autor-estudiante-1',
            nombreCompleto: role === 'docente' ? 'Docente Cultura' : 'Estudiante Cultura',
            grado: '5to de Secundaria',
            institucion: 'Colegio Cultura Viva'
          }
        })
      });
      return;
    }

    if (url.includes('/auth/registro') && method === 'POST') {
      const payload = route.request().postDataJSON();

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          usuario: {
            id: 'estudiante-registrado',
            email: payload.email,
            rol: payload.rol
          },
          autor: {
            id: 'autor-registrado',
            nombreCompleto: payload.nombreCompleto
          }
        })
      });
      return;
    }

    if (url.includes('/instituciones')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            idInstitucion: 'inst-1',
            institucionEducativa: 'Colegio Cultura Viva',
            nivel: 'Secundaria'
          }
        ])
      });
      return;
    }

    if (url.includes('/narrativas/autor/')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'nar-1',
            titulo: 'Relato de la comunidad',
            contenido: 'Contenido publicado',
            regionCultural: 'andina',
            autor: { id: 'autor-estudiante-1' },
            estado: 'PUBLICADA'
          }
        ])
      });
      return;
    }

    await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });
});

test('E2E-01 registro de estudiante en tres pasos', async ({ page }) => {
  await page.goto('/');
  await page.getByText(/Registrate como Estudiante/i).click();

  await expect(page).toHaveURL(/registro-de-estudiante/);

  await page.locator('#firstname').fill('Ana Maria');
  await page.locator('#lastname').fill('Quispe Paz');
  await page.locator('#email').fill(`ana.${Date.now()}@cultura.edu`);
  await page.locator('#password').fill('Clave-123');
  await page.locator('#confirmPassword').fill('Clave-123');
  await page.getByRole('button', { name: /Siguiente Paso/i }).click();

  await page.getByText('Selecciona nivel').click();
  await page.getByRole('button', { name: 'Secundaria' }).click();
  await page.getByText('Selecciona grado').click();
  await page.getByRole('button', { name: '5to de Secundaria' }).click();
  await page.locator('#institution').fill('Colegio Cultura Viva');
  await page.getByRole('button', { name: /Siguiente Paso/i }).click();

  await page.locator('#motherTongue').fill('Quechua');
  await page.getByText(/Selecciona/).click();
  await page.getByRole('button', { name: 'andina' }).click();
  await page.locator('#bio').fill('Comparto relatos de mi comunidad');

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: /Crear mi perfil/i }).click();

  await expect(page).toHaveURL(/\/\?role=student/);
});

test('E2E-02 login por rol carga el panel correcto', async ({ page }) => {
  await page.goto('/');
  await page.locator('#email').fill('estudiante@cultura.edu');
  await page.locator('#password').fill('Clave-123');
  await page.getByRole('button', { name: /Entrar/i }).click();

  await expect(page).toHaveURL(/panel-del-estudiante/);

  await page.goto('/');
  await page.getByRole('button', { name: /Docente/i }).click();
  await page.locator('#email').fill('docente@cultura.edu');
  await page.locator('#password').fill('Clave-123');
  await page.getByRole('button', { name: /Entrar/i }).click();

  await expect(page).toHaveURL(/panel-del-docente/);
});

test('E2E-05 biblioteca publica y detalle son navegables', async ({ page }) => {
  await page.goto('/biblioteca-cultural-explorador');
  await expect(page.locator('body')).toContainText(/Biblioteca|Explorador|Narrativa/i);

  await page.goto('/vista-detalle-de-narrativa-publica');
  await expect(page.locator('body')).toContainText(/Narrativa|Cultura|Relato/i);
});

test('calidad responsive: pantallas criticas no desbordan horizontalmente', async ({ page }) => {
  const routes = ['/', '/registro-de-estudiante', '/biblioteca-cultural-explorador'];

  for (const route of routes) {
    await page.goto(route);
    const hasHorizontalOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );

    expect(hasHorizontalOverflow, `${route} no debe tener overflow horizontal`).toBe(false);
  }
});
