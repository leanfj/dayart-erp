import { UseCaseError } from "../../../../core/domain/useCaseError"
import { Result } from "../../../../core/logic/result"

export namespace RegisterUsuarioErrors {

  export class UsuarioAlreadyExists extends Result<UseCaseError> {    
    constructor (nome: string) {
      super(false, {
        message: `The Usuario ${nome} already exists`
      } as UseCaseError)
    }
  }

}