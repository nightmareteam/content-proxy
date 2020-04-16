import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
    vus: 100,
    duration: '60s'
  }  

  export default function() {
    const gameId = Math.floor(Math.random() * 10000000);
    check(http.get(`http://localhost:3000/content/${gameId}`), {
        'Sent for 200': r => r.status == 200,
        'transaction time < 1000ms': r => r.timings.duration < 1000,
    }) || errorRate.add(1);
    sleep(.1);
}