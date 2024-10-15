"use strict";
const shopModel = require("../models/shop.model");
const bycrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const {createTokenPair} = require("../auth/authUtils");
const {getInfoData} = require("../utils");
const {BadRequestError, AuthFailureError} = require("../core/error.response");
const {findByEmail} = require("./shop.service");

const RoleShop = {
   SHOP: "SHOP",
   WRITER: "WRITER",
   EDITOR: "EDITOR",
   ADMIN: "ADMIN",
};

// Sẽ viết static để không cần khởi tạo instance
class AccessService {
   // refreshToken: Khi login lại nhưng mà có cookie rồi thì cũng phải mang cookie đó đi theo để biết thằng này ngày xưa nó cũng sử dụng token này và bây giờ nó muốn login lại thì xóa token cũ đi để khỏi truy vấn vào DB làm gì
   /**
    * 1 - Check email in dbs
    * 2 - Match password
    * 3 - Create accessToken and refreshToken and save
    * 4 - generate tokens
    * 5 - get data and return login
    */
   static signIn = async ({email, password, refreshToken = null}) => {
      // 1
      const foundShop = await findByEmail({email});
      if (!foundShop) {
         throw new BadRequestError("Error:: Shop not registered!");
      }
      // 2
      const isMatch = await bycrypt.compare(password, foundShop.password);
      if (!isMatch) {
         throw new AuthFailureError("Error:: Authentication error!");
      }
      // 3
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      // 4
      const {_id: userId} = foundShop;
      const tokens = await createTokenPair(
         {userId, email},
         publicKey,
         privateKey
      );
      await KeyTokenService.createKeyToken({
         userId,
         publicKey,
         privateKey,
         refreshToken: tokens.refreshToken,
      });
      return {
         shop: getInfoData({
            fileds: ["_id", "name", "email"],
            object: foundShop,
         }),
         tokens,
      };
   };

   static signUp = async ({name, email, password}) => {
      // Step 1: Check email exist
      const holderShop = await shopModel.findOne({email}).lean(); // lean() để chuyển từ mongoose document sang object nó sẽ nhanh hơn rất nhiều so với việc trả về mongoose document
      if (holderShop) {
         throw new BadRequestError("Error:: Shop already registered!");
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
         // Sử dụng thuật toán bất đối xứng
         // const {privateKey, publicKey} = crypto.generateKeyPairSync("rsa", {
         //    modulusLength: 4096,
         //    publicKeyEncoding: {
         //       type: "pkcs1", // pkcs1 là public key cryptograp standard 1
         //       format: "pem",
         //    },
         //    privateKeyEncoding: {
         //       type: "pkcs1",
         //       format: "pem",
         //    },
         // });

         // Sử dụng thuật toán đối xứng
         const privateKey = crypto.randomBytes(64).toString("hex");
         const publicKey = crypto.randomBytes(64).toString("hex");

         console.log({privateKey, publicKey});

         const keyStore = await KeyTokenService.createKeyToken({
            userId: newShop._id,
            publicKey,
            privateKey,
         });

         if (!keyStore) {
            throw new BadRequestError("Error:: keyStore error!");
         }

         const tokens = await createTokenPair(
            {userId: newShop._id, email},
            publicKey,
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
   };
}

module.exports = AccessService;
