module.exports = {
  apps: [
    {
      name: "forkeada1",
      script: "src/server/server.js",
      env:{
        PORT:8080
      },
      watch:true,
    },
    {
      name:"forkeada2",
      script: "src/server/server.js",
      env:{
        PORT:8081
      },
      watch:true,
    },
    {
      name:"clusterizado",
      script: "src/server/server.js",
      env:{
        PORT:8082
      },
      exec_mode:'cluster',
      node_args:"--harmony",
      instances:4,
      watch:true
    }
  ]
}
