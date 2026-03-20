interface RiskEngineProps {
  kelly: number;
  rmult: number;
}

export function RiskEngine({ kelly, rmult }: RiskEngineProps) {
  const riskParams = [
    { label: 'Kelly Criterion', value: `${(kelly * 100).toFixed(2)}%`, highlight: true },
    { label: 'Risk Multiplier', value: `${rmult.toFixed(1)}x ${rmult > 1 ? '🚀' : rmult < 1 ? '⚠️' : ''}` },
    { label: 'T1/T2/T3 Sizing', value: '$18 / $15 / $12' },
    { label: 'PAXG Cap', value: '$20 (15% equity)' },
    { label: 'Stop Loss Dinâmico', value: '1.0–2.0% ATR' },
    { label: 'Take Profit', value: '3.0–7.0%' },
    { label: 'Breakeven / Trail', value: '+0.2% / +0.4%' },
    { label: 'Trail Gap', value: 'Dynamic: 0.4% → 8%', color: 'text-info' },
    { label: 'Partial Profit', value: '50% @ 60% TP' },
    { label: 'Cooldown', value: '60/90/120 min' },
    { label: 'Blacklist', value: '2 horas' },
    { label: 'Anti-Vício v2', value: '2 trades = block/day', color: 'text-loss' },
    { label: 'Sector Lock', value: '4h (2 losses)' },
    { label: 'Max Trades', value: '40/dia (global)', color: 'text-info' },
    { label: 'BTC Filter', value: '-5%' },
    { label: 'Market Health', value: '15min momentum' },
    { label: 'Whale Boost', value: '1.5x se &gt; 25% PnL', color: 'text-info' },
    { label: 'TP via Limit', value: 'Maker 0% fee', color: 'text-info' },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-accent-blue/20 to-accent-indigo/20 px-4 py-3 border-b border-border">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <span>⚙️</span>
          Kelly Quarter (Ed Thorp)
        </div>
      </div>

      <div className="divide-y divide-border/50">
        {riskParams.map((param, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-4 py-2.5 hover:bg-surfaceHighlight/30 transition-colors"
          >
            <span className="text-sm text-muted">{param.label}</span>
            <span className={`font-mono font-semibold text-sm text-right ${
              param.color || (param.highlight ? 'text-accent-blue' : 'text-white')
            }`}>
              {param.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
