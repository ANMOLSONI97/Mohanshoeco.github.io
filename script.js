/* =========================================================
   MOHAN SHOE CO. & GARMENTS — script.js
   Vanilla JS only. No dependencies.
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setYear();
    initLoader();
    initHeaderScroll();
    initMobileNav();
    initSearchToggle();
    initDarkMode();
    initRevealOnScroll();
    initFilterTabs();
    initQuickView();
    initTestimonialSlider();
    initCounters();
    initAccordion();
    initBackToTop();
    initContactForm();
    initNewsletterForm();
    initSmoothAnchors();
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Loading screen ---------- */
  function initLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hide');
      }, 350);
    });
    // Fallback in case 'load' already fired
    setTimeout(function () { loader.classList.add('hide'); }, 2500);
  }

  /* ---------- Sticky header shrink/blur state ---------- */
  function initHeaderScroll() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 30) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav + mega menu toggle ---------- */
  function initMobileNav() {
    var btn = document.getElementById('hamburger');
    var nav = document.getElementById('mainNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Collapse mobile menu when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 880) {
          nav.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Mega menu: click-to-toggle on mobile, hover on desktop (handled by CSS)
    var megaParent = nav.querySelector('.has-mega');
    if (megaParent) {
      var trigger = megaParent.querySelector('a');
      trigger.addEventListener('click', function (e) {
        if (window.innerWidth <= 880) {
          e.preventDefault();
          megaParent.classList.toggle('open');
        }
      });
    }
  }

  /* ---------- Search bar toggle ---------- */
  function initSearchToggle() {
    var toggle = document.getElementById('searchToggle');
    var bar = document.getElementById('searchBar');
    var input = document.getElementById('searchInput');
    var form = document.getElementById('searchForm');
    if (!toggle || !bar) return;

    toggle.addEventListener('click', function () {
      var isOpen = bar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) setTimeout(function () { input.focus(); }, 300);
    });

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var term = input.value.trim();
        if (!term) return;
        // No backend: scroll to Featured Collections as the nearest relevant section
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
        bar.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        input.value = '';
      });
    }
  }

  /* ---------- Dark mode toggle ---------- */
  function initDarkMode() {
    var toggle = document.getElementById('darkToggle');
    if (!toggle) return;
    var stored = null;
    try { stored = window.localStorage ? localStorage.getItem('msc-theme') : null; } catch (e) { stored = null; }

    if (stored === 'dark') {
      document.body.classList.add('dark');
      toggle.setAttribute('aria-pressed', 'true');
    }

    toggle.addEventListener('click', function () {
      var isDark = document.body.classList.toggle('dark');
      toggle.setAttribute('aria-pressed', String(isDark));
      try { if (window.localStorage) localStorage.setItem('msc-theme', isDark ? 'dark' : 'light'); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  function initRevealOnScroll() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () { el.classList.add('in-view'); }, (i % 6) * 80);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Featured products filter tabs ---------- */
  function initFilterTabs() {
    var tabs = document.querySelectorAll('.filter-tab');
    var cards = document.querySelectorAll('.product-card');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        var filter = tab.getAttribute('data-filter');
        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-cat') === filter;
          card.classList.toggle('hide', !match);
        });
      });
    });
  }

  /* ---------- Quick View modal ---------- */
  function initQuickView() {
    var modal = document.getElementById('quickViewModal');
    if (!modal) return;
    var closeBtn = document.getElementById('modalClose');
    var img = document.getElementById('qvImg');
    var title = document.getElementById('qvTitle');
    var cat = document.getElementById('qvCat');
    var price = document.getElementById('qvPrice');
    var lastFocused = null;

    document.querySelectorAll('.quick-view-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        img.src = btn.getAttribute('data-img');
        img.alt = btn.getAttribute('data-name');
        title.textContent = btn.getAttribute('data-name');
        cat.textContent = btn.getAttribute('data-cat');
        price.textContent = btn.getAttribute('data-price');
        lastFocused = btn;
        openModal();
      });
    });

    function openModal() {
      modal.hidden = false;
      requestAnimationFrame(function () { modal.classList.add('open'); });
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(function () { modal.hidden = true; }, 300);
      if (lastFocused) lastFocused.focus();
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  /* ---------- Auto-sliding testimonials ---------- */
  function initTestimonialSlider() {
    var track = document.getElementById('testimonialTrack');
    var dotsWrap = document.getElementById('sliderDots');
    if (!track || !dotsWrap) return;

    var slides = track.children;
    var count = slides.length;
    var index = 0;
    var timer;

    for (var i = 0; i < count; i++) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function (idx) {
        return function () { goTo(idx); resetTimer(); };
      }(i));
      dotsWrap.appendChild(dot);
    }
    var dots = dotsWrap.children;

    function goTo(i) {
      index = (i + count) % count;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('active', d === index);
    }

    function next() { goTo(index + 1); }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 4500);
    }

    resetTimer();

    track.parentElement.addEventListener('mouseenter', function () { clearInterval(timer); });
    track.parentElement.addEventListener('mouseleave', resetTimer);
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    var animated = false;

    function animate() {
      if (animated) return;
      animated = true;
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10) || 0;
        var duration = 1600;
        var start = null;

        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString('en-IN');
        }
        requestAnimationFrame(step);
      });
    }

    if (!('IntersectionObserver' in window)) { animate(); return; }
    var wrap = document.querySelector('.counters');
    if (!wrap) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(); obs.disconnect(); }
      });
    }, { threshold: 0.4 });
    obs.observe(wrap);
  }

  /* ---------- FAQ accordion ---------- */
  function initAccordion() {
    var triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(function (trigger) {
      var panel = trigger.nextElementSibling;
      trigger.addEventListener('click', function () {
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';

        // close others
        triggers.forEach(function (t) {
          if (t !== trigger) {
            t.setAttribute('aria-expanded', 'false');
            t.nextElementSibling.style.maxHeight = null;
          }
        });

        trigger.setAttribute('aria-expanded', String(!isOpen));
        panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
      });
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    document.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact form validation ---------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var note = document.getElementById('contactNote');

    var fields = {
      name: { el: document.getElementById('cf-name'), err: document.getElementById('err-name') },
      phone: { el: document.getElementById('cf-phone'), err: document.getElementById('err-phone') },
      email: { el: document.getElementById('cf-email'), err: document.getElementById('err-email') },
      message: { el: document.getElementById('cf-message'), err: document.getElementById('err-message') }
    };

    function validate() {
      var valid = true;

      if (!fields.name.el.value.trim()) {
        setError(fields.name, 'Please enter your name.'); valid = false;
      } else clearError(fields.name);

      var phoneVal = fields.phone.el.value.trim();
      if (!/^[0-9]{10}$/.test(phoneVal)) {
        setError(fields.phone, 'Enter a valid 10-digit phone number.'); valid = false;
      } else clearError(fields.phone);

      var emailVal = fields.email.el.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        setError(fields.email, 'Enter a valid email address.'); valid = false;
      } else clearError(fields.email);

      if (!fields.message.el.value.trim()) {
        setError(fields.message, 'Please write a short message.'); valid = false;
      } else clearError(fields.message);

      return valid;
    }

    function setError(field, msg) {
      field.err.textContent = msg;
      field.el.closest('.form-group').classList.add('invalid');
    }
    function clearError(field) {
      field.err.textContent = '';
      field.el.closest('.form-group').classList.remove('invalid');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        note.textContent = '';
        return;
      }
      // No backend configured — confirm receipt locally.
      note.textContent = 'Thank you! Your message has been noted. We will get back to you shortly.';
      form.reset();
      setTimeout(function () { note.textContent = ''; }, 6000);
    });

    Object.keys(fields).forEach(function (key) {
      fields[key].el.addEventListener('blur', validate);
    });
  }

  /* ---------- Newsletter form ---------- */
  function initNewsletterForm() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;
    var note = document.getElementById('newsletterNote');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        note.textContent = 'Please enter a valid email address.';
        return;
      }
      note.textContent = 'Subscribed! Watch your inbox for new arrivals and offers.';
      form.reset();
      setTimeout(function () { note.textContent = ''; }, 6000);
    });
  }

  /* ---------- Smooth anchor scrolling with header offset ---------- */
  function initSmoothAnchors() {
    var header = document.getElementById('siteHeader');
    var offset = header ? header.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - offset + 1;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

})();
