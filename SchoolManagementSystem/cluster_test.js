const cluster = require("cluster");
const http = require("http");
const { Server } = require("socket.io");
const redisAdapter = require("socket.io-redis");
const numCPUs = require("os").cpus().length;
const { setupMaster, setupWorker } = require("@socket.io/sticky");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const httpServer = http.createServer();
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection", // either "random", "round-robin" or "least-connection"
  });
  httpServer.listen(3000);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const server = require("http").Server();
  const io = require("socket.io")(server, { path: "/api/sockets" });
  io.adapter(redisAdapter({ host: "localhost", port: 6379 }));
  setupWorker(io);

  io.on("connection", (socket) => {
    /* ... */
  });
}

/*
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var redis = require("socket.io-redis");
io.adapter(redis({host: "localhost", port:  6379}));*/
