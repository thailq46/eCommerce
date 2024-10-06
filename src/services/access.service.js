"use strict";
const shopModel = require("../models/shop.model");
const bycrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const {createTokenPair} = require("../auth/authUtils");
const {getInfoData} = require("../utils");

const RoleShop = {
   SHOP: "SHOP",
   WRITER: "WRITER",
   EDITOR: "EDITOR",
   ADMIN: "ADMIN",
};

// Sẽ viết static để không cần khởi tạo instance
class AccessService {
   static signUp = async ({name, email, password}) => {
      try {
         // Step 1: Check email exist
         const holderShop = await shopModel.findOne({email}).lean(); // lean() để chuyển từ mongoose document sang object nó sẽ nhanh hơn rất nhiều so với việc trả về mongoose document
         if (holderShop) {
            return {
               code: "xxxx",
               message: "Shop already registered!",
            };
         }
         // Step 2: Create new shop
         const passwordHash = await bycrypt.hash(password, 10);
         const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [RoleShop.SHOP],
         });
         if (newShop) {
            // Created privateKey and publicKey Sử dụng thuật toán Bất đối xứng (privateKey tạo xong đẩy cho user -> sign token, publicKey lưu hệ thống -> verify token Vì lấy đc publicKey nhưng ko có nhiệm vụ để sign token mà chỉ để verify token -> Nếu mà hack đc hệ thống thì phải biết được cả 2)
            const {privateKey, publicKey} = crypto.generateKeyPairSync("rsa", {
               modulusLength: 4096,
               publicKeyEncoding: {
                  type: "pkcs1", // pkcs1 là public key cryptograp standard 1
                  format: "pem",
               },
               privateKeyEncoding: {
                  type: "pkcs1",
                  format: "pem",
               },
            });

            console.log({privateKey, publicKey});

            const publicKeyString = await KeyTokenService.createKeyToken({
               userId: newShop._id,
               publicKey,
            });

            if (!publicKeyString) {
               return {
                  code: "xxxx",
                  message: "publicKeyString error!",
               };
            }

            const publicKeyObject = crypto.createPublicKey(publicKeyString);

            const tokens = await createTokenPair(
               {userId: newShop._id, email},
               publicKeyObject,
               privateKey
            );
            console.log("Created Tokens Success:: ", tokens);
            return {
               code: 201,
               metadata: {
                  shop: getInfoData({
                     fileds: ["_id", "name", "email"],
                     object: newShop,
                  }),
                  tokens,
               },
            };
         }
         return {
            code: 200,
            metadata: null,
         };
      } catch (error) {
         return {
            code: "xxx",
            message: error.message,
            status: "error",
         };
      }
   };
}

module.exports = AccessService;
