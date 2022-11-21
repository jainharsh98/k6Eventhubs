import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

let ehSasToken = __ENV.EVENTHUB_ACCESS_TOKEN;
let ehNamespace = __ENV.EVENTHUB_NAMESPACE;
let ehName = __ENV.EVENTHUB_NAME;

console.log(ehName);

let inputStages = JSON.parse('[{"target":10,"duration":"1m"}]')

export let options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
        executor: 'ramping-arrival-rate',
        startRate: 1,
        timeUnit: '1s',
        preAllocatedVUs: 1000,
        maxVUs: 10000,
        stages: inputStages
        }
    }
}

console.log(options)

export function handleSummary(data) {
    const med_latency = data.metrics.myCounter;
    const latency_message = `The median latency was ${med_latency}\n`;
  
    return {
      stdout: latency_message,
    };
}

const myCounter = new Counter('my_counter');

export default function () {
    const body = {
        key: "randomKey1",
        value: "randomKey2",
    };
    var params = {
        headers: {
            'Content-Type': 'application/atom+xml;type=entry;charset=utf-8',
            'Authorization': `SharedAccessSignature ${ehSasToken}`,
            'Host': `${ehNamespace}.servicebus.windows.net`
        },
    };

    var uri = `https://${ehNamespace}.servicebus.windows.net/${ehName}/messages`
    var url = `${uri}?api-version=2014-01`
    let res = http.post(url, JSON.stringify(body), params);

    //console.log(res);

    check(res, {
        "is status 200": r => r.status >= 200 && r.status <= 300
    });

    myCounter.add(1);
};



