export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface RequestParams {
  id: string;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  inStock?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
