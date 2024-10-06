"use strict";
const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
   // publicKey nó được sinh ra bởi thuật toán bất đối xứng lên nó là Buffer và chưa đc hash nên phải chuyển thành string trước khi lưu vào DB
   static createKeyToken = async ({userId, publicKey}) => {
      try {
         const publicKeyString = publicKey.toString();
         const tokens = await keyTokenModel.create({
            user: userId,
            publicKey: publicKeyString,
         });
         return tokens ? tokens.publicKey : null;
      } catch (error) {
         return error;
      }
   };
}

module.exports = KeyTokenService;
