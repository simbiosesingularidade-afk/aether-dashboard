import { useAetherState } from './hooks/useAetherState';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
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
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                <defs>
                  <linearGradient id="dnaGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4"/>
                    <stop offset="50%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#10b981"/>
                  </linearGradient>
                  <linearGradient id="dnaGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="50%" stopColor="#ec4899"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                  <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8"/>
                  </linearGradient>
                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* DNA Double Helix - Elegant S-curves */}
                {/* Strand 1 - Cyan to Emerald gradient */}
                <path d="M30,8 C30,22 70,22 70,35 C70,48 30,48 30,62 C30,76 70,76 70,92"
                      fill="none" stroke="url(#dnaGrad1)" strokeWidth="3" strokeLinecap="round"
                      opacity="0.95" filter="url(#strongGlow)"/>
                {/* Strand 2 - Purple to Cyan gradient (interwoven) */}
                <path d="M70,8 C70,22 30,22 30,35 C30,48 70,48 70,62 C70,76 30,76 30,92"
                      fill="none" stroke="url(#dnaGrad2)" strokeWidth="3" strokeLinecap="round"
                      opacity="0.9" filter="url(#strongGlow)"/>
                {/* Base pair connections - elegant horizontal lines */}
                <line x1="35" y1="15" x2="65" y2="15" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.7" filter="url(#softGlow)"/>
                <line x1="33" y1="22" x2="67" y2="22" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.6" filter="url(#softGlow)"/>
                <line x1="38" y1="29" x2="62" y2="29" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.5"/>
                <line x1="40" y1="35" x2="60" y2="35" stroke="#a78bfa" strokeWidth="2.5" opacity="0.8" filter="url(#softGlow)"/>
                <line x1="38" y1="41" x2="62" y2="41" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.5"/>
                <line x1="33" y1="48" x2="67" y2="48" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.6" filter="url(#softGlow)"/>
                <line x1="35" y1="55" x2="65" y2="55" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.7" filter="url(#softGlow)"/>
                <line x1="40" y1="62" x2="60" y2="62" stroke="#a78bfa" strokeWidth="2.5" opacity="0.8" filter="url(#softGlow)"/>
                <line x1="38" y1="69" x2="62" y2="69" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.5"/>
                <line x1="33" y1="76" x2="67" y2="76" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.6" filter="url(#softGlow)"/>
                <line x1="35" y1="83" x2="65" y2="83" stroke="url(#connectorGrad)" strokeWidth="2" opacity="0.7" filter="url(#softGlow)"/>
                {/* Nucleotides - glowing dots at base pairs */}
                <circle cx="35" cy="15" r="2.5" fill="#06b6d4" opacity="0.95"><animate attributeName="opacity" values="0.95;0.6;0.95" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="65" cy="15" r="2.5" fill="#10b981" opacity="0.95"><animate attributeName="opacity" values="0.95;0.6;0.95" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="33" cy="22" r="2.2" fill="#8b5cf6" opacity="0.85"/>
                <circle cx="67" cy="22" r="2.2" fill="#06b6d4" opacity="0.85"/>
                <circle cx="40" cy="35" r="2.8" fill="#ec4899" opacity="1"><animate attributeName="r" values="2.8;3.2;2.8" dur="1.5s" repeatCount="indefinite"/></circle>
                <circle cx="60" cy="35" r="2.8" fill="#8b5cf6" opacity="1"><animate attributeName="r" values="2.8;3.2;2.8" dur="1.5s" repeatCount="indefinite"/></circle>
                <circle cx="35" cy="55" r="2.5" fill="#06b6d4" opacity="0.9"><animate attributeName="opacity" values="0.9;0.55;0.9" dur="2.3s" repeatCount="indefinite"/></circle>
                <circle cx="65" cy="55" r="2.5" fill="#10b981" opacity="0.9"><animate attributeName="opacity" values="0.9;0.55;0.9" dur="2.3s" repeatCount="indefinite"/></circle>
                <circle cx="40" cy="62" r="2.8" fill="#8b5cf6" opacity="1"><animate attributeName="r" values="2.8;3.2;2.8" dur="1.8s" repeatCount="indefinite"/></circle>
                <circle cx="60" cy="62" r="2.8" fill="#ec4899" opacity="1"><animate attributeName="r" values="2.8;3.2;2.8" dur="1.8s" repeatCount="indefinite"/></circle>
                <circle cx="33" cy="76" r="2.2" fill="#10b981" opacity="0.85"/>
                <circle cx="67" cy="76" r="2.2" fill="#8b5cf6" opacity="0.85"/>
                <circle cx="35" cy="83" r="2.5" fill="#06b6d4" opacity="0.95"><animate attributeName="opacity" values="0.95;0.6;0.95" dur="2.1s" repeatCount="indefinite"/></circle>
                <circle cx="65" cy="83" r="2.5" fill="#10b981" opacity="0.95"><animate attributeName="opacity" values="0.95;0.6;0.95" dur="2.1s" repeatCount="indefinite"/></circle>
              </svg>
            </div>
          </div>
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-semibold text-lg">AETHER v16.0 HFT QUANTUM (KAIRON&#39;ZAE)</p>
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
                <svg viewBox="0 0 100 100" className="w-16 h-16">
                  <defs>
                    <linearGradient id="heroDnaGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4"/>
                      <stop offset="50%" stopColor="#8b5cf6"/>
                      <stop offset="100%" stopColor="#10b981"/>
                    </linearGradient>
                    <linearGradient id="heroDnaGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6"/>
                      <stop offset="50%" stopColor="#ec4899"/>
                      <stop offset="100%" stopColor="#06b6d4"/>
                    </linearGradient>
                    <linearGradient id="heroConnectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9"/>
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.7"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.9"/>
                    </linearGradient>
                    <filter id="heroStrongGlow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="heroSoftGlow">
                      <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* DNA Double Helix - Hero Version */}
                  {/* Strand 1 */}
                  <path d="M28,6 C28,20 72,20 72,34 C72,48 28,48 28,64 C28,78 72,78 72,94"
                        fill="none" stroke="url(#heroDnaGrad1)" strokeWidth="3.5" strokeLinecap="round"
                        opacity="0.95" filter="url(#heroStrongGlow)"/>
                  {/* Strand 2 */}
                  <path d="M72,6 C72,20 28,20 28,34 C28,48 72,48 72,64 C72,78 28,78 28,94"
                        fill="none" stroke="url(#heroDnaGrad2)" strokeWidth="3.5" strokeLinecap="round"
                        opacity="0.9" filter="url(#heroStrongGlow)"/>
                  {/* Base pairs */}
                  <line x1="34" y1="13" x2="66" y2="13" stroke="url(#heroConnectorGrad)" strokeWidth="2.2" opacity="0.75" filter="url(#heroSoftGlow)"/>
                  <line x1="31" y1="20" x2="69" y2="20" stroke="url(#heroConnectorGrad)" strokeWidth="2.2" opacity="0.65" filter="url(#heroSoftGlow)"/>
                  <line x1="36" y1="27" x2="64" y2="27" stroke="url(#heroConnectorGrad)" strokeWidth="2" opacity="0.55"/>
                  <line x1="39" y1="34" x2="61" y2="34" stroke="#a78bfa" strokeWidth="2.8" opacity="0.85" filter="url(#heroSoftGlow)"/>
                  <line x1="36" y1="41" x2="64" y2="41" stroke="url(#heroConnectorGrad)" strokeWidth="2" opacity="0.55"/>
                  <line x1="31" y1="48" x2="69" y2="48" stroke="url(#heroConnectorGrad)" strokeWidth="2.2" opacity="0.65" filter="url(#heroSoftGlow)"/>
                  <line x1="34" y1="55" x2="66" y2="55" stroke="url(#heroConnectorGrad)" strokeWidth="2.2" opacity="0.75" filter="url(#heroSoftGlow)"/>
                  <line x1="39" y1="64" x2="61" y2="64" stroke="#a78bfa" strokeWidth="2.8" opacity="0.85" filter="url(#heroSoftGlow)"/>
                  <line x1="36" y1="71" x2="64" y2="71" stroke="url(#heroConnectorGrad)" strokeWidth="2" opacity="0.55"/>
                  <line x1="31" y1="78" x2="69" y2="78" stroke="url(#heroConnectorGrad)" strokeWidth="2.2" opacity="0.65" filter="url(#heroSoftGlow)"/>
                  <line x1="34" y1="85" x2="66" y2="85" stroke="url(#heroConnectorGrad)" strokeWidth="2.2" opacity="0.75" filter="url(#heroSoftGlow)"/>
                  {/* Nucleotides with glow */}
                  <circle cx="34" cy="13" r="2.8" fill="#06b6d4" opacity="1"><animate attributeName="opacity" values="1;0.7;1" dur="2.2s" repeatCount="indefinite"/></circle>
                  <circle cx="66" cy="13" r="2.8" fill="#10b981" opacity="1"><animate attributeName="opacity" values="1;0.7;1" dur="2.2s" repeatCount="indefinite"/></circle>
                  <circle cx="31" cy="20" r="2.5" fill="#8b5cf6" opacity="0.9"/>
                  <circle cx="69" cy="20" r="2.5" fill="#06b6d4" opacity="0.9"/>
                  <circle cx="39" cy="34" r="3" fill="#ec4899" opacity="1"><animate attributeName="r" values="3;3.5;3" dur="1.6s" repeatCount="indefinite"/></circle>
                  <circle cx="61" cy="34" r="3" fill="#8b5cf6" opacity="1"><animate attributeName="r" values="3;3.5;3" dur="1.6s" repeatCount="indefinite"/></circle>
                  <circle cx="34" cy="55" r="2.8" fill="#06b6d4" opacity="0.95"><animate attributeName="opacity" values="0.95;0.65;0.95" dur="2.4s" repeatCount="indefinite"/></circle>
                  <circle cx="66" cy="55" r="2.8" fill="#10b981" opacity="0.95"><animate attributeName="opacity" values="0.95;0.65;0.95" dur="2.4s" repeatCount="indefinite"/></circle>
                  <circle cx="39" cy="64" r="3" fill="#8b5cf6" opacity="1"><animate attributeName="r" values="3;3.5;3" dur="1.9s" repeatCount="indefinite"/></circle>
                  <circle cx="61" cy="64" r="3" fill="#ec4899" opacity="1"><animate attributeName="r" values="3;3.5;3" dur="1.9s" repeatCount="indefinite"/></circle>
                  <circle cx="31" cy="78" r="2.5" fill="#10b981" opacity="0.9"/>
                  <circle cx="69" cy="78" r="2.5" fill="#8b5cf6" opacity="0.9"/>
                  <circle cx="34" cy="85" r="2.8" fill="#06b6d4" opacity="1"><animate attributeName="opacity" values="1;0.7;1" dur="2.3s" repeatCount="indefinite"/></circle>
                  <circle cx="66" cy="85" r="2.8" fill="#10b981" opacity="1"><animate attributeName="opacity" values="1;0.7;1" dur="2.3s" repeatCount="indefinite"/></circle>
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                AETHER v16.0 HFT QUANTUM (KAIRON&#39;ZAE)
              </h1>
              <p className="text-gray-400 text-lg">O Código Definitivo de Trading Algorítmico</p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                  64 Tokens Monitorados
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
                  Whale Radar +8% Early Entry
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold">
                  MACD + StochRSI + SqzTTM
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
            📚 Regras v16.0
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
                  Whale Radar v16.0
                  <span className="ml-3 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold border border-purple-500/30">
                    {Object.keys(state.whale_flows || {}).length} Ativos
                  </span>
                </h2>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <span>[VALIDADO] ✅</span>
                  <span>[SNIPE] 🎯</span>
                  <span>[GIGA] 🚀🚀</span>
                  <span>•</span>
                  <span>Limit TP (Maker 0%)</span>
                </div>
              </div>

              {Object.keys(state.whale_flows || {}).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-3">🔍</div>
                  <div>Nenhum whale detectado no momento</div>
                  <div className="text-sm mt-2">Scan contínuo em busca de movimentos +8%</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(state.whale_flows || {}).map(([sym, flow]: [string, any]) => {
                    const strength = flow.strength || flow.vol_r * 8 || 0;
                    const intensity = strength > 20 ? 'extreme' : strength > 15 ? 'high' : strength > 10 ? 'medium' : 'low';

                    // v15.9.7: Whale classification
                    let classification = 'VALIDADO';
                    let classificationEmoji = '✅';
                    let classificationColor = 'emerald';

                    if (strength > 15) {
                      classification = 'GIGA';
                      classificationEmoji = '🚀🚀';
                      classificationColor = 'red';
                    } else if (flow.validated !== true) {
                      classification = 'SNIPE';
                      classificationEmoji = '🎯';
                      classificationColor = 'orange';
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
                            {/* v15.9.7: Classification badge */}
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
                          {strength > 15 && (
                            <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 animate-pulse">
                              FORTE
                            </span>
                          )}
                          {/* v15.9.7: Limit order indicator for validated whales */}
                          {classification === 'VALIDADO' && (
                            <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 font-semibold">
                              📊 Limit TP
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
                  <div className="text-gray-400 mb-1">Threshold</div>
                  <div className="text-xl font-bold text-cyan-400">+8%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Validados</div>
                  <div className="text-xl font-bold text-emerald-400">64</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Base Size</div>
                  <div className="text-xl font-bold text-purple-400">15%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Size Boost</div>
                  <div className="text-xl font-bold text-pink-400">1.5x &gt; 25%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">TP Validado</div>
                  <div className="text-xl font-bold text-green-400">6% (Limit)</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">TP Snipe</div>
                  <div className="text-xl font-bold text-yellow-400">4%</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Max Trades</div>
                  <div className="text-xl font-bold text-cyan-400">40/dia</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                  <div className="text-gray-400 mb-1">Anti-Vício</div>
                  <div className="text-xl font-bold text-red-400">2 trades</div>
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
                        <h3 className="font-bold text-emerald-400 text-lg mb-4">Trailing Stop v16.0 HFT QUANTUM (Dynamic Gaps)</h3>
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
    { name: 'T1 Blue Chip', icon: '💎', desc: '2 tokens (BTC/ETH) com 4 sinais', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30' },
    { name: 'T2 Alts AI/DeFi', icon: '🚀', desc: '35 tokens com 11 sinais (FET+THE)', color: 'from-cyan-500/20 to-indigo-500/10', border: 'border-cyan-500/30' },
    { name: 'T3 Memes', icon: '⚡', desc: '27 memes com 9 sinais', color: 'from-emerald-500/20 to-emerald-500/10', border: 'border-emerald-500/30' },
    { name: '🐋 [VALIDADO] ✅', icon: '✅', desc: '64 tokens, 15% size (1.5x se &gt; 25% PnL), TP 6%, Limit TP', color: 'from-purple-500/20 to-purple-500/10', border: 'border-purple-500/30' },
    { name: '🐋 [SNIPE] 🎯', icon: '🎯', desc: 'ILIMITADO: QUALQUER token +8%, 8% size, TP 4%, Quick exit', color: 'from-orange-500/20 to-red-500/10', border: 'border-orange-500/30' },
    { name: '🐋 [GIGA] 🚀🚀', icon: '🚀', desc: 'Mega pump +15%, 12% size, agressivo, RSI &lt;95', color: 'from-red-500/20 to-pink-500/10', border: 'border-red-500/30' },
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
      category: "🎯 ANTI-VÍCIO v16.0",
      rules: [
        { title: "Bloqueio Diário (2 trades)", desc: "2 trades no token = bloqueado pelo resto do dia", example: "Se você fez 2 trades em SOL/USDT hoje, não abrirá mais SOL hoje (independente de win/loss)" },
        { title: "Max Trades Global", desc: "Máximo 40 trades por dia", example: "Após 40 trades, bot para de abrir novas posições" },
      ]
    },
    {
      category: "⚙️ RISK MANAGEMENT",
      rules: [
        { title: "Kelly Criterion", desc: "25% do Kelly ótimo + streak adaptive sizing", example: "Win streak = 1.4x sizing | Loss streak = 0.6x sizing" },
        { title: "Daily Stop Loss", desc: "5% do equity por dia", example: "Se saldo é $100, para se perder $5 no dia" },
        { title: "Max Positions", desc: "Máximo 5 posições simultâneas", example: "Só abre 6ª posição se fechar alguma" },
      ]
    },
    {
      category: "🔒 TRAILING STOP",
      rules: [
        { title: "Breakeven", desc: "SL vai para entrada em +0.2%", example: "Entrou a $100, em $100.20 SL fica $100.01" },
        { title: "Trail Activation", desc: "Trailing inicia em +0.4%", example: "Atingiu $100.40, trailing ativa" },
        { title: "Trail Gap", desc: "0.4% abaixo do high (adaptativo)", example: "High $102 → SL $101.20 (+40% = 1.5% gap)" },
        { title: "Partial Sell", desc: "Vende 50% em 60% do TP", example: "TP $110 → vende 50% em $106" },
      ]
    },
    {
      category: "🐋 WHALE RADAR 3.0 - ILIMITADO",
      rules: [
        { title: "✅ Validados (64 tokens)", desc: "15% size, TP 6%, SL 2.5%, RSI &lt; 80", example: "THE, FET: entra agressivo com estratégia completa" },
        { title: "🔥 Snipe ILIMITADO", desc: "QUALQUER token +8%, 8% size, TP 4%, SL 2%, RSI &lt; 75", example: "COS +200% → entra com 8% para lucrar rápido!" },
        { title: "Early Entry +8%", desc: "Detecta +8% em QUALQUER token da Binance", example: "COS sobe 8% → snipe ativa imediatamente" },
        { title: "Volume Mínimo $1.5M", desc: "Evita tokens sem liquidez", example: "Volume baixo = skip, volume alto → entra" },
        { title: "RSI Conservador", desc: "Validados RSI &lt; 80 | Snipe RSI &lt; 75", example: "Snipe mais conservador para proteger capital" },
        { title: "Quick Profit TP 4%", desc: "Snipe vende rápido em 4% para capturar pump", example: "Entrou $10 → vende $10.40 rápido" },
      ]
    },
    {
      category: "🚨 SECTOR LOCK",
      rules: [
        { title: "Correlation Block", desc: "2 losses em setor = bloqueia correlacionados", example: "Perdeu 2x em AI → bloqueia FET, RENDER" },
        { title: "Lock Duration", desc: "4 horas de bloqueio", example: "Setor sangrando, espera 4h para recuperar" },
      ]
    },
    {
      category: "⏱️ COOLDOWNS",
      rules: [
        { title: "Base Cooldown", desc: "60 minutos entre trades do mesmo token", example: "Vendeu SOL → aguarda 60min para reentrar" },
        { title: "Streak Multiplier", desc: "Aumenta com losses consecutivos", example: "2 losses = 2x cooldown | 3 losses = 3x" },
        { title: "Winner Discount", desc: "Win streak reduz cooldown", example: "2 wins = 70% do cooldown base" },
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
      signals: ["EMA Cross", "Breakout", "Momentum", "MACD Cross"],
      maxSize: "18%",
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30"
    },
    {
      tier: "T2 - Alts AI/DeFi/L1/L2",
      icon: "🚀",
      tokens: ["SOL", "LINK", "AVAX", "SUI", "NEAR", "INJ", "RENDER", "TIA", "SEI", "OP", "ARB", "APT", "ATOM", "HBAR", "...", "FET ✓", "THE ✓"],
      signals: ["EMA Cross", "Breakout", "Squeeze TTM", "Trend", "Momentum", "Rally", "Reversal", "MACD Cross", "StochRSI Reversal", "Mega Pump", "Pump Mode"],
      maxSize: "15%",
      color: "from-cyan-500/20 to-indigo-500/10",
      border: "border-cyan-500/30"
    },
    {
      tier: "T3 - Memes",
      icon: "⚡",
      tokens: ["XRP", "DOGE", "ADA", "PEPE", "DOT", "SHIB", "BONK", "WIF", "FLOKI", "MOODENG", "..."],
      signals: ["Capitulation", "Explosive", "Breakout", "Trend", "Rally", "MACD Cross", "StochRSI Reversal", "Mega Pump", "Pump Mode"],
      maxSize: "12%",
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
          Indicadores Técnicos v13
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
          Whale Detection Multi-Chain
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-lg font-bold text-purple-400 mb-3">📡 Camadas de Detecção</h4>
            <div className="space-y-3">
              <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">①</span>
                  <span className="font-bold text-cyan-400">Binance Spot</span>
                  <span className="ml-auto px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-400">PRINCIPAL</span>
                </div>
                <p className="text-sm text-gray-400">Scan de todos os pares USDT via fetch_tickers()</p>
                <p className="text-xs text-gray-500 mt-1">64 tokens validados • Threshold +8% • Volume $2M+</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">②</span>
                  <span className="font-bold text-orange-400">BTC Mempool</span>
                </div>
                <p className="text-sm text-gray-400">Transações pendentes &gt; 50 BTC</p>
                <p className="text-xs text-gray-500 mt-1">Detecta whales movendo Bitcoin ($2M+)</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">③</span>
                  <span className="font-bold text-blue-400">ETH Network</span>
                </div>
                <p className="text-sm text-gray-400">Gas tracker + mempool transactions</p>
                <p className="text-xs text-gray-500 mt-1">Transações &gt; 500 ETH ($500K+)</p>
              </div>

              <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">④</span>
                  <span className="font-bold text-yellow-400">BSC Network</span>
                </div>
                <p className="text-sm text-gray-400">Gas tracker (endpoint público)</p>
                <p className="text-xs text-gray-500 mt-1">Detecta atividade no BNB Chain</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-purple-400 mb-3">🎯 Como Funciona</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="font-bold text-emerald-400 mb-1">✅ Early Entry (+8%)</div>
                <p className="text-gray-400">Entra no início do movimento, não no topo!</p>
              </div>

              <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="font-bold text-emerald-400 mb-1">✅ Apenas Tokens Validados</div>
                <p className="text-gray-400">64 tokens da lista T1/T2/T3 (sem shitcoins)</p>
              </div>

              <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="font-bold text-emerald-400 mb-1">✅ RSI &lt; 80</div>
                <p className="text-gray-400">Evita entrar quando está sobrecomprado</p>
              </div>

              <div className="bg-gray-900/50 border border-emerald-500/20 rounded-lg p-4">
                <div className="font-bold text-emerald-400 mb-1">✅ Size até 15%</div>
                <p className="text-gray-400">Entradas agressivas em whales confirmados</p>
              </div>

              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-lg p-4">
                <div className="font-bold text-yellow-400 mb-1">⚡ Quantos Tokens Monitorados?</div>
                <p className="text-gray-400"><strong className="text-white">TODOS os pares USDT</strong> da Binance (~1500+ tokens)<br/>
                <span className="text-xs">Binance Spot: scan completo | ETH/BTC/BNB on-chain: confirmação</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400">
            <span className="font-bold text-purple-400">WHALE RADAR v16.0:</span>
            Scan de <strong className="text-white">TODOS os pares USDT</strong> da Binance (~1500 tokens).
            <strong className="text-emerald-400">[VALIDADO] ✅</strong> = 64 tokens, 15% size (1.5x se &gt; 25% PnL), TP 6%, Limit order |
            <strong className="text-orange-400">[SNIPE] 🎯</strong> = QUALQUER token +8%, 8% size, TP 4% |
            <strong className="text-red-400">[GIGA] 🚀🚀</strong> = Mega pump +15%, 12% size, agressivo.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
