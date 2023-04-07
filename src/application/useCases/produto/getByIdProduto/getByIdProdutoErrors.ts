import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace GetByIdProdutoErrors {

  export class ProdutoNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Produto not exists`
      } as UseCaseError)
    }
  }

}