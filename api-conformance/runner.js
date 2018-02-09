const csv = require('csvtojson');
const util = require('util');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'testing';
const server = require('../build/dev-server.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function assembleTemplate(literal, params) {
    return new Function(params, "return `"+literal+"`;");
}

const generateFeature = async (csvConfig) => {
  const payments = csvConfig.group[0];

  const groupPath = path.join(__dirname, 'features', payments);
  const templatePath = path.join(groupPath, `${payments}.feature.template`);
  const template = assembleTemplate((await readFile(templatePath)).toString('utf-8'), "templatePayload");
  const templatePayload = `${ csvConfig.payload.reduce((acc, curr) => `${acc}
    | ${curr[0]}           | ${curr[1]}           |`, `  | field            | value             |`) }`;
  const featureContent = template(templatePayload);
  const featurePath = path.join(groupPath, `${payments}.feature`);
  await writeFile(featurePath, featureContent);
  return featurePath;
};

const parser = (path) => {
  const result = { group: [], payload: [] };
  return new Promise((resolve, reject) => {
    csv()
    .fromFile(path)
    .on('json', (obj) => {
      result.group.push(obj.conformance_type);
      const keys = Object.keys(obj);
      keys.shift();
      result.payload = keys.map(k => [ k, obj[k]]);
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
    featurePath = await generateFeature(csvConfig);
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
