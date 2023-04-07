import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace DeleteUnidadeMedidaErrors {

  export class UnidadeMedidaNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The UnidadeMedida not exists`
      } as UseCaseError)
    }
  }

}