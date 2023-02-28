import { UseCaseError } from "./useCaseError"
import { Result } from "../logic/result"

export namespace ValidatorDTOErrors {

  export class ValidatorErrors extends Result<UseCaseError> {    
    constructor (message: string) {
      super(false, {
        message: `${message}`
      } as UseCaseError)
    }
  }

}