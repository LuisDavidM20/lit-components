import { expect } from "@open-wc/testing";
import { Utils } from "./services/utils.ts";

describe("fizzBuzz()", () => {
  it("should return correct output for n = 15", () => {
    const utils = new Utils();
    const result = utils.fizzBuzz(15);
    const expected = [
      "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
      "11", "Fizz", "13", "14", "FizzBuzz"
    ];
    expect(result).to.deep.equal(expected);
  });

  it("should return an empty array for n = 0", () => {
    const utils = new Utils();
    const result = utils.fizzBuzz(0);
    expect(result).to.deep.equal([]);
  });
});
