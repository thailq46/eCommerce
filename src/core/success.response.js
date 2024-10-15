"use strict";
const {ReasonStatus, StatusCode} = require("../utils/constants");

class SuccessResponse {
   constructor({
      message,
      statusCode = StatusCode.OK,
      reasonStatusCode = ReasonStatus.OK,
      metadata = {},
   }) {
      this.message = !message ? reasonStatusCode : message;
      this.status = statusCode;
      this.metadata = metadata;
   }

   send(res, headers = {}) {
      return res.status(this.status).json(this);
   }
}

class OK extends SuccessResponse {
   constructor({message, metadata}) {
      super({message, metadata});
   }
}
class CREATED extends SuccessResponse {
   constructor({
      options = {},
      message,
      statusCode = StatusCode.CREATED,
      reasonStatusCode = ReasonStatus.CREATED,
      metadata,
   }) {
      super({message, statusCode, reasonStatusCode, metadata});
      this.options = options;
   }
}

module.exports = {
   OK,
   CREATED,
   SuccessResponse,
};
