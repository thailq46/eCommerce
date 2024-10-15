"use strict";
const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
   // publicKey nó được sinh ra bởi thuật toán bất đối xứng lên nó là Buffer và chưa đc hash nên phải chuyển thành string trước khi lưu vào DB
   static createKeyToken = async ({
      userId,
      publicKey,
      privateKey,
      refreshToken,
   }) => {
      try {
         // level 0
         // const tokens = await keyTokenModel.create({
         //    user: userId,
         //    publicKey,
         //    privateKey,
         // });
         // return tokens ? tokens.publicKey : null;

         // level xxx
         const filter = {user: userId};
         const update = {
            publicKey,
            privateKey,
            refreshTokensUsed: [],
            refreshToken,
         };
         // Nếu tìm thấy thì update, không tìm thấy thì tạo mới
         const options = {upsert: true, new: true};
         const tokens = await keyTokenModel.findOneAndUpdate(
            filter,
            update,
            options
         );
         return tokens ? tokens.publicKey : null;
      } catch (error) {
         return error;
      }
   };
}

module.exports = KeyTokenService;
