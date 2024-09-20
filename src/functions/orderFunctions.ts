import { Orders } from "../types/Order";

export const calculateAverageOrderAmount = (orders: Orders): number => {
    const totalAmount = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    return totalAmount / orders.length;
};

export const calculateAverageTomatoPizzaPrice = (orders: Orders): number => {
    const tomatoPizzaOrders = orders.flatMap(order => order.items).filter(item => item.price === 12); // exemple
    const totalPrice = tomatoPizzaOrders.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return totalPrice / tomatoPizzaOrders.length;
};

export const findMostOrderedPizza = (orders: Orders): string => {
    const pizzaCount: { [key: string]: number } = {};

    orders.forEach(order => {
        order.items.forEach(item => {
            pizzaCount[item.pizzaId] = (pizzaCount[item.pizzaId] || 0) + item.quantity;
        });
    });

    return Object.keys(pizzaCount).reduce((a, b) => pizzaCount[a] > pizzaCount[b] ? a : b);
};
