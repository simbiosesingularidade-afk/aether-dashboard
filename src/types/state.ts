// Types for AETHER v22.8.5 state (state_v22.json)

export interface AetherState {
  equity: number;
  balance_usdt: number;
  positions: Record<string, Position>;
  trades: Trade[];
  daily_pnl_usd: number;
  daily_loss_usd: number;
  daily_trades: number;
  consecutive_losses: number;
  loss_streak: number;
  blacklist: Record<string, string>;
  cooldowns: Record<string, string>;
  sector_losses: Record<string, number>;
  kill_switch_active: boolean;
  kill_switch_reason: string;
  regime: string;
  last_update: string;
  daily_reset_date: string;
  soft_exits_today: number;
  _error?: string;
}

export interface Position {
  symbol: string;
  category: string;
  coin: string;
  entry_price: number;
  qty: number;
  qty_original: number;
  sl_price: number;
  tp_price: number;
  be_price: number | null;
  trail_price: number | null;
  atr: number;
  entry_time: string;
  strategy: string;
  tier: number;
  size_usd: number;
  fees_usd: number;
  high_watermark: number;
  be_triggered: boolean;
  trail_triggered: boolean;
  partial_tp_done: boolean;
  soft_time_exit_triggered: boolean;
  last_soft_exit_increment: number;
}

export interface Trade {
  symbol: string;
  category: string;
  coin: string;
  entry_price: number;
  exit_price: number;
  qty: number;
  entry_time: string;
  exit_time: string;
  strategy: string;
  tier: number;
  size_usd: number;
  fees_usd: number;
  gross_pnl_usd: number;
  net_pnl_usd: number;
  pnl_pct: number;
  hold_time_min: number;
  entry_reason: string;
  exit_reason: string;
}
