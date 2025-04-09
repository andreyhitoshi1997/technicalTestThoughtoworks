import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 50,
    duration: '10s',
};

export default function () {
    const url = 'https://marsair.recruiting.thoughtworks.net/AndreyOnoue';
    const payload = 'departing=0&returning=5&promotional_code=AB9-CD3-457';
    const params = {
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'rack.session=BAh7BkkiD3Nlc3Npb25faWQGOgZFVG86HVJhY2s6OlNlc3Npb246OlNlc3Npb25JZAY6D0BwdWJsaWNfaWRJIkU1YjU0MzVjNjg1MGQ4MmYxODZkNjhlODk4MmUzOTE3NDkwNjYwNzU0MjJjZGZlNmYyZjU0ZjNkNDI5ZmYxMTdhBjsARg%3D%3D--a48dcba7624fa7d753989e0b8074dfbd3552b675',
        'dnt': '1',
        'origin': 'https://marsair.recruiting.thoughtworks.net',
        'pragma': 'no-cache',
        'priority': 'u=0, i',
        'referer': 'https://marsair.recruiting.thoughtworks.net/AndreyOnoue',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-arch': 'x86',
        'sec-ch-ua-bitness': '64',
        'sec-ch-ua-full-version-list': '"Chromium";v="134.0.6998.88", "Not:A-Brand";v="24.0.0.0", "Google Chrome";v="134.0.6998.88"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"Linux"',
        'sec-ch-ua-platform-version': '6.8.0',
        'sec-ch-ua-wow64': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    },
};

    const response = http.post(url, payload, params);

    check(response, {
        'status is 200': (r) => r.status === 200,
        'response time under 200ms': (r) => r.timings.duration < 200,
    });
}