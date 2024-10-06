"use strict";
const {model, Schema} = require("mongoose");

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

// Declare the Schema of the Mongo model
const apiKeySchema = new Schema(
   {
      key: {
         type: String,
         required: true,
         unique: true,
      },
      // Xem key này có hoạt động hay không
      status: {
         type: Boolean,
         default: true,
      },
      // User cầm key này để add vào header của request và verify nó
      permissions: {
         type: [String],
         required: true,
         enum: ["0000", "1111", "2222"],
      },
   },
   {timestamps: true, collection: COLLECTION_NAME}
);

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);
