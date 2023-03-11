export class ValorElo7 {
  private readonly value: number;

  constructor(value: number) {
    this.value = value * 1.2;
  }

  get Value(): number {
    return this.value;
  }
}
