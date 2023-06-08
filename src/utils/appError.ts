export default class AppError extends Error {
  statusCode: number;
  messages: string[];
  constructor(message: string[], statusCode: number) {
    super();
    this.messages = message;
    this.statusCode = statusCode;
  }
}
