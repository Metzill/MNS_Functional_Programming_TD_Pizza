export type Pizza = {
    id: string;
    name: string;
    price: number;
    base: "Tomate" | "Crème" | "Nature";
    ingredients: string[];
};

export type Pizzas = Pizza[];