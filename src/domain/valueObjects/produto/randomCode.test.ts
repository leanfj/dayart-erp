import { RandomCode } from "./randomCode";

describe('RandomCode', () => {
  it('should be defined', () => {
    const randomCode = new RandomCode();
    expect(randomCode.Value).toHaveLength(9);
  });
})
//
