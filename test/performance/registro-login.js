import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1500']
  }
};

const baseUrl = __ENV.BASE_URL || 'https://narrativas-digitales-culturales.onrender.com/sistema/api/v1';

export default function () {
  const suffix = `${__VU}-${__ITER}`;
  const email = `k6.estudiante.${suffix}@test.com`;
  const password = 'Prueba123';

  const registerPayload = JSON.stringify({
    email,
    nombreCompleto: `Estudiante ${suffix}`,
    grado: '5to',
    regionCultural: 'Cusco',
    institucion: 'IE Test',
    lenguaMaterna: 'Quechua',
    password,
    contrasena: password,
    clave: password,
    rol: 'estudiante'
  });

  const registerResponse = http.post(`${baseUrl}/auth/registro`, registerPayload, {
    headers: { 'Content-Type': 'application/json' }
  });

  check(registerResponse, {
    'registro responde 200 o 400 controlado': (r) => r.status === 200 || r.status === 400
  });

  const loginResponse = http.post(`${baseUrl}/auth/login`, JSON.stringify({
    email,
    password,
    rol: 'estudiante'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(loginResponse, {
    'login responde sin error servidor': (r) => r.status !== 500
  });

  sleep(1);
}
