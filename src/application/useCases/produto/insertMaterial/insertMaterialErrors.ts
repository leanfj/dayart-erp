import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace InsertMaterialErrors {

  export class MaterialAlreadyExists extends Result<UseCaseError> {    
    constructor (titulo: string) {
      super(false, {
        message: `The Material ${titulo} already exists`
      } as UseCaseError)
    }
  }

  export class ProdutoNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Produto not exists`
      } as UseCaseError)
    }
  }
}