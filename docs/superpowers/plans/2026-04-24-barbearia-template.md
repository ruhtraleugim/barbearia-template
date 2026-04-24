# Barbearia Template — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar template base completo para landing pages de barbearias com 3 temas visuais intercambiáveis via `?theme=a/b/c`, agendamento via WhatsApp e todo conteúdo controlado por `config.js`.

**Architecture:** HTML estático com containers sem texto — todo conteúdo vem de `config.js` injetado via `script.js`. Três arquivos CSS de tema completamente independentes, selecionados por query param lido inline no `<head>` para evitar FOUC. `styles.css` define apenas estrutura e layout; temas definem variáveis CSS consumidas por `styles.css`.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), JavaScript ES6 vanilla. Fontes via Google Fonts. Deploy: GitHub + Vercel (site estático, sem `vercel.json`).

---

## Mapa de Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `barbearia/sites/index.html` | Estrutura HTML — containers e IDs, zero texto fixo |
| `barbearia/sites/config.js` | Único ponto de edição por cliente — todos os textos, serviços, dados |
| `barbearia/sites/script.js` | Injeta tema, renderiza DOM do CONFIG, controla interações |
| `barbearia/sites/styles.css` | Reset, layout, componentes estruturais — usa `var()` sem valores padrão de cor |
| `barbearia/sites/themes/luxury-dark.css` | Tema A: preto quente + dourado + Playfair Display |
| `barbearia/sites/themes/bold-industrial.css` | Tema B: azul escuro + vermelho + Barlow Condensed |
| `barbearia/sites/themes/clean-minimal.css` | Tema C: fundo claro + verde escuro + Plus Jakarta Sans |
| `barbearia/sites/images/` | hero.jpg + 1–4.jpg (substituídos por cliente) |

---

## Tarefa 1: Scaffold + config.js

**Arquivos:**
- Criar: `barbearia/sites/config.js`
- Criar: `barbearia/sites/images/.gitkeep`
- Criar: `.gitignore` (raiz do Clone/)

- [ ] **Passo 1: Criar estrutura de pastas**

```bash
cd /home/arthursimoes/Projetos/Arthur/Clone
mkdir -p barbearia/sites/themes barbearia/sites/images
touch barbearia/sites/images/.gitkeep
```

- [ ] **Passo 2: Criar `.gitignore` na raiz**

Criar `/home/arthursimoes/Projetos/Arthur/Clone/.gitignore`:

```
.DS_Store
Thumbs.db
.vscode/
.idea/
.superpowers/
```

- [ ] **Passo 3: Criar `config.js` completo**

Criar `/home/arthursimoes/Projetos/Arthur/Clone/barbearia/sites/config.js`:

```js
// ═══════════════════════════════════════════════════════════════
//  BARBEARIA — config.js  |  CENTRO DE CONTROLE
//
//  ✅ EDITE AQUI para cada cliente
//  ❌ Não altere index.html, script.js, styles.css ou themes/
//
//  Para novo cliente: copie a pasta sites/, edite este arquivo,
//  substitua imagens em /images/ e suba no GitHub.
// ═══════════════════════════════════════════════════════════════

const CONFIG = {

  // ── Negócio ─────────────────────────────────────────────────
  businessName: "Barbearia Modelo",
  tagline:      "Desde 2015",

  // ── Textos do Hero ───────────────────────────────────────────
  headline:       "Seu corte,",
  headlineAccent: "no horário certo.",
  subheadline:    "Agende em segundos direto pelo WhatsApp — sem filas, sem espera.",
  ctaPrimary:     "Agendar agora",
  ctaSecondary:   "Ver serviços",

  // ── Seção Problema → Solução ─────────────────────────────────
  problemText:  "Cansado de mandar mensagem, esperar horas e ainda não saber se tem horário disponível?",
  solutionText: "Aqui é diferente. Você escolhe o serviço, informa o horário que quer e manda tudo pronto em uma mensagem. A gente confirma rapidinho.",

  // ── Contato ──────────────────────────────────────────────────
  whatsappNumber: "5599999999999",
  address:        "Rua das Barbearias, 123 — Centro",
  hours:          "Seg–Sáb: 9h às 20h",

  // ── CTA Final ────────────────────────────────────────────────
  ctaFinalHeadline: "Pronto para um novo visual?",
  ctaFinalSub:      "Garanta seu horário agora e saia do jeito que você quer.",

  // ── Footer ───────────────────────────────────────────────────
  footerText: "Todos os direitos reservados.",

  // ── Serviços — highlight: true exibe badge "Mais popular" ────
  services: [
    {
      name:        "Corte",
      description: "Corte moderno e personalizado no seu estilo.",
      price:       "R$ 35",
      duration:    "45 min",
      highlight:   false
    },
    {
      name:        "Barba",
      description: "Acabamento profissional com navalha e toalha quente.",
      price:       "R$ 25",
      duration:    "30 min",
      highlight:   false
    },
    {
      name:        "Corte + Barba",
      description: "O combo completo. Sai daqui como um outro.",
      price:       "R$ 55",
      duration:    "75 min",
      highlight:   true
    },
    {
      name:        "Pigmentação",
      description: "Cobertura de falhas com efeito natural e durável.",
      price:       "R$ 45",
      duration:    "60 min",
      highlight:   false
    }
  ],

  // ── Galeria — coloque as imagens em /images/ ─────────────────
  gallery: [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg"
  ],

  // ── Depoimentos ──────────────────────────────────────────────
  testimonials: [
    {
      name:   "Carlos Mendes",
      text:   "Atendimento rápido e sem enrolação. Saí exatamente como queria.",
      rating: 5
    },
    {
      name:   "Rafael Torres",
      text:   "Agora ficou muito mais fácil agendar. Recomendo demais.",
      rating: 5
    },
    {
      name:   "João Silva",
      text:   "Melhor barbearia da região. Profissional e sempre pontual.",
      rating: 5
    }
  ]

};
```

- [ ] **Passo 4: Inicializar git**

```bash
cd /home/arthursimoes/Projetos/Arthur/Clone
git init
git add barbearia/sites/config.js barbearia/sites/images/.gitkeep .gitignore
git commit -m "inicializa template base de barbearia — scaffold e config"
```

---

## Tarefa 2: index.html

**Arquivos:**
- Criar: `barbearia/sites/index.html`

- [ ] **Passo 1: Criar `index.html` completo**

Criar `/home/arthursimoes/Projetos/Arthur/Clone/barbearia/sites/index.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <title></title>

  <!-- Injeção inline do tema — roda antes do body para evitar FOUC -->
  <script>
    (function () {
      var t = new URLSearchParams(location.search).get('theme') || 'a';
      var map = { a: 'luxury-dark', b: 'bold-industrial', c: 'clean-minimal' };
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'themes/' + (map[t] || 'luxury-dark') + '.css';
      document.head.appendChild(l);
    })();
  </script>

  <link rel="stylesheet" href="styles.css">
  <script src="config.js"></script>
</head>
<body>

  <!-- ═══════════════════════════════════════════
       § 1 — HERO
       NÃO ALTERAR ESTRUTURA
  ═══════════════════════════════════════════ -->
  <section id="hero" class="hero">
    <div class="hero__overlay" aria-hidden="true"></div>

    <nav class="nav container">
      <span class="nav__brand" id="nav-brand"></span>
      <span class="nav__tagline" id="nav-tagline"></span>
    </nav>

    <div class="hero__content container">
      <span class="hero__label" id="hero-label"></span>
      <h1 class="hero__headline">
        <span id="hero-headline-1"></span>
        <em id="hero-headline-2"></em>
      </h1>
      <p class="hero__sub" id="hero-sub"></p>
      <div class="hero__actions">
        <button class="btn btn--primary" id="btn-cta-primary" onclick="scrollToBooking()"></button>
        <button class="btn btn--ghost" id="btn-cta-secondary" onclick="scrollToServices()"></button>
      </div>
    </div>

    <div class="hero__scroll-indicator" aria-hidden="true">
      <div class="hero__scroll-line"></div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       § 2 — PROBLEMA → SOLUÇÃO
       NÃO ALTERAR ESTRUTURA
  ═══════════════════════════════════════════ -->
  <section id="problem-solution" class="ps-section">
    <div class="container">
      <div class="ps-grid">
        <div class="ps-card ps-card--problem reveal">
          <span class="ps-card__icon" aria-hidden="true">✕</span>
          <p id="problem-text"></p>
        </div>
        <div class="ps-divider" aria-hidden="true">
          <div class="ps-divider__line"></div>
          <span class="ps-divider__arrow">→</span>
          <div class="ps-divider__line"></div>
        </div>
        <div class="ps-card ps-card--solution reveal reveal-delay-1">
          <span class="ps-card__icon" aria-hidden="true">✓</span>
          <p id="solution-text"></p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       § 3 — GALERIA
       NÃO ALTERAR ESTRUTURA
  ═══════════════════════════════════════════ -->
  <section id="gallery" class="gallery-section">
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Galeria</span>
        <h2 class="section-title">Nosso trabalho<br>fala por si</h2>
      </header>
      <div class="gallery-grid" id="gallery-grid">
        <!-- Renderizado via script.js -->
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       § 4 — SERVIÇOS
       NÃO ALTERAR ESTRUTURA
  ═══════════════════════════════════════════ -->
  <section id="services" class="services-section">
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Serviços</span>
        <h2 class="section-title">O que oferecemos</h2>
      </header>
      <div class="services-grid" id="services-grid">
        <!-- Renderizado via script.js -->
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       § 5 — AGENDAMENTO + WHATSAPP
       NÃO ALTERAR ESTRUTURA
  ═══════════════════════════════════════════ -->
  <section id="booking" class="booking-section">
    <div class="container">
      <div class="booking-wrapper">

        <div class="booking-info reveal">
          <span class="section-label">Agendamento</span>
          <h2 class="section-title">Reserve seu<br>horário</h2>
          <p class="booking-hours" id="booking-hours"></p>
          <p class="booking-address" id="booking-address"></p>
        </div>

        <form class="booking-form reveal reveal-delay-1" id="booking-form"
              onsubmit="handleBooking(event)" novalidate>

          <div class="form-group">
            <label class="form-label" for="input-name">Seu nome</label>
            <input type="text" id="input-name" class="form-input"
                   placeholder="Como podemos te chamar?" required autocomplete="name">
          </div>

          <div class="form-group">
            <label class="form-label" for="input-service">Serviço</label>
            <select id="input-service" class="form-input form-select" required>
              <option value="">Selecione um serviço</option>
              <!-- Populado via script.js -->
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="input-time">Horário desejado</label>
            <input type="text" id="input-time" class="form-input"
                   placeholder="Ex: Segunda às 14h" required>
          </div>

          <div class="form-preview" id="message-preview">
            <span class="form-preview__label">Mensagem que será enviada:</span>
            <p class="form-preview__text" id="preview-text">
              Preencha os campos para ver a prévia...
            </p>
          </div>

          <button type="submit" class="btn btn--whatsapp btn--full">
            <svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Agendar pelo WhatsApp
          </button>
        </form>

      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       § 6 — DEPOIMENTOS
       NÃO ALTERAR ESTRUTURA
  ═══════════════════════════════════════════ -->
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">Depoimentos</span>
        <h2 class="section-title">O que dizem<br>nossos clientes</h2>
      </header>
      <div class="testimonials-grid" id="testimonials-grid">
        <!-- Renderizado via script.js -->
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       § 7 — CTA FINAL
       NÃO ALTERAR ESTRUTURA
  ═══════════════════════════════════════════ -->
  <section id="cta-final" class="cta-final-section">
    <div class="container">
      <div class="cta-final__content reveal">
        <h2 class="cta-final__headline" id="cta-final-headline"></h2>
        <p class="cta-final__sub" id="cta-final-sub"></p>
        <button class="btn btn--primary btn--large" onclick="scrollToBooking()">
          <svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span id="cta-final-btn"></span>
        </button>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       FOOTER
       NÃO ALTERAR ESTRUTURA
  ═══════════════════════════════════════════ -->
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <span class="footer__brand" id="footer-brand"></span>
        <span class="footer__copy" id="footer-copy"></span>
      </div>
    </div>
  </footer>

  <!-- Botão flutuante WhatsApp -->
  <a class="whatsapp-float" id="whatsapp-float" href="#"
     target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </a>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Passo 2: Verificar no browser**

Abrir `barbearia/sites/index.html` diretamente no browser (ou via `python3 -m http.server 8080` na pasta `sites/`).

Esperado: página em branco com estrutura, sem erros no console. Os textos aparecem após a Tarefa 4.

---

## Tarefa 3: styles.css

**Arquivos:**
- Criar: `barbearia/sites/styles.css`

- [ ] **Passo 1: Criar `styles.css` completo**

Criar `/home/arthursimoes/Projetos/Arthur/Clone/barbearia/sites/styles.css`:

```css
/* ═══════════════════════════════════════════════════════
   BARBEARIA TEMPLATE — styles.css
   Estrutura compartilhada. Cores e fontes ficam nos temas.
   NÃO ALTERAR para personalização de clientes.
═══════════════════════════════════════════════════════ */

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
button { cursor: pointer; font-family: inherit; border: none; background: none; }
a { text-decoration: none; color: inherit; }

/* ── Container ── */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

/* ── Section headers ── */
.section-header { margin-bottom: 3rem; }
.section-label {
  font-family: var(--font-label);
  font-size: 0.8rem;
  letter-spacing: 0.35em;
  color: var(--color-accent);
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.75rem;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-text);
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 2rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
}
.btn--primary { background: var(--color-accent); color: var(--color-bg); font-weight: 700; }
.btn--primary:hover { background: var(--color-accent-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
.btn--ghost { background: transparent; color: var(--color-text); border: 1px solid var(--color-border); }
.btn--ghost:hover { border-color: var(--color-accent); color: var(--color-accent); transform: translateY(-2px); }
.btn--whatsapp { background: #25D366; color: #fff; font-weight: 700; }
.btn--whatsapp:hover { background: #1da851; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,211,102,0.3); }
.btn--full { width: 100%; justify-content: center; }
.btn--large { padding: 1.1rem 2.5rem; font-size: 1.05rem; }
.btn__icon { width: 1.2em; height: 1.2em; flex-shrink: 0; }

/* ── Reveal animations ── */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* ─────────────────────────────────────────────
   § 1 — HERO
───────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
  background-image: url('images/hero.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%);
  z-index: 1;
}
.nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.nav__brand { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; }
.nav__tagline { font-family: var(--font-label); font-size: 0.8rem; letter-spacing: 0.25em; color: var(--color-accent); text-transform: uppercase; }
.hero__content {
  position: relative;
  z-index: 5;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 6rem;
}
.hero__label {
  font-family: var(--font-label);
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--color-accent);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}
.hero__label::before { content: ''; width: 2.5rem; height: 1px; background: var(--color-accent); display: block; }
.hero__headline {
  font-family: var(--font-display);
  font-size: clamp(3rem, 9vw, 7rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 1.25rem;
  max-width: 14ch;
}
.hero__headline span, .hero__headline em { display: block; }
.hero__headline em { color: var(--color-accent); font-style: italic; }
.hero__sub { font-size: clamp(1rem, 2vw, 1.15rem); color: var(--color-text-muted); max-width: 38ch; margin-bottom: 2.5rem; line-height: 1.7; }
.hero__actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero__scroll-indicator { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index: 5; }
.hero__scroll-line { width: 1px; height: 3rem; background: linear-gradient(to bottom, var(--color-accent), transparent); animation: scrollPulse 2s ease-in-out infinite; }
@keyframes scrollPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

/* ─────────────────────────────────────────────
   § 2 — PROBLEMA → SOLUÇÃO
───────────────────────────────────────────── */
.ps-section { padding: 5rem 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); background: var(--color-bg-alt); }
.ps-grid { display: flex; align-items: center; gap: 2rem; }
.ps-card { flex: 1; padding: 2rem; }
.ps-card__icon { font-size: 1.5rem; display: block; margin-bottom: 1rem; }
.ps-card--problem .ps-card__icon { color: var(--color-error, #e05555); }
.ps-card--solution .ps-card__icon { color: var(--color-accent); }
.ps-card--problem p { color: var(--color-text-muted); }
.ps-card--solution p { color: var(--color-text); }
.ps-card p { font-size: clamp(1rem, 2vw, 1.15rem); font-weight: 500; line-height: 1.6; }
.ps-divider { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 0 1rem; flex-shrink: 0; }
.ps-divider__line { width: 1px; min-height: 2rem; flex: 1; background: var(--color-border); }
.ps-divider__arrow { font-size: 1.5rem; color: var(--color-accent); font-weight: 700; }

/* ─────────────────────────────────────────────
   § 3 — GALERIA
───────────────────────────────────────────── */
.gallery-section { padding: 6rem 0; background: var(--color-bg-alt); }
.gallery-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-auto-rows: 220px; gap: 8px; }
.gallery-item:nth-child(1) { grid-row: span 2; }
.gallery-item:nth-child(4) { grid-column: span 2; }
.gallery-item { overflow: hidden; border-radius: var(--radius); background: var(--color-bg-surface); position: relative; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.gallery-item:hover img { transform: scale(1.08); }
.gallery-item__placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); font-family: var(--font-label); font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; }

/* ─────────────────────────────────────────────
   § 4 — SERVIÇOS
───────────────────────────────────────────── */
.services-section { padding: 6rem 0; background: var(--color-bg); }
.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
.service-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--color-accent); transform: scaleX(0); transition: transform 0.3s ease; transform-origin: left; }
.service-card:hover, .service-card--active { border-color: var(--color-accent); background: var(--color-bg-surface-hover, var(--color-bg-surface)); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }
.service-card:hover::before, .service-card--active::before { transform: scaleX(1); }
.service-card--highlight { background: var(--color-bg-surface-highlight, var(--color-bg-surface)); border-color: var(--color-border-highlight, var(--color-border)); }
.service-card__badge { display: inline-block; background: var(--color-accent); color: var(--color-bg); font-family: var(--font-label); font-size: 0.7rem; letter-spacing: 0.1em; padding: 0.2rem 0.6rem; border-radius: 2px; margin-bottom: 1rem; text-transform: uppercase; }
.service-card__name { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-text); }
.service-card__desc { font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.25rem; line-height: 1.5; }
.service-card__footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--color-border); }
.service-card__price { font-family: var(--font-label); font-size: 1.3rem; color: var(--color-accent); letter-spacing: 0.05em; }
.service-card__duration { font-size: 0.8rem; color: var(--color-text-muted); font-family: var(--font-label); letter-spacing: 0.1em; }

/* ─────────────────────────────────────────────
   § 5 — AGENDAMENTO
───────────────────────────────────────────── */
.booking-section { padding: 6rem 0; background: var(--color-bg-alt); }
.booking-wrapper { display: grid; grid-template-columns: 1fr 1.3fr; gap: 5rem; align-items: start; }
.booking-info .section-title { margin-top: 0.5rem; margin-bottom: 2rem; }
.booking-hours, .booking-address { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem; color: var(--color-text-muted); font-size: 0.95rem; }
.booking-hours::before { content: '⏰'; }
.booking-address::before { content: '📍'; }
.booking-form { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: calc(var(--radius) * 2); padding: 2rem; }
.form-group { margin-bottom: 1.5rem; }
.form-label { display: block; font-family: var(--font-label); font-size: 0.75rem; letter-spacing: 0.25em; color: var(--color-accent); text-transform: uppercase; margin-bottom: 0.5rem; }
.form-input { width: 100%; background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius); color: var(--color-text); font-family: var(--font-body); font-size: 1rem; padding: 0.85rem 1rem; transition: border-color 0.3s ease, box-shadow 0.3s ease; appearance: none; }
.form-input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-focus); }
.form-input::placeholder { color: var(--color-text-muted); }
.form-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; cursor: pointer; }
.form-select option { background: var(--color-bg-alt); color: var(--color-text); }
.form-preview { background: var(--color-bg-preview); border: 1px solid var(--color-border-preview); border-radius: var(--radius); padding: 1rem; margin-bottom: 1.5rem; }
.form-preview__label { display: block; font-family: var(--font-label); font-size: 0.7rem; letter-spacing: 0.2em; color: var(--color-accent); text-transform: uppercase; margin-bottom: 0.5rem; }
.form-preview__text { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.7; white-space: pre-line; }

/* ─────────────────────────────────────────────
   § 6 — DEPOIMENTOS
───────────────────────────────────────────── */
.testimonials-section { padding: 6rem 0; background: var(--color-bg); }
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.testimonial-card { background: var(--color-bg-surface); border: 1px solid var(--color-border); border-radius: var(--radius); padding: 1.75rem; position: relative; overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease; }
.testimonial-card:hover { transform: translateY(-4px); border-color: var(--color-border-hover); }
.testimonial-card__quote { position: absolute; top: -0.5rem; left: 1rem; font-family: var(--font-display); font-size: 6rem; color: var(--color-accent); opacity: 0.08; line-height: 1; pointer-events: none; user-select: none; }
.testimonial-card__stars { display: flex; gap: 0.2rem; margin-bottom: 1rem; }
.star { color: var(--color-accent); font-size: 0.85rem; }
.testimonial-card__text { font-size: 0.95rem; line-height: 1.7; color: var(--color-text); margin-bottom: 1.25rem; position: relative; z-index: 1; }
.testimonial-card__name { font-family: var(--font-label); font-size: 0.8rem; letter-spacing: 0.1em; color: var(--color-accent); text-transform: uppercase; display: flex; align-items: center; gap: 0.5rem; }
.testimonial-card__name::before { content: ''; width: 1.5rem; height: 1px; background: var(--color-accent); display: block; }

/* ─────────────────────────────────────────────
   § 7 — CTA FINAL
───────────────────────────────────────────── */
.cta-final-section { position: relative; padding: 8rem 0; background: var(--color-bg-alt); border-top: 1px solid var(--color-border); overflow: hidden; }
.cta-final-section::before { content: 'AGENDA'; position: absolute; font-family: var(--font-label); font-size: clamp(8rem, 22vw, 18rem); color: var(--color-text); opacity: 0.02; top: 50%; left: 50%; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; z-index: 0; letter-spacing: -0.05em; }
.cta-final__content { position: relative; z-index: 1; text-align: center; max-width: 650px; margin: 0 auto; }
.cta-final__headline { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; line-height: 1.1; margin-bottom: 1rem; color: var(--color-text); }
.cta-final__sub { font-size: 1.1rem; color: var(--color-text-muted); margin-bottom: 2.5rem; }

/* ── Footer ── */
.footer { padding: 2rem 0; border-top: 1px solid var(--color-border); background: var(--color-bg); }
.footer__content { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.footer__brand { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; }
.footer__copy { font-size: 0.85rem; color: var(--color-text-muted); }

/* ── WhatsApp float ── */
.whatsapp-float { position: fixed; bottom: 2rem; right: 2rem; width: 3.5rem; height: 3.5rem; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(37,211,102,0.4); z-index: 100; transition: all 0.3s ease; animation: floatPulse 3s ease-in-out infinite; }
.whatsapp-float svg { width: 1.6rem; height: 1.6rem; color: #fff; }
.whatsapp-float:hover { transform: scale(1.1); box-shadow: 0 8px 30px rgba(37,211,102,0.5); animation: none; }
@keyframes floatPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }

/* ── Responsivo ── */
@media (max-width: 900px) { .booking-wrapper { grid-template-columns: 1fr; gap: 3rem; } }
@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: 1fr 1fr; grid-auto-rows: 160px; }
  .gallery-item:nth-child(1), .gallery-item:nth-child(4) { grid-row: unset; grid-column: unset; }
  .ps-grid { flex-direction: column; }
  .ps-divider { flex-direction: row; width: 100%; }
  .ps-divider__line { flex: 1; min-height: unset; height: 1px; }
  .ps-divider__arrow { transform: rotate(90deg); }
}
@media (max-width: 600px) {
  .hero__actions { flex-direction: column; }
  .hero__actions .btn { width: 100%; justify-content: center; }
  .nav__tagline { display: none; }
  .services-grid { grid-template-columns: 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .footer__content { flex-direction: column; text-align: center; }
}
```

- [ ] **Passo 2: Verificar estrutura no browser**

Abrir `index.html` — a página deve ter layout estruturado mas sem cores (fundo transparente/branco, sem fontes customizadas). Sem erros no console.

---

## Tarefa 4: script.js

**Arquivos:**
- Criar: `barbearia/sites/script.js`

- [ ] **Passo 1: Criar `script.js` completo**

Criar `/home/arthursimoes/Projetos/Arthur/Clone/barbearia/sites/script.js`:

```js
/* ═══════════════════════════════════════════════════════
   BARBEARIA TEMPLATE — script.js
   Renderiza conteúdo do CONFIG e controla interações.
   NÃO ALTERAR para personalização de clientes.
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Helpers ─────────────────────────────────────────────────
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
  }

  function buildMessage(name, service, time) {
    return 'Olá, meu nome é ' + (name || '(nome)') + '.\n' +
           'Quero agendar: ' + (service || '(serviço)') + '\n' +
           'Horário desejado: ' + (time || '(horário)');
  }

  // ── Fallback de galeria (chamado pelo onerror inline) ────────
  window.galleryFallback = function (img, index) {
    img.parentElement.innerHTML =
      '<div class="gallery-item__placeholder">Foto ' + index + '</div>';
  };

  // ── Render: textos estáticos ─────────────────────────────────
  function renderContent() {
    document.title = CONFIG.businessName || '';
    setText('nav-brand',          CONFIG.businessName);
    setText('nav-tagline',        CONFIG.tagline || '');
    setText('hero-label',         CONFIG.businessName);
    setText('hero-headline-1',    CONFIG.headline || '');
    setText('hero-headline-2',    CONFIG.headlineAccent || '');
    setText('hero-sub',           CONFIG.subheadline || '');
    setText('btn-cta-primary',    CONFIG.ctaPrimary   || 'Agendar agora');
    setText('btn-cta-secondary',  CONFIG.ctaSecondary || 'Ver serviços');
    setText('problem-text',       CONFIG.problemText  || '');
    setText('solution-text',      CONFIG.solutionText || '');
    setText('booking-hours',      CONFIG.hours   || '');
    setText('booking-address',    CONFIG.address || '');
    setText('cta-final-headline', CONFIG.ctaFinalHeadline || '');
    setText('cta-final-sub',      CONFIG.ctaFinalSub     || '');
    setText('cta-final-btn',      CONFIG.ctaPrimary      || 'Agendar agora');
    setText('footer-brand',       CONFIG.businessName);
    setText('footer-copy',        '© ' + new Date().getFullYear() + ' ' +
      CONFIG.businessName + '. ' + (CONFIG.footerText || 'Todos os direitos reservados.'));
  }

  // ── Render: galeria ──────────────────────────────────────────
  function renderGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid || !CONFIG.gallery || !CONFIG.gallery.length) return;
    grid.innerHTML = CONFIG.gallery.map(function (src, i) {
      return '<div class="gallery-item reveal reveal-delay-' + ((i % 4) + 1) + '">' +
        '<img src="' + src + '" alt="Foto ' + (i + 1) + '" loading="lazy" ' +
        'onerror="galleryFallback(this,' + (i + 1) + ')">' +
        '</div>';
    }).join('');
  }

  // ── Render: serviços ─────────────────────────────────────────
  function renderServices() {
    var grid   = document.getElementById('services-grid');
    var select = document.getElementById('input-service');
    if (!grid || !CONFIG.services) return;

    grid.innerHTML = CONFIG.services.map(function (s, i) {
      var safeName = s.name.replace(/'/g, "\\'");
      return '<div class="service-card reveal reveal-delay-' + ((i % 4) + 1) +
        (s.highlight ? ' service-card--highlight' : '') +
        '" data-service="' + s.name + '" onclick="selectService(this,\'' + safeName + '\')">' +
        (s.highlight ? '<span class="service-card__badge">Mais popular</span>' : '') +
        '<h3 class="service-card__name">' + s.name + '</h3>' +
        '<p class="service-card__desc">' + s.description + '</p>' +
        '<div class="service-card__footer">' +
        '<span class="service-card__price">' + (s.price || '') + '</span>' +
        '<span class="service-card__duration">' + (s.duration || '') + '</span>' +
        '</div></div>';
    }).join('');

    if (select) {
      select.innerHTML = '<option value="">Selecione um serviço</option>' +
        CONFIG.services.map(function (s) {
          return '<option value="' + s.name + '">' + s.name +
            (s.price ? ' — ' + s.price : '') + '</option>';
        }).join('');
      select.addEventListener('change', function () {
        updateCardSelection(this.value);
        updatePreview();
      });
    }
  }

  // ── Render: depoimentos ──────────────────────────────────────
  function renderTestimonials() {
    var grid = document.getElementById('testimonials-grid');
    if (!grid || !CONFIG.testimonials) return;
    grid.innerHTML = CONFIG.testimonials.map(function (t, i) {
      var stars = Array(t.rating || 5).fill('<span class="star">★</span>').join('');
      return '<div class="testimonial-card reveal reveal-delay-' + ((i % 3) + 1) + '">' +
        '<div class="testimonial-card__quote" aria-hidden="true">"</div>' +
        '<div class="testimonial-card__stars" aria-label="' + (t.rating || 5) + ' estrelas">' + stars + '</div>' +
        '<p class="testimonial-card__text">' + t.text + '</p>' +
        '<span class="testimonial-card__name">' + t.name + '</span>' +
        '</div>';
    }).join('');
  }

  // ── Seleção de serviço ───────────────────────────────────────
  window.selectService = function (card, serviceName) {
    document.querySelectorAll('.service-card').forEach(function (c) {
      c.classList.remove('service-card--active');
    });
    card.classList.add('service-card--active');
    var select = document.getElementById('input-service');
    if (select) select.value = serviceName;
    updatePreview();
    setTimeout(scrollToBooking, 300);
  };

  function updateCardSelection(serviceName) {
    document.querySelectorAll('.service-card').forEach(function (c) {
      c.classList.toggle('service-card--active', c.dataset.service === serviceName);
    });
  }

  // ── Prévia da mensagem ───────────────────────────────────────
  function updatePreview() {
    var name    = (document.getElementById('input-name')    || {}).value || '';
    var service = (document.getElementById('input-service') || {}).value || '';
    var time    = (document.getElementById('input-time')    || {}).value || '';
    var preview = document.getElementById('preview-text');
    if (!preview) return;
    if (!name && !service && !time) {
      preview.textContent = 'Preencha os campos para ver a prévia...';
      return;
    }
    preview.textContent = buildMessage(name, service, time);
  }

  // ── Envio WhatsApp ───────────────────────────────────────────
  window.handleBooking = function (e) {
    e.preventDefault();
    var name    = document.getElementById('input-name').value.trim();
    var service = document.getElementById('input-service').value;
    var time    = document.getElementById('input-time').value.trim();
    if (!name || !service || !time) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    var msg = buildMessage(name, service, time);
    window.open(
      'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(msg),
      '_blank', 'noopener'
    );
  };

  // ── Botão float WhatsApp ─────────────────────────────────────
  function setupFloat() {
    var btn = document.getElementById('whatsapp-float');
    if (btn) btn.href = 'https://wa.me/' + CONFIG.whatsappNumber;
  }

  // ── Scroll helpers ───────────────────────────────────────────
  window.scrollToBooking = function () {
    var el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  window.scrollToServices = function () {
    var el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Reveal on scroll ─────────────────────────────────────────
  function setupReveal() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    renderContent();
    renderGallery();
    renderServices();
    renderTestimonials();
    setupFloat();

    var liveFields = ['input-name', 'input-time'];
    liveFields.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', updatePreview);
    });

    updatePreview();

    requestAnimationFrame(function () {
      setTimeout(setupReveal, 50);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
```

- [ ] **Passo 2: Testar no browser (servindo local)**

```bash
cd /home/arthursimoes/Projetos/Arthur/Clone/barbearia/sites
python3 -m http.server 8080
```

Abrir `http://localhost:8080`. A página aparece sem tema (fundo branco/transparente) porque nenhum arquivo de tema existe ainda — isso é esperado.

Verificar no console do browser:
- Sem erros de JS
- Os textos do CONFIG aparecem nos elementos corretos
- Os cards de serviço renderizam
- Os depoimentos renderizam

---

## Tarefa 5: Tema A — luxury-dark.css

**Arquivos:**
- Criar: `barbearia/sites/themes/luxury-dark.css`

- [ ] **Passo 1: Criar `luxury-dark.css`**

Criar `/home/arthursimoes/Projetos/Arthur/Clone/barbearia/sites/themes/luxury-dark.css`:

```css
/* ═══════════════════════════════════════════════════════
   TEMA A — LUXURY DARK
   Preto quente + dourado + tipografia editorial serif
   Ativa via: ?theme=a  (padrão quando sem param)
═══════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

:root {
  --color-bg:                    #0a0807;
  --color-bg-alt:                #141210;
  --color-bg-surface:            #1a1816;
  --color-bg-surface-hover:      rgba(200, 169, 110, 0.05);
  --color-bg-surface-highlight:  rgba(200, 169, 110, 0.08);
  --color-bg-preview:            rgba(200, 169, 110, 0.05);
  --color-accent:                #c8a96e;
  --color-accent-hover:          #9a7a4a;
  --color-accent-focus:          rgba(200, 169, 110, 0.12);
  --color-text:                  #f5f0e8;
  --color-text-muted:            #8a8480;
  --color-border:                #2a2724;
  --color-border-highlight:      rgba(200, 169, 110, 0.35);
  --color-border-hover:          rgba(200, 169, 110, 0.3);
  --color-border-preview:        rgba(200, 169, 110, 0.15);
  --color-error:                 #e05555;
  --font-display:                'Playfair Display', Georgia, serif;
  --font-body:                   'DM Sans', system-ui, sans-serif;
  --font-label:                  'Bebas Neue', Arial Narrow, sans-serif;
  --radius:                      4px;
}
```

- [ ] **Passo 2: Testar tema A**

Com o servidor rodando (`python3 -m http.server 8080` na pasta `sites/`):
- Abrir `http://localhost:8080` → deve aparecer com fundo preto e texto dourado
- Abrir `http://localhost:8080?theme=a` → mesmo resultado
- Verificar: fontes Playfair Display nos headings, Bebas Neue nos labels
- Testar mobile (DevTools → 375px): layout responsivo funciona

---

## Tarefa 6: Tema B — bold-industrial.css

**Arquivos:**
- Criar: `barbearia/sites/themes/bold-industrial.css`

- [ ] **Passo 1: Criar `bold-industrial.css`**

Criar `/home/arthursimoes/Projetos/Arthur/Clone/barbearia/sites/themes/bold-industrial.css`:

```css
/* ═══════════════════════════════════════════════════════
   TEMA B — BOLD INDUSTRIAL
   Azul escuro + vermelho + tipografia condensada caps
   Ativa via: ?theme=b
═══════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

:root {
  --color-bg:                    #0f172a;
  --color-bg-alt:                #1e293b;
  --color-bg-surface:            #1e293b;
  --color-bg-surface-hover:      rgba(239, 68, 68, 0.06);
  --color-bg-surface-highlight:  rgba(239, 68, 68, 0.09);
  --color-bg-preview:            rgba(239, 68, 68, 0.05);
  --color-accent:                #ef4444;
  --color-accent-hover:          #b91c1c;
  --color-accent-focus:          rgba(239, 68, 68, 0.12);
  --color-text:                  #f8fafc;
  --color-text-muted:            #94a3b8;
  --color-border:                #334155;
  --color-border-highlight:      rgba(239, 68, 68, 0.4);
  --color-border-hover:          rgba(239, 68, 68, 0.4);
  --color-border-preview:        rgba(239, 68, 68, 0.15);
  --color-error:                 #f87171;
  --font-display:                'Barlow Condensed', Arial Narrow, sans-serif;
  --font-body:                   'Barlow', system-ui, sans-serif;
  --font-label:                  'Barlow Condensed', Arial Narrow, sans-serif;
  --radius:                      2px;
}

/* Personalidade industrial: caps nos headings e botões */
.hero__headline em   { font-style: normal; text-transform: uppercase; letter-spacing: -0.02em; }
.section-title       { text-transform: uppercase; letter-spacing: -0.01em; }
.service-card__name  { text-transform: uppercase; font-size: 1.2rem; letter-spacing: 0.02em; font-family: var(--font-display); }
.cta-final__headline { text-transform: uppercase; letter-spacing: -0.02em; }
.btn--primary        { text-transform: uppercase; letter-spacing: 0.08em; }
.nav__brand          { text-transform: uppercase; letter-spacing: 0.1em; font-family: var(--font-label); }

/* Linha de acento no topo do hero */
.hero::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), #f97316);
  z-index: 10;
}
```

- [ ] **Passo 2: Testar tema B**

- Abrir `http://localhost:8080?theme=b`
- Verificar: fundo azul escuro, acento vermelho, tipografia condensada e maiúscula
- Linha vermelha no topo da página
- Verificar mobile

---

## Tarefa 7: Tema C — clean-minimal.css

**Arquivos:**
- Criar: `barbearia/sites/themes/clean-minimal.css`

- [ ] **Passo 1: Criar `clean-minimal.css`**

Criar `/home/arthursimoes/Projetos/Arthur/Clone/barbearia/sites/themes/clean-minimal.css`:

```css
/* ═══════════════════════════════════════════════════════
   TEMA C — CLEAN MINIMAL
   Fundo claro + verde escuro + tipografia moderna leve
   Ativa via: ?theme=c
═══════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

:root {
  --color-bg:                    #fafaf9;
  --color-bg-alt:                #f5f4f0;
  --color-bg-surface:            #ffffff;
  --color-bg-surface-hover:      rgba(22, 101, 52, 0.04);
  --color-bg-surface-highlight:  rgba(22, 101, 52, 0.06);
  --color-bg-preview:            rgba(22, 101, 52, 0.04);
  --color-accent:                #166534;
  --color-accent-hover:          #14532d;
  --color-accent-focus:          rgba(22, 101, 52, 0.12);
  --color-text:                  #1c1917;
  --color-text-muted:            #78716c;
  --color-border:                #e7e5e4;
  --color-border-highlight:      rgba(22, 101, 52, 0.3);
  --color-border-hover:          rgba(22, 101, 52, 0.3);
  --color-border-preview:        rgba(22, 101, 52, 0.15);
  --color-error:                 #dc2626;
  --font-display:                'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body:                   'Plus Jakarta Sans', system-ui, sans-serif;
  --font-label:                  'Plus Jakarta Sans', system-ui, sans-serif;
  --radius:                      8px;
}

/* Personalidade minimal: overlay claro, elementos arredondados */
.hero__overlay {
  background: linear-gradient(160deg,
    rgba(250,250,249,0.93) 0%,
    rgba(250,250,249,0.65) 50%,
    rgba(250,250,249,0.96) 100%);
}
.hero__headline span       { color: var(--color-text); }
.hero__headline em         { color: var(--color-accent); font-style: normal; font-weight: 800; }
.nav__brand                { color: var(--color-text); }
.section-label             { font-weight: 600; font-size: 0.75rem; }
.service-card__name        { font-weight: 700; }
.btn                       { border-radius: 24px; }
.service-card              { border-radius: 12px; }
.booking-form              { border-radius: 16px; }
.testimonial-card          { border-radius: 12px; }
.service-card__badge       { border-radius: 12px; }
```

- [ ] **Passo 2: Testar tema C**

- Abrir `http://localhost:8080?theme=c`
- Verificar: fundo claro, verde escuro, fontes arredondadas, botões com pill shape
- O overlay do hero deve ser claro (página legível com foto de fundo)
- Verificar mobile

- [ ] **Passo 3: Commit dos 3 temas + todos os arquivos**

```bash
cd /home/arthursimoes/Projetos/Arthur/Clone
git add barbearia/sites/
git commit -m "adiciona template base de barbearia com 3 temas (luxury-dark, bold-industrial, clean-minimal)"
```

---

## Tarefa 8: GitHub + Vercel

**Pré-requisito:** `gh` CLI instalado e autenticado (`gh auth status`).

- [ ] **Passo 1: Criar repositório no GitHub**

```bash
cd /home/arthursimoes/Projetos/Arthur/Clone
gh repo create barbearia-template --public --source=. --remote=origin --push
```

Esperado: repositório criado e código enviado. URL retornada pela CLI.

- [ ] **Passo 2: Verificar repositório**

```bash
gh repo view --web
```

Confirmar que os arquivos estão em `barbearia/sites/` no GitHub.

- [ ] **Passo 3: Criar projeto no Vercel**

Acessar [vercel.com/new](https://vercel.com/new), importar o repositório `barbearia-template`.

Configurações no Vercel:
- **Root Directory:** `barbearia/sites`
- **Framework Preset:** Other
- **Build Command:** *(deixar vazio)*
- **Output Directory:** *(deixar vazio — serve a raiz)*

Clicar em **Deploy**.

- [ ] **Passo 4: Testar os 3 temas na URL pública**

Após o deploy, testar as 3 URLs:
- `https://barbearia-template.vercel.app/?theme=a` → luxury dark (preto + dourado)
- `https://barbearia-template.vercel.app/?theme=b` → bold industrial (azul + vermelho)
- `https://barbearia-template.vercel.app/?theme=c` → clean minimal (claro + verde)

Verificar em mobile (DevTools ou celular real).

---

## Self-Review

**Cobertura do spec:**
- ✅ § 1 Hero — Tarefa 2 (HTML) + Tarefa 3 (CSS) + Tarefa 4 (JS) + Tarefas 5–7 (temas)
- ✅ § 2 Problema → Solução — textos ajustados no config.js (Tarefa 1)
- ✅ § 3 Galeria — grid assimétrico com fallback (Tarefa 3 CSS + Tarefa 4 JS)
- ✅ § 4 Serviços — cards clicáveis com auto-preenchimento (Tarefa 4 JS)
- ✅ § 5 Formulário + WhatsApp — prévia em tempo real + link wa.me (Tarefa 4 JS)
- ✅ § 6 Depoimentos — cards com aspas e estrelas (Tarefa 4 JS)
- ✅ § 7 CTA Final — tipografia fantasma + botão (Tarefa 3 CSS)
- ✅ Sistema de temas — 3 arquivos CSS + injeção inline (Tarefas 5–7)
- ✅ GitHub + Vercel — Tarefa 8
- ✅ config.js como único ponto de edição — Tarefa 1

**Consistência de nomes:** IDs no HTML (`nav-brand`, `hero-label`, `services-grid`, etc.) são os mesmos usados em `setText()` e `document.getElementById()` no `script.js`. Classes CSS em `styles.css` (.service-card, .gallery-item, etc.) são as mesmas geradas pelo `script.js`. ✅

**Sem placeholders:** Todo código está completo e pronto para implementar. ✅
