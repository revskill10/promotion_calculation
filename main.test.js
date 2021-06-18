function add(a, b) { return a + b }

function substract(a, b) { return a - b }

describe("My first test suite", () => {
    it("adds two numbers", () => {
        expect(add(2, 2)).toBe(4);
    });

    it("substracts two numbers", () => {
        expect(substract(2, 2)).toBe(0);
    });
});