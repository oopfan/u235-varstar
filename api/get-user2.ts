import { NowRequest, NowResponse } from '@now/node'
const got = require('got');

// I need error handling!
export default (req: NowRequest, res: NowResponse) => {
  (async () => {
    const body = await got('https://oopfan.github.io/u235-vstar/gk-boo.json').json();
    res.json(body);
  })();
}
