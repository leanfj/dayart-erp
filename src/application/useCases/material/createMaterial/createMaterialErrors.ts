import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace CreateMaterialErrors {

  export class MaterialAlreadyExists extends Result<UseCaseError> {    
    constructor (titulo: string) {
      super(false, {
        message: `The Material ${titulo} already exists`
      } as UseCaseError)
    }
  }


  export class UnidadeMedidaDoesNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Unidade de Medida do not exists`
      } as UseCaseError)
    }
  }

  

}