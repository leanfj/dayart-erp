import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace UpdateUnidadeMedidaErrors {

  export class UnidadeMedidaNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The UnidadeMedida not exists`
      } as UseCaseError)
    }
  }

}