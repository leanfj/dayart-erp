interface IRepositoryError {
  message: string;
}

export abstract class RepositoryError implements IRepositoryError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
