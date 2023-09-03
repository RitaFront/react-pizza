export interface IPizzaItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  category: number;
  rating: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: IPizzaItem[];
  status: Status;
}

export interface FetchPizzasProps {
  sortBy: string;
  order: 'asc' | 'desc';
  category: string;
  search: string;
  currentPage: string;
}
