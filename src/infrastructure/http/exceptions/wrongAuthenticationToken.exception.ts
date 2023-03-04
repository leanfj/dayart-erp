import { HttpException } from "./http.exceptions";

export class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, "Wrong authentication token");
  }
}
