import http from 'k6/http';
import { check } from 'k6';

let ehSasToken = __ENV.EVENTHUB_ACCESS_TOKEN;
let ehNamespace = __ENV.EVENTHUB_NAMESPACE;
let ehName = __ENV.EVENTHUB_NAME;

console.log(ehName);

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

    console.log(res);

    check(res, {
        "is status 200": r => r.status >= 200 && r.status <= 300
    });

};

