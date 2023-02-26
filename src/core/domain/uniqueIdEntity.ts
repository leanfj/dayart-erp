import { Identifier } from "./identifier";
import { randomUUID } from "node:crypto";

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : randomUUID());
  }
}
