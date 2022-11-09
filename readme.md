Instructions to generate sas token - 
1. Add parameters to the generate token command.
2. In the ouput copy the token after the SharedAccessSignature as is. It would be utf-8 encoded.


Instructions to run the test -
git clone https://github.com/jainharsh98/k6Eventhubs.git
cd k6Eventhubs
export EVENTHUB_ACCESS_TOKEN=""
export EVENTHUB_NAMESPACE=""
export EVENTHUB_NAME=""
k6 run ./script.js
