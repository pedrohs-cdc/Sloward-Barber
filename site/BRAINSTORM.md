# Sloward Barbershop — Brainstorm completo do projeto

> Documentação completa de tudo que foi pensado, decidido e construído para o site institucional da Sloward Barbershop.

---

## 🎯 Sobre o projeto

**Cliente:** Sloward Barbershop — Franca/SP
**Uso:** Portfólio pessoal (apresentação acadêmica) + base pra um site real
**Origem:** Site de referência fornecido por imagens → virou deck de apresentação → virou site multi-página completo

**Identidade da marca:**
- Barbearia premium voltada pra jovens
- Tradição artesanal com olhar contemporâneo
- "A arte do corte perfeito"
- Est. 2026

---

## 🎨 Sistema de design

### Paleta de cores (dark mode — padrão)

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#1A1F26` | Fundo principal |
| `--bg-2` | `#242B33` | Cards, superfícies elevadas |
| `--bg-3` | `#1F252D` | Bordas internas, mapa |
| `--bg-soft` | `#1D232B` | Seções alternativas |
| `--accent-bg` | `#1E293B` | Gradient stops em cards "hot" |
| `--blue` | `#2563EB` | Acento primário (botões, CTA) |
| `--blue-deep` | `#1E40AF` | Acento profundo (gradientes) |
| `--blue-bright` | `#3B82F6` | Acento claro (texto destacado) |
| `--blue-glow` | `#60A5FA` | Brilhos, gradient stops |
| `--ink` | `#E8EEF7` | Texto principal |
| `--ink-soft` | `rgba(232,238,247,0.78)` | Texto secundário |
| `--ink-mute` | `rgba(232,238,247,0.55)` | Texto auxiliar / labels |

### Light mode (toggle via `[data-theme="light"]`)
- bg vira branco/cinza-claro
- `--accent-bg` vira `#DBE7FF` (azul pastel)
- ink invertido (`#0F172A` escuro sobre fundo claro)
- Cards ganham sombras suaves em vez de gradients escuros
- Overlays de galeria mantêm escuros (contraste com fotos)
- Highlight marker usa `mix-blend-mode: multiply`

### Tipografia

- **Display:** Space Grotesk (300-800) — moderno geométrico, `letter-spacing: -0.02em` em títulos
- **Mono:** JetBrains Mono — eyebrows, labels, chips, search → reforça o lado "tech"

**Hierarquia:**
- `.h-display` — clamp(56-132px) — heros gigantes
- `.h1` — clamp(40-88px) — page titles
- `.h2` — clamp(32-56px) — section titles
- `.h3` — 28px — card titles
- `.lead` — 22px
- `.body` — 17px

### Vocabulário visual

- `// comentários` em mono como decoração de UI (inspirado em código)
- `[ brackets ]` como tags
- `★★★★★` em azul (não dourado) — coerência com a paleta
- Glows radiais de fundo com parallax sutil
- Grid de fundo com mask radial (aparece só no centro/hero)
- Ticker scrolling horizontal com serviços
- Crosshair markers nos cantos de placeholders
- Efeito "glitch" RGB em texto (na 404)
- Highlight marker colorido atrás de palavras-chave

---

## 🗺️ Mapa do site (9 páginas + assets)

| Página | Arquivo | Função |
|--------|---------|--------|
| **Home** | `index.html` | Hero com typewriter + sobre + serviços preview + testimonials + FAQ + CTA |
| **Serviços** | `servicos.html` | Grid de 6 serviços + tabela de preços completa |
| **Equipe** | `equipe.html` | Pedro + André com bios, tags, stats e valores |
| **Galeria** | `galeria.html` | Portfolio masonry + lightbox + filtros por categoria |
| **Localização** | `localizacao.html` | Mapa estilizado + endereço + horário + features |
| **Agendar** | `agendar.html` | Calendário visual + horários + form (auth required) |
| **Blog** | `blog.html` | Post destaque + 6 posts placeholder + newsletter |
| **Login** | `login.html` | Split-screen com tabs login/cadastro |
| **404** | `404.html` | Página de erro com efeito glitch |
| **sitemap.xml** | `sitemap.xml` | SEO crawler hints |
| **robots.txt** | `robots.txt` | SEO crawler rules |

---

## 💡 Funcionalidades implementadas

### 🧭 Navegação & estrutura
- Nav fixo com `backdrop-blur` ao rolar
- Menu mobile (burger) com animação X
- Footer 4 colunas com social links
- Botão WhatsApp flutuante com ripple
- Botão "voltar ao topo" (após 600px de scroll)
- Barra de progresso de scroll no topo (azul com glow)

### 🎬 Motion & interatividade
- Reveal on scroll (IntersectionObserver + `@keyframes`)
- Parallax sutil em glows de fundo
- Hover states em todos os cards/botões
- Ticker scrolling horizontal com serviços
- Typewriter rotating no hero (corte → barba → estilo → acabamento)
- Highlight marker colorido atrás de palavras-chave
- Efeito glitch RGB no "404"

### ⚙️ Funcionalidades principais
- **Cmd+K search dialog** com navegação por teclado (↑ ↓ Enter Esc)
- **Theme toggle** dark/light com persistência localStorage
- **FAQ accordion** (`<details>` nativo)
- **Filtros** de categoria na galeria
- **Lightbox** com navegação por teclado (← → Esc) + contador
- **Calendário visual** no agendar:
  - Grid mensal com navegação ◀ ▶
  - Hoje destacado, datas passadas/domingos desabilitados
  - Bolinha azul marca dias com agenda
  - Click numa data → revela horários disponíveis
  - ~35% slots aparecem ocupados (pattern determinístico)
  - Horários separados pra semana (9-19:30) e sábado (9-13:30)
- **Form** envia mensagem formatada pro WhatsApp (data: DD/MM/AAAA às HH:MM)

### 🔐 Sistema de autenticação
- Login/cadastro com tabs animadas (indicador deslizante)
- Show/hide password com olhinho
- Medidor de força de senha (4 barras, label em tempo real)
- Social login placeholder (Google, Apple)
- Toast notifications
- ~~**Auth gate em `/agendar.html`**~~ — **removido (v11):** agendar não exige
  mais login; calendário e horários são livremente acessíveis. Dados pedidos só
  no envio, e salvos localmente para pré-preencher a próxima visita
- Pré-preenchimento do form com dados do usuário
- Welcome chip "// olá, *João*" no topo do agendar
- **Avatar + dropdown no nav** quando logado (com logout)
- Persistência via `localStorage` (chave `sloward-auth`)

### 🔍 SEO & performance
- Meta tags completas em todas as páginas
- Open Graph (Facebook/LinkedIn)
- Twitter Cards
- Schema.org JSON-LD (`BarberShop`) com endereço, telefone, rating
- Favicon SVG inline (sem requisição extra)
- Fontes via Google Fonts com preconnect
- `sitemap.xml` com prioridades + changefreq
- `robots.txt` permitindo crawling, bloqueando `/login`, `/agendar`, `/404`

### 📱 Responsividade
- Breakpoint principal em 1100px (com `!important` final pra garantir override)
- Mobile menu funcional com smooth slide
- Grids adaptam: 3/4 colunas → 2 → 1
- Tipografia fluida (`clamp()`)

### 🎨 Componentes de UI customizados
- Chips com dot azul pulsante
- Cards com hover lift e icon-box gradient
- Buttons primários com glow + arrow `→` que desliza
- Crosshairs decorativos nos cantos
- Eyebrow com linha curta horizontal
- Search trigger com kbd ⌘K
- Typewriter cursor piscante
- Calendar com bolinhas de ocupação
- Console-trace estilizado (na 404)

---

## 🏗️ Estrutura de arquivos

```
site/
├── index.html              # Home
├── servicos.html           # Serviços + tabela de preços
├── equipe.html             # Equipe (Pedro + André)
├── galeria.html            # Portfolio com lightbox
├── localizacao.html        # Mapa + horários + contato
├── agendar.html            # Calendário + form (auth required)
├── blog.html               # Posts placeholder + newsletter
├── login.html              # Login + cadastro split-screen
├── 404.html                # Página de erro com glitch
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO rules
├── BRAINSTORM.md           # Este documento
└── assets/
    ├── styles.css          # Design system (~1820 linhas)
    └── motion.js           # Interatividade global (~440 linhas)
```

---

## ⚙️ Decisões técnicas

### Por que multi-página em vez de SPA?
- Portfólio acadêmico — código limpo, fácil de ler
- SEO melhor por padrão (cada página com meta tags próprias)
- Sem framework = zero build step
- Carrega rápido, funciona offline em tese

### Por que `localStorage` pra auth?
- Mock simples — protótipo, não produção
- Demonstra o fluxo de cadastro/login sem precisar de backend
- Usado também como cache de conveniência (pré-preenche o form de agendar)
- Em produção: trocar por JWT + backend real

### Sistema de motion
- `IntersectionObserver` pra reveal (mais performático que scroll listener)
- `@keyframes` em vez de transitions (imunes ao throttling do browser)
- Safety net: força reveal de elementos visíveis após 2s

### Light mode robusto
- Variável `--accent-bg` substituiu `#1E293B` hardcoded em todos os arquivos
- Overrides específicos por componente quando a troca de variável não bastava
- Gallery overlays mantidos escuros pra preservar contraste com fotos
- Highlight marker troca `hard-light` → `multiply` no light mode
- Sombras suaves substituem gradients escuros nos cards

### Por que Space Grotesk + JetBrains Mono?
- Space Grotesk: moderno, geométrico, com personalidade — combina com jovens
- JetBrains Mono: dá um ar "tech" sem ser nerd demais
- Combinação rara em barbearias → diferenciação visual

---

## 📊 Métricas mock exibidas

| Stat | Valor | Local |
|------|-------|-------|
| Avaliação média | 4.9 ★★★★★ | Hero home |
| Clientes fiéis | 200+ | Hero home |
| Serviços | 06 | Hero home + meta |
| Anos do Pedro | 12+ | Equipe |
| Anos do André | 10+ | Equipe |
| Trabalhos na galeria | 12 | Galeria |

---

## 🎬 Fluxo do usuário (típico)

```
[entra no site] → home (hero + serviços + testimonials + FAQ)
       ↓
   [clica em "agendar"]
       ↓
   [acessa direto — sem login] → vê o calendário
       ↓
   [escolhe serviço + barbeiro + clica numa data no calendário]
       ↓
   [horários disponíveis aparecem → seleciona um]
       ↓
   [preenche nome + WhatsApp no form]   ← dados pedidos só aqui
       ↓
   [clica "enviar para whatsapp"]
       ↓
   [dados salvos localmente p/ próxima visita] → abre WhatsApp com msg formatada

   (visitante recorrente: form já vem pré-preenchido + welcome chip.
    login/cadastro continua existindo, mas é opcional)
```

---

## 🔑 Atalhos de teclado

| Atalho | Ação |
|--------|------|
| `⌘ K` / `Ctrl K` | Abrir busca |
| `↑ ↓` | Navegar resultados (com busca aberta) |
| `Enter` | Selecionar resultado |
| `Esc` | Fechar busca / lightbox |
| `← →` | Navegar galeria (com lightbox aberto) |

---

## 🚧 Ideias futuras (não implementadas)

### Conteúdo
- Página individual de cada serviço (descrição completa, processo, fotos)
- Página individual de cada barbeiro (bio expandida, agenda própria)
- Posts reais no blog (atualmente são placeholders)
- Política de privacidade / Termos de uso
- Página "Sobre" dedicada

### Experiência
- Cursor personalizado magnetizando nos botões
- Splash screen de carregamento com logo animado
- Transições entre páginas (fade/slide)
- Paleta sépia/quente como tema alternativo
- Fotos reais (placeholders trocados)
- Vídeo de fundo no hero
- Antes/Depois slider na galeria

### Funcionalidades reais
- Programa de fidelidade real (10º corte grátis com barra de progresso)
- Sistema de cupons / códigos promocionais
- Widget de avaliações Google embutido
- Chat ao vivo (ou WhatsApp business)
- Newsletter integrada com Mailchimp/Brevo
- Backend real de auth (atualmente é localStorage)
- Calendário com sincronização real de horários
- Painel admin simulado — visualização da agenda dos barbeiros
- Histórico do cliente em `/conta.html`
- Sistema de favoritos na galeria

### Avançado
- PWA completo (manifest + service worker + instalável)
- Internacionalização (PT/EN/ES)
- Easter egg interativo (Konami code)
- Tweaks panel ao vivo (dev mode) — mudar cores/fontes via UI
- Modo "showcase" — auto-tour pelas seções com timer

### Acessibilidade
- Skip to content link
- ARIA labels mais completos
- `prefers-reduced-motion` — desliga animações
- Lighthouse audit completo

---

## 📝 Histórico evolutivo do projeto

1. **Imagens de referência** do site original (fornecidas pelo usuário)
2. **Deck de apresentação** v1 (preto + dourado, 13 slides)
3. **Versão refinada** do deck (Space Grotesk + azul tech)
4. **Exportação pra Canva** (PPTX editável)
5. **Site multi-página** v1 (6 páginas básicas)
6. **Refatoração com Cmd+K, theme toggle, typewriter, FAQ, testimonials**
7. **Galeria + SEO + scroll progress + back-to-top**
8. **Sistema de login/cadastro + auth gate**
9. **Calendário visual + página 404 + sitemap**
10. **Robustez do light mode** (fix de cores hardcoded)
11. **Auditoria de segurança/qualidade:** correção de XSS no dropdown de conta
    (textContent), acessibilidade (`:focus-visible` + `prefers-reduced-motion`),
    Schema.org válido, README/LICENSE/.gitignore, e **remoção do auth gate** —
    agendar deixou de exigir login (redução de fricção de conversão)

A cada etapa, escolhas foram feitas pra equilibrar **fidelidade ao briefing** e **personalidade própria** — sem cair em clichês de "site de barbearia escuro com dourado", optando por um tom mais jovem (azul elétrico + mono code-style).

---

**Última atualização:** Maio 2026
**Status:** ✅ Funcional · Pronto pra demonstração
**Total:** ~9 páginas HTML + 1 CSS + 1 JS + sitemap/robots/md
