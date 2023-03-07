import { UseCaseError } from "../../../core/domain/useCaseError"
import { Result } from "../../../core/logic/result"

export namespace ProdutoRepositoryErrors {

  export class ProdutoNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Produto not exists`
      } as UseCaseError)
    }
  }

  export class ProdutoListEmpty extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Produto List is empty`
      } as UseCaseError)
    }
  }

}