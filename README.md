
# NodeJS Test Project

## How to use

>#### Setup

Clone it:

```bash
git clone https://github.com/nicoosokhan/objective.git
```

Then install required packages as follow:

```bash
npm install
```

> All api route set with version of api in config
>  `host/v1/humans`

### Run At development environment

for run server , we use [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/) package :

> At development environment

```bash
# start serve
npm run dev-start

#stop server
npm run dev-stop

#restart server
npm run dev-restart
```

> At production environment

```bash
# start serve
npm run prod-start

#stop server
npm run prod-stop

#restart server
npm run prod-restart
```

and also can use pm2 command

for monitor server `pm2 monit [id]`

for get logs `pm2 logs [id]`




### env config

in root project we have a config file `./ecosystem.config.js`

in this file we set environment variable and config for both production and development

```
env: {
  NODE_ENV: 'development',
  DEBUG: 'true',
  PORT: '3000'
},
env_production: {
  NODE_ENV: 'production',
  DEBUG: 'false',
  PORT: '8080

  '
}
```




#### File structures


```
complex
├── README.md
├── doc
├── node_modules
├── .gitignore
├── package.json
├── doc
├── swagger
│   ├── swagger.yml
│   
│   
└── src
    ├── main.js
    ├── main.test.js
    ├── app





```

>Initial source placed in ` ./src/main.js `

>All tests at ` ./src/main.test.js `


>main source code must placed at ` ./src/app ` dir

>Server listener placed at ` ./src/app/App.js `

### Test

```bash
npm run test
```


![](https://i.ibb.co/WH20j8x/test-done.jpg?raw=true)


### dependencies

| dependency | guide |
| ------ | ------ |
| koa | [doc](https://koajs.com/#introduction) |
| Pm2 | [doc](https://pm2.io/doc/en/runtime/overview) |
| chai | [doc](https://www.chaijs.com/guide/) |
| jest | [doc](https://jestjs.io/docs/en/getting-started) |
| Mocha | [doc](https://github.com/mochajs/mocha) |
| supertest | [doc](https://github.com/visionmedia/supertest) |


### Project Tasks

- [x] Implement *DEV* workflow
- [x] Implement *PROD* workflow
- [x] Push source code in github
- [x] Setup server
- [x] implements API
- [x] setup test
