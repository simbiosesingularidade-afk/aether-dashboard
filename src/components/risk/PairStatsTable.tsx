import { pnlClass } from '../../lib/formatters';

interface PairStat {
  w: number;
  l: number;
  pnl: number;
}

interface PairStatsTableProps {
  pairStats: Record<string, PairStat>;
}

export function PairStatsTable({ pairStats }: PairStatsTableProps) {
  const tierStats = Object.entries(pairStats)
    .filter(([key]) => !key.includes('/'))
    .sort(([, a], [, b]) => b.pnl - a.pnl);

  if (tierStats.length === 0) {
    return (
      <div className="bg-surface border border-dashed border-border rounded-xl p-6 text-center">
        <div className="text-muted text-sm">Sem dados suficientes</div>
      </div>
    );
  }

  const tierEmojis: Record<string, string> = {
    t1: '💎',
    t2: '🚀',
    t3: '⚡',
    paxg: '🥇',
  };

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="divide-y divide-border/50">
        {tierStats.map(([tier, stats]) => {
          const total = stats.w + stats.l;
          const wr = total > 0 ? (stats.w / total) * 100 : 0;
          const pnlClassValue = pnlClass(stats.pnl);
          const emoji = tierEmojis[tier.toLowerCase()] || '📊';

          return (
            <div key={tier} className="px-4 py-3 hover:bg-surfaceHighlight/30 transition-colors">
              <div className="flex items-center justify-between">
                {/* Tier */}
                <div className="flex items-center gap-2">
                  <span className="text-lg">{emoji}</span>
                  <span className="font-bold text-white text-sm">{tier.toUpperCase()}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  {/* Win/Loss */}
                  <div className="text-muted">
                    <span className="text-profit font-semibold">{stats.w}</span>
                    <span className="text-muted mx-1">/</span>
                    <span className="text-loss font-semibold">{stats.l}</span>
                  </div>

                  {/* Win Rate */}
                  <div className="w-16 text-right">
                    <span className={`font-mono font-bold ${
                      wr >= 50 ? 'text-profit' : 'text-loss'
                    }`}>
                      {wr.toFixed(0)}%
                    </span>
                  </div>

                  {/* PnL */}
                  <div className={`w-20 text-right font-mono font-bold ${
                    pnlClassValue === 'positive' ? 'text-profit' : pnlClassValue === 'negative' ? 'text-loss' : 'text-muted'
                  }`}>
                    {stats.pnl >= 0 ? '+' : ''}${stats.pnl.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
