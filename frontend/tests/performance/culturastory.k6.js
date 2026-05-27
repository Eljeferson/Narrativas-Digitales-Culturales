import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.02'],
    'http_req_duration{scenario:login}': ['p(95)<2000'],
    'http_req_duration{scenario:registro}': ['p(95)<3000'],
    'http_req_duration{scenario:instituciones}': ['p(95)<1000'],
    'http_req_duration{scenario:biblioteca}': ['p(95)<2000'],
    'http_req_duration{scenario:ia}': ['p(95)<8000']
  },
  scenarios: {
    login: {
      executor: 'shared-iterations',
      vus: 20,
      iterations: 1000,
      exec: 'login'
    },
    registro: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 1000,
      exec: 'registro'
    },
    instituciones: {
      executor: 'shared-iterations',
      vus: 30,
      iterations: 1000,
      exec: 'instituciones'
    },
    biblioteca: {
      executor: 'shared-iterations',
      vus: 30,
      iterations: 1000,
      exec: 'biblioteca'
    },
    ia: {
      executor: 'shared-iterations',
      vus: 5,
      iterations: 1000,
      exec: 'ia'
    }
  }
};

const baseUrl = __ENV.API_BASE_URL ?? 'http://localhost:8080/sistema/api/v1';

export function login() {
  const response = http.post(`${baseUrl}/auth/login`, JSON.stringify({
    email: __ENV.TEST_STUDENT_EMAIL ?? 'estudiante@cultura.edu',
    password: __ENV.TEST_STUDENT_PASSWORD ?? 'Clave-123',
    rol: 'estudiante'
  }), {
    headers: { 'Content-Type': 'application/json' },
    tags: { scenario: 'login' }
  });

  check(response, {
    'login responde 2xx o 4xx controlado': (res) => res.status < 500
  });
  sleep(1);
}

export function registro() {
  const unique = `${Date.now()}-${__VU}-${__ITER}`;
  const response = http.post(`${baseUrl}/auth/registro`, JSON.stringify({
    email: `prueba.${unique}@cultura.edu`,
    password: 'Clave-123',
    rol: 'estudiante',
    nombreCompleto: 'Usuario de Prueba',
    grado: '5to de Secundaria',
    institucion: 'Colegio Cultura Viva',
    lenguaMaterna: 'Quechua',
    regionCultural: 'andina',
    bio: 'Perfil creado para prueba de rendimiento frontend'
  }), {
    headers: { 'Content-Type': 'application/json' },
    tags: { scenario: 'registro' }
  });

  check(response, {
    'registro no falla por servidor': (res) => res.status < 500
  });
  sleep(1);
}

export function instituciones() {
  const response = http.get(`${baseUrl}/instituciones?nombre=Cultura`, {
    tags: { scenario: 'instituciones' }
  });

  check(response, {
    'instituciones responde': (res) => res.status < 500
  });
  sleep(1);
}

export function biblioteca() {
  const response = http.get(`${baseUrl}/narrativas/autor/${__ENV.TEST_AUTHOR_ID ?? '00000000-0000-0000-0000-000000000000'}`, {
    tags: { scenario: 'biblioteca' }
  });

  check(response, {
    'consulta narrativas responde': (res) => res.status < 500
  });
  sleep(1);
}

export function ia() {
  const response = http.get(`${baseUrl}/narrativas/generar-esquema?cultura=quechua`, {
    timeout: '15s',
    tags: { scenario: 'ia' }
  });

  check(response, {
    'ia responde o informa error controlado': (res) => res.status < 500 || res.status === 504
  });
  sleep(1);
}
