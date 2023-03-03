import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace GetUsuarioByEmailErrors {

  export class UsuarioNotExists extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Usuario not exists`
      } as UseCaseError)
    }
  }

}