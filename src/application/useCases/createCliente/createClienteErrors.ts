import { UseCaseError } from "../../../core/domain/useCaseError"
import { Result } from "../../../core/logic/result"

export namespace CreateClienteErrors {

  export class ClienteAlreadyExists extends Result<UseCaseError> {    
    constructor (nome: string) {
      super(false, {
        message: `The Cliente ${nome} already exists`
      } as UseCaseError)
    }
  }

}