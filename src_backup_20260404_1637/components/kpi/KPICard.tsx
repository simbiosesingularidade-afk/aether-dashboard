interface KPICardProps {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  variant?: 'blue' | 'green' | 'red' | 'gold' | 'cyan' | 'purple' | 'default';
  trend?: 'up' | 'down' | 'neutral';
}

export function KPICard({ icon, label, value, sub, variant = 'default', trend }: KPICardProps) {
  const gradients = {
    blue: 'from-blue-500/20 via-blue-600/10 to-transparent',
    green: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
    red: 'from-red-500/20 via-red-600/10 to-transparent',
    gold: 'from-amber-500/20 via-amber-600/10 to-transparent',
    cyan: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
    purple: 'from-purple-500/20 via-purple-600/10 to-transparent',
    default: 'from-accent-blue/20 via-accent-indigo/10 to-transparent',
  };

  const borderColors = {
    blue: 'hover:border-blue-500/50',
    green: 'hover:border-emerald-500/50',
    red: 'hover:border-red-500/50',
    gold: 'hover:border-amber-500/50',
    cyan: 'hover:border-cyan-500/50',
    purple: 'hover:border-purple-500/50',
    default: 'hover:border-accent-blue/50',
  };

  const textColors = {
    blue: 'text-blue-400',
    green: 'text-emerald-400',
    red: 'text-red-400',
    gold: 'text-amber-400',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    default: 'text-accent-blue',
  };

  return (
    <div className={`
      group relative overflow-hidden bg-surface border border-border rounded-2xl p-5
      transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
      ${borderColors[variant]}
    `}>
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[variant]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <div className="text-xs text-muted uppercase tracking-wider font-semibold">{label}</div>
          </div>
          {trend && (
            <span className={`text-lg ${trend === 'up' ? 'text-profit' : trend === 'down' ? 'text-loss' : 'text-muted'}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            </span>
          )}
        </div>

        <div className={`text-3xl font-bold font-mono ${textColors[variant]} mb-1`}>
          {value}
        </div>

        {sub && (
          <div className="text-xs text-muted">
            {sub}
          </div>
        )}
      </div>

      {/* Decorative corner */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${gradients[variant]} rounded-bl-full opacity-50`} />
    </div>
  );
}
