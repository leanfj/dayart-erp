import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace CreateUnidadeMedidaErrors {

  export class UnidadeMedidaAlreadyExists extends Result<UseCaseError> {    
    constructor (titulo: string) {
      super(false, {
        message: `The UnidadeMedida ${titulo} already exists`
      } as UseCaseError)
    }
  }

}