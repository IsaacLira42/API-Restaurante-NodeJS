import { describe, it, expect } from "vitest";
import { calculateOrderTotal } from "../../src/utils/calculator.js";

describe("calculateOrderTotal", () => {
    it("should calculate the total price correctly", () => {
        // Arrange
        const price = 10.5;
        const quantity = 2;

        // Act
        const total = calculateOrderTotal(price, quantity);

        // Assert
        expect(total).toBe(21);
    });

    it("should return 0 when quantity is 0", () => {
        // Arrange
        const price = 15;
        const quantity = 0;

        // Act
        const total = calculateOrderTotal(price, quantity);

        // Assert
        expect(total).toBe(0);
    });

    it("should throw an error if price is negative", () => {
        // Arrange
        const price = -10;
        const quantity = 2;

        // Act & Assert
        expect(() => calculateOrderTotal(price, quantity)).toThrow("Price and quantity must be non-negative");
    });
});
