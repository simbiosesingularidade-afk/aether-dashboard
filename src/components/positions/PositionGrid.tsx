import type { Position } from '../../types/state';
import { PositionCard } from './PositionCard';

interface PositionGridProps {
  positions: Record<string, Position>;
}

export function PositionGrid({ positions }: PositionGridProps) {
  const positionEntries = Object.entries(positions);

  if (positionEntries.length === 0) {
    return (
      <div className="bg-surface border border-dashed border-border rounded-2xl p-12 text-center">
        <div className="text-5xl mb-4">📭</div>
        <div className="text-muted text-lg font-medium">Nenhuma posição aberta</div>
        <div className="text-muted text-sm mt-1">Aguardando gatilho de entrada</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {positionEntries.map(([sym, pos]) => (
        <PositionCard key={sym} position={pos} />
      ))}
    </div>
  );
}
