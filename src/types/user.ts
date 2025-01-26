export interface User {
    phone: string;
    name: string;
    address: string;
    gender: string;
    location?: {
      lat: number;
      lng: number;
    };
  }
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }