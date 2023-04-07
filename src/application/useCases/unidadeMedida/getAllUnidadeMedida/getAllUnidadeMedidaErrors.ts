import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace GetAllUnidadeMedidaErrors {

  export class UnidadeMedidaListEmpty extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The UnidadeMedida List is empty`
      } as UseCaseError)
    }
  }

}