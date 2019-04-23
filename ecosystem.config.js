module.exports = {
  apps : [{
    name: 'API',
    script: 'src/main.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]

  // deploy : {
  //   production : {
  //     user : '',
  //     host : '',
  //     ref  : '',
  //     repo : '',
  //     path : '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
