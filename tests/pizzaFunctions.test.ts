import { expect, test } from "bun:test";
import {
    getUniquePizzaBases, countTomatoBasePizzas, countUniqueIngredients,
    findUniqueIngredient, countPizzasWithLessThan4Ingredients, findUnsoldPizzas,
    calculateAverageTomatoPizzaPrice, findPizzasWithoutMeat, findMostOrderedPizza,
    calculateAveragePizzasPerOrder, findUnusedIngredients, countPizzasOrderedOnce,
    calculateAveragePreparationTime, calculateAverageDeliveryCost
} from "../src/functions/pizzaFunctions";
import { Pizzas } from "../src/types/Pizza";
import { Orders } from "../src/types/Order";

const samplePizzas: Pizzas = [
    { id: "1", name: "Margherita", price: 7, base: "Tomate", ingredients: ["Mozzarella", "Basilic"] },
    { id: "2", name: "Quattro Stagioni", price: 12, base: "Tomate", ingredients: ["Mozzarella", "Jambon Cuît", "Olives Vertes", "Artichaut", "Champignons"] },
    { id: "3", name: "Calabrese", price: 10, base: "Nature", ingredients: ["Saucisson Piquant", "Mozzarella", "Poivrons"] }
];

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

test("getUniquePizzaBases returns correct unique bases", () => {
    const result = getUniquePizzaBases(samplePizzas);
    expect(result.size).toBe(2); // Tomate, Nature
});

test("countTomatoBasePizzas returns correct number", () => {
    const result = countTomatoBasePizzas(samplePizzas);
    expect(result).toBe(2); // Margherita, Quattro Stagioni
});

test("countUniqueIngredients returns correct number of unique ingredients", () => {
    const result = countUniqueIngredients(samplePizzas);
    expect(result).toBe(8); // Mozzarella, Basilic, Jambon Cuît, etc.
});

test("findUniqueIngredient returns ingredient present in only one recipe", () => {
    const result = findUniqueIngredient(samplePizzas);
    expect(result).toContain("Basilic"); // Basilic est unique à Margherita
});

test("countPizzasWithLessThan4Ingredients returns correct number", () => {
    const result = countPizzasWithLessThan4Ingredients(samplePizzas);
    expect(result).toBe(2); // Margherita et Calabrese ont moins de 4 ingrédients
});

test("findUnsoldPizzas returns pizzas that have never been sold", () => {
    const result = findUnsoldPizzas(samplePizzas, sampleOrders);
    expect(result).toContainEqual(samplePizzas[2]); // Calabrese n'a pas été vendue
});

test("calculateAverageTomatoPizzaPrice returns correct average price of tomato-based pizzas", () => {
    const result = calculateAverageTomatoPizzaPrice(samplePizzas);
    expect(result).toBe(9.5); // (7 + 12) / 2
});

test("findPizzasWithoutMeat returns pizzas without meat", () => {
    const result = findPizzasWithoutMeat(samplePizzas);
    expect(result).toContainEqual(samplePizzas[0]); // Margherita est sans viande
});

test("findMostOrderedPizza returns most ordered pizza", () => {
    const result = findMostOrderedPizza(sampleOrders);
    expect(result).toBe("1"); // Pizza Margherita (id: 1) est la plus commandée
});

test("calculateAveragePizzasPerOrder returns correct average number of pizzas per order", () => {
    const result = calculateAveragePizzasPerOrder(sampleOrders);
    expect(result).toBe(1.5); // (2 pizzas dans la 1ère commande, 1 pizza dans la 2ème) / 2
});

test("findUnusedIngredients returns unused ingredients in sold pizzas", () => {
    const result = findUnusedIngredients(samplePizzas, sampleOrders);
    expect(result).toContain("Poivrons"); // Poivrons non utilisé car Calabrese n'a pas été vendue
});

test("countPizzasOrderedOnce returns number of pizzas ordered only once", () => {
    const result = countPizzasOrderedOnce(sampleOrders);
    expect(result).toBe(1); // Pizza Quattro Stagioni commandée une seule fois
});

test("calculateAveragePreparationTime returns correct average preparation time in minutes", () => {
    const result = calculateAveragePreparationTime(sampleOrders);
    expect(result).toBe(11); // Durée moyenne de préparation est de 11 minutes
});

test("calculateAverageDeliveryCost returns correct average delivery cost for Delivery orders", () => {
    const result = calculateAverageDeliveryCost(sampleOrders);
    expect(result).toBe(10); // Moyenne des frais de livraison pour la commande Delivery
});
