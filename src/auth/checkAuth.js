"use strict";
const {findById} = require("../services/apiKey.service");
const {HEADER} = require("../utils/constants");

const apiKey = async (req, res, next) => {
   try {
      const key = req.headers[HEADER.API_KEY]?.toString();
      if (!key) {
         return res.status(403).json({message: "Forbidden Error"});
      }
      // Check objKey
      const objKey = await findById(key);
      if (!objKey) {
         return res.status(403).json({message: "Forbidden Error"});
      }
      req.objKey = objKey;
      return next();
   } catch (error) {
      console.log("apiKey ~ error", error);
   }
};

const checkPermission = (permission) => {
   return (req, res, next) => {
      if (!req.objKey.permissions) {
         return res.status(403).json({message: "Permission Denied"});
      }
      // Kiểm tra permission có hợp lệ không
      console.log("permission:: ", req.objKey.permissions);
      const validPermission = req.objKey.permissions.includes(permission);
      if (!validPermission) {
         return res.status(403).json({message: "Permission Denied"});
      }
      return next();
   };
};

module.exports = {apiKey, checkPermission};
