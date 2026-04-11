import { AtomLogo } from './AtomLogo';

export function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center">
              <AtomLogo size={32} />
            </div>
            <div>
              <div className="text-sm font-semibold">AETHER v19.0 DYNAMIC UNIVERSE</div>
              <div className="text-xs text-muted">Trading Bot 24/7</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
              <span>System Online</span>
            </div>
            <span>V17.2 | 72 tokens | 2 Families | Market Regime | Whale Mode | Early Detection</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
