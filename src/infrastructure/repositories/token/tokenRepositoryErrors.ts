import { RepositoryError } from "../../../core/domain/repositoryError"
import { Result } from "../../../core/logic/result"

export namespace TokenRepositoryErrors {

  export class TokenNotExists extends Result<RepositoryError> {    
    constructor () {
      super(false, {
        message: `The Token not exists`
      } as RepositoryError)
    }
  }

}


