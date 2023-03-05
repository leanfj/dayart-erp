import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace TokenErrors {

  export class TokenInvalid extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Token is invalid`
      } as UseCaseError)
    }
  }

}