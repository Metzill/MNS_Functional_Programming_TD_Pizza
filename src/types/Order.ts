export type OrderItem = {
    pizzaId: string;
    quantity: number;
    price: number;
    amount: number;
};

export type Order = {
    id: string;
    orderedAt: string;
    readyAt: string;
    orderType: "Delivery" | "Take Away" | "For Here";
    status: "Completed" | "Pending";
    amount: number;
    totalAmount: number;
    items: OrderItem[];
    deliveryCosts?: number;
};

export type Orders = Order[];