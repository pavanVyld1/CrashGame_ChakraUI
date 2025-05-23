// src/services/ApiService.ts
import { DATACONSTANTS } from "../types/dataConstants";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  wallet: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: LoginResponseData;
}

export interface LoginResponseData {
  token: string;
  user: User;
}

export interface PlayerData {
  id: string;
  balance: number;
  username: string;
}

export interface BetData {
  amount: number;
  sessionId: string;
}

export interface BetResponse {
  success: boolean;
  message: string;
  sessionId?: string;
}

export interface CashoutResponse {
  multiplier: number;
  payout: number;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any,
    token?: string
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  // ✅ Register
  register(data: RegisterData) {
    return this.request<LoginResponse>(DATACONSTANTS.REGISTER, 'POST', data);
  }

  // ✅ Login
  login(data: LoginData) {
    return this.request<LoginResponse>(DATACONSTANTS.LOGIN, 'POST', data);
  }

  // ✅ Get Player Data
  getPlayerData(token: string) {
    return this.request<PlayerData>(DATACONSTANTS.PROFILE, 'GET', undefined, token);
  }

  // ✅ Place Bet
  placeBet(data: BetData, token: string) {
    return this.request<BetResponse>(DATACONSTANTS.USE, 'POST', data, token);
  }

  // ✅ Cashout
  cashout(token: string) {
    return this.request<CashoutResponse>('/game/cashout', 'POST', {}, token);
  }

  logout(data: LoginData) {
    return this.request<LoginResponse>(DATACONSTANTS.LOGIN, 'POST', data);
  }
}

export default new ApiService(DATACONSTANTS.BASEURL);
