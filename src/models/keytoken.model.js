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
      privateKey: {
         type: String,
         required: true,
      },
      // Refresh token này detect những hacker sd trái phép token của user
      refreshTokensUsed: {
         type: Array,
         default: [], // Những refreshToken đã sử dụng
      },
      // refreshToken đang được sử dụng
      refreshToken: {
         type: String,
         default: null,
      },
   },
   {timestamps: true, collection: COLLECTION_NAME}
);

module.exports = model(DOCUMENT_NAME, keyTokenSchema);
