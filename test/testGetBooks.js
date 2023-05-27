import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export function handleSummary(data) {
  return {
    "getBooks.html": htmlReport(data),
  };
}

export default function () {
  const res = http.get('https://fakerestapi.azurewebsites.net/api/v1/Books');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

