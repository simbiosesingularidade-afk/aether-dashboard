interface HeaderProps {
  hedge: boolean;
  lastUpdate?: number;
}

export function Header({ hedge, lastUpdate }: HeaderProps) {
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return '--:--:--';
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800">
      <div className="max-w-[1800px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Brain Logo - Low Poly Neon */}
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl blur-lg opacity-30"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm">
                  <svg viewBox="0 0 100 100" className="w-8 h-8">
                    <defs>
                      <linearGradient id="dnaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4"/>
                        <stop offset="100%" stopColor="#10b981"/>
                      </linearGradient>
                      <linearGradient id="dnaGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6"/>
                        <stop offset="100%" stopColor="#06b6d4"/>
                      </linearGradient>
                    </defs>
                    {/* DNA Double Helix */}
                    <path d="M30,10 C30,25 70,25 70,40 C70,55 30,55 30,70 C30,85 70,85 70,95" fill="none" stroke="url(#dnaGrad1)" strokeWidth="3" opacity="0.9"/>
                    <path d="M70,10 C70,25 30,25 30,40 C30,55 70,55 70,70 C70,85 30,85 30,95" fill="none" stroke="url(#dnaGrad2)" strokeWidth="3" opacity="0.9"/>
                    {/* DNA Rungs */}
                    <line x1="38" y1="17" x2="62" y2="17" stroke="#06b6d4" strokeWidth="2" opacity="0.6"/>
                    <line x1="32" y1="32" x2="68" y2="32" stroke="#10b981" strokeWidth="2" opacity="0.6"/>
                    <line x1="42" y1="47" x2="58" y2="47" stroke="#8b5cf6" strokeWidth="2" opacity="0.6"/>
                    <line x1="32" y1="62" x2="68" y2="62" stroke="#06b6d4" strokeWidth="2" opacity="0.6"/>
                    <line x1="38" y1="77" x2="62" y2="77" stroke="#10b981" strokeWidth="2" opacity="0.6"/>
                    <line x1="42" y1="90" x2="58" y2="90" stroke="#8b5cf6" strokeWidth="2" opacity="0.6"/>
                    {/* Glow nodes */}
                    <circle cx="38" cy="17" r="2.5" fill="#06b6d4"/>
                    <circle cx="62" cy="17" r="2.5" fill="#8b5cf6"/>
                    <circle cx="68" cy="32" r="2.5" fill="#10b981"/>
                    <circle cx="32" cy="32" r="2.5" fill="#06b6d4"/>
                    <circle cx="58" cy="47" r="2.5" fill="#8b5cf6"/>
                    <circle cx="42" cy="47" r="2.5" fill="#10b981"/>
                    <circle cx="68" cy="62" r="2.5" fill="#06b6d4"/>
                    <circle cx="32" cy="62" r="2.5" fill="#8b5cf6"/>
                    <circle cx="62" cy="77" r="2.5" fill="#10b981"/>
                    <circle cx="38" cy="77" r="2.5" fill="#06b6d4"/>
                  </svg>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  AETHERJ
                </h1>
                <div className="text-xs text-gray-500">v17.2 PROFESSIONAL QUANTUM + EARLY DETECTION WHALE MODE</div>
              </div>
            </div>

            {/* Hedge Badge */}
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              hedge
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {hedge ? '🛡️ HEDGE ON' : '🚀 NORMAL'}
            </div>
          </div>

          {/* Right - Status */}
          <div className="flex items-center gap-4">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </div>
              <span className="text-xs font-semibold text-emerald-400">LIVE</span>
            </div>

            {/* Refresh Rate */}
            <div className="px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700 text-xs text-gray-500">
              🔄 5s
            </div>

            {/* Time */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono">{formatTime(lastUpdate)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
