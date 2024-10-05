"use strict";
const mongoose = require("mongoose");
const {coutConnect} = require("../helpers/check.connect");
const config = require("dotenv");
config.config();

// Cách connect MongoDB mới sử dụng design pattern strategy
const connectString = process.env.MONGODB_CONNECTION || "";

class Database {
   constructor() {
      this.connect();
   }
   // TODO using strategy pattern later
   connect(type = "mongodb") {
      // dev : In các hoạt động khi thực hiện query
      if (1 === 1) {
         mongoose.set("debug", true);
         mongoose.set("debug", {color: true});
      }
      mongoose
         .connect(connectString)
         .then((_) => console.log("Connected to MongoDB PRO: " + coutConnect()))
         .catch((error) => console.log("Connect to MongoDB failed", error));
   }
   static getInstance() {
      if (!this.instance) {
         this.instance = new Database();
      }
      return this.instance;
   }
}
const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
