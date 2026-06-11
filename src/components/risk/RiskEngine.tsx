export function RiskEngine() {
  const riskParams = [
    { label: '🛑 Max Perda/Trade', value: '$0.70 (dollar-based SL)', highlight: true, color: 'text-red-400' },
    { label: '🔒 Hard Stop Safety Net', value: '$1.125 + blacklist 6h', highlight: true, color: 'text-red-400' },
    { label: 'Position Size Máx', value: '8% equity (v22.52)', highlight: true },
    { label: 'Size Floor', value: '$4.00 (mínimo por trade)' },
    { label: 'CORE / OPORT / PRIVACY / TATICO', value: '$25 / $18 / $8 / $12' },
    { label: 'Stop Loss Base / Máx', value: '2.0% base | 3.5% máx', color: 'text-loss' },
    { label: 'SL ATR Mult', value: '1.2× ATR' },
    { label: '🔹 MICRO_TRAIL', value: '+0.3% → SL = entry+0.15%', color: 'text-accent-blue', highlight: true },
    { label: 'Loss Trailing v22.52', value: 'pnl ≤ -1.25% → fecha 15%×nível do gap(SL→preço)', color: 'text-loss' },
    { label: 'Loss Trail Intervalo / Máx', value: '30min | máx 75% do gap' },
    { label: 'Breakeven', value: '+0.5% → SL+0.15%' },
    { label: 'Partial TP', value: '50% @ +0.6%–1.0%' },
    { label: 'Trail L1 / L2 / L3', value: '+0.6%/0.5% | +2.5%/0.5% | +5.0%/0.3%', color: 'text-info' },
    { label: 'TATICO trail mult', value: '×0.70' },
    { label: '🔥 MOMENTUM BREAKOUT', value: 'SL 2.5% | TP 5.0% | score ≥ 42', color: 'text-accent-blue', highlight: true },
    { label: 'MB Filtros', value: 'mom3≥0.65% | vol≥1.5× | RSI 40–70 | BB≥0.02', color: 'text-info' },
    { label: '🛡️ ANTI_TOPO', value: '≤1.5% do high_24h → bloqueia entrada', color: 'text-yellow-400', highlight: true },
    { label: 'Anti-Topo Cobertura', value: 'REVERSAL + MOM_BREAKOUT + Pump Early' },
    { label: 'Pump Entry Size / SL / Vol', value: '$5 | 6% | 3.0× (v22.52)', color: 'text-info' },
    { label: 'Pump RSI Máx Early / Entry', value: '67 / 65' },
    { label: 'Pump Pullback Filter', value: 'mom3 > 5% bloqueia entrada' },
    { label: 'Pump TP', value: '8%' },
    { label: 'Soft Time Stop', value: '0.25%/10min (6h→12h)' },
    { label: 'Daily Loss Máx', value: '$3.00 ou 5% equity', color: 'text-loss' },
    { label: 'Kill Switch streak', value: '3 losses seguidos', color: 'text-loss' },
    { label: 'Kill Switch WR', value: '< 30% (últimos 20 trades)' },
    { label: 'Kill Switch Drawdown', value: '≥ 20% do equity peak', color: 'text-loss' },
    { label: 'KS Auto-Reset', value: '30min' },
    { label: 'Scan Interval', value: '15 ciclos (~2.5min)' },
    { label: 'Cooldown pós-loss', value: '4h no token' },
    { label: 'Blacklist TATICO', value: '4h após 1 loss' },
    { label: 'Sector Lock', value: '2 losses/setor/dia' },
    { label: 'Max Posições', value: '3 simultâneas' },
    { label: 'Max Trades/dia', value: '10 (global)' },
    { label: 'Spread Máx', value: '0.3% | Slippage 0.5%' },
    { label: 'Fee Rate', value: '0.1%/trade' },
    { label: 'Orphan Recovery', value: 'Assets ≥$3 na Binance → recupera como posição (SL 3.5% / TP 5%)' },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-accent-blue/20 to-accent-indigo/20 px-4 py-3 border-b border-border">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <span>⚙️</span>
          Risk Engine v22.52
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
