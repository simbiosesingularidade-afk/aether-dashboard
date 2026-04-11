import { useAetherState } from './hooks/useAetherState';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AtomLogo } from './components/layout/AtomLogo';
import { KPISection } from './components/kpi/KPISection';
import { PositionGrid } from './components/positions/PositionGrid';
import { TradesTable } from './components/trades/TradesTable';
import { RiskEngine } from './components/risk/RiskEngine';
import { RestrictionsPanel } from './components/risk/RestrictionsPanel';
import { PairStatsTable } from './components/risk/PairStatsTable';
import { PerformanceChart } from './components/charts/PerformanceChart';
import { useState } from 'react';

function App() {
  const { state, isLoading, error } = useAetherState();
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'strategies'>('overview');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          {/* Logo Animation */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm">
              <AtomLogo size={80} />
            </div>
          </div>
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-semibold text-lg">AETHER v22.3 REVERSAL_TRANSITION</p>
          <p className="text-gray-500 text-sm mt-2">Inicializando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-red-500 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-xl font-bold text-red-400 mb-2">Erro ao Carregar Dashboard</div>
          <div className="text-sm text-gray-500">{error?.message ?? 'Erro desconhecido'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans">
      <Header hedge={false} lastUpdate={Date.now()} />

      <main className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Logo */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm">
                <AtomLogo size={64} />
              </div>
            </div>

            {/* Title */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                AETHER v22.3 REVERSAL_TRANSITION
              </h1>
              <p className="text-gray-400 text-lg">Bot Paper Trading VPS-Production-Grade</p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                  19 Tokens | CORE(3) OPORT(9) PRIVACY(2) TATICO(5)
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
                  USE_REAL_MARKET_DATA=true — Binance pública
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold">
                  REVERSAL_TRANSITION + Pump Radar
                </span>
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold">
                  Market Regime Filter
                </span>
              </div>
            </div>

            {/* Balance Card */}
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm min-w-[200px]">
                <div className="text-gray-400 text-sm mb-1">Saldo Total</div>
                <div className="text-4xl font-bold text-white mb-1">
                  ${(state.equity ?? 0).toFixed(2)}
                </div>
                <div className={`text-sm font-semibold ${(state.daily_pnl_usd || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {(state.daily_pnl_usd || 0) >= 0 ? '+' : ''}${(state.daily_pnl_usd || 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-2 bg-gray-900/50 border border-gray-800 rounded-xl p-2 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📊 Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'rules'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📚 Regras v22.3
          </button>
          <button
            onClick={() => setActiveTab('strategies')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'strategies'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            🚀 Estratégias
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Error Banner */}
            {state._error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-red-400">{state._error}</span>
              </div>
            )}

            <KPISection state={state} />

            {/* Pump Radar Section */}
            <section className="mb-8 bg-gradient-to-br from-orange-900/20 via-yellow-900/10 to-red-900/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl animate-pulse">🚀</span>
                  Pump Radar v22 — Observacional
                  <span className="ml-3 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold border border-orange-500/30">
                    Apenas Alertas
                  </span>
                </h2>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <span>Detecção +5% com volume</span>
                  <span>•</span>
                  <span>Alerta via Telegram</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm mb-4">
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Price Accel Mín</div>
                  <div className="text-xl font-bold text-orange-400">+5%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Stretch Máx</div>
                  <div className="text-xl font-bold text-yellow-400">12%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Early Vol Mult</div>
                  <div className="text-xl font-bold text-cyan-400">2.5×</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Spread Máx</div>
                  <div className="text-xl font-bold text-purple-400">0.5%</div>
                </div>
              </div>
              <div className="bg-gray-900/50 border border-orange-500/20 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-orange-400">PUMP RADAR v22:</span> Scan fora do universo principal.
                  Detecção de +5% com volume — <strong className="text-yellow-400">sem entrada automática</strong>.
                  Early pump: vol≥2.5× + mom3 +2% a +8% + RSI≤65.
                  Cooldown 60min/token. Alertas enviados ao Telegram.
                </p>
              </div>
            </section>

            {/* Novas Listagens + VPS Hardening */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <section className="bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                  <span className="text-3xl">🆕</span>
                  Novas Listagens
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Volume mínimo 24h</span>
                    <span className="font-bold text-emerald-400">$5M</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Janela de monitoramento</span>
                    <span className="font-bold text-cyan-400">7 dias</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Verificação</span>
                    <span className="font-bold text-yellow-400">a cada 1h</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Modo</span>
                    <span className="font-bold text-purple-400">Observacional + alerta TG</span>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                  <span className="text-3xl">🖥️</span>
                  VPS Hardening
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Instance lock</span>
                    <span className="font-bold text-blue-400">fcntl PID file</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">State save</span>
                    <span className="font-bold text-cyan-400">Escrita atômica (.tmp → rename)</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Graceful shutdown</span>
                    <span className="font-bold text-emerald-400">SIGTERM / SIGINT</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Market data</span>
                    <span className="font-bold text-yellow-400">USE_REAL_MARKET_DATA=true</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Positions */}
              <div className="lg:col-span-2">
                <section className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      <span className="text-3xl">📊</span>
                      Posições Abertas
                      <span className="ml-3 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold border border-cyan-500/30">
                        {Object.keys(state.positions ?? {}).length}
                      </span>
                    </h2>
                  </div>
                  <PositionGrid positions={state.positions ?? {}} />

                  {/* Trail Info Card */}
                  <div className="mt-6 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🔐</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-emerald-400 text-lg mb-4">Trailing Stop v22 — 3 Níveis Progressivos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400">●</span>
                            <span className="text-gray-400">Breakeven:</span>
                            <span className="ml-2 font-mono font-bold text-white">+0.5% → SL+0.15%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">●</span>
                            <span className="text-gray-400">Partial TP:</span>
                            <span className="ml-2 font-mono font-bold text-yellow-400">50% @ +1.0–1.5%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400">●</span>
                            <span className="text-gray-400">L1 (+1%):</span>
                            <span className="ml-2 font-mono font-bold text-emerald-400">trail 0.8%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400">●</span>
                            <span className="text-gray-400">L2 (+2.5%):</span>
                            <span className="ml-2 font-mono font-bold text-purple-400">trail 0.5%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-pink-400">●</span>
                            <span className="text-gray-400">L3 (+5%):</span>
                            <span className="ml-2 font-mono font-bold text-pink-400">trail 0.3%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-orange-400">●</span>
                            <span className="text-gray-400">TATICO mult:</span>
                            <span className="ml-2 font-mono font-bold text-orange-400">× 0.7 (mais apertado)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-400">●</span>
                            <span className="text-gray-400">SL ATR:</span>
                            <span className="ml-2 font-mono font-bold text-red-400">1.2× ATR (2–3.5%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-400">●</span>
                            <span className="text-gray-400">RR mínimo:</span>
                            <span className="ml-2 font-mono font-bold text-blue-400">2× (TP = 2× SL)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">●</span>
                            <span className="text-gray-400">Soft exit:</span>
                            <span className="ml-2 font-mono font-bold text-gray-300">12h→24h (0.25%/15min)</span>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 italic">
                          * Trailing progressivo: distância aperta conforme PnL sobe — protege lucros sem fechar cedo
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Performance Mini Chart */}
                <section className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📈</span>
                    Performance Hoje
                  </h2>
                  <PerformanceChart trades={state.trades} />
                </section>

                {/* Quick Stats */}
                <section className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">⚡</span>
                    Stats Rápidas
                  </h2>
                  <div className="space-y-3">
                    <StatCard
                      icon="🎯"
                      label="Win Rate"
                      value={(() => {
                        const trades = state.trades ?? [];
                        const wins = trades.filter(t => t.net_pnl_usd > 0).length;
                        const total = trades.length;
                        return total > 0 ? ((wins / total) * 100).toFixed(0) + '%' : '0%';
                      })()}
                      color="text-cyan-400"
                    />
                    <StatCard
                      icon="🔥"
                      label="Loss Streak"
                      value={(state.loss_streak ?? 0) > 0 ? `L${state.loss_streak}` : '—'}
                      color={(state.loss_streak ?? 0) > 0 ? 'text-red-400' : 'text-gray-500'}
                    />
                    <StatCard
                      icon="💸"
                      label="Fees Hoje"
                      value={`-$${(state.trades ?? []).reduce((s, t) => s + (t.fees_usd ?? 0), 0).toFixed(2)}`}
                      color="text-red-400"
                    />
                  </div>
                </section>

                {/* Restrictions */}
                <section className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔒</span>
                    Restrições Ativas
                  </h2>
                  <RestrictionsPanel
                    blacklist={state.blacklist ?? {}}
                    cooldowns={state.cooldowns ?? {}}
                    sectorLosses={state.sector_losses ?? {}}
                  />
                </section>
              </div>
            </div>

            {/* Risk & Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">⚙️</span>
                  Risk Engine
                </h2>
                <RiskEngine />
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  Stats por Par
                </h2>
                <PairStatsTable pairStats={{}} />
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎓</span>
                  Estratégias
                </h2>
                <StrategyCards />
              </div>
            </div>

            {/* Trades Table */}
            <section className="mb-8 bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">📜</span>
                Últimos Trades
                <span className="ml-3 text-sm font-normal text-gray-500">
                  (Últimos 30 de {state.trades?.length ?? 0})
                </span>
              </h2>
              <TradesTable trades={state.trades} limit={30} />
            </section>
          </>
        )}

        {activeTab === 'rules' && (
          <RulesSection />
        )}

        {activeTab === 'strategies' && (
          <StrategiesSection />
        )}
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xl font-bold font-mono ${color}`}>{value}</span>
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function StrategyCards() {
  const strategies = [
    { name: '💎 CORE', icon: '💎', desc: 'BTC ETH BNB • score≥40 • drop -2% a -10% • hold 48h • size max $25', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30' },
    { name: '📈 OPORTUNIDADE', icon: '📈', desc: 'LINK AAVE UNI XRP SOL TAO NEAR ARB RENDER • score≥55 • hold 24h • size max $18', color: 'from-cyan-500/20 to-indigo-500/10', border: 'border-cyan-500/30' },
    { name: '🔒 PRIVACY', icon: '🔒', desc: 'ZEC XMR • score≥70 • hold 12h • size max $8 • bloqueado em RISK_OFF', color: 'from-purple-500/20 to-purple-500/10', border: 'border-purple-500/30' },
    { name: '⚡ TATICO', icon: '⚡', desc: 'FET INJ NMR CFG DUSK • score≥48 • hold 8h • size max $12 • FET exceção sanfona', color: 'from-emerald-500/20 to-emerald-500/10', border: 'border-emerald-500/30' },
    { name: '🚀 Pump Radar', icon: '🚀', desc: 'Observacional • +5% com volume • Early vol≥2.5× • Apenas alertas Telegram', color: 'from-orange-500/20 to-red-500/10', border: 'border-orange-500/30' },
  ];

  return (
    <div className="space-y-3">
      {strategies.map((s) => (
        <div key={s.name} className={`bg-gradient-to-r ${s.color} border ${s.border} rounded-xl p-4 hover:scale-[1.02] transition-transform cursor-pointer`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div className="flex-1">
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-sm text-gray-400">{s.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RulesSection() {
  const rules = [
    {
      category: "🔄 REVERSAL_TRANSITION — Setup Único v22",
      rules: [
        { title: "Drop recente", desc: "CORE: -2% a -10% | OPORT: -2.5% a -12% | PRIVACY: -3% a -15% | TATICO: -1.8% a -8%", example: "BTC cai -5% nos últimos 48 candles → candidato" },
        { title: "Recovery confirmada", desc: "CORE: +0.5% a +5% | OPORT: +0.8% a +4% | PRIVACY: +1.2% a +5% | TATICO: +0.9% a +3%", example: "BTC sobe +1% do low recente → recovery válida" },
        { title: "EMA8 distância", desc: "-1.5% a +2.5% da EMA8 (não muito longe)", example: "Preço está 1% acima da EMA8 → OK" },
        { title: "RSI Wilder's 14", desc: "38 a 62 (nem oversold extremo, nem overbought)", example: "RSI = 45 → zona neutra favorável" },
        { title: "Momentum mom3", desc: "mom3 &gt; -0.5% (não caindo mais)", example: "mom3 = +0.3% → transição positiva" },
        { title: "Volume ratio", desc: "vol_ratio ≥ 0.8 (volume mínimo)", example: "Volume 90% da média → aceitável" },
      ]
    },
    {
      category: "📊 SCORE MÍNIMO POR CATEGORIA",
      rules: [
        { title: "CORE (BTC/ETH/BNB)", desc: "score ≥ 40 — qualquer regime", example: "Score 42 → CORE entra em qualquer condição" },
        { title: "OPORTUNIDADE", desc: "score ≥ 55 (RISK_ON) | ≥ 58 (NEUTRAL) | ≥ 60 (RISK_OFF) + vol≥1.0× + mom&gt;-0.1", example: "Score 58 em NEUTRAL → entra com tamanho reduzido" },
        { title: "PRIVACY (ZEC/XMR)", desc: "score ≥ 70 — BLOQUEADO em RISK_OFF (risco regulatório)", example: "Score 72 em RISK_ON → entra com size máx $8" },
        { title: "TATICO", desc: "score ≥ 48 (RISK_ON) | ≥ 53 (NEUTRAL) | FET ≥ 58 (RISK_OFF excepcionalmente)", example: "FET score 60 em RISK_OFF → exceção sanfona" },
      ]
    },
    {
      category: "🌡️ REGIME FILTER v22",
      rules: [
        { title: "RISK_ON 🟢 — Size 100%", desc: "BTC forte + alts outperformando • Todas categorias ativas", example: "CORE 100% | OPORT 100% | TATICO 100% | PRIVACY 70%" },
        { title: "NEUTRAL 🟡 — Size reduzido", desc: "Condições mistas", example: "CORE 90% | OPORT 75% | TATICO 60% | PRIVACY 50%" },
        { title: "RISK_OFF 🔴 — Size mínimo", desc: "BTC fraco ou alts underperformando", example: "CORE 75% | OPORT 50% | TATICO 35% | PRIVACY BLOQUEADO" },
        { title: "Score mínimo dinâmico", desc: "Em RISK_OFF score mínimo sobe: OPORT +5 | TATICO +15 (exceto FET +10)", example: "OPORT precisa de 60 pts em RISK_OFF (era 55)" },
      ]
    },
    {
      category: "⚙️ RISK MANAGEMENT v22",
      rules: [
        { title: "Position size máximo", desc: "10% do equity por posição (report April/2026)", example: "Equity $100 → máximo $10 por posição" },
        { title: "Risk per trade", desc: "$1.00 por trade • SL baseado em ATR", example: "ATR 2% → size = $1.00 / 0.02 = $50 (cap equity)" },
        { title: "Daily loss max", desc: "$3.00 ou 5% do equity (o que atingir primeiro)", example: "Perdeu $3 → stop diário, sem novas entradas" },
        { title: "Kill switch", desc: "4 loss streak | WR &lt; 30% (20 trades) | Expectancy &lt; -$0.50", example: "4 stops seguidos → kill switch ativa automaticamente" },
        { title: "Volume 24h mínimo", desc: "CORE $50M | OPORT $20M | TATICO $15M | PRIVACY $10M", example: "Token com $5M vol24h → bloqueado" },
        { title: "Spread máximo", desc: "0.3% spread | 0.5% slippage máximo", example: "Spread 0.4% → bloqueado" },
      ]
    },
    {
      category: "🔒 TRAILING STOP v22 — 3 Níveis",
      rules: [
        { title: "Breakeven", desc: "SL sobe para entrada + 0.15% em +0.5%", example: "Entrou $100, em $100.50 SL fica $100.15" },
        { title: "Partial TP", desc: "Vende 50% em +1.0% (TATICO) / +1.2% (OPORT) / +1.5% (CORE)", example: "CORE em +1.5% → fecha 50% da posição" },
        { title: "L1 — +1%", desc: "Trail distance 0.8% abaixo do high (TATICO: ×0.7 = 0.56%)", example: "High $102 → SL $101.18" },
        { title: "L2 — +2.5%", desc: "Trail distance 0.5% abaixo do high", example: "High $105 → SL $104.47" },
        { title: "L3 — +5%", desc: "Trail distance 0.3% abaixo do high (apertado)", example: "High $110 → SL $109.67" },
        { title: "Soft Time Stop", desc: "Reduz 0.25%/15min a partir de 12h até fechar 100% em 24h", example: "Posição 18h → 25% vendido gradualmente" },
      ]
    },
    {
      category: "🛡️ PROTEÇÕES v22",
      rules: [
        { title: "Hold time adaptativo", desc: "CORE 48h | OPORT 24h | PRIVACY 12h | TATICO 8h (hard stop)", example: "TATICO 9h → fecha automaticamente" },
        { title: "Cooldown pós-loss", desc: "2h cooldown no token após perda", example: "Perdeu em SOL → sem entrada em SOL por 2h" },
        { title: "Blacklist TATICO", desc: "TATICO vai para blacklist por 4h após 1 loss", example: "FET perde → blacklist 4h" },
        { title: "Sector lock", desc: "2 losses/setor/dia bloqueia o setor", example: "2 losses em DeFi → bloqueia AAVE, UNI, LINK" },
        { title: "Max posições abertas", desc: "3 posições simultâneas máximo", example: "Já tem 3 abertas → sem novas entradas" },
        { title: "Max trades/dia", desc: "15 trades por dia (global)", example: "Após 15 trades, bot para de abrir" },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {rules.map((section, idx) => (
        <div key={idx} className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            {section.category}
          </h3>
          <div className="space-y-4">
            {section.rules.map((rule, ruleIdx) => (
              <div key={ruleIdx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-cyan-500/30 transition-all">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">{rule.title}</h4>
                <p className="text-gray-300 mb-3">{rule.desc}</p>
                <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-3">
                  <span className="text-emerald-400 text-sm font-semibold">💡 Exemplo: </span>
                  <span className="text-gray-400 text-sm">{rule.example}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StrategiesSection() {
  const categories = [
    {
      tier: "CORE",
      icon: "💎",
      tokens: ["BTC", "ETH", "BNB"],
      scoreMin: 40,
      holdH: 48,
      sizeMax: "$25",
      drop: "-2% a -10%",
      recovery: "+0.5% a +5%",
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30",
      regimeBlock: "Nenhum",
    },
    {
      tier: "OPORTUNIDADE",
      icon: "📈",
      tokens: ["LINK", "AAVE", "UNI", "XRP", "SOL", "TAO", "NEAR", "ARB", "RENDER"],
      scoreMin: 55,
      holdH: 24,
      sizeMax: "$18",
      drop: "-2.5% a -12%",
      recovery: "+0.8% a +4%",
      color: "from-cyan-500/20 to-indigo-500/10",
      border: "border-cyan-500/30",
      regimeBlock: "Score +5 em RISK_OFF",
    },
    {
      tier: "PRIVACY",
      icon: "🔒",
      tokens: ["ZEC", "XMR"],
      scoreMin: 70,
      holdH: 12,
      sizeMax: "$8",
      drop: "-3% a -15%",
      recovery: "+1.2% a +5%",
      color: "from-purple-500/20 to-purple-500/10",
      border: "border-purple-500/30",
      regimeBlock: "BLOQUEADO em RISK_OFF",
    },
    {
      tier: "TATICO",
      icon: "⚡",
      tokens: ["FET", "INJ", "NMR", "CFG", "DUSK"],
      scoreMin: 48,
      holdH: 8,
      sizeMax: "$12",
      drop: "-1.8% a -8%",
      recovery: "+0.9% a +3%",
      color: "from-emerald-500/20 to-emerald-500/10",
      border: "border-emerald-500/30",
      regimeBlock: "Score +15 em RISK_OFF (FET +10)",
    },
  ];

  const indicators = [
    { name: "EMA8 / EMA21", desc: "Exponential Moving Average — posição e distância", formula: "ewm(span=8/21, adjust=False)" },
    { name: "RSI Wilder's 14", desc: "Relative Strength Index com smoothing Wilder's", formula: "alpha=1/14 (não SMA)" },
    { name: "ATR 14", desc: "Average True Range — volatilidade para SL/TP", formula: "True Range de 14 períodos" },
    { name: "Volume ratio", desc: "Volume atual vs média 20 candles", formula: "vol / vol_avg20" },
    { name: "mom3 / mom10", desc: "Momentum 3 e 10 candles", formula: "pct_change(3) * 100" },
    { name: "Bollinger Width", desc: "Largura das bandas — volatilidade relativa", formula: "(BB_upper - BB_lower) / BB_mid" },
  ];

  return (
    <div className="space-y-8">
      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl p-6 backdrop-blur-sm`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{cat.tier}</h3>
                <p className="text-sm text-gray-400">Score ≥ {cat.scoreMin} • Hold {cat.holdH}h • Max {cat.sizeMax}</p>
              </div>
            </div>
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Tokens ({cat.tokens.length}):</h4>
              <div className="flex flex-wrap gap-2">
                {cat.tokens.map(token => (
                  <span key={token} className="px-2 py-1 bg-gray-800/50 rounded text-xs text-gray-300">{token}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-900/40 rounded p-2">
                <span className="text-gray-500">Drop: </span>
                <span className="text-cyan-400 font-mono">{cat.drop}</span>
              </div>
              <div className="bg-gray-900/40 rounded p-2">
                <span className="text-gray-500">Recovery: </span>
                <span className="text-emerald-400 font-mono">{cat.recovery}</span>
              </div>
            </div>
            <div className="mt-2 bg-gray-900/40 rounded p-2 text-xs">
              <span className="text-gray-500">Regime: </span>
              <span className="text-yellow-400">{cat.regimeBlock}</span>
            </div>
          </div>
        ))}
      </div>

      {/* REVERSAL_TRANSITION Setup */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🔄</span>
          REVERSAL_TRANSITION — Lógica do Setup
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-yellow-400 mb-2">① Drop recente</h4>
            <p className="text-sm text-gray-400 mb-2">Queda significativa nos últimos 48 candles (lookback)</p>
            <div className="text-xs text-gray-500 font-mono">high → low temporal (não invertido)</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-emerald-400 mb-2">② Recovery confirmada</h4>
            <p className="text-sm text-gray-400 mb-2">Bounce do low — sinal de transição</p>
            <div className="text-xs text-gray-500 font-mono">(close - recent_low) / recent_low × 100</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-purple-400 mb-2">③ EMA8 proximal</h4>
            <p className="text-sm text-gray-400 mb-2">Preço perto da EMA8 — nem esticado, nem abaixo</p>
            <div className="text-xs text-gray-500 font-mono">-1.5% ≤ (close/ema8 - 1) × 100 ≤ +2.5%</div>
          </div>
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-cyan-400 mb-2">④ RSI + Momentum neutros</h4>
            <p className="text-sm text-gray-400 mb-2">Zona de reversão sem extremos</p>
            <div className="text-xs text-gray-500 font-mono">RSI 38-62 • mom3 &gt; -0.5% • vol_ratio ≥ 0.8</div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="text-2xl">📊</span>
          Indicadores Técnicos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indicators.map((ind, idx) => (
            <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-cyan-500/30 transition-all">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">{ind.name}</h4>
              <p className="text-sm text-gray-400 mb-2">{ind.desc}</p>
              <p className="text-xs text-gray-500 font-mono">{ind.formula}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pump Radar detail */}
      <div className="bg-gradient-to-br from-orange-900/20 via-yellow-900/10 to-red-900/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          Pump Radar v22 — Observacional + Novas Listagens
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold text-orange-400 mb-3">📡 Detecção de Pump</h4>
            <div className="space-y-3">
              <div className="bg-gray-900/50 border border-orange-500/20 rounded-lg p-4">
                <div className="font-bold text-cyan-400 mb-1">Pump clássico</div>
                <p className="text-sm text-gray-400">Fora do universo • +5% mín • spread ≤ 0.5%</p>
                <p className="text-xs text-gray-500 mt-1">Stretch máx 12% • vol ≥ $1M</p>
              </div>
              <div className="bg-gray-900/50 border border-orange-500/20 rounded-lg p-4">
                <div className="font-bold text-yellow-400 mb-1">Early pump (universo)</div>
                <p className="text-sm text-gray-400">vol≥2.5× + mom3 +2% a +8% + RSI≤65</p>
                <p className="text-xs text-gray-500 mt-1">ema8_dist ≤ 3% • cooldown 60min/token</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-emerald-400 mb-3">🆕 Novas Listagens</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="font-bold text-emerald-400 mb-1">Critérios de detecção</div>
                <p className="text-gray-400">vol24h ≥ $5M + variação ≥ ±20%</p>
                <p className="text-xs text-gray-500 mt-1">Fora do universo + fora da blocklist</p>
              </div>
              <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="font-bold text-cyan-400 mb-1">Ação</div>
                <p className="text-gray-400">Alerta Telegram — avaliar manualmente</p>
                <p className="text-xs text-gray-500 mt-1">Verificação: a cada 1h (ciclo 360)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-gray-900/50 border border-orange-500/20 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">
            <span className="font-bold text-orange-400">PUMP RADAR v22:</span> Modo puramente observacional.
            <strong className="text-yellow-400"> Sem entrada automática.</strong>
            Alertas enviados ao Telegram para avaliação manual.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
