import { Identifier } from "./identifier";
import { randomUUID } from "crypto";

export class UniqueEntityID extends Identifier<string> {
  constructor(id?: string) {
    super(id ? id : randomUUID());
  }
}
