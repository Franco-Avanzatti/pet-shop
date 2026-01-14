export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ProductResponse {
  id: string;
  price: number;
}

export interface CartItemResponse {
  id: string;
  quantity: number;
}

export interface CartResponse {
  items: Array<{
    id: string;
    quantity: number;
  }>;
}

export interface OrderResponse {
  id: string;
  total: number;
  userId: string;
}
