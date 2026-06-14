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
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm">
              <AtomLogo size={80} />
            </div>
          </div>
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-semibold text-lg">AETHER v22.58 — DIP-BUYER LIVE</p>
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
            <div className="relative w-24 h-24 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm">
                <AtomLogo size={64} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                AETHER v22.58
              </h1>
              <p className="text-gray-400 text-lg">Bot Trading LIVE — Binance Spot · Dip-Buyer (compra o fundo, nunca o topo)</p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                  61 Tokens | CORE(3) OPORT(29) PRIVACY(2) TATICO(27)
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
                  LIVE MODE — Binance Spot Real
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold">
                  ANTI_TOPO FAIL-CLOSED | KS LATCHING | CAPITAL-SAFE
                </span>
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold">
                  Market Regime Filter | KS 20% Drawdown
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm min-w-[220px]">
                <div className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Saldo Total</div>
                <div className="text-4xl font-bold text-white mb-3">
                  ${(state.equity ?? 0).toFixed(2)}
                </div>
                <div className="space-y-1.5 text-xs border-t border-cyan-500/20 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">💵 USDT livre</span>
                    <span className="font-mono text-emerald-400 font-semibold">${(state.balance_usdt ?? 0).toFixed(2)}</span>
                  </div>
                  {Object.values(state.positions ?? {}).map((pos) => (
                    <div key={pos.symbol} className="flex justify-between items-center">
                      <span className="text-gray-400">📦 {pos.coin}</span>
                      <span className="font-mono text-cyan-400 font-semibold">${(pos.qty * pos.entry_price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className={`text-sm font-semibold mt-2 pt-2 border-t border-cyan-500/20 ${(state.daily_pnl_usd || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  P&L Dia: {(state.daily_pnl_usd || 0) >= 0 ? '+' : ''}${(state.daily_pnl_usd || 0).toFixed(2)}
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
            📚 Regras v22.58
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
                  Pump Radar v22.58 — Radar + Entrada no INÍCIO
                  <span className="ml-3 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold border border-emerald-500/30">
                    Entra cedo (anti-topo)
                  </span>
                </h2>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <span>Varre Binance inteira</span>
                  <span>•</span>
                  <span>Alertas Telegram</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm mb-4">
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Alerta a partir de</div>
                  <div className="text-xl font-bold text-cyan-400">+6%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Frequência</div>
                  <div className="text-xl font-bold text-orange-400">~5min</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Máx alertas/scan</div>
                  <div className="text-xl font-bold text-yellow-400">5</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Cobertura</div>
                  <div className="text-xl font-bold text-purple-400">Binance</div>
                </div>
              </div>
              <div className="bg-gray-900/50 border border-orange-500/20 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-400">
                  <span className="font-bold text-cyan-400">RADAR v22.58:</span> varre TODA a Binance e avisa pumps no Telegram (+6%, ~5min, até 5/scan).
                  <strong className="text-emerald-400"> ENTRA no INÍCIO da explosão</strong> (RSI&lt;60 + anti-topo + ema≤3% + vol≥3x · size $5 · SL 6% · TP 12% RR 2:1) — captura o movimento cedo, nunca o topo.
                  Listagens novas: só alerta (entrada deu 0% WR no teste).
                </p>
              </div>
            </section>

            {/* Proteções v22.58 + VPS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <section className="bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛡️</span>
                  Proteções v22.58
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Anti-topo (REVERSAL)</span>
                    <span className="font-bold text-yellow-400">≤2.0% da máxima → bloqueia · FAIL-CLOSED</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Preço LIVE (anti-mock)</span>
                    <span className="font-bold text-emerald-400">falha de API → pula símbolo</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">Loss trail progressivo</span>
                    <span className="font-bold text-orange-400">pnl ≤ -1.25% → gap-close 15%/nível</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">KS drawdown máximo</span>
                    <span className="font-bold text-red-400">20% do peak → LATCHING (/unkill)</span>
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
                    <span className="text-gray-400">Orphan recovery</span>
                    <span className="font-bold text-emerald-400">UNIVERSE ≥$3 → rastrear (não vender)</span>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 flex justify-between">
                    <span className="text-gray-400">NaN protection</span>
                    <span className="font-bold text-yellow-400">entry=0/NaN → posição ignorada</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

                  <div className="mt-6 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🔐</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-emerald-400 text-lg mb-4">Trailing Stop v22.58 — deixa o vencedor correr (RR 2:1)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">●</span>
                            <span className="text-gray-400">Micro-trail:</span>
                            <span className="ml-2 font-mono font-bold text-gray-400">DESLIGADO (raspava +1%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400">●</span>
                            <span className="text-gray-400">Breakeven:</span>
                            <span className="ml-2 font-mono font-bold text-white">+2.5% → SL entry+0.3%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">●</span>
                            <span className="text-gray-400">Partial TP:</span>
                            <span className="ml-2 font-mono font-bold text-yellow-400">50% @ +2.0%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400">●</span>
                            <span className="text-gray-400">L1 (+3.5%):</span>
                            <span className="ml-2 font-mono font-bold text-emerald-400">trail 1.2%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400">●</span>
                            <span className="text-gray-400">L2 (+5.0%):</span>
                            <span className="ml-2 font-mono font-bold text-purple-400">trail 0.8%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-pink-400">●</span>
                            <span className="text-gray-400">L3 (+7.0%):</span>
                            <span className="ml-2 font-mono font-bold text-pink-400">trail 0.5%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-orange-400">●</span>
                            <span className="text-gray-400">TATICO mult:</span>
                            <span className="ml-2 font-mono font-bold text-orange-400">×1.00</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-400">●</span>
                            <span className="text-gray-400">Loss trail:</span>
                            <span className="ml-2 font-mono font-bold text-red-400">pnl≤-1.25% → gap-close 15%/nível</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">●</span>
                            <span className="text-gray-400">Soft exit:</span>
                            <span className="ml-2 font-mono font-bold text-gray-300">6h→12h (0.25%/10min)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📈</span>
                    Performance Hoje
                  </h2>
                  <PerformanceChart trades={state.trades} />
                </section>

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

            <section className="mb-8 bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">📜</span>
                Últimos Trades
                <span className="ml-3 text-sm font-normal text-gray-500">
                  (Últimos {Math.min(30, state.trades?.length ?? 0)} de {state.trades?.length ?? 0})
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
    { name: '📈 OPORTUNIDADE', icon: '📈', desc: 'LINK AAVE UNI XRP SOL TAO NEAR ARB RENDER TRX DASH SKY • score≥55 • hold 24h • size max $18', color: 'from-cyan-500/20 to-indigo-500/10', border: 'border-cyan-500/30' },
    { name: '🔒 PRIVACY', icon: '🔒', desc: 'ZEC XMR • score≥70 • hold 12h • size max $8 • bloqueado em RISK_OFF', color: 'from-purple-500/20 to-purple-500/10', border: 'border-purple-500/30' },
    { name: '⚡ TATICO', icon: '⚡', desc: 'FET INJ NMR CFG DUSK WLD CHZ ONT BONK SENT PHA XAUT PSG • score≥48 • hold 8h • size max $12', color: 'from-emerald-500/20 to-emerald-500/10', border: 'border-emerald-500/30' },
    { name: '🚀 Pump Radar', icon: '🚀', desc: 'vol≥3.0× • mom3 +2.5%–8% • RSI<60 • Anti-topo ≤1.5% high_24h • size ≥$4', color: 'from-orange-500/20 to-red-500/10', border: 'border-orange-500/30' },
    { name: '📊 Momentum Breakout', icon: '📊', desc: '2ª estratégia • mom3≥1.5% • score≥60 • SL 4.0% | TP 8.0% • BB squeeze + direcional', color: 'from-indigo-500/20 to-blue-900/10', border: 'border-indigo-500/30' },
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
      category: "🔄 REVERSAL_TRANSITION — Setup Principal",
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
        { title: "OPORTUNIDADE (29 tokens)", desc: "score ≥ 50 · RISK_OFF: vol≥0.15 + mom>-1.0 (v22.58 afrouxado p/ dip)", example: "Dip a virar com score 52 → entra com size reduzido" },
        { title: "PRIVACY (ZEC/XMR)", desc: "score ≥ 70 — BLOQUEADO em RISK_OFF (risco regulatório)", example: "Score 72 em RISK_ON → entra com size máx $8" },
        { title: "TATICO (27 tokens)", desc: "score ≥ 50 · FET/DUSK com gates próprios em RISK_OFF", example: "FET score 60 em RISK_OFF → exceção permitida" },
        { title: "MOMENTUM_BREAKOUT", desc: "mom3 ≥ 1.5% | score ≥ 60 | vol ≥ 2.5× | RSI 48–62 | BB squeeze", example: "FET mom3=0.8% score=45 → MOM_BREAKOUT ativo" },
      ]
    },
    {
      category: "🌡️ REGIME FILTER v22.58",
      rules: [
        { title: "RISK_ON 🟢 — Size 100%", desc: "BTC forte + alts outperformando • Todas categorias ativas", example: "CORE 100% | OPORT 100% | TATICO 100% | PRIVACY 70%" },
        { title: "NEUTRAL 🟡 — Size reduzido", desc: "Condições mistas", example: "CORE 90% | OPORT 75% | TATICO 60% | PRIVACY 50%" },
        { title: "RISK_OFF 🔴 — Size mínimo", desc: "BTC fraco ou alts underperformando", example: "CORE 75% | OPORT 65% | TATICO 80% | PRIVACY BLOQUEADO" },
        { title: "Score mínimo dinâmico", desc: "NEUTRAL: OPORT +3 | TATICO +5 | RISK_OFF: TATICO +5 (FET/DUSK exceção) | CORE sem ajuste", example: "TATICO precisa de 53 pts em NEUTRAL (base 48+5)" },
      ]
    },
    {
      category: "🛡️ ANTI_TOPO v22.58 — Bloqueia entrada no topo",
      rules: [
        { title: "Fonte de dados", desc: "Live ticker high_24h (não OHLCV) — sempre atualizado", example: "Ticker Binance retorna high=$1.00, preço atual=$0.985 → 1.5% de distância" },
        { title: "Threshold", desc: "Bloqueia se preço ≤ 2.0% da máxima · FAIL-CLOSED (v22.58: sem dados de máxima = bloqueia)", example: "BTC a 0.8% da máxima de 24h → entrada bloqueada" },
        { title: "Cobertura", desc: "REVERSAL_TRANSITION (único sleeve de entrada vivo) — nunca compra o topo", example: "Sem high no ticker → usa recent_high; se nem isso → bloqueia" },
        { title: "Log de bloqueio", desc: "ANTI_TOPO / ANTI_TOPO_MOM no log com % de proximidade", example: "ANTI_TOPO_MOM: FET 0.92% da high_24h → bloqueado" },
      ]
    },
    {
      category: "⚙️ RISK MANAGEMENT v22.58",
      rules: [
        { title: "Risk per trade", desc: "$0.70 máximo (dollar-based SL) • SL calculado como %", example: "Size $10 → SL = 7% | Size $20 → SL = 3.5%" },
        { title: "Daily loss max", desc: "$3.00 ou 5% do equity (o que atingir primeiro)", example: "Perdeu $3 → stop diário, sem novas entradas" },
        { title: "Kill switch streak", desc: "3 losses seguidos → KS ativa", example: "3 stops seguidos → kill switch — aguarda 30min ou /unkill" },
        { title: "Kill switch drawdown", desc: "≥ 20% do peak (monotônico) → KS ativa · LATCHING (v22.58: só /unkill manual religa)", example: "Peak $120, equity $95 → drawdown 20.8% → bot PARA até /unkill" },
        { title: "KS Auto-Reset", desc: "30min + verificação (daily_loss / streak / WR) — NÃO se aplica a drawdown (latching)", example: "Streak/WR: reset auto após 30min · Drawdown: manual /unkill" },
        { title: "Volume 24h mínimo", desc: "CORE $50M | OPORT $20M | TATICO $15M | PRIVACY $10M", example: "Token com $5M vol24h → bloqueado" },
      ]
    },
    {
      category: "🔒 TRAILING STOP v22.58 — deixa o vencedor correr (RR 2:1)",
      rules: [
        { title: "Micro-trail", desc: "DESLIGADO (v22.58) — raspava vencedores a +1% (RR caía para 0.27)", example: "Já não corta o lucro cedo" },
        { title: "Breakeven", desc: "pnl ≥ +2.5% → SL = entry + 0.3% (dá room ao dip-buyer)", example: "Entrou $100, em $102.50 SL fica $100.30" },
        { title: "Partial TP", desc: "Vende 50% em +2.0% (pula se o resto ficar < minNotional $5)", example: "Em +2.0% → fecha metade, deixa metade correr" },
        { title: "L1 — +3.5%", desc: "Trail distance 1.2% abaixo do high (largo, deixa respirar)", example: "High +3.5% → SL ~+2.3%" },
        { title: "L2 — +5.0%", desc: "Trail distance 0.8% abaixo do high", example: "High +5.0% → SL ~+4.2%" },
        { title: "L3 — +7.0%", desc: "Trail distance 0.5% abaixo do high", example: "High +7.0% → SL ~+6.5%" },
        { title: "Loss trail progressivo", desc: "pnl ≤ -1.25% → fecha 15%×nível do gap(SL→preço), intervalo 30min", example: "Nível 1: fecha 15% do gap | Nível 3: fecha 45% do gap" },
        { title: "Soft Time Stop", desc: "Reduz 0.25%/10min a partir de 6h até fechar 100% em 12h", example: "Posição 9h → 25% vendido gradualmente" },
      ]
    },
    {
      category: "🛡️ PROTEÇÕES v22.58",
      rules: [
        { title: "Hold time adaptativo", desc: "CORE 48h | OPORT 24h | PRIVACY 12h | TATICO 8h (hard stop)", example: "TATICO 9h → fecha automaticamente" },
        { title: "Cooldown pós-loss", desc: "4h cooldown no token após perda", example: "Perdeu em SOL → sem entrada em SOL por 4h" },
        { title: "Blacklist TATICO", desc: "TATICO vai para blacklist por 4h após 1 loss", example: "FET perde → blacklist 4h" },
        { title: "Sector lock", desc: "2 losses/setor/dia bloqueia o setor", example: "2 losses em DeFi → bloqueia AAVE, UNI, LINK" },
        { title: "Max posições abertas", desc: "3 posições simultâneas máximo", example: "Já tem 3 abertas → sem novas entradas" },
        { title: "Orphan recovery", desc: "UNIVERSE órfão ≥$3 → recuperado como posição rastreada (não vendido)", example: "PSG $4.20 na Binance sem state → rastreado com SL 3.5%" },
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
      tokens: ["LINK", "AAVE", "UNI", "XRP", "SOL", "TAO", "NEAR", "ARB", "RENDER", "TRX", "DASH", "SKY"],
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
      tokens: ["FET", "INJ", "NMR", "CFG", "DUSK", "WLD", "CHZ", "ONT", "BONK", "SENT", "PHA", "XAUT", "PSG"],
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
            <h4 className="text-lg font-bold text-purple-400 mb-2">③ EMA8 proximal + ANTI_TOPO</h4>
            <p className="text-sm text-gray-400 mb-2">Preço perto da EMA8 • Bloqueado se ≤1.5% da high_24h</p>
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
          <span className="text-3xl">📡</span>
          Pump Radar v22.58 — só ALERTA (não entra)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold text-orange-400 mb-3">📡 Radar (alerta Telegram)</h4>
            <div className="space-y-3">
              <div className="bg-gray-900/50 border border-orange-500/20 rounded-lg p-4">
                <div className="font-bold text-cyan-400 mb-1">Cobertura</div>
                <p className="text-sm text-gray-400">Varre TODA a Binance (não só o universo)</p>
                <p className="text-xs text-gray-500 mt-1">Avisa pumps a partir de +6% · ~5min · até 5/scan</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-500/20 rounded-lg p-4">
                <div className="font-bold text-gray-300 mb-1">NÃO compra pumps</div>
                <p className="text-sm text-gray-400">Entrar no topo = perda garantida</p>
                <p className="text-xs text-gray-500 mt-1">Só te avisa; a decisão é tua</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-400 mb-3">🎯 Sleeves de entrada</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="font-bold text-emerald-400 mb-1">ATIVOS (v22.58)</div>
                <p className="text-gray-400">REVERSAL (dip-buyer) + EARLY-PUMP (explosão no início)</p>
                <p className="text-xs text-gray-500 mt-1">Dip: compra o fundo a virar · Pump: entra cedo c/ anti-topo — nunca o topo</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-500/20 rounded-lg p-4">
                <div className="font-bold text-gray-300 mb-1">OFF</div>
                <p className="text-gray-400">MOMENTUM_BREAKOUT · TREND_FOLLOW · LISTING_ENTRY</p>
                <p className="text-xs text-gray-500 mt-1">Listing entry deu 0% WR (−$1.14) — só alerta</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-gray-900/50 border border-orange-500/20 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">
            <span className="font-bold text-cyan-400">RADAR v22.58:</span> alerta-only — varre a Binance inteira e avisa pumps no Telegram (+6%, ~5min, até 5/scan).
            <strong className="text-yellow-400"> Entradas reais são só dip-buyer, com anti-topo fail-closed.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
