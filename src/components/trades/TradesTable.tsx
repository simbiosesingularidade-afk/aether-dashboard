import type { Trade } from '../../types/state';
import { pnlClass, reasonIcon, formatDuration } from '../../lib/formatters';

interface TradesTableProps {
  trades: Trade[];
  limit?: number;
}

export function TradesTable({ trades, limit = 30 }: TradesTableProps) {
  const recentTrades = [...trades].slice(-limit).reverse();

  if (recentTrades.length === 0) {
    return (
      <div className="bg-surface border border-dashed border-border rounded-2xl p-8 text-center">
        <div className="text-4xl mb-2">📜</div>
        <div className="text-muted">Nenhum trade registrado ainda</div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-left">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider"></span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Coin</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Estratégia</span>
              </th>
              <th className="py-3 px-4 text-right">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">PnL</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Razão</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Duração</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Horário</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.map((trade, idx) => {
              const coin = trade.sym.split('/')[0];
              const netClass = pnlClass(trade.net);

              return (
                <tr
                  key={idx}
                  className="border-b border-border/50 hover:bg-surfaceHighlight/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className={`text-lg ${trade.net > 0 ? '' : ''}`}>
                      {trade.net > 0 ? '🟢' : '🔴'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-white">{coin}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full bg-accent-blue/20 text-accent-blue text-xs font-mono font-semibold">
                      {trade.strat.slice(0, 10)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-mono font-bold ${
                      netClass === 'positive' ? 'text-profit' : netClass === 'negative' ? 'text-loss' : 'text-muted'
                    }`}>
                      {trade.net >= 0 ? '+' : ''}${trade.net.toFixed(3)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-lg">{reasonIcon(trade.reason)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted">{formatDuration(trade.mins)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-muted font-mono">
                      {trade.ts.slice(0, 16).replace('T', ' ')}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
