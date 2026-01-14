module.exports = {
  apps: [
    {
      name: "NIKE",
      cwd: "./",
      script: "./dist/server.js",
      watch: false,
      env_production: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
