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
import { HFTTelemetryPanel } from './components/hft/HFTTelemetryPanel';
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
          <p className="text-cyan-400 font-semibold text-lg">AETHER v19.0 DYNAMIC UNIVERSE</p>
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
      <Header hedge={state.hedge} lastUpdate={Date.now()} />

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
                AETHER v19.0 DYNAMIC UNIVERSE
              </h1>
              <p className="text-gray-400 text-lg">O Código Definitivo de Trading Algorítmico</p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                  72 Tokens + Snipe Híbrido
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
                  Early Detection +10%
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold">
                  4 Setup Families
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
                  ${((state.bal || 0) + Object.values(state.pos || {}).reduce((sum, p) => sum + (p.size || 0), 0)).toFixed(2)}
                </div>
                <div className={`text-sm font-semibold ${(state.profit_n || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {(state.profit_n || 0) >= 0 ? '+' : ''}${(state.profit_n || 0).toFixed(2)}
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
            📚 Regras v19.0
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

            {/* HFT Telemetry Panel */}
            <HFTTelemetryPanel />

            {/* Whale Radar Section */}
            <section className="mb-8 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-emerald-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl animate-pulse">🐋</span>
                  Whale Radar v19.0 Dynamic Universe
                  <span className="ml-3 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold border border-purple-500/30">
                    {Object.keys(state.whale_flows || {}).length} Ativos
                  </span>
                </h2>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <span>[VALIDADO] ✅</span>
                  <span>[SNIPE] 🎯</span>
                  <span>•</span>
                  <span>Early Entry +10%</span>
                </div>
              </div>

              {Object.keys(state.whale_flows || {}).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-3">🔍</div>
                  <div>Nenhum whale detectado no momento</div>
                  <div className="text-sm mt-2">Early Detection: scan contínuo em busca de movimentos +10% (INÍCIO do pump)</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(state.whale_flows || {}).map(([sym, flow]: [string, any]) => {
                    const strength = flow.strength || flow.vol_r * 8 || 0;
                    const intensity = strength > 25 ? 'extreme' : strength > 15 ? 'high' : strength > 10 ? 'medium' : 'low';

                    // v19.0: Whale classification
                    let classification = 'VALIDADO';
                    let classificationEmoji = '✅';
                    let classificationColor = 'emerald';

                    if (!flow.validated) {
                      classification = 'SNIPE';
                      classificationEmoji = '🎯';
                      classificationColor = 'orange';
                    } else if (strength > 20) {
                      classification = 'GIGA';
                      classificationEmoji = '🚀🚀';
                      classificationColor = 'red';
                    }

                    const colors = {
                      extreme: 'from-red-500 to-orange-500',
                      high: 'from-orange-500 to-yellow-500',
                      medium: 'from-yellow-500 to-cyan-500',
                      low: 'from-cyan-500 to-emerald-500'
                    };
                    return (
                      <div key={sym} className={`relative bg-gradient-to-br ${colors[intensity]}/10 border border-${colors[intensity].split('-')[1]}-500/30 rounded-xl p-4 backdrop-blur-sm`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-white flex items-center gap-2">
                            {sym.replace('/USDT', '')}
                            <span className={`px-2 py-0.5 rounded text-xs font-bold bg-${classificationColor}-500/20 text-${classificationColor}-400 border border-${classificationColor}-500/30`}>
                              [{classification}] {classificationEmoji}
                            </span>
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            intensity === 'extreme' ? 'bg-red-500/30 text-red-400' :
                            intensity === 'high' ? 'bg-orange-500/30 text-orange-400' :
                            intensity === 'medium' ? 'bg-yellow-500/30 text-yellow-400' :
                            'bg-cyan-500/30 text-cyan-400'
                          }`}>
                            +{strength.toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mb-2">
                          {new Date(flow.ts).toLocaleTimeString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 font-semibold">
                            {flow.type}
                          </span>
                          {strength > 20 && (
                            <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 animate-pulse">
                              EARLY
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Threshold Conservative</div>
                  <div className="text-xl font-bold text-cyan-400">+12%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Threshold Aggressive</div>
                  <div className="text-xl font-bold text-orange-400">+10%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Validados</div>
                  <div className="text-xl font-bold text-emerald-400">72</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Snipe Híbrido</div>
                  <div className="text-xl font-bold text-yellow-400">+25% ILIMITADO</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Max Loss (Cons)</div>
                  <div className="text-xl font-bold text-green-400">$1.00</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Max Loss (Agg)</div>
                  <div className="text-xl font-bold text-red-400">$1.50</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Early Detection</div>
                  <div className="text-xl font-bold text-purple-400">1h &lt; 50%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Min Score (Cons)</div>
                  <div className="text-xl font-bold text-cyan-400">45 pts</div>
                </div>
              </div>
            </section>

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
                        {Object.keys(state.pos).length}
                      </span>
                    </h2>
                  </div>
                  <PositionGrid positions={state.pos} whaleFlows={state.whale_flows} />

                  {/* Trail Info Card */}
                  <div className="mt-6 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">🔐</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-emerald-400 text-lg mb-4">Trailing Stop v17.2 PROFESSIONAL (Dynamic Gaps)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400">●</span>
                            <span className="text-gray-400">Breakeven:</span>
                            <span className="ml-2 font-mono font-bold text-white">+0.2%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400">●</span>
                            <span className="text-gray-400">Trail Activation:</span>
                            <span className="ml-2 font-mono font-bold text-emerald-400">+0.4%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">●</span>
                            <span className="text-gray-400">Partial Sell:</span>
                            <span className="ml-2 font-mono font-bold text-yellow-400">50% @ 60% TP</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400">●</span>
                            <span className="text-gray-400">Gap &lt;1% PnL:</span>
                            <span className="ml-2 font-mono font-bold text-cyan-400">0.4%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400">●</span>
                            <span className="text-gray-400">Gap 1-3% PnL:</span>
                            <span className="ml-2 font-mono font-bold text-emerald-400">1.0%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400">●</span>
                            <span className="text-gray-400">Gap 3-5% PnL:</span>
                            <span className="ml-2 font-mono font-bold text-purple-400">2.0%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-pink-400">●</span>
                            <span className="text-gray-400">Gap 5-8% PnL:</span>
                            <span className="ml-2 font-mono font-bold text-pink-400">3.5%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-orange-400">●</span>
                            <span className="text-gray-400">Gap 8-12% PnL:</span>
                            <span className="ml-2 font-mono font-bold text-orange-400">5.0%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-400">●</span>
                            <span className="text-gray-400">Gap &gt;12% PnL:</span>
                            <span className="ml-2 font-mono font-bold text-red-400">8.0%</span>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 italic">
                          * Gap aumenta dinamicamente conforme PnL sobe para proteger lucros acumulados
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
                        const wins = trades.filter(t => t.net > 0).length;
                        const total = trades.length;
                        return total > 0 ? ((wins / total) * 100).toFixed(0) + '%' : '0%';
                      })()}
                      color="text-cyan-400"
                    />
                    <StatCard
                      icon="🔥"
                      label="Streak"
                      value={state.cw > 0 ? `W${state.cw}` : state.cl > 0 ? `L${state.cl}` : '—'}
                      color={state.cw > 0 ? 'text-emerald-400' : state.cl > 0 ? 'text-red-400' : 'text-gray-500'}
                    />
                    <StatCard
                      icon="💸"
                      label="Fees Hoje"
                      value={`-$${state.fees.toFixed(2)}`}
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
                    blacklist={state.blacklist}
                    cools={state.cools}
                    whaleFlows={state.whale_flows}
                    sectorStats={state.sector_stats}
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
                <RiskEngine kelly={state.kelly} rmult={state.rmult} />
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  Stats por Tier
                </h2>
                <PairStatsTable pairStats={state.pair_stats} />
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
    { name: '💎 T1 Blue Chip', icon: '💎', desc: '2 tokens (BTC/ETH) • Max 18% • Trend Pullback', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30' },
    { name: '🚀 T2 Alts AI/DeFi', icon: '🚀', desc: '35 tokens • Max 15% • 4 Setup Families', color: 'from-cyan-500/20 to-indigo-500/10', border: 'border-cyan-500/30' },
    { name: '⚡ T3 Memes', icon: '⚡', desc: '27 memes • Max 12% • Breakout Confirmed', color: 'from-emerald-500/20 to-emerald-500/10', border: 'border-emerald-500/30' },
    { name: '🐋 [VALIDADO] ✅', icon: '✅', desc: '72 tokens • 15% size • Early Entry +10% • TP 6%', color: 'from-purple-500/20 to-purple-500/10', border: 'border-purple-500/30' },
    { name: '🎯 [SNIPE] ILIMITADO', icon: '🎯', desc: 'QUALQUER token +25% • 8% size • TP 5% • Quick exit', color: 'from-orange-500/20 to-red-500/10', border: 'border-orange-500/30' },
    { name: '🔄 REVERSAL_SPOT', icon: '🔄', desc: 'Entrada precoce em reversão • RSI 30-55 • Momentum positivo', color: 'from-yellow-500/20 to-orange-500/10', border: 'border-yellow-500/30' },
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
      category: "🎯 V17.2 SETUP FAMILIES",
      rules: [
        { title: "① REVERSAL_SPOT", desc: "Entrada precoce em reversão sem tendência confirmada • ADX 12-20 • RSI 30-55", example: "RSI&lt;40 + momentum&gt;0 → entra antes da confirmação" },
        { title: "② TREND_PULLBACK", desc: "Pullback em tendência confirmada • EMA8&gt;EMA21&gt;EMA50 • ADX 15-20", example: "Trend forte + price&lt;3% EMA8 → entrada pullback" },
        { title: "③ BREAKOUT_CONFIRMED", desc: "Breakout confirmado • Volume expansion • Momentum positivo", example: "Volume&gt;1.2x + price&gt;high20 → breakout" },
        { title: "④ EVENT_WHALE", desc: "Detecção de whale • Early entry +10% • Volume&gt;$2M", example: "Token +10% 1h&lt;50% change → early entry" },
      ]
    },
    {
      category: "⚙️ QUALITY-BASED SIZING v17.2",
      rules: [
        { title: "Score 80+ (Excelente)", desc: "Multiplicador 1.5x • Entradas agressivas", example: "Score 85 → size × 1.5 = posição maior" },
        { title: "Score 70-79 (Bom)", desc: "Multiplicador 1.0x • Tamanho padrão", example: "Score 75 → size × 1.0 = normal" },
        { title: "Score 55-69 (OK)", desc: "Multiplicador 0.85x • Entradas moderadas", example: "Score 60 → size × 0.85 = reduzida" },
        { title: "Score 45-54 (Fraco)", desc: "Multiplicador 0.7x • Entradas conservadoras", example: "Score 48 → size × 0.7 = pequena" },
        { title: "Score 35-44 (Aggressive)", desc: "Multiplicador 0.5x • Apenas modo agressivo", example: "Score 38 → size × 0.5 = mínima" },
      ]
    },
    {
      category: "🎯 MARKET REGIME FILTER",
      rules: [
        { title: "RISK_ON 🟢", desc: "BTC 24h&gt;+2% + Breadth&gt;60% • Multiplicador 1.2x", example: "Mercado forte → posições 20% maiores" },
        { title: "NEUTRAL 🟡", desc: "Condições normais • Multiplicador 1.0x (default)", example: "Mercado estável → tamanho normal" },
        { title: "RISK_OFF 🔴", desc: "BTC 24h&lt;-3% ou Breadth&lt;30% • Multiplicador 0.5x", example: "Mercado fraco → posições 50% menores" },
        { title: "T3 Block em RISK_OFF", desc: "Meme tokens bloqueados em RISK_OFF (exceto aggressive)", example: "RISK_OFF → T3 bloqueado, protege capital" },
      ]
    },
    {
      category: "⚙️ RISK MANAGEMENT",
      rules: [
        { title: "MAX_LOSS_USD Conservative", desc: "$1.00 por trade (era $0.50) • +100% tolerância", example: "Modo conservador → loss máximo $1.00" },
        { title: "MAX_LOSS_USD Aggressive", desc: "$1.50 por trade (era $0.50) • +200% tolerância", example: "Modo agressivo → loss máximo $1.50" },
        { title: "Max Position Size", desc: "20% do equity por posição (inalterado)", example: "Equity $100 → máximo $20 por posição" },
        { title: "Kelly Criterion", desc: "25% do Kelly ótimo + streak adaptive", example: "WR 50% PF 2.0 → Kelly 6.25% → size 1.56%" },
      ]
    },
    {
      category: "🔒 TRAILING STOP",
      rules: [
        { title: "Breakeven", desc: "SL vai para entrada em +0.2%", example: "Entrou $100, em $100.20 SL fica $100.01" },
        { title: "Trail Activation", desc: "Trailing inicia em +0.4%", example: "Atingiu $100.40, trailing ativa" },
        { title: "Trail Gap", desc: "0.4% abaixo do high (adaptativo até 8%)", example: "High $102 → SL $101.20 (+2% = 5× gap)" },
        { title: "Partial Sell", desc: "Vende 50% em 60% do TP", example: "TP $110 → vende 50% em $106" },
      ]
    },
    {
      category: "🐋 WHALE RADAR v17.2 EARLY DETECTION",
      rules: [
        { title: "Early Entry +10%", desc: "Entra no INÍCIO do pump (não topo!) • 1h&lt;50% change", example: "24h=+20%, 1h&lt;+10% → early entry" },
        { title: "✅ Validados (72 tokens)", desc: "Threshold +12% conservative • Size 15% • TP 6% • RSI 30-50", example: "FET +12% → entra com estratégia completa" },
        { title: "🎯 Snipe ILIMITADO", desc: "QUALQUER token +25% • Size 8% • TP 5% • RSI 25-55", example: "COS +25% → snipe agressivo" },
        { title: "Max Loss por Modo", desc: "Conservative $1.00 • Aggressive $1.50", example: "Loss excede → bloqueia entrada" },
        { title: "Min Score por Modo", desc: "Conservative 45 pts • Aggressive 35 pts", example: "Score baixo → rejeita setup" },
      ]
    },
    {
      category: "🚨 PROTEÇÕES v17.2",
      rules: [
        { title: "Anti-Vício Relaxado", desc: "3 trades/dia (era 2) • 2 losses bloqueiam (era 1)", example: "Mais flexibilidade para entrar" },
        { title: "Max Trades Global", desc: "40 trades por dia (inalterado)", example: "Após 40 trades, bot para de abrir" },
        { title: "Sector Lock", desc: "2 losses = bloqueio 4h (inalterado)", example: "Perdeu 2x AI → bloqueia FET, RENDER" },
        { title: "Cooldown", desc: "60min base • Adaptive com streak (inalterado)", example: "Vendeu SOL → aguarda 60min+" },
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
  const strategies = [
    {
      tier: "T1 - Blue Chips",
      icon: "💎",
      tokens: ["BTC/USDT", "ETH/USDT"],
      signals: ["TREND_PULLBACK", "BREAKOUT_CONFIRMED", "REVERSAL_SPOT"],
      maxSize: "18%",
      families: 4,
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30"
    },
    {
      tier: "T2 - Alts AI/DeFi/L1/L2",
      icon: "🚀",
      tokens: ["SOL", "LINK", "AVAX", "SUI", "NEAR", "INJ", "RENDER", "TIA", "SEI", "OP", "ARB", "APT", "ATOM", "HBAR", "...", "FET ✓", "THE ✓"],
      signals: ["TREND_PULLBACK", "BREAKOUT_CONFIRMED", "REVERSAL_SPOT", "EVENT_WHALE"],
      maxSize: "15%",
      families: 4,
      color: "from-cyan-500/20 to-indigo-500/10",
      border: "border-cyan-500/30"
    },
    {
      tier: "T3 - Memes",
      icon: "⚡",
      tokens: ["XRP", "DOGE", "ADA", "PEPE", "DOT", "SHIB", "BONK", "WIF", "FLOKI", "..."],
      signals: ["BREAKOUT_CONFIRMED", "REVERSAL_SPOT", "EVENT_WHALE"],
      maxSize: "12%",
      families: 3,
      color: "from-emerald-500/20 to-emerald-500/10",
      border: "border-emerald-500/30"
    }
  ];

  const indicators = [
    { name: "MACD", desc: "Moving Average Convergence Divergence (12,26,9)", formula: "EMA12 - EMA26" },
    { name: "StochRSI", desc: "Stochastic RSI para reversões", formula: "RSI estocástico sobre 14 períodos" },
    { name: "Squeeze TTM", desc: "Detecta consolidação antes de breakout", formula: "Bollinger dentro Keltner" },
    { name: "ADX", desc: "Average Directional Index (força de trend)", formula: "+DM/-DM smoothed" },
    { name: "ATR", desc: "Average True Range (volatilidade)", formula: "True Range de 14 períodos" },
    { name: "RSI", desc: "Relative Strength Index", formula: "14 períodos" },
  ];

  return (
    <div className="space-y-8">
      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${strat.color} border ${strat.border} rounded-2xl p-6 backdrop-blur-sm`}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{strat.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{strat.tier}</h3>
                <p className="text-sm text-gray-400">Max Size: {strat.maxSize}</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Tokens ({strat.tokens.length}):</h4>
              <div className="flex flex-wrap gap-2">
                {strat.tokens.map(token => (
                  <span key={token} className="px-2 py-1 bg-gray-800/50 rounded text-xs text-gray-300">{token}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Sinais ({strat.signals.length}):</h4>
              <div className="flex flex-wrap gap-2">
                {strat.signals.map(signal => (
                  <span key={signal} className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-400">{signal}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          Setup Families v17.2
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-yellow-400 mb-2">① REVERSAL_SPOT</h4>
            <p className="text-sm text-gray-400 mb-2">Entrada precoce em reversão sem tendência confirmada</p>
            <div className="text-xs text-gray-500 font-mono">ADX 12-20 • RSI 30-55 • Momentum&gt;0</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-emerald-400 mb-2">② TREND_PULLBACK</h4>
            <p className="text-sm text-gray-400 mb-2">Pullback em tendência confirmada</p>
            <div className="text-xs text-gray-500 font-mono">EMA8&gt;EMA21&gt;EMA50 • ADX 15-20 • price&lt;3% EMA8</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-purple-400 mb-2">③ BREAKOUT_CONFIRMED</h4>
            <p className="text-sm text-gray-400 mb-2">Breakout confirmado com volume</p>
            <div className="text-xs text-gray-500 font-mono">Volume&gt;1.2x • price&gt;high20 • Momentum&gt;0.2%</div>
          </div>
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4">
            <h4 className="text-lg font-bold text-cyan-400 mb-2">④ EVENT_WHALE</h4>
            <p className="text-sm text-gray-400 mb-2">Detecção de whale com early entry</p>
            <div className="text-xs text-gray-500 font-mono">Change&gt;10% • 1h&lt;50% change • Volume&gt;$2M</div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          <span className="text-2xl">📈</span>
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

      {/* Whale Detection Multi-Chain */}
      <div className="bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-emerald-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🐋</span>
          Whale Radar v19.0 Dynamic Universe
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-lg font-bold text-purple-400 mb-3">📡 Early Detection System</h4>
            <div className="space-y-3">
              <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">①</span>
                  <span className="font-bold text-cyan-400">Early Entry +10%</span>
                  <span className="ml-auto px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-400">NOVO</span>
                </div>
                <p className="text-sm text-gray-400">Entra no INÍCIO do pump (não topo!)</p>
                <p className="text-xs text-gray-500 mt-1">1h momentum &lt; 50% do change 24h</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">②</span>
                  <span className="font-bold text-orange-400">Snipe Híbrido</span>
                  <span className="ml-auto px-2 py-1 bg-orange-500/20 rounded text-xs text-orange-400">ILIMITADO</span>
                </div>
                <p className="text-sm text-gray-400">QUALQUER token +25% • 8% size • TP 5%</p>
                <p className="text-xs text-gray-500 mt-1">Max 1 posição • Max 2 trades/dia</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">③</span>
                  <span className="font-bold text-emerald-400">Validados (72 tokens)</span>
                  <span className="ml-auto px-2 py-1 bg-emerald-500/20 rounded text-xs text-emerald-400">CONFIRMADO</span>
                </div>
                <p className="text-sm text-gray-400">Threshold +12% conservative • 15% size</p>
                <p className="text-xs text-gray-500 mt-1">RSI 30-50 • Momentum positivo</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">④</span>
                  <span className="font-bold text-yellow-400">Quality-Based Sizing</span>
                </div>
                <p className="text-sm text-gray-400">Score 35-80+ → multiplica 0.5x a 1.5x</p>
                <p className="text-xs text-gray-500 mt-1">Melhor setup = posição maior</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-purple-400 mb-3">🎯 Thresholds por Modo</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="font-bold text-emerald-400 mb-1">✅ CONSERVATIVE</div>
                <p className="text-gray-400">Min Score: 45 pts • Max Loss: $1.00</p>
                <p className="text-xs text-gray-500 mt-1">Threshold: +12% • RSI: 30-50 • ADX: 12+</p>
              </div>

              <div className="bg-gray-900/50 border border-orange-500/20 rounded-lg p-4">
                <div className="font-bold text-orange-400 mb-1">⚡ AGGRESSIVE</div>
                <p className="text-gray-400">Min Score: 35 pts • Max Loss: $1.50</p>
                <p className="text-xs text-gray-500 mt-1">Threshold: +10% • RSI: 25-55 • ADX: 8+</p>
              </div>

              <div className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-4">
                <div className="font-bold text-cyan-400 mb-1">🎯 EARLY ENTRY CONFIRMATION</div>
                <p className="text-gray-400">1h momentum &lt; 50% do change 24h</p>
                <p className="text-xs text-gray-500 mt-1">Ex: 24h=+20%, 1h&lt;+10% → early entry ✓</p>
              </div>

              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-lg p-4">
                <div className="font-bold text-yellow-400 mb-1">⚡ Max Loss Proteção</div>
                <p className="text-gray-400">Conservative: $1.00 | Aggressive: $1.50</p>
                <p className="text-xs text-gray-500 mt-1">+100-200% tolerância vs v16 ($0.50)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">
            <span className="font-bold text-purple-400">WHALE RADAR v17.2 EARLY DETECTION:</span>
            72 tokens validados + snipe híbrido ilimitado.
            <strong className="text-emerald-400">[VALIDADO] ✅</strong> = +12% conservative, 15% size, TP 6% |
            <strong className="text-orange-400">[SNIPE] 🎯</strong> = QUALQUER token +25%, 8% size, TP 5% |
            <strong className="text-cyan-400">[EARLY]</strong> = 1h&lt;50% change → entra no início!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
