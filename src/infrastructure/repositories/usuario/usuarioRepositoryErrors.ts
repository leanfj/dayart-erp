import { RepositoryError } from "../../../core/domain/repositoryError"
import { Result } from "../../../core/logic/result"

export namespace UsuarioRepositoryErrors {

  export class UsuarioNotExists extends Result<RepositoryError> {    
    constructor () {
      super(false, {
        message: `The Usuario not exists`
      } as RepositoryError)
    }
  }

  export class UsuarioListEmpty extends Result<RepositoryError> {    
    constructor () {
      super(false, {
        message: `The Usuario List is empty`
      } as RepositoryError)
    }
  }

}


