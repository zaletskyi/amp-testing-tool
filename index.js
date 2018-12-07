const pool = require('async-functions-pool')();
const amphtmlValidator = require('amphtml-validator');
const fetch = require('node-fetch');

module.exports = async (urlGenerator, parallel = 1, id) => {
  const validator = await amphtmlValidator.getInstance();
  for(url of urlGenerator()){
    pool.add(makeJob(validator, url, id));
  }
  return pool.run(parallel);
}

const makeJob = (validator, url, id) =>
  async () =>
    ({id, url, ...await validator.validateString(await fetch(url).then(res => res.text()))});
