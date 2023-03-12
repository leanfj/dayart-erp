import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace UpdateMaterialErrors {

  export class MaterialNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Material not exists`
      } as UseCaseError)
    }
  }

}