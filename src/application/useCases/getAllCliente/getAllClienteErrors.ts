import { UseCaseError } from "../../../core/domain/useCaseError"
import { Result } from "../../../core/logic/result"

export namespace GetAllClienteErrors {

  export class ClienteListEmpty extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Cliente List is empty`
      } as UseCaseError)
    }
  }

}