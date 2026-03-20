# 🌌 AETHER v14 FUSION - Dashboard

Dashboard moderno em React + TypeScript + Tailwind CSS para o bot de trading AETHER v14.

## 🚀 Tecnologias

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 9** - Build tool & dev server
- **Tailwind CSS 3.4** - Utility-first CSS
- **React Query** - Data fetching & caching
- **Axios** - HTTP client
- **Python 3.12** - Backend API server

## 📦 Estrutura

```
aether-dashboard/
├── src/
│   ├── api/          # API client
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   ├── types/        # TypeScript types
│   ├── lib/          # Utilities
│   ├── App.tsx       # Main app
│   └── main.tsx      # Entry point
├── public/           # Static assets
├── dist/             # Build output
└── .vscode/          # VSCode config
```

## 🛠️ Comandos

```bash
# Desenvolvimento
npm run dev              # Start dev server (http://localhost:5173)

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Backend
# O backend Python roda na porta 3000
# Para reiniciar: use a task "restart-backend" no VSCode

# VSCode Tasks (Ctrl+Shift+B)
- dev: Inicia dev server
- build: Compila para produção
- type-check: Verifica tipos
- start-backend: Inicia backend Python
- restart-backend: Reinicia backend
```

## 🔗 URLs

| Serviço | URL | Auth |
|---------|-----|------|
| React Dev | http://localhost:5173 | - |
| Dashboard | http://localhost:3000 | `admin`/`Aetherj2026!` |
| API | http://localhost:3000/api/state | `admin`/`Aetherj2026!` |

## 📝 Desenvolvimento no VSCode

### Tasks Disponíveis (Ctrl+Shift+B)

1. **dev** - Inicia servidor de desenvolvimento
2. **build** - Compila para produção
3. **preview** - Preview do build
4. **type-check** - Verificação de tipos
5. **start-backend** - Inicia backend Python
6. **restart-backend** - Reinicia backend Python

### Debug (F5)

- **Launch Chrome** - Debug do dev server
- **Launch Chrome (Production)** - Debug do build
- **Debug Backend Python** - Debug do servidor

### Snippets

Digite `rfc` + Tab para criar um React component
Digite `tcard` + Tab para um card Tailwind
Digite `us` + Tab para useState

## 🎨 Tailwind CSS

### Cores

```tsx
// Backgrounds
bg-background      // #090d14 (fundo principal)
bg-surface         // #0f1623 (cards)
bg-surfaceHighlight // #151e2e (hover)

// Semânticas
text-profit        // Verde (+)
text-loss          // Vermelho (-)
text-warning       // Amarelo
text-info          // Cyan
text-gold          // Ouro (PAXG)

// Acentos
text-accent-blue   // #3b82f6
text-accent-indigo // #6366f1
```

## 🔄 Workflow de Trabalho

1. Abra o projeto no VSCode
2. Pressione **Ctrl+Shift+B** → Rode task **dev**
3. Abra **http://localhost:5173**
4. Faça alterações, hot reload automático
5. Quando pronto, rode task **build**
6. Rode task **restart-backend** para aplicar

## 🔧 Configurações VSCode

- **Format on Save**: Ativado
- **TypeScript**: Stricter mode ativado
- **Tailwind**: IntelliSense habilitado
- **ESLint**: Fix on save

---

**v14 FUSION** - Trading Bot Dashboard 24/7
