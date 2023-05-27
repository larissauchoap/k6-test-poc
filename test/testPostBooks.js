import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
const addBook = JSON.parse(open('../payloads/add-book.json'))
export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export function handleSummary(data) {
  return {
    "PostBooks.html": htmlReport(data),
  };
}

export default function () {
  const res = http.post('https://fakerestapi.azurewebsites.net/api/v1/Books', JSON.stringify(addBook),
    {
      headers: { 'Content-Type': 'application/json' },
    })
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}

