import { UniqueEntityID } from "./uniqueIdEntity";

export abstract class Entity<T> {
  protected _id: UniqueEntityID;
  public props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }
}
