import { HttpException } from "./http.exceptions";

export class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, "Authentication token missing");
  }
}
