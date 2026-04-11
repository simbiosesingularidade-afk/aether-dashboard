import type { Position } from '../../types/state';
import { tsAgo, tierEmoji, tierLabel, pnlClass, formatPercent } from '../../lib/formatters';

interface PositionCardProps {
  position: Position;
  hasWhaleFlow: boolean;
}

export function PositionCard({ position, hasWhaleFlow }: PositionCardProps) {
  const { coin, entry, size, sl, tp, high, time, strat, tier, gold, partial_done } = position;

  const slPct = ((sl - entry) / entry) * 100;
  const tpPct = ((tp - entry) / entry) * 100;
  const highPnl = ((high - entry) / entry) * 100;
  const trailActive = highPnl > 0.4;
  const ago = tsAgo(time);

  // Calculate progress to TP
  const tpProgress = Math.min(100, Math.max(0, (highPnl / tpPct) * 100));

  const tierGradients = {
    0: 'from-amber-500/30 to-amber-600/10 border-amber-500/30', // PAXG
    1: 'from-blue-500/30 to-blue-600/10 border-blue-500/30', // T1
    2: 'from-accent-blue/30 to-accent-indigo/10 border-accent-blue/30', // T2
    3: 'from-emerald-500/30 to-emerald-600/10 border-emerald-500/30', // T3
  };

  const gradient = tierGradients[tier as keyof typeof tierGradients] || tierGradients[2];

  return (
    <div className={`
      group relative overflow-hidden bg-surface border rounded-2xl p-5
      transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
      ${gold ? 'border-gold/50' : 'border-border'}
      hover:border-accent-blue/50
    `}>
      {/* Background gradient based on tier */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tierEmoji(tier, gold)}</span>
            <div>
              <div className="font-bold text-lg text-white flex items-center gap-2">
                {coin}
                {partial_done && (
                  <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                    50% SOLD
                  </span>
                )}
                {hasWhaleFlow && (
                  <span className="px-2 py-0.5 rounded-full bg-info/20 text-info text-xs font-semibold">
                    🐋 WHALE
                  </span>
                )}
              </div>
              <div className="text-xs text-muted font-mono">{strat}</div>
            </div>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              gold ? 'bg-gold/20 text-gold' : 'bg-surfaceHighlight text-muted'
            }`}>
              {tierLabel(tier)}
            </span>
            <div className="text-xs text-muted mt-1">{ago}</div>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-surfaceHighlight/50 backdrop-blur rounded-lg p-3">
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Entry</div>
            <div className="text-lg font-bold font-mono text-white">${entry.toFixed(2)}</div>
          </div>
          <div className="bg-surfaceHighlight/50 backdrop-blur rounded-lg p-3">
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Size</div>
            <div className="text-lg font-bold font-mono text-white">${size.toFixed(2)}</div>
          </div>
        </div>

        {/* PnL Progress */}
        <div className="bg-surfaceHighlight/50 backdrop-blur rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider">Progresso ao TP</span>
            <span className={`text-sm font-bold font-mono ${pnlClass(highPnl) === 'positive' ? 'text-profit' : ''}`}>
              {highPnl >= 0 ? '+' : ''}{highPnl.toFixed(2)}%
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                highPnl >= 0 ? 'bg-profit' : 'bg-loss'
              }`}
              style={{ width: `${Math.max(0, Math.min(100, tpProgress))}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted">
            <span>SL: {formatPercent(slPct)}</span>
            <span>TP: {formatPercent(tpPct)}</span>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-xs text-muted">High</div>
            <div className={`text-sm font-bold font-mono ${pnlClass(highPnl) === 'positive' ? 'text-profit' : 'text-muted'}`}>
              {formatPercent(highPnl)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted">SL</div>
            <div className={`text-sm font-bold font-mono ${pnlClass(slPct)}`}>{formatPercent(slPct)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted">Trail</div>
            <div className={`text-sm font-bold ${trailActive ? 'text-profit' : 'text-muted'}`}>
              {trailActive ? '🔐 ON' : 'OFF'}
            </div>
          </div>
        </div>
      </div>

      {/* Glow effect for profitable positions */}
      {highPnl > 0 && (
        <div className="absolute inset-0 bg-profit/5 blur-xl group-hover:bg-profit/10 transition-colors" />
      )}
    </div>
  );
}
