// Utility functions for formatting data

export function tsAgo(isoStr: string): string {
  try {
    const dt = new Date(isoStr);
    const now = new Date();
    const secs = (now.getTime() - dt.getTime()) / 1000;

    if (secs < 60) return `${Math.floor(secs)}s`;
    if (secs < 3600) return `${Math.floor(secs / 60)}m`;
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    return `${hours}h${mins}m`;
  } catch {
    return '?';
  }
}

export function pnlClass(val: number | null | undefined): 'positive' | 'negative' | 'neutral' {
  const v = val ?? 0;
  if (v > 0) return 'positive';
  if (v < 0) return 'negative';
  return 'neutral';
}

export function formatCurrency(val: number, decimals: number = 2): string {
  return `$${val.toFixed(decimals)}`;
}

export function formatPercent(val: number, decimals: number = 2): string {
  return `${val >= 0 ? '+' : ''}${val.toFixed(decimals)}%`;
}

export function tierEmoji(tier: number, gold: boolean = false): string {
  if (gold) return '🥇';
  return { 1: '💎', 2: '🚀', 3: '⚡' }[tier] ?? '🔵';
}

export function tierLabel(tier: number): string {
  return { 0: 'PAXG', 1: 'T1', 2: 'T2', 3: 'T3' }[tier] ?? 'T?';
}

export function reasonIcon(reason: string): string {
  const icons: Record<string, string> = {
    stop: '🛑',
    target: '🎯',
    trail: '📈',
    breakeven: '🔒',
    time_profit: '⏰✅',
    time_loss: '⏰❌',
    hedge: '🛡️',
    manual: '✋',
  };
  return icons[reason] ?? reason;
}

export function formatDuration(mins: number): string {
  if (mins < 60) return `${Math.floor(mins)}m`;
  const hours = Math.floor(mins / 60);
  const minutes = Math.floor(mins % 60);
  return minutes > 0 ? `${hours}h${minutes}m` : `${hours}h`;
}
