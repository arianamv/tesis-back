module.exports = {
  apps: [{
    name: "back",
    script: "./server/app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
};
