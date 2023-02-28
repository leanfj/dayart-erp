import { UseCaseError } from "../../../core/domain/useCaseError"
import { Result } from "../../../core/logic/result"

export namespace ClienteRepositoryErrors {

  export class ClienteNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Cliente not exists`
      } as UseCaseError)
    }
  }

}