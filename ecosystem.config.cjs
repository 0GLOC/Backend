module.exports = {
  apps : [
    {
      name   : "server1",
      script : "src/server/server.js",
      env: {
        PORT:8080
      }
    },
    {
      name   : "server2",
      script : "src/server/server.js",
      env: {
        PORT:8081
      },
      exec_mode:'cluster',
      node_args:"--harmony",
      instances:4
    },
    {
      name   : "server3",
      script : "src/server/server.js",
      env: {
        PORT:8082
      }
    },
  ]
}
