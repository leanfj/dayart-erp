import { ValorElo7 } from "./valorElo7";

describe('ValorElo7', () => {
  it('should be return a value with plus 20%', () => {
    const valorElo7 = new ValorElo7(20)
    expect(valorElo7.Value).toBe(24);

  });
})
//