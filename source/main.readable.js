// Research Reach: sign up routing, section links, booking and every scene

var STUDENT_FORM_URL = 'https://forms.gle/aK2CJZSYnAAkVHnM9';
var LAB_EMAIL = 'patemish@iu.edu';
var LAB_MAILTO = 'mailto:patemish@iu.edu?subject=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0D%0A%0D%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0D%0A%0D%0AName%3A%0D%0ALab%20or%20PI%3A%0D%0ADepartment%3A%0D%0AWhat%20I%20look%20for%20in%20a%20student%3A%0D%0AA%20few%20times%20that%20work%20to%20talk%3A%0D%0A';
var LAB_OUTLOOK = 'https://outlook.office.com/mail/deeplink/compose?to=patemish%40iu.edu&subject=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0A%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0A%0AName%3A%0ALab%20or%20PI%3A%0ADepartment%3A%0AWhat%20I%20look%20for%20in%20a%20student%3A%0AA%20few%20times%20that%20work%20to%20talk%3A%0A';
var LAB_GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=patemish%40iu.edu&su=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0A%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0A%0AName%3A%0ALab%20or%20PI%3A%0ADepartment%3A%0AWhat%20I%20look%20for%20in%20a%20student%3A%0AA%20few%20times%20that%20work%20to%20talk%3A%0A';
var COHORT_LINE = '';
var LAB_PROFILE_URL = '';
var DEPT_OUTLOOK = 'https://outlook.office.com/mail/deeplink/compose?to=patemish%40iu.edu&subject=Bringing%20Research%20Reach%20to%20my%20department&body=Hi%2C%0A%0AI%27d%20like%20to%20talk%20about%20bringing%20Research%20Reach%20to%20my%20department.%0A%0AName%3A%0ARole%3A%0ADepartment%3A%0AA%20few%20times%20that%20work%20to%20talk%3A%0A';

// Paste values to turn these on. Empty means off and nothing loads.
var CLARITY_ID = '';
var CAL_LINK = '';

(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var motion = root.classList.contains('motion');
  var PIN = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
  var STEP = '(max-width: 1023px), (pointer: coarse), (prefers-reduced-motion: reduce)';

  // Links
  $$('[data-link="student"]').forEach(function (a) { a.href = STUDENT_FORM_URL; });
  $$('[data-link="lab"]').forEach(function (a) { a.href = LAB_MAILTO; });
  $$('[data-link="lab-outlook"]').forEach(function (a) { a.href = LAB_PROFILE_URL || LAB_OUTLOOK; });
  if (LAB_PROFILE_URL) $$('.email-only').forEach(function (el) { el.hidden = true; });
  $$('[data-link="lab-gmail"]').forEach(function (a) { a.href = LAB_GMAIL; });
  $$('[data-link="dept-outlook"]').forEach(function (a) { a.href = DEPT_OUTLOOK; });
  $$('[data-print="student"]').forEach(function (el) { el.textContent = STUDENT_FORM_URL.replace(/^https:\/\//, ''); });
  var cohort = $('.cohort-line');
  if (cohort && COHORT_LINE) { cohort.textContent = COHORT_LINE; cohort.hidden = false; }

  // Microsoft Clarity. Loads only when CLARITY_ID is set
  if (CLARITY_ID) {
    (function (c, l, a, r, i) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      var t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      var y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
    var aud = (document.body.getAttribute('data-audience') || 'home');
    window.clarity('set', 'audience', aud);
    $$('[data-cta]').forEach(function (el) {
      el.addEventListener('click', function () { window.clarity('event', 'cta-' + el.getAttribute('data-cta')); });
    });
  }

  // cal.com booking. The booking band and the about.html section ship only when CAL_LINK is set.
  // Buttons open the booking page in a dialog: focus stays inside, Escape closes it and focus returns to the button
  if (CAL_LINK) {
    var calUrl = 'https://cal.com/' + CAL_LINK + '?embed=true&theme=light';
    var track = function (name) { if (window.clarity) window.clarity('event', name); };
    var openCal = function (opener) {
      var pop = document.createElement('div');
      pop.className = 'cal-pop';
      pop.setAttribute('role', 'dialog');
      pop.setAttribute('aria-modal', 'true');
      pop.setAttribute('aria-label', 'Book a call with our team');
      pop.innerHTML = '<div class="cal-pop-box"><div class="cal-pop-bar"><button class="q-btn cal-close" type="button">Close</button></div>' +
        '<iframe title="Booking calendar" src="' + calUrl + '"></iframe></div>';
      document.body.appendChild(pop);
      var closeBtn = $('.cal-close', pop), frame = $('iframe', pop);
      var lastOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      var close = function () {
        document.removeEventListener('keydown', onKey, true);
        document.removeEventListener('focusin', onFocus, true);
        pop.remove();
        document.body.style.overflow = lastOverflow;
        if (opener) opener.focus();
      };
      var onKey = function (e) {
        if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'Tab') {
          var on = document.activeElement;
          if (e.shiftKey && on === closeBtn) { e.preventDefault(); frame.focus(); }
          else if (!e.shiftKey && on === frame) { e.preventDefault(); closeBtn.focus(); }
        }
      };
      var onFocus = function (e) { if (!pop.contains(e.target)) closeBtn.focus(); };
      document.addEventListener('keydown', onKey, true);
      document.addEventListener('focusin', onFocus, true);
      closeBtn.addEventListener('click', close);
      pop.addEventListener('click', function (e) { if (e.target === pop) close(); });
      closeBtn.focus();
      track('cal-open');
    };
    $$('[data-cta="book-call"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) { e.preventDefault(); openCal(btn); });
    });
    // about.html: the inline calendar loads only when the section comes near the screen
    var embed = $('#cal-embed');
    if (embed && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        var f = document.createElement('iframe');
        f.title = 'Booking calendar';
        f.src = calUrl;
        f.loading = 'lazy';
        embed.innerHTML = '';
        embed.appendChild(f);
        track('cal-open-inline');
      }, { rootMargin: '300px 0px' });
      io.observe(embed);
    }
  }

  // Quotes: one at a time with Previous and Next, swipe on touch, no auto advance.
  // Without JavaScript or with reduced motion every quote shows, stacked
  $$('.q-slider').forEach(function (box) {
    var items = $$('.q-item', box);
    if (items.length < 2 || !motion) return;
    var at = 0;
    var show = function (n) {
      at = (n + items.length) % items.length;
      items.forEach(function (it, i) { it.classList.toggle('is-active', i === at); });
    };
    box.classList.add('is-slider');
    show(0);
    $('.q-prev', box).addEventListener('click', function () { show(at - 1); });
    $('.q-next', box).addEventListener('click', function () { show(at + 1); });
    var x0 = null;
    box.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    box.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 48) show(at + (dx < 0 ? 1 : -1));
    });
  });

  // how.html: the timeline line ends at the last step's marker
  var tlWrap = $('.tl-wrap');
  var fitLine = function () {
    if (!tlWrap) return;
    var nodes = $$('.tl-node', tlWrap);
    if (!nodes.length) return;
    var top = tlWrap.getBoundingClientRect().top;
    var first = nodes[0].getBoundingClientRect(), last = nodes[nodes.length - 1].getBoundingClientRect();
    var y0 = first.top + first.height / 2 - top, y1 = last.top + last.height / 2 - top;
    $$('.tl-track, .tl-fill', tlWrap).forEach(function (el) { el.style.top = y0 + 'px'; el.style.bottom = 'auto'; el.style.height = (y1 - y0) + 'px'; });
  };
  fitLine();
  window.addEventListener('resize', fitLine);

  // Header picks up a shadow once the page moves
  var bar = $('.site-header');
  if (bar) {
    var lift = function () { bar.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', lift, { passive: true });
    lift();
  }

  // FAQ: one group of questions at a time. Without JavaScript all three show
  var faqTabs = $$('.faq-tab'), faqPanels = $$('.faq-panel');
  if (faqTabs.length) {
    var pickTab = function (key, focus) {
      faqTabs.forEach(function (t) {
        var on = t.dataset.tab === key;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      faqPanels.forEach(function (p) {
        var on = p.id === 'faq-' + key;
        p.hidden = !on;
        p.classList.toggle('is-shown', on);
        if (on && motion && focus !== undefined) p.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'cubic-bezier(.16,1,.3,1)' });
      });
    };
    var keys = faqTabs.map(function (t) { return t.dataset.tab; });
    var asked = location.hash.slice(1);
    pickTab(keys.indexOf(asked) > -1 ? asked : keys[0]);
    $('.faq-panels').classList.add('is-ready');
    faqTabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pickTab(t.dataset.tab, false); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % keys.length : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i + keys.length - 1) % keys.length : -1;
        if (n > -1) { e.preventDefault(); pickTab(keys[n], true); }
      });
    });
  }

  // Pages always open at the top, and a section link never leaves its #name
  // in the address bar. A link from another page to a section lands once.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var arrival = location.hash && document.getElementById(location.hash.slice(1));
  var cleanUrl = function () { if (location.hash) history.replaceState(null, '', location.pathname + location.search); };
  if (!arrival) { cleanUrl(); window.scrollTo(0, 0); }

  var pins = {};
  var headerSpace = function () {
    var h = $('.site-header');
    return h && getComputedStyle(h).position === 'sticky' ? h.offsetHeight + 32 : 24;
  };
  var topOf = function (el) {
    return Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - headerSpace()));
  };
  var glide = function (el) {
    window.scrollTo({ top: topOf(el), behavior: motion ? 'smooth' : 'auto' });
  };
  $$('a[href^="#"]').forEach(function (a) {
    var t = document.getElementById(a.getAttribute('href').slice(1));
    if (!t) return;
    a.addEventListener('click', function (e) { e.preventDefault(); glide(t); });
  });
  var land = function () {
    if (!arrival) return;
    window.scrollTo(0, topOf(arrival));
    cleanUrl();
    arrival = null;
  };

  if (!window.gsap || !window.ScrollTrigger) {
    // Without the motion library every scene keeps its finished, readable state
    root.classList.remove('js', 'motion');
    $$('.faq-panel').forEach(function (p) { p.hidden = false; });
    window.addEventListener('load', function () { fitLine(); land(); });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  var once = function (el, fn, start) {
    ScrollTrigger.create({ trigger: el, start: start || 'top 85%', once: true, onEnter: fn });
  };
  var idle = function (el, anims) {
    ScrollTrigger.create({
      trigger: el, start: 'top bottom', end: 'bottom top',
      onToggle: function (self) { anims.forEach(function (a) { self.isActive ? a.resume() : a.pause(); }); }
    });
  };

  /* The hero: both applications travel into the Research Reach mark */
  var hero = $('.hero-scene');
  if (hero && motion) (function () {
    var figs = $$('.h-fig', hero), trails = $$('.h-trail', hero), mark = $('.hero-badge', hero);
    var ring = $('.badge-ring', mark), caption = $('.m-caption', hero), tags = $$('.svg-tag', hero);
    var docs = [[$('.doc-s', hero), trails[0]], [$('.doc-p', hero), trails[1]]];
    gsap.set(mark, { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(trails, { opacity: 0 });
    gsap.set([caption].concat(tags), { opacity: 0, y: 8 });
    var p = { t: 0, o: 0 };
    var draw = function () {
      docs.forEach(function (d) {
        var len = d[1].getTotalLength(), pt = d[1].getPointAtLength(len * p.t);
        d[0].setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ') scale(' + (1 - p.t * 0.45).toFixed(3) + ')');
        d[0].setAttribute('opacity', p.o.toFixed(2));
      });
    };
    var flow = gsap.timeline({ repeat: -1, paused: true, onUpdate: draw })
      .fromTo(p, { t: 0, o: 0 }, { o: 1, duration: 0.25 }, 0)
      .to(p, { t: 1, duration: 1.3, ease: 'power1.inOut' }, 0)
      .to(p, { o: 0, duration: 0.2 }, 1.15)
      .fromTo(mark, { scale: 1 }, { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 1.3)
      .fromTo(ring, { opacity: 0.6 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 }, 1.3)
      .to({}, { duration: 1.2 }, 1.7);
    gsap.timeline({ delay: 0.3 })
      .from(figs[0], { x: '-=60', opacity: 0, duration: 0.9, ease: 'expo.out' }, 0)
      .from(figs[1], { x: '+=60', opacity: 0, duration: 0.9, ease: 'expo.out' }, 0)
      .to(tags, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.5)
      .to(mark, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0.7)
      .to(trails, { opacity: 1, duration: 0.5 }, 0.9)
      .to(caption, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 1.2)
      .add(function () { flow.play(); }, 1.4);
    idle(hero, [flow]);
  })();

  /* Questions: closed with JavaScript, open without it. Answers fade in 4 px */
  $$('.faq details').forEach(function (d) {
    if (!motion) return;
    d.open = false;
    var ans = $('.answer', d);
    d.addEventListener('toggle', function () {
      if (d.open) gsap.fromTo(ans, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
    });
  });

  /* How it works: plays 1, 2, 3 on its own and keeps looping. Clicking a step jumps there */
  var how = $('.how');
  if (how && motion) (function () {
    var stage = $('#stage'), scene = $('.scene', stage);
    var tabs = $$('.rail-step', how), texts = $$('.step-text', how), fill = $('.rail-fill', how);
    var status = $('#stage-status');
    var items = $$('.item', scene), fits = items.filter(function (i) { return i.classList.contains('fit'); });
    var misses = items.filter(function (i) { return !i.classList.contains('fit'); });
    var chosen = $('.item.chosen', scene), others = items.filter(function (i) { return i !== chosen; });
    var profG = $('.prof', scene), hold = $('.pose-hold', profG), reach = $('.pose-reach', profG);
    var mail = $('.mail-wrap', scene);
    var tile = function (el) { return $('.tile', el); };
    var told = [
      'Step 1 of 3, Tell us what you look for. The Professor holds a profile of what the lab needs.',
      'Step 2 of 3, We screen every student. Student portraits appear. Four fade out and three that fit are outlined.',
      'Step 3 of 3, Meet only the students who fit. An introduction email from Research Reach lands in the Professor\'s hand.'
    ];
    // Each step builds, then holds so it can be read
    var H = 2.8, B1 = 0, S1 = 0.9, B2 = S1 + H, S2 = B2 + 1.3, B3 = S2 + H, S3 = B3 + 1.4, END = S3 + H;

    var start = function () {
      gsap.set(profG, { x: 320, y: 410, opacity: 0 });
      gsap.set(hold, { opacity: 1 });
      gsap.set(reach, { opacity: 0 });
      gsap.set(mail, { x: 250, y: 214, scale: 0.5, opacity: 0, transformOrigin: '50% 50%' });
      items.forEach(function (it) {
        gsap.set(it, { x: +it.dataset.x, y: +it.dataset.y, scale: 0.8, opacity: 0, transformOrigin: '50% 50%' });
        gsap.set(tile(it), { stroke: '#C9D1DC', strokeWidth: 1.5 });
      });
    };
    start();

    var loop = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: 'power2.inOut' } })
      .add(start, 0)
      .fromTo(scene, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
      .to(profG, { y: 382, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0.1)
      .addLabel('h1', S1)
      .to(profG, { x: 520, duration: 0.5 }, B2)
      .to(items, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'expo.out' }, B2 + 0.1)
      .to(misses, { opacity: 0.25, duration: 0.4 }, B2 + 0.7)
      .to(fits.map(tile), { stroke: '#185FA5', strokeWidth: 3, duration: 0.3 }, B2 + 0.8)
      .addLabel('h2', S2)
      .to(others, { opacity: 0, duration: 0.35 }, B3)
      .to(chosen, { x: 202, y: 230, scale: 1.1, duration: 0.45 }, B3 + 0.1)
      .to(chosen, { opacity: 0, duration: 0.2 }, B3 + 0.5)
      .to(mail, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.4)' }, B3 + 0.45)
      .to(profG, { x: 500, duration: 0.45 }, B3 + 0.2)
      .to(hold, { opacity: 0, duration: 0.25 }, B3 + 0.35)
      .to(reach, { opacity: 1, duration: 0.25 }, B3 + 0.35)
      .to(mail, { x: 318, y: 206, duration: 0.6 }, B3 + 0.95)
      .addLabel('h3', S3)
      .to(scene, { opacity: 0, duration: 0.4 }, END - 0.4);

    var current = 0;
    var stepAt = function (t) { return t < B2 ? 1 : t < B3 ? 2 : 3; };
    var horizontal = function () { return window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches; };
    var show = function (n) {
      if (n === current) return;
      current = n;
      tabs.forEach(function (t, i) {
        var on = i + 1 === n;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        t.classList.toggle('is-done', i + 1 < n);
      });
      texts.forEach(function (el, i) {
        var on = i + 1 === n;
        el.classList.toggle('is-active', on);
        if (on) gsap.fromTo(el, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: true });
      });
      stage.setAttribute('aria-labelledby', 'tab-' + n);
    };
    loop.eventCallback('onUpdate', function () {
      var t = loop.time();
      show(stepAt(t));
      var prog = t < S1 ? t / S1 / 3 : t < B2 ? 1 / 3 : t < S2 ? 1 / 3 + (t - B2) / (S2 - B2) / 3 : t < B3 ? 2 / 3 : Math.min(1, 2 / 3 + (t - B3) / (S3 - B3) / 3);
      gsap.set(fill, horizontal() ? { scaleX: prog, scaleY: 1 } : { scaleY: prog, scaleX: 1 });
    });

    // Picking a step jumps to it and the loop carries on from there
    var goTo = function (n, focus) {
      n = Math.max(1, Math.min(3, n));
      loop.seek('h' + n, false);
      loop.play();
      show(stepAt(loop.time()));
      status.textContent = told[n - 1];
      if (focus) tabs[n - 1].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { goTo(i + 1); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowDown' || k === 'ArrowRight') n = current === 3 ? 1 : current + 1;
        else if (k === 'ArrowUp' || k === 'ArrowLeft') n = current === 1 ? 3 : current - 1;
        else if (k === 'Home') n = 1;
        else if (k === 'End') n = 3;
        if (n) { e.preventDefault(); goTo(n, true); }
      });
    });

    show(1);
    ScrollTrigger.create({
      trigger: how, start: 'top 80%', end: 'bottom top',
      onToggle: function (self) { self.isActive ? loop.play() : loop.pause(); }
    });
  })();

  /* The closing panel: the Student and the Professor reach for each other */
  var closing = $('.closing-art');
  if (closing) (function () {
    var st = $('.cast-student', closing), pr = $('.cast-prof', closing);
    var line = $('.cast-line', closing), glow = $('.cast-glow', closing);
    var tl = null, trig = null;
    var build = function () {
      var w = Math.round(closing.getBoundingClientRect().width) || 1200;
      var h = Math.round(closing.getBoundingClientRect().height) || 340;
      closing.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      var s = w < 768 ? 0.3 : 0.44, g = Math.min(300, w * 0.3), feet = h - 10;
      var sx = w / 2 - g, px = w / 2 + g;
      $$('.cast-scale', closing).forEach(function (el) { el.setAttribute('transform', 'scale(' + s + ')'); });
      var hx1 = sx + 210 * s, hx2 = px - 210 * s, hy = feet - 440 * s, cx = w / 2, my = hy - 8;
      var r = w < 768 ? 28 : 40, gap = r + 8;
      var d = 'M' + hx1 + ' ' + hy + 'C' + (hx1 + 30) + ' ' + (my - 4) + ' ' + (cx - gap - 20) + ' ' + my + ' ' + (cx - gap) + ' ' + my +
              'M' + hx2 + ' ' + hy + 'C' + (hx2 - 30) + ' ' + (my - 4) + ' ' + (cx + gap + 20) + ' ' + my + ' ' + (cx + gap) + ' ' + my;
      line.setAttribute('d', d);
      $('.cast-mark', closing).setAttribute('transform', 'translate(' + cx + ' ' + my + ') scale(' + (r / 40) + ')');
      if (tl) tl.kill();
      if (trig) trig.kill();
      gsap.set(st, { x: sx, y: feet }); gsap.set(pr, { x: px, y: feet });
      if (!motion) return;
      var far = w * 0.22 + 80;
      tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
        .fromTo(st, { x: sx - far, opacity: 0 }, { x: sx, opacity: 1, duration: 1 }, 0)
        .fromTo(pr, { x: px + far, opacity: 0 }, { x: px, opacity: 1, duration: 1 }, 0)
        .fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, 1.05)
        .fromTo(glow, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' }, 0.85);
      if (window.matchMedia(PIN).matches) {
        trig = ScrollTrigger.create({ trigger: closing.parentNode, start: 'top 90%', end: 'bottom 70%', scrub: 0.8, animation: tl });
      } else {
        trig = ScrollTrigger.create({ trigger: closing, start: 'top 85%', once: true, onEnter: function () { tl.play(); } });
      }
    };
    build();
    var cw = closing.getBoundingClientRect().width;
    window.addEventListener('resize', function () {
      var w = closing.getBoundingClientRect().width;
      if (Math.abs(w - cw) < 2) return;
      cw = w; build();
    });
  })();

  /* About */
  var cast = $('.cast');
  if (cast && motion) (function () {
    var figs = $$('.cast-wave', cast);
    gsap.from(figs, { y: '+=40', opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.15, delay: 0.2 });
    var loops = $$('.breathe', cast).map(function (b, i) {
      return gsap.to(b, { scaleY: 1.015, transformOrigin: '50% 100%', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.6 });
    });
    idle(cast, loops);
  })();

  if (motion) {
    $$('.read').forEach(function (p) {
      if (p.getBoundingClientRect().top < window.innerHeight) return;
      gsap.set(p, { y: 16, opacity: 0 });
      once(p, function () { gsap.to(p, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }); }, 'top 88%');
    });
    $$('.founder').forEach(function (f) {
      var shutter = $('.founder-shutter', f), facts = $$('.founder-text > *, .founder-facts div', f);
      gsap.set(shutter, { scaleY: 1 });
      gsap.set(facts, { y: 16, opacity: 0 });
      once(f, function () {
        gsap.timeline()
          .to(shutter, { scaleY: 0, duration: 0.8, ease: 'expo.inOut' })
          .to(facts, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.06 }, 0.45);
      }, 'top 80%');
    });
    var rows = $$('.value-row');
    if (rows.length) {
      gsap.set(rows, { x: -24, opacity: 0 });
      once($('.value-list'), function () { gsap.to(rows, { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.12 }); });
    }
    $$('.lane-list').forEach(function (list) {
      var lane = $$('li', list);
      gsap.set(lane, { x: -24, opacity: 0 });
      once(list, function () { gsap.to(lane, { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.1 }); });
    });
    $$('.reveal').forEach(function (h) {
      if (h.getBoundingClientRect().top < window.innerHeight) return;
      gsap.set(h, { y: 24, opacity: 0 });
      once(h, function () { gsap.to(h, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }); }, 'top 90%');
    });
  }

  if (motion) {
    var rowsIn = function (list, sel) {
      $$(list).forEach(function (l) {
        var r = $$(sel, l);
        if (!r.length) return;
        gsap.set(r, { y: 16, opacity: 0 });
        once(l, function () { gsap.to(r, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.08 }); }, 'top 85%');
      });
    };
    rowsIn('.compare', '.compare-panel');
    rowsIn('.benefit-grid', '.benefit');
    rowsIn('.how-inline-steps', 'li');
    rowsIn('.facts', '.fact');
    rowsIn('.after-steps', 'li');
    if (tlWrap) {
      var fill = $('.tl-fill', tlWrap);
      gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tlWrap, start: 'top 65%', end: 'bottom 65%', scrub: 0.6 } });
      $$('.tl-row', tlWrap).forEach(function (row) {
        var node = $('.tl-node', row), mid = $('.tl-mid', row), st = $('.tl-student', row), lab = $('.tl-lab', row);
        var wide = window.matchMedia('(min-width: 960px)').matches;
        gsap.set(node, { scale: 0.4, opacity: 0 });
        gsap.set(mid, { y: 24, opacity: 0 });
        gsap.set(st, { x: wide ? -32 : 0, y: wide ? 0 : 24, opacity: 0 });
        gsap.set(lab, { x: wide ? 32 : 0, y: wide ? 0 : 24, opacity: 0 });
        once(row, function () {
          gsap.timeline({ defaults: { ease: 'expo.out' } })
            .to(node, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' }, 0)
            .to(mid, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
            .to([st, lab], { x: 0, y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.2);
        }, 'top 72%');
      });
    }
    rowsIn('.tally-grid', '.tally-item');
    rowsIn('.trust-grid', '.trust-item');
    rowsIn('.doors-grid', '.door');
    rowsIn('.index-list', 'li');
    rowsIn('.ledger-stats', 'div');
    rowsIn('.timeline', '.tl-step');
    rowsIn('.trust-rows', '.trust-item');
    rowsIn('.get-side', '.get');
    rowsIn('.terms-body', '.term:nth-child(-n+2)');
    $$('.statement-line, .ledger-title, .get-feature').forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      gsap.set(el, { y: 24, opacity: 0 });
      once(el, function () { gsap.to(el, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }); }, 'top 88%');
    });
    // Numbers count up once, the first time they are seen
    $$('[data-count]').forEach(function (el) {
      var to = +el.dataset.count, o = { v: 0 };
      el.textContent = '0';
      once(el, function () {
        gsap.to(o, { v: to, duration: to > 100 ? 1.6 : 1.1, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(o.v).toLocaleString('en-US'); } });
      }, 'top 92%');
    });
    var bars = $$('.timebars .bar');
    if (bars.length) gsap.from(bars, { scaleX: 0, duration: 1.1, ease: 'expo.out', stagger: 0.25, delay: 0.5 });
    var sample = $('.sample-card');
    if (sample) {
      var fieldRows = $$('.sample-fields div', sample);
      gsap.set(sample, { y: 24, opacity: 0 });
      gsap.set(fieldRows, { opacity: 0 });
      once(sample, function () {
        gsap.timeline().to(sample, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' })
          .to(fieldRows, { opacity: 1, duration: 0.3, stagger: 0.07 }, 0.3);
      }, 'top 80%');
    }
    var studentFig = $('.student-fig');
    if (studentFig) gsap.from(studentFig, { y: '+=40', opacity: 0, duration: 0.9, ease: 'expo.out', delay: 0.25 });
  }

  var settle = function () { fitLine(); ScrollTrigger.refresh(); land(); };
  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle);
})();