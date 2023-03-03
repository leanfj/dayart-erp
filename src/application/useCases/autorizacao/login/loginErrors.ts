import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace LoginErrors {

  export class PasswordOrEmailIncorrect extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Password or Email is incorrect`
      } as UseCaseError)
    }
  }

}