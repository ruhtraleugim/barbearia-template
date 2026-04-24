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
