import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace GetActivedUsuarioByEmailErrors {

  export class UsuarioNotActived extends Result<UseCaseError> {    
    constructor () {
      super(false, {
        message: `The Usuario not Actived. Call the administrator`
      } as UseCaseError)
    }
  }

}