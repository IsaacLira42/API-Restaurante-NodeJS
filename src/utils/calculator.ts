export function calculateOrderTotal(price: number, quantity: number): number {
    if (price < 0 || quantity < 0) {
        throw new Error("Price and quantity must be non-negative");
    }
    return price * quantity;
}
