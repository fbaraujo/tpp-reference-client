# sample-tpp-client-vue

> View account balance

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080, set API base URL with API_BASE_URL
API_BASE_URL=http://localhost:8003/open-banking/v1.1 npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit
```

## Integration tests

To run integration tests, you must have the following servers
installed and running locally [sample-tpp-server](https://github.com/OpenBankingUK/sample-tpp-server) and
[readwrite-api-mock-server](https://github.com/OpenBankingUK/readwrite-api-mock-server). Then run:

```bash
# run e2e tests
npm run e2e
# or to run with development configuration
TEST=e2e NODE_ENV=development npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deploy to heroku

To deploy to heroku for the first time from a Mac:

```sh
brew install heroku

heroku login

heroku create --region eu <newname>

heroku config:set API_BASE_URL=https://example.com/open-banking/v1.1

# For now, set NPM_CONFIG_PRODUCTION=false so dev dependencies
# get installed on server by `npm install`.
# We need dev dependencies installed to run `npm run build` to generate
# ./dist directory on server.
heroku config:set NPM_CONFIG_PRODUCTION=false

git push heroku master
```

For more details see: https://devcenter.heroku.com/articles/nodejs-support
