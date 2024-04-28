module.exports = {
    apps: [{
      name: "acredipucp",
      script: "./server/app.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  };
  