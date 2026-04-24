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
