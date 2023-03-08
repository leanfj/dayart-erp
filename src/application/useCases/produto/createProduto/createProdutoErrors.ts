import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace CreateProdutoErrors {

  export class ProdutoAlreadyExists extends Result<UseCaseError> {    
    constructor (titulo: string) {
      super(false, {
        message: `The Produto ${titulo} already exists`
      } as UseCaseError)
    }
  }

}