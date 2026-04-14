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
              {/* Atom Logo - Animated SVG */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                  <style>{`
                    @keyframes orbit1 { from { transform: rotate(0deg) translateX(14px) rotate(0deg); } to { transform: rotate(360deg) translateX(14px) rotate(-360deg); } }
                    @keyframes orbit2 { from { transform: rotate(120deg) translateX(14px) rotate(-120deg); } to { transform: rotate(480deg) translateX(14px) rotate(-480deg); } }
                    @keyframes orbit3 { from { transform: rotate(240deg) translateX(14px) rotate(-240deg); } to { transform: rotate(600deg) translateX(14px) rotate(-600deg); } }
                    @keyframes pulse { 0%,100%{opacity:1;r:3} 50%{opacity:0.7;r:3.5} }
                    .e1{animation: orbit1 2.5s linear infinite; transform-origin: 20px 20px;}
                    .e2{animation: orbit2 2.5s linear infinite; transform-origin: 20px 20px;}
                    .e3{animation: orbit3 2.5s linear infinite; transform-origin: 20px 20px;}
                    .nucleus{animation: pulse 1.5s ease-in-out infinite;}
                  `}</style>
                  <ellipse cx="20" cy="20" rx="14" ry="5.5" fill="none" stroke="#06b6d4" strokeWidth="1.2" opacity="0.5"/>
                  <ellipse cx="20" cy="20" rx="14" ry="5.5" fill="none" stroke="#06b6d4" strokeWidth="1.2" opacity="0.5" transform="rotate(60 20 20)"/>
                  <ellipse cx="20" cy="20" rx="14" ry="5.5" fill="none" stroke="#06b6d4" strokeWidth="1.2" opacity="0.5" transform="rotate(120 20 20)"/>
                  <circle className="nucleus" cx="20" cy="20" r="3" fill="#06b6d4" opacity="0.9"/>
                  <circle cx="20" cy="20" r="1.8" fill="white" opacity="0.8"/>
                  <g className="e1"><circle cx="20" cy="20" r="2" fill="#22d3ee"/></g>
                  <g className="e2"><circle cx="20" cy="20" r="2" fill="#67e8f9"/></g>
                  <g className="e3"><circle cx="20" cy="20" r="2" fill="#a5f3fc"/></g>
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  AETHER
                </h1>
                <div className="text-xs text-gray-500">v22.8.3 REVERSAL_TRANSITION | VPS Production-Grade</div>
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
