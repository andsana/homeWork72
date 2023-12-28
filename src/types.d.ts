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
