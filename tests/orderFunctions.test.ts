import { calculateAverageOrderAmount, findMostOrderedPizza } from "../src/functions/orderFunctions";
import { Orders } from "../src/types/Order";
import { expect, test } from "bun:test";

const sampleOrders: Orders = [
    {
        id: "1",
        orderedAt: "2024-09-15 20:40:00",
        readyAt: "2024-09-15 20:50:00",
        orderType: "Delivery",
        status: "Completed",
        amount: 20,
        totalAmount: 30,
        items: [
            { pizzaId: "1", quantity: 2, price: 10, amount: 20 }
        ],
        deliveryCosts: 10
    },
    {
        id: "2",
        orderedAt: "2024-09-15 20:40:00",
        readyAt: "2024-09-15 20:52:00",
        orderType: "Take Away",
        status: "Completed",
        amount: 12,
        totalAmount: 12,
        items: [
            { pizzaId: "2", quantity: 1, price: 12, amount: 12 }
        ]
    }
];

test("calculateAverageOrderAmount returns correct average", () => {
    const result = calculateAverageOrderAmount(sampleOrders);
    expect(result).toBe(21);  // (30 + 12) / 2
});

test("findMostOrderedPizza returns most ordered pizza", () => {
    const result = findMostOrderedPizza(sampleOrders);
    expect(result).toBe("1");  // Pizza 1 est commandée 2 fois, pizza 2 est commandée 1 fois
});
