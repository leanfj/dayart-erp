import { UseCaseError } from "../../../core/domain/useCaseError"
import { Result } from "../../../core/logic/result"

export namespace UpdateClienteErrors {

  export class ClienteNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Cliente not exists`
      } as UseCaseError)
    }
  }

}