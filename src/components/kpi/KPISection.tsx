import type { AetherState } from '../../types/state';
import { KPICard } from './KPICard';

interface KPISectionProps {
  state: AetherState;
}

export function KPISection({ state }: KPISectionProps) {
  const trades = state.trades ?? [];
  const wins = trades.filter((t) => t.net > 0);
  const losses = trades.filter((t) => t.net <= 0);
  const total = trades.length;
  const wr = total > 0 ? (wins.length / total) * 100 : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      <KPICard
        icon="💰"
        label="Lucro Líquido"
        value={`$${state.profit_n >= 0 ? '+' : ''}${state.profit_n.toFixed(2)}`}
        sub={`Bruto: $${state.profit_g >= 0 ? '+' : ''}${state.profit_g.toFixed(2)}`}
        variant={state.profit_n >= 0 ? 'green' : 'red'}
        trend={state.profit_n >= 0 ? 'up' : 'down'}
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
        icon="🧮"
        label="Kelly"
        value={`${(state.kelly * 100).toFixed(1)}%`}
        sub={`Risk: ${state.rmult.toFixed(1)}x`}
        variant="purple"
      />

      <KPICard
        icon="🔥"
        label="Streak"
        value={state.cw > 0 ? `W${state.cw}` : state.cl > 0 ? `L${state.cl}` : '—'}
        sub={`W:${state.cw} L:${state.cl}`}
        variant={state.cw > 0 ? 'green' : state.cl > 0 ? 'red' : 'default'}
        trend={state.cw > 0 ? 'up' : state.cl > 0 ? 'down' : 'neutral'}
      />

      <KPICard
        icon="💸"
        label="Fees"
        value={`-$${state.fees.toFixed(3)}`}
        sub="0.1%/trade"
        variant="red"
      />

      <KPICard
        icon="🛡️"
        label="Daily Loss"
        value={`$${state.dloss.toFixed(2)}`}
        sub="Limite: 5%"
        variant={state.dloss > 0 ? 'red' : 'green'}
      />

      <KPICard
        icon="📂"
        label="Posições"
        value={`${Object.keys(state.pos).length}`}
        sub="Max 5 (1 PAXG)"
        variant="blue"
      />

      <KPICard
        icon="🐋"
        label="Whale Radar"
        value={Object.keys(state.whale_flows).length}
        sub="Fluxos ativos"
        variant="cyan"
      />

      <KPICard
        icon="⛔"
        label="Restrições"
        value={`${Object.keys(state.blacklist).length}BL / ${Object.keys(state.cools).length}Cool`}
        sub="1 loss=blocked/day"
        variant="gold"
      />
    </div>
  );
}
