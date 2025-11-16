export class ApiErrorResponse extends Error {
  constructor(statusCode, message, data) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}
