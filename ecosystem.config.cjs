module.exports = {
  apps: [
    {
      name: "youtilleyes-api",
      script: "./artifacts/api-server/dist/index.mjs",
      cwd: "/home/ubuntu/youtileyes",
      interpreter: "node",
      interpreter_args: "--enable-source-maps",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 8080,
      },
    },
  ],
};
