"use strict";
const {ReasonStatus, StatusCode} = require("../utils/constants");

class ErrorResponse extends Error {
   constructor(message, status) {
      super(message);
      this.status = status;
   }
}

class ConflictRequestError extends ErrorResponse {
   constructor(
      message = ReasonStatus.CONFLICT,
      statusCode = StatusCode.CONFLICT
   ) {
      super(message, statusCode);
   }
}

class BadRequestError extends ErrorResponse {
   constructor(
      message = ReasonStatus.BAD_REQUEST,
      statusCode = StatusCode.BAD_REQUEST
   ) {
      super(message, statusCode);
   }
}

class AuthFailureError extends ErrorResponse {
   constructor(
      message = ReasonStatus.UNAUTHORIZED,
      statusCode = StatusCode.UNAUTHORIZED
   ) {
      super(message, statusCode);
   }
}

class NotFoundError extends ErrorResponse {
   constructor(
      message = ReasonStatus.NOT_FOUND,
      statusCode = StatusCode.NOT_FOUND
   ) {
      super(message, statusCode);
   }
}
module.exports = {
   ConflictRequestError,
   BadRequestError,
   AuthFailureError,
   NotFoundError,
};
