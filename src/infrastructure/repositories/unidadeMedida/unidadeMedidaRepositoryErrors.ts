import { UseCaseError } from "../../../core/domain/useCaseError"
import { Result } from "../../../core/logic/result"

export namespace UnidadeMedidaRepositoryErrors {

  export class UnidadeMedidaNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The UnidadeMedida not exists`
      } as UseCaseError)
    }
  }

  export class UnidadeMedidaListEmpty extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The UnidadeMedida List is empty`
      } as UseCaseError)
    }
  }

}