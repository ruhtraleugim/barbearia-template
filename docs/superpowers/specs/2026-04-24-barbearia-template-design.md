# Barbearia Template — Design Spec

**Data:** 2026-04-24
**Contexto:** Template base reutilizável para landing pages de barbearias com agendamento via WhatsApp. Fica em `/Clone/barbearia/sites/`. Clientes reais ficam em `/Freelas/`.

---

## Objetivo

Criar um template que permita gerar uma landing page completa para qualquer barbearia em menos de 30 minutos, alterando apenas `config.js` e as imagens em `/images/`.

---

## Estrutura de Arquivos

```
/Clone/barbearia/sites/
  index.html
  config.js
  script.js
  styles.css              ← reset + estrutura compartilhada
  themes/
    luxury-dark.css       ← ?theme=a (padrão)
    bold-industrial.css   ← ?theme=b
    clean-minimal.css     ← ?theme=c
  images/
    hero.jpg
    1.jpg · 2.jpg · 3.jpg · 4.jpg
```

---

## Sistema de Temas

- Três temas visuais distintos: estética, tipografia e paleta diferentes por tema
- Seleção via query param: `index.html?theme=a`, `?theme=b`, `?theme=c`
- JS injeta `<link rel="stylesheet">` dinamicamente antes de renderizar conteúdo
- Default `a` quando param ausente
- Workflow de apresentação ao cliente: Arthur envia 3 links, cliente escolhe um

### Tema A — Luxury Dark
Fundo preto quente `#0a0807`, dourado `#c8a96e`, tipografia serif (Playfair Display) para headlines, DM Sans para corpo, Bebas Neue para labels. Sensação premium e atemporal.

### Tema B — Bold Industrial
Fundo azul escuro `#1a1a2e`, vermelho `#e63946`. Tipografia toda caps, sem serifa pesada. Urbano, jovem, direto.

### Tema C — Clean Minimal
Fundo claro `#f8f6f1`, verde escuro `#2c5f2e`. Tipografia leve (weight 300/700). Refinado, versátil, acessível.

---

## config.js — Campos

Todo conteúdo editável vive aqui. Nenhum texto fixo no HTML.

```js
const CONFIG = {
  businessName, tagline,
  headline, headlineAccent, subheadline,
  ctaPrimary, ctaSecondary,
  problemText, solutionText,
  whatsappNumber, address, hours,
  ctaFinalHeadline, ctaFinalSub,
  footerText,

  services: [{ name, description, price, duration, highlight }],
  gallery:  ["images/1.jpg", ...],
  testimonials: [{ name, text, rating }]
}
```

---

## Seções da Página (em ordem)

### § 1 — Hero (100vh)
- Background: `images/hero.jpg` com overlay escuro gradiente
- Nav: `businessName` (esquerda) + `tagline` (direita)
- Label: `businessName` com linha decorativa antes
- Headline em duas linhas: linha 1 normal, linha 2 italic no accent color
- Subheadline muted abaixo
- 2 CTAs: primário (filled accent) + secundário (ghost border)
- Scroll indicator: linha vertical animada na base

### § 2 — Problema → Solução
- 2 colunas + seta central
- Esquerda (problema): ícone ✕ vermelho + `problemText` muted — fala com dor do cliente final
- Direita (solução): ícone ✓ accent + `solutionText` — resolve a dor E posiciona a barbearia como organizada
- Textos editáveis no config.js para ajuste de tom por cliente

### § 3 — Galeria
- Grid assimétrico: coluna 1 ocupa 2 linhas (foto vertical), colunas 2-3 com fotos menores, foto 4 span 2 colunas na base
- Imagens de `CONFIG.gallery[]` com fallback visual quando arquivo não existe
- Hover: zoom suave na imagem (scale 1.08, transition 0.6s)

### § 4 — Serviços
- Grid de cards (auto-fit, min 220px)
- Cada card: badge "Mais popular" se `highlight: true`, nome, descrição, preço, duração
- Click no card: seleciona (borda accent), preenche o select do formulário automaticamente, scroll suave até o form
- Card ativo: borda dourada + leve background accent

### § 5 — Formulário + WhatsApp
- Layout 2 colunas: info à esquerda (horários, endereço), form à direita
- Campos: Nome (text), Serviço (select — populado do CONFIG), Horário desejado (text)
- Prévia da mensagem em tempo real enquanto usuário digita
- Mensagem gerada:
  ```
  Olá, meu nome é {nome}.
  Quero agendar: {serviço}
  Horário desejado: {horário}
  ```
- Botão verde WhatsApp abre `https://wa.me/{numero}?text={encodedMsg}` em nova aba

### § 6 — Depoimentos
- Grid 3 colunas (auto-fit, min 280px)
- Cada card: aspas decorativas gigantes com opacity 0.08, estrelas, texto, nome com traço antes
- Hover: translateY(-4px)

### § 7 — CTA Final
- Tipografia fantasma "AGENDA" no fundo (opacity 0.02)
- Headline + subtítulo + botão grande (scroll para § 5)

### Footer + Float WhatsApp
- Footer: `businessName` (esquerda) + copyright (direita)
- Botão flutuante WhatsApp fixo no canto inferior direito com animação de pulso

---

## Deploy — GitHub + Vercel

Cada projeto de cliente é um repositório independente no GitHub, derivado do template.

**Workflow:**
1. Template base vive em `github.com/arthur/barbearia-template`
2. Para novo cliente: criar repo `barbearia-{nome}` (cópia manual ou fork)
3. Conectar repo no Vercel → auto-deploy a cada push
4. URL pública: `barbearia-{nome}.vercel.app`
5. Links de apresentação: `barbearia-{nome}.vercel.app/?theme=a`, `?theme=b`, `?theme=c`

Site estático puro — Vercel não precisa de `vercel.json`. Query params são lidos client-side pelo JS.

**Commits:** mensagens em português, agrupados por feature/milestone (sem micro-commits).

---

## script.js — Responsabilidades

1. Ler `?theme=` da URL via inline script no `<head>` (evita FOUC) e injetar `<link>` do tema antes do body renderizar
2. Aplicar todos os textos do CONFIG no DOM (sem texto fixo no HTML)
3. Renderizar `services[]`, `gallery[]`, `testimonials[]` dinamicamente
4. Controlar seleção de cards de serviço + sync com select do form
5. Atualizar prévia da mensagem em tempo real (input listeners)
6. Gerar e abrir link WhatsApp no submit do form
7. Atualizar botão flutuante com número do CONFIG
8. Intersection Observer para revelar elementos no scroll (classe `.reveal → .visible`)

---

## styles.css — Responsabilidades

Apenas estrutura compartilhada entre os 3 temas:
- Reset CSS
- Container e variáveis de espaçamento
- Layout das seções (grid, flex, posicionamento)
- Classes de componentes sem cor (`.btn`, `.service-card`, `.form-input`, etc.)
- Animações estruturais (`.reveal`, `@keyframes scrollPulse`, `@keyframes floatPulse`)
- Responsividade (mobile-first, breakpoints 600px e 900px)

Cores, fontes e personalidade visual ficam exclusivamente nos arquivos de tema.

---

## Regras de Reutilização

Para criar um novo cliente:
1. Copiar `/Clone/barbearia/sites/` para `/Freelas/barbearia-{nome}/`
2. Editar `config.js` com dados do cliente
3. Substituir imagens em `/images/`
4. Apresentar com `?theme=a`, `?theme=b`, `?theme=c`
5. Após escolha, deletar os temas não usados (opcional)

**Nunca alterar** `index.html`, `script.js` ou `styles.css` por cliente.
