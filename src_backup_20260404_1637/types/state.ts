// Types for AETHER state from state_v14.json (used by v15 MEGA PUMP)

export interface AetherState {
  pos: Record<string, Position>;
  bal?: number; // USDT balance (livre)
  equity?: number; // Total equity (cash + positions)
  profit_g: number;
  profit_n: number;
  fees: number;
  trades: Trade[];
  cw: number; // consecutive wins
  cl: number; // consecutive losses
  rmult: number; // risk multiplier
  kelly: number;
  hedge: boolean;
  blacklist: Record<string, string>;
  cools: Record<string, string>;
  pair_stats: Record<string, PairStats>;
  dloss: number; // daily loss
  ddate: string; // daily loss date
  whale_flows: Record<string, WhaleFlow>;
  sector_stats: Record<string, SectorStats>;
  _error?: string;
}

export interface Position {
  sym: string;
  coin: string;
  entry: number;
  qty: number;
  high: number;
  time: string;
  strat: string;
  sl: number;
  tp: number;
  tier: number; // 0 = PAXG, 1 = T1, 2 = T2, 3 = T3
  gold: boolean;
  size: number;
  fees: number;
  be: number; // breakeven
  partial_done: boolean;
}

export interface Trade {
  ts: string;
  sym: string;
  strat: string;
  gross: number;
  net: number;
  fees: number;
  mins: number;
  reason: string; // stop, target, trail, breakeven, time_profit, time_loss, hedge, manual
}

export interface PairStats {
  w: number; // wins
  l: number; // losses
  pnl: number; // profit and loss
}

export interface WhaleFlow {
  ts: string;
  vol_r: number; // volume ratio
  type: string; // PROACTIVE, REACTIVE
}

export interface SectorStats {
  l: number; // losses
  last_loss: string;
}

export type PnLClass = 'positive' | 'negative' | 'neutral';

export type TradeReason = 'stop' | 'target' | 'trail' | 'breakeven' | 'time_profit' | 'time_loss' | 'hedge' | 'manual';

export type Tier = 0 | 1 | 2 | 3;
