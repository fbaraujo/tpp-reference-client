const csv = require('csvtojson');

process.env.NODE_ENV = process.env.NODE_ENV || 'testing';
const server = require('../build/dev-server.js');

const parser = (path) => {
  const result = { group: [] };
  return new Promise((resolve, reject) => {
    csv()
    .fromFile(path)
    .on('json', (obj) => {
      result.group.push(obj.conformance_type);
    })
    .on('done', (error) => {
      if (error){
        reject(error);
      }else{
        resolve(result);
      }
    });
  });
};

const extractCsvConfigIfAny = async (opts) => {
  if (!opts.includes('--csv')) return null;

  const csvPath = opts[opts.indexOf('--csv') + 1];
  const result = await parser(csvPath);
  return result;
};

const startServer = async () => server.ready;

const startRunner = async () => {
  await startServer();

  let opts = process.argv.slice(2);
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'api-conformance/nightwatch.conf.js']);
  }

  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome']);
  }

  const csvConfig = await extractCsvConfigIfAny(opts);
  if (csvConfig) {
    opts = opts.concat(['--group', csvConfig.group.join(',')]);
  }

  const spawn = require('cross-spawn'); // eslint-disable-line
  const runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' });

  runner.on('exit', (code) => {
    server.close();
    process.exit(code);
  });

  runner.on('error', (err) => {
    server.close();
    throw err;
  });
};

startRunner();
