const request = require('request');

const CHAINLINK_BASE = process.env.CHAINLINK_BASE
const rewardViewJob = "25a8b19dd5c6428ab81b6d9c5b8f1de6"

module.exports.rewardView = (body) => {
    const options = {
        'method': 'POST',
        'url': CHAINLINK_BASE + `/v2/specs/${rewardViewJob}/runs`,
        'headers': {
          'X-Chainlink-EA-AccessKey': '29fc945b88f5485daf5160d0132c0e2a',
          'X-Chainlink-EA-Secret': 'HG0JaTfwm35pCQNUgcWvuksXJDazML0PDmfqByWghTWxWtLx7y7Fh4qJH5HD6grT',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      request(options, (error, response) => { 
        if (error) console.log(error);
        console.log('Rewarded.');
      });
}