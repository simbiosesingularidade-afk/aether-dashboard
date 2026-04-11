import type { Trade } from '../../types/state';

interface PerformanceChartProps {
  trades: Trade[];
}

export function PerformanceChart({ trades }: PerformanceChartProps) {
  // Calculate cumulative PnL over time
  const cumulativePnL = [0];
  for (const trade of trades) {
    cumulativePnL.push(cumulativePnL[cumulativePnL.length - 1] + trade.net);
  }

  const totalPnL = cumulativePnL[cumulativePnL.length - 1];
  const isProfitable = totalPnL >= 0;

  // Find min/max for scaling
  const minPnL = Math.min(...cumulativePnL);
  const maxPnL = Math.max(...cumulativePnL);
  const range = maxPnL - minPnL || 1;
  const padding = range * 0.1;

  // Generate SVG path
  const width = 100;
  const height = 60;
  const points = cumulativePnL.map((val, idx) => {
    const x = (idx / (cumulativePnL.length - 1)) * width;
    const normalizedY = (val - minPnL + padding) / (range + 2 * padding);
    const y = height - (normalizedY * height);
    return `${x},${y}`;
  }).join(' ');

  // Calculate area fill (path + bottom corners)
  const areaPath = `${points} ${width},${height} 0,${height}`;

  return (
    <div className="bg-surface border border-border rounded-xl p-4 hover:border-accent-blue/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-muted uppercase tracking-wider">Lucro Hoje</div>
          <div className={`text-2xl font-bold font-mono mt-1 ${isProfitable ? 'text-profit' : 'text-loss'}`}>
            {isProfitable ? '+' : ''}${totalPnL.toFixed(2)}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isProfitable ? 'bg-profit/20' : 'bg-loss/20'}`}>
          <span className="text-2xl">{isProfitable ? '📈' : '📉'}</span>
        </div>
      </div>

      {/* SVG Chart */}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16 overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={isProfitable ? 'text-profit' : 'text-loss'} stopOpacity="0.3" />
            <stop offset="100%" className={isProfitable ? 'text-profit' : 'text-loss'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={areaPath}
          fill={`url(#chartGradient)`}
          className={isProfitable ? 'text-profit' : 'text-loss'}
        />
        <polyline
          points={points}
          fill="none"
          stroke={isProfitable ? '#10b981' : '#ef4444'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* End point dot */}
        <circle
          cx={width}
          cy={points.split(' ').pop()?.split(',')[1] || height / 2}
          r="3"
          fill={isProfitable ? '#10b981' : '#ef4444'}
          className="drop-shadow-lg"
        />
      </svg>

      <div className="flex items-center justify-between mt-3 text-xs text-muted">
        <span>{trades.length} trades</span>
        <span>Últimas 24h</span>
      </div>
    </div>
  );
}
