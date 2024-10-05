"use strict";
const mongoose = require("mongoose");
const os = require("os");

const _SECOND = 5000;

// count connection
const coutConnect = () => {
   const numConnection = mongoose.connections.length;
   return numConnection;
};

// check over load
const checkOverLoad = () => {
   setInterval(() => {
      const numConnection = mongoose.connections.length;
      const numCores = os.cpus().length;
      const memoryUsage = process.memoryUsage().rss;
      // Giả sử 1 core chịu được 5 connection
      const maxConnections = numCores * 5;

      console.log(`Active connections: ${numConnection}`);
      console.log("Memory usage: ", memoryUsage / 1024 / 1024, "MB");
      if (numConnection > maxConnections) {
         console.log("Connection overload detected");
      }
   }, _SECOND); // Monitor every 5 seconds
};

module.exports = {coutConnect, checkOverLoad};
