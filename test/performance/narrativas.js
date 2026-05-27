import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 5 },
    { duration: '40s', target: 15 },
    { duration: '20s', target: 0 }
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000']
  }
};

const baseUrl = __ENV.BASE_URL || 'https://narrativas-digitales-culturales.onrender.com/sistema/api/v1';
const authorId = __ENV.AUTHOR_ID || '00000000-0000-0000-0000-000000000000';

export default function () {
  const response = http.get(`${baseUrl}/narrativas/autor/${authorId}`);

  check(response, {
    'consulta narrativas sin error servidor': (r) => r.status !== 500,
    'tiempo de respuesta aceptable': (r) => r.timings.duration < 3000
  });

  sleep(1);
}
