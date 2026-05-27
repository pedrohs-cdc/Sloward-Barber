# Sloward Barbershop

Site institucional multi-página de uma barbearia premium fictícia (Franca/SP),
desenvolvido como atividade acadêmica e peça de portfólio.

**Stack:** HTML puro · CSS custom properties · JavaScript vanilla — sem frameworks,
sem build step. Abra `site/index.html` no navegador e funciona.

```
git clone https://github.com/pedrohs-cdc/Sloward-Barber.git
cd Sloward-Barber/site
# abrir index.html no navegador, ou servir localmente:
python3 -m http.server 8000   # → http://localhost:8000
```

## O que tem

- **9 páginas:** home, serviços, equipe, galeria, localização, agendar, blog, login, 404
- **Busca global** com atalho `⌘K` / `Ctrl K` e navegação por teclado
- **Tema claro/escuro** persistido em `localStorage`
- **Calendário de agendamento** com seleção de data/horário → mensagem formatada pro WhatsApp
- **Sistema de auth mock** (cadastro/login via `localStorage`), opcional —
  agendar não exige login
- **Galeria** com filtros por categoria e lightbox navegável por teclado
- **SEO:** meta tags, Open Graph, Schema.org JSON-LD, `sitemap.xml`, `robots.txt`
- **Acessibilidade:** foco visível por teclado (`:focus-visible`) e respeito a
  `prefers-reduced-motion`
- **Responsivo:** breakpoints em 1100px e 580px, tipografia fluida com `clamp()`

## Estrutura

```
site/
├── index.html  servicos.html  equipe.html  galeria.html
├── localizacao.html  agendar.html  blog.html  login.html  404.html
├── sitemap.xml  robots.txt
├── BRAINSTORM.md          # documentação viva do projeto (decisões de design)
└── assets/
    ├── styles.css          # design system completo
    └── motion.js           # interatividade global
```

## ⚠️ Avisos importantes

Este é um **protótipo acadêmico**, não um produto de produção:

- A autenticação é **simulada** via `localStorage` e **não oferece segurança real**
  (qualquer dado pode ser editado pelo console). Ela serve só para demonstrar o
  *fluxo* de cadastro/login — **não é exigida para agendar**: o calendário e os
  horários ficam livremente acessíveis, e os dados são pedidos apenas no envio.
- Os horários disponíveis no calendário são **gerados deterministicamente** (não
  refletem uma agenda real).
- Fotos, depoimentos, posts de blog e dados de contato (telefone, e-mail,
  endereço) são **placeholders fictícios**.

## Documentação

O histórico completo de decisões de design, paleta, tipografia e roadmap está em
[`site/BRAINSTORM.md`](site/BRAINSTORM.md).

## Licença

MIT — ver [`LICENSE`](LICENSE).
