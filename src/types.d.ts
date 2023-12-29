export interface Pizza {
  id: string;
  title: string;
  price: number;
  image: string;
}

export type ApiPizza = Omit<Pizza, 'id'>;

export interface PizzasList {
  [id: string]: ApiPizza
}

export interface PizzaMutation {
  title: string;
  price: string;
  image: string;
}

export interface CartPizza {
  pizza: Pizza,
  amount: number;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface ApiOrder {
  customer: Customer;
  pizzas: CartPizza[];
}

export interface ApiOrders {
  [id: string]: ApiOrder
}

export interface Order extends ApiOrder {
  id: string;
  total: number;
}
