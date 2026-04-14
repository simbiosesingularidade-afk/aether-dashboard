interface RestrictionsPanelProps {
  blacklist: Record<string, string>;
  cooldowns: Record<string, string>;
  sectorLosses: Record<string, number>;
}

export function RestrictionsPanel({ blacklist, cooldowns, sectorLosses }: RestrictionsPanelProps) {
  const blSymbols = Object.keys(blacklist ?? {}).map((s) => s.split('/')[0]);
  const coolSymbols = Object.keys(cooldowns ?? {}).map((s) => s.split('/')[0]);
  const sectorEntries = Object.entries(sectorLosses ?? {}).filter(([_, n]) => n > 0);

  const allRestricted = [
    ...blSymbols.map((s) => ({ symbol: s, type: 'blacklist' as const })),
    ...coolSymbols.map((s) => ({ symbol: s, type: 'cool' as const })),
  ];

  return (
    <div className="space-y-4">
      {/* Active Restrictions */}
      {allRestricted.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">⛔</span>
            <span className="text-sm font-semibold text-white">Restrições Ativas</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-loss/20 text-loss text-xs font-bold">
              {allRestricted.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allRestricted.map((item) => (
              <span
                key={item.symbol}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  item.type === 'blacklist'
                    ? 'bg-loss/20 text-loss border border-loss/30'
                    : 'bg-warning/20 text-warning border border-warning/30'
                }`}
              >
                {item.type === 'blacklist' ? '⛔' : '⏳'} {item.symbol}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sector Locks */}
      {sectorEntries.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🏭</span>
            <span className="text-sm font-semibold text-white">Setores Bloqueados</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sectorEntries.map(([sector, n]) => (
              <span
                key={sector}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  n >= 2
                    ? 'bg-loss/20 text-loss border border-loss/30'
                    : 'bg-warning/20 text-warning border border-warning/30'
                }`}
              >
                {sector}: {n}L
              </span>
            ))}
          </div>
        </div>
      )}

      {/* No Restrictions */}
      {allRestricted.length === 0 && sectorEntries.length === 0 && (
        <div className="bg-surface border border-dashed border-border rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-sm text-muted">Nenhuma restrição ativa</div>
          <div className="text-xs text-muted mt-1">Todos os sistemas livres</div>
        </div>
      )}
    </div>
  );
}
