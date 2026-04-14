export function RiskEngine() {
  const riskParams = [
    { label: 'Position Size Máx', value: '10% equity (v22)', highlight: true },
    { label: 'Risk / Trade', value: '$1.00 (ATR-based)' },
    { label: 'CORE / OPORT / PRIVACY / TATICO', value: '$25 / $18 / $8 / $12' },
    { label: 'Stop Loss ATR', value: '1.2× ATR (2.0–3.5%)', color: 'text-loss' },
    { label: 'Take Profit (RR mín)', value: '2× SL' },
    { label: 'Breakeven', value: '+0.5% → SL+0.15%' },
    { label: 'Partial TP', value: '50% @ +1.0–1.5%' },
    { label: 'Trail L1 / L2 / L3', value: '+1%/0.8% | +2.5%/0.5% | +5%/0.3%', color: 'text-info' },
    { label: 'TATICO trail mult', value: '×0.7 (mais apertado)' },
    { label: 'Soft Time Stop', value: '0.25%/15min (12h→24h)' },
    { label: 'Daily Loss Máx', value: '$3.00 ou 5% equity', color: 'text-loss' },
    { label: 'Kill Switch streak', value: '4 losses seguidos', color: 'text-loss' },
    { label: 'Kill Switch WR', value: '< 30% (últimos 20 trades)' },
    { label: 'Cooldown pós-loss', value: '2h no token' },
    { label: 'Blacklist TATICO', value: '4h após 1 loss' },
    { label: 'Sector Lock', value: '2 losses/setor/dia' },
    { label: 'Max Posições', value: '3 simultâneas' },
    { label: 'Max Trades/dia', value: '15 (global)' },
    { label: 'Spread Máx', value: '0.3% | Slippage 0.5%' },
    { label: 'Fee Rate', value: '0.1%/trade' },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-accent-blue/20 to-accent-indigo/20 px-4 py-3 border-b border-border">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <span>⚙️</span>
          Risk Engine v22
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
