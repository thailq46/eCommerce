"use strict";
const {Schema, model} = require("mongoose");

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

const keyTokenSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: "Shop",
      },
      publicKey: {
         type: String,
         required: true,
      },
      // Refresh token này detect những hacker sd trái phép token của user
      refreshToken: {
         type: Array,
         default: [],
      },
   },
   {timestamps: true, collection: COLLECTION_NAME}
);

module.exports = model(DOCUMENT_NAME, keyTokenSchema);
