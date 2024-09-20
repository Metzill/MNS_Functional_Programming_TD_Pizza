import { readFileSync } from "fs";
import { Pizzas } from "./types/Pizza";
import { Orders } from "./types/Order";
import {
    getUniquePizzaBases, countTomatoBasePizzas, countUniqueIngredients,
    findUniqueIngredient, countPizzasWithLessThan4Ingredients, findUnsoldPizzas,
    calculateAverageTomatoPizzaPrice, findPizzasWithoutMeat,
    findMostOrderedPizza, calculateAveragePizzasPerOrder, findUnusedIngredients,
    countPizzasOrderedOnce, calculateAveragePreparationTime, calculateAverageDeliveryCost
} from "./functions/pizzaFunctions";

import { calculateAverageOrderAmount } from "./functions/orderFunctions";

const pizzas: Pizzas = JSON.parse(readFileSync("./src/data/pizzas.json", "utf-8"));
const orders: Orders = JSON.parse(readFileSync("./src/data/orders.json", "utf-8"));

console.log(`1. Nombre de bases de pizzas différentes : ${getUniquePizzaBases(pizzas).size}`);
console.log(`2. Nombre de pizzas à base de tomate : ${countTomatoBasePizzas(pizzas)}`);
console.log(`3. Nombre d'ingrédients uniques : ${countUniqueIngredients(pizzas)}`);
console.log(`4. Ingrédient présent dans une seule recette : ${findUniqueIngredient(pizzas).join(", ")}`);
console.log(`5. Nombre de recettes de pizza avec moins de 4 ingrédients : ${countPizzasWithLessThan4Ingredients(pizzas)}`);
console.log(`6. Recettes de pizza jamais vendues : ${findUnsoldPizzas(pizzas, orders).map(p => p.name).join(", ")}`);
console.log(`7. Montant moyen des commandes de pizzas : ${calculateAverageOrderAmount(orders).toFixed(2)}€`);
console.log(`8. Prix moyen des pizzas à base de tomate : ${calculateAverageTomatoPizzaPrice(pizzas).toFixed(2)}€`);
console.log(`9. Nombre de pizzas sans viande : ${findPizzasWithoutMeat(pizzas).length}`);
console.log(`10. Pizza la plus vendue : ${findMostOrderedPizza(orders)}`);
console.log(`11. Nombre moyen de pizzas par commande : ${calculateAveragePizzasPerOrder(orders).toFixed(2)}`);
console.log(`12. Ingrédients non utilisés dans les pizzas vendues : ${findUnusedIngredients(pizzas, orders).join(", ")}`);
console.log(`13. Nombre de recettes commandées une seule fois : ${countPizzasOrderedOnce(orders)}`);
console.log(`14. Durée moyenne de préparation des commandes : ${calculateAveragePreparationTime(orders).toFixed(2)} minutes`);
console.log(`15. Montant moyen des frais de livraison : ${calculateAverageDeliveryCost(orders).toFixed(2)}€`);