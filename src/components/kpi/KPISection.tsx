import type { AetherState } from '../../types/state';
import { KPICard } from './KPICard';

interface KPISectionProps {
  state: AetherState;
}

export function KPISection({ state }: KPISectionProps) {
  const trades = state.trades ?? [];
  const wins = trades.filter((t) => t.net_pnl_usd > 0);
  const losses = trades.filter((t) => t.net_pnl_usd <= 0);
  const total = trades.length;
  const wr = total > 0 ? (wins.length / total) * 100 : 0;
  const totalFees = trades.reduce((s, t) => s + (t.fees_usd ?? 0), 0);
  const grossPnl = trades.reduce((s, t) => s + (t.gross_pnl_usd ?? 0), 0);
  const pnl = state.daily_pnl_usd ?? 0;
  const streak = state.loss_streak ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      <KPICard
        icon="💰"
        label="Lucro Líquido"
        value={`$${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}`}
        sub={`Bruto: $${grossPnl >= 0 ? '+' : ''}${grossPnl.toFixed(2)}`}
        variant={pnl >= 0 ? 'green' : 'red'}
        trend={pnl >= 0 ? 'up' : 'down'}
      />

      <KPICard
        icon="📊"
        label="Win Rate"
        value={`${wr.toFixed(0)}%`}
        sub={`${wins.length}W / ${losses.length}L / ${total}`}
        variant={wr >= 50 ? 'blue' : 'red'}
        trend={wr >= 50 ? 'up' : 'down'}
      />

      <KPICard
        icon="🔥"
        label="Loss Streak"
        value={streak > 0 ? `L${streak}` : '—'}
        sub={`${state.consecutive_losses ?? 0} cons. losses`}
        variant={streak >= 3 ? 'red' : streak >= 1 ? 'gold' : 'default'}
        trend={streak > 0 ? 'down' : 'neutral'}
      />

      <KPICard
        icon="💸"
        label="Fees"
        value={`-$${totalFees.toFixed(3)}`}
        sub="0.1%/trade"
        variant="red"
      />

      <KPICard
        icon="🛡️"
        label="Daily Loss"
        value={`$${(state.daily_loss_usd ?? 0).toFixed(2)}`}
        sub="Limite: $3 / 5%"
        variant={(state.daily_loss_usd ?? 0) > 0 ? 'red' : 'green'}
      />

      <KPICard
        icon="📂"
        label="Posições"
        value={`${Object.keys(state.positions ?? {}).length}`}
        sub="Max 3 (v22)"
        variant="blue"
      />

      <KPICard
        icon="⚡"
        label="Regime"
        value={state.regime ?? '—'}
        sub={state.kill_switch_active ? '🚨 Kill Switch ON' : '✅ Operando'}
        variant={state.kill_switch_active ? 'red' : state.regime === 'risk_on' ? 'green' : state.regime === 'risk_off' ? 'red' : 'gold'}
      />

      <KPICard
        icon="⛔"
        label="Restrições"
        value={`${Object.keys(state.blacklist ?? {}).length}BL / ${Object.keys(state.cooldowns ?? {}).length}Cool`}
        sub="1 loss → cooldown 2h"
        variant="gold"
      />
    </div>
  );
}
