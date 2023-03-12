import { UseCaseError } from "../../../core/domain/useCaseError"
import { Result } from "../../../core/logic/result"

export namespace MaterialRepositoryErrors {

  export class MaterialNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Material not exists`
      } as UseCaseError)
    }
  }

  export class MaterialListEmpty extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Material List is empty`
      } as UseCaseError)
    }
  }

}