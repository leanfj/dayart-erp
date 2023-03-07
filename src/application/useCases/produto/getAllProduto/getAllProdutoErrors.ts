import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace GetAllProdutoErrors {

  export class ProdutoListEmpty extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Produto List is empty`
      } as UseCaseError)
    }
  }

}