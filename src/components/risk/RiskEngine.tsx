export function RiskEngine() {
  const riskParams = [
    // ═══ ESTRATÉGIA ═══
    { label: '🎯 Estratégia', value: 'DIP-BUYER (REVERSAL) — compra queda a virar, nunca topo', highlight: true, color: 'text-emerald-400' },
    // ═══ RISCO POR TRADE ═══
    { label: '🛑 SL por trade', value: 'ATR-based 2.0–3.0% × size (≈$0.15–0.25)', highlight: true, color: 'text-red-400' },
    { label: '🔒 Hard Stop Safety Net', value: '$1.125 + blacklist 6h', highlight: true, color: 'text-red-400' },
    { label: 'SL ATR Mult / Grace', value: '1.2× ATR | grace 10min × 1.5' },
    { label: 'Position Size Máx', value: '8% equity', highlight: true },
    { label: 'Size Floor', value: '$3.00 (mínimo por trade)' },
    { label: 'CORE / OPORT / PRIVACY / TATICO', value: '$25 / $18 / $8 / $12' },
    // ═══ ENTRADA (dip-buyer) ═══
    { label: '📉 Entrada REVERSAL', value: 'drop na faixa + recovery a iniciar + RSI 35–65', highlight: true, color: 'text-accent-blue' },
    { label: 'Anti-knife', value: 'bloqueia faca a cair s/ bounce | RSI<28 s/ recovery' },
    { label: '🛡️ ANTI_TOPO', value: '≤2.0% da máxima → bloqueia · FAIL-CLOSED (v22.58: sem dados = bloqueia)', color: 'text-yellow-400', highlight: true },
    { label: '🔊 Piso de Volume', value: 'v22.58: 0.4→0.15 — dip de capitulação tem vol baixo (não rejeita o fundo)', color: 'text-accent-blue' },
    { label: 'Anti-ltrap', value: '|24h| > 25% → bloqueia entrada' },
    // ═══ SAÍDA (let winners run — v22.58) ═══
    { label: '🏃 Take Profit', value: 'RR 2:1 (SL × 2 ≈ +4–6%) — deixa correr', highlight: true, color: 'text-emerald-400' },
    { label: 'Partial TP', value: '50% @ +2.0% (v22.58: já não raspa cedo)' },
    { label: 'Breakeven', value: '+2.5% → SL entry+0.3% (v22.58)' },
    { label: 'Micro-trail', value: 'DESLIGADO — raspava vencedores a +1%', color: 'text-muted' },
    { label: 'Trail L1 / L2 / L3', value: 'v22.58: +3.5% / +5.0% / +7.0% (dist 1.2/0.8/0.5%) — monotônico, deixa correr', color: 'text-info' },
    { label: 'TATICO trail mult', value: '×1.00' },
    { label: 'Loss Trailing', value: 'pnl ≤ -1.25% → fecha 15%/nível do gap (30min)', color: 'text-loss' },
    { label: 'Soft Time Stop', value: '0.25%/10min (6h→12h)' },
    // ═══ LIMITES DE RISCO ═══
    { label: 'Daily Loss Máx', value: '$3.00 ou 5% equity', color: 'text-loss' },
    { label: 'Kill Switch', value: 'streak 3L | WR <30% | drawdown ≥20%', color: 'text-loss' },
    { label: '🔒 KS Drawdown', value: 'v22.58: LATCHING — dispara e PARA, só /unkill manual religa', color: 'text-loss', highlight: true },
    { label: 'KS Auto-Reset', value: '30min condicional (NÃO para drawdown)' },
    { label: 'Cooldown pós-loss', value: '2h no token' },
    { label: 'Sector Lock', value: '2 losses/setor/dia' },
    { label: 'Max Posições / Trades', value: '3 simultâneas | 6 trades/dia' },
    { label: 'Spread / Slippage Máx', value: '0.3% | 0.5%' },
    { label: 'Fee Rate', value: '0.1%/trade' },
    { label: 'Scan Interval', value: '15 ciclos (~2.5min)' },
    // ═══ DESLIGADOS (dip-buyer puro) ═══
    { label: '⏸️ Sleeves OFF', value: 'MOMENTUM_BREAKOUT · TREND_FOLLOW · PUMP_ENTRY', color: 'text-muted' },
    { label: 'Pump Radar', value: 'só ALERTA no Telegram (não entra)', color: 'text-muted' },
    { label: 'Orphan Recovery', value: 'Assets ≥$3 na Binance → recupera como posição' },
    // ═══ BLINDAGEM DE CAPITAL (v22.58 — auditoria de 4 especialistas) ═══
    { label: '🔐 Preço LIVE', value: 'v22.58: falha de API → pula símbolo (NUNCA opera com preço mock)', color: 'text-emerald-400', highlight: true },
    { label: '🔐 load_markets', value: 'v22.58: precisão + minNotional reais (4427 mercados) → fim dos −1013', color: 'text-emerald-400' },
    { label: '🔐 Parcial-TP', value: 'v22.58: ordem PRIMEIRO — só credita saldo após venda confirmar (anti equity-fantasma)' },
    { label: '🔐 Size vs USDT', value: 'v22.58: nunca dimensiona acima do USDT livre' },
    { label: '📡 Radar', value: 'v22.58: varre Binance inteira, alerta +6% a cada ~5min (até 5/scan)', color: 'text-accent-blue' },
    { label: '🌍 Universo', value: '35 tokens (v22.58: +ADA, LTC, BCH, XLM, SUI)' },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-accent-blue/20 to-accent-indigo/20 px-4 py-3 border-b border-border">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <span>⚙️</span>
          Risk Engine v22.58
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
