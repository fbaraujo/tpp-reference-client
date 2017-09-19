# sample-tpp-client-vue

> View account balance

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

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
