import { NowRequest, NowResponse } from '@now/node'
const got = require('got');

// I need error handling!
export default (req: NowRequest, res: NowResponse) => {
  (async () => {
    const url = 'https://oopfan.github.io/u235-varstar/' + req.query.varstar + '.json';
    const body = await got(url).json();
    res.json(body);
  })();
}
