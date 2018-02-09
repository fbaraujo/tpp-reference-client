const csv = require('csvtojson');
const util = require('util');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'testing';
const server = require('../build/dev-server.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlinkFile = util.promisify(fs.unlink);

const cleanupFeatures = async (featurePaths=[]) => {
  featurePaths.forEach(async (featuresPath) => await unlinkFile(featuresPath));
};

const assembleTemplate = (literal, params) => new Function(params, "return `"+literal+"`;");

const generateFeatures = async (csvConfig) => {
  const group = csvConfig.group;
  const groupPath = path.join(__dirname, 'features', group);
  const templatePath = path.join(groupPath, `${group}.feature.template`);
  const template = assembleTemplate((await readFile(templatePath)).toString('utf-8'), "templatePayload");
  const result = [];

  csvConfig.payloads.forEach(async (payload, index) => {
    const templatePayload = `${ payload.reduce((acc, curr) => `${acc}
      | ${curr[0]}           | ${curr[1]}           |`, `  | field            | value             |`) }`;
    const featureContent = template(templatePayload);
    const featurePath = path.join(groupPath, `${group}-${index}.feature`);
    await writeFile(featurePath, featureContent);
    result.push(featurePath);
  });
  return result;
};

const parser = (csvPath) => {
  const result = {
    group: path.basename(csvPath, '.csv'),
    payloads: []
  };
  return new Promise((resolve, reject) => {
    csv()
    .fromFile(csvPath)
    .on('json', (obj) => {
      const keys = Object.keys(obj);
      result.payloads.push(keys.map(k => [ k, obj[k]]));
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
  let featurePaths;

  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'api-conformance/nightwatch.conf.js']);
  }

  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome']);
  }

  const csvConfig = await extractCsvConfigIfAny(opts);
  if (csvConfig) {
    featurePaths = await generateFeatures(csvConfig);
    opts = opts.concat(['--group', csvConfig.group]);
  }

  const spawn = require('cross-spawn'); // eslint-disable-line
  const runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' });

  runner.on('exit', async (code) => {
    await cleanupFeatures(featurePaths);
    server.close();
    process.exit(code);
  });

  runner.on('error', async (err) => {
    await cleanupFeatures(featurePaths);
    server.close();
    throw err;
  });
};

startRunner();
