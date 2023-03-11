import { RandomCode } from "./randomCode";
import { describe, it, expect} from 'vitest';
describe('RandomCode', () => {
  it('should be defined', () => {
    const randomCode = new RandomCode();
    expect(randomCode.Value).toHaveLength(9);
  });
})
//
