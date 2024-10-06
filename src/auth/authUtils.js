"use strict";
const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
   try {
      // accessToken
      const accessToken = JWT.sign(payload, publicKey, {
         expiresIn: "2 days",
      });

      // refreshToken
      const refreshToken = JWT.sign(payload, privateKey, {
         expiresIn: "30 days",
      });

      JWT.verify(accessToken, publicKey, (err, decode) => {
         if (err) {
            console.error("error verify:: ", err);
         } else {
            console.log("decode verify:: ", decode);
         }
      });
      return {accessToken, refreshToken};
   } catch (error) {
      return error;
   }
};

module.exports = {
   createTokenPair,
};
