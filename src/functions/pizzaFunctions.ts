import { Pizzas } from "../types/Pizza";
import { Orders } from "../types/Order";

export const getUniquePizzaBases = (pizzas: Pizzas): Set<string> => {
    return new Set(pizzas.map(pizza => pizza.base));
};

export const countTomatoBasePizzas = (pizzas: Pizzas): number => {
    return pizzas.filter(pizza => pizza.base === "Tomate").length;
};

export const countUniqueIngredients = (pizzas: Pizzas): number => {
    const allIngredients = pizzas.flatMap(pizza => pizza.ingredients);
    return new Set(allIngredients).size;
};

export const findUniqueIngredient = (pizzas: Pizzas): string[] => {
    const ingredientCount: { [key: string]: number } = {};

    pizzas.forEach(pizza => {
        pizza.ingredients.forEach(ingredient => {
            ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
        });
    });

    return Object.keys(ingredientCount).filter(ingredient => ingredientCount[ingredient] === 1);
};

export const countPizzasWithLessThan4Ingredients = (pizzas: Pizzas): number => {
    return pizzas.filter(pizza => pizza.ingredients.length < 4).length;
};

export const findUnsoldPizzas = (pizzas: Pizzas, orders: Orders): Pizzas => {
    const soldPizzaIds = new Set(orders.flatMap(order => order.items.map(item => item.pizzaId)));
    return pizzas.filter(pizza => !soldPizzaIds.has(pizza.id));
};

export const calculateAverageTomatoPizzaPrice = (pizzas: Pizzas): number => {
    const tomatoPizzas = pizzas.filter(pizza => pizza.base === "Tomate");
    const totalPrice = tomatoPizzas.reduce((sum, pizza) => sum + pizza.price, 0);
    return totalPrice / tomatoPizzas.length;
};

export const findPizzasWithoutMeat = (pizzas: Pizzas): Pizzas => {
    const meatIngredients = ["Jambon Cuît", "Saucisson Piquant", "Jambon Cru"];
    return pizzas.filter(pizza => !pizza.ingredients.some(ingredient => meatIngredients.includes(ingredient)));
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

export const calculateAveragePizzasPerOrder = (orders: Orders): number => {
    const totalPizzas = orders.reduce((sum, order) => sum + order.items.reduce((acc, item) => acc + item.quantity, 0), 0);
    return totalPizzas / orders.length;
};

export const findUnusedIngredients = (pizzas: Pizzas, orders: Orders): string[] => {
    const soldPizzaIds = new Set(orders.flatMap(order => order.items.map(item => item.pizzaId)));
    const usedIngredients = new Set(pizzas.filter(pizza => soldPizzaIds.has(pizza.id)).flatMap(pizza => pizza.ingredients));

    const allIngredients = new Set(pizzas.flatMap(pizza => pizza.ingredients));

    return [...allIngredients].filter(ingredient => !usedIngredients.has(ingredient));
};

export const countPizzasOrderedOnce = (orders: Orders): number => {
    const pizzaCount: { [key: string]: number } = {};

    orders.forEach(order => {
        order.items.forEach(item => {
            pizzaCount[item.pizzaId] = (pizzaCount[item.pizzaId] || 0) + item.quantity;
        });
    });

    return Object.values(pizzaCount).filter(count => count === 1).length;
};

export const calculateAveragePreparationTime = (orders: Orders): number => {
    const totalMinutes = orders.reduce((sum, order) => {
        const orderedAt = new Date(order.orderedAt);
        const readyAt = new Date(order.readyAt);
        return sum + (readyAt.getTime() - orderedAt.getTime()) / (1000 * 60);
    }, 0);

    return totalMinutes / orders.length;
};

export const calculateAverageDeliveryCost = (orders: Orders): number => {
    const deliveryOrders = orders.filter(order => order.orderType === "Delivery");
    const totalDeliveryCost = deliveryOrders.reduce((sum, order) => sum + (order.deliveryCosts || 0), 0);
    return totalDeliveryCost / deliveryOrders.length;
};
