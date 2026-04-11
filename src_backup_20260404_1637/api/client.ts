import axios from 'axios';
import type { AetherState } from '../types/state';

// Em desenvolvimento usa o proxy do Vite (/api)
// Em produção usa caminho relativo (/api) pois está no mesmo servidor
const API_BASE = '/api';
const USERNAME = 'admin';
const PASSWORD = 'Aetherj2026!';

const authString = btoa(`${USERNAME}:${PASSWORD}`);

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Basic ${authString}`,
  },
  timeout: 10000,
});

export async function fetchState(): Promise<AetherState> {
  const response = await apiClient.get<AetherState>('/state');
  return response.data;
}
