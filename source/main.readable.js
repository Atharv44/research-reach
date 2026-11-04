// Research Reach: sign up routing, menu, section links and every scene

var STUDENT_FORM_URL = 'https://forms.gle/aK2CJZSYnAAkVHnM9';
var LAB_EMAIL = 'patemish@iu.edu';
var LAB_MAILTO = 'mailto:patemish@iu.edu?subject=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0D%0A%0D%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0D%0A%0D%0AName%3A%0D%0ALab%20or%20PI%3A%0D%0ADepartment%3A%0D%0AWhat%20I%20look%20for%20in%20a%20student%3A%0D%0AA%20few%20times%20that%20work%20to%20talk%3A%0D%0A';
var LAB_OUTLOOK = 'https://outlook.office.com/mail/deeplink/compose?to=patemish%40iu.edu&subject=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0A%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0A%0AName%3A%0ALab%20or%20PI%3A%0ADepartment%3A%0AWhat%20I%20look%20for%20in%20a%20student%3A%0AA%20few%20times%20that%20work%20to%20talk%3A%0A';
var LAB_GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=patemish%40iu.edu&su=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0A%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0A%0AName%3A%0ALab%20or%20PI%3A%0ADepartment%3A%0AWhat%20I%20look%20for%20in%20a%20student%3A%0AA%20few%20times%20that%20work%20to%20talk%3A%0A';
var COHORT_LINE = '';

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
  $$('[data-link="lab-outlook"]').forEach(function (a) { a.href = LAB_OUTLOOK; });
  $$('[data-link="lab-gmail"]').forEach(function (a) { a.href = LAB_GMAIL; });
  $$('[data-print="student"]').forEach(function (el) { el.textContent = STUDENT_FORM_URL.replace(/^https:\/\//, ''); });
  var cohort = $('.cohort-line');
  if (cohort && COHORT_LINE) { cohort.textContent = COHORT_LINE; cohort.hidden = false; }

  // Menu
  var toggle = $('.menu-toggle'), nav = $('#site-nav');
  if (toggle && nav) {
    var setMenu = function (open) { toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); };
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // Pages always open at the top, and a section link never leaves its #name
  // in the address bar. A link from another page to a section lands once.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var arrival = location.hash && document.getElementById(location.hash.slice(1));
  var cleanUrl = function () { if (location.hash) history.replaceState(null, '', location.pathname + location.search); };
  if (!arrival) { cleanUrl(); window.scrollTo(0, 0); }

  var pins = {};
  var headerSpace = function () { return window.innerWidth < 600 ? 80 : 96; };
  var topOf = function (el) {
    if (pins[el.id]) return pins[el.id].start;
    return Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - (el.id === 'how' || el.id === 'problem' ? 0 : headerSpace())));
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
    window.addEventListener('load', land);
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

  /* The ribbon */
  var ribbon = $('.ribbon');
  if (ribbon) (function () {
    var art = $('.ribbon-art', ribbon);
    var band = $('.ribbon-band', art), track = $('.ribbon-track', art), textPath = $('textPath', art);
    var pill = $('.ribbon-pill', art), lead = $('.ribbon-lead', art), card = $('.intro-card', art);
    var phrase = textPath.textContent;
    textPath.textContent = phrase + phrase + phrase;

    var measure = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    measure.setAttribute('class', 'ribbon-text');
    measure.setAttribute('visibility', 'hidden');
    measure.textContent = phrase;
    art.appendChild(measure);

    var repeatLen = 2400, flow = { offset: 0 }, flowTween = null, speed = { now: 1, target: 1 };

    var layout = function () {
      var w = Math.round(art.getBoundingClientRect().width) || 1440;
      var h = Math.round(art.getBoundingClientRect().height) || 320;
      art.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      var narrow = w < 768;
      var px = narrow ? w - 64 : Math.round(w * 0.46), py = narrow ? 76 : h * 0.5;
      var d = narrow
        ? 'M-60 ' + (py - 50) + 'C' + (w * 0.3) + ' ' + (py - 110) + ' ' + (w * 0.4) + ' ' + (py + 90) + ' ' + (px - 44) + ' ' + py
        : 'M-60 ' + (h * 0.28) + 'C' + (w * 0.16) + ' ' + (h * -0.08) + ' ' + (px * 0.6) + ' ' + (h * 1.06) + ' ' + (px - 44) + ' ' + py;
      band.setAttribute('d', d);
      track.setAttribute('d', d);
      pill.setAttribute('transform', 'translate(' + px + ' ' + py + ')');
      var cw, cx, cy;
      if (narrow) {
        cw = Math.min(320, w - 32); cx = (w - cw) / 2; cy = h - 208;
        lead.setAttribute('d', 'M' + px + ' ' + (py + 24) + 'V' + (cy - 8));
      } else {
        var margin = w >= 1024 ? 64 : 32;
        cw = Math.max(300, Math.min(440, w - px - 70 - margin)); cx = px + 70; cy = py - 100;
        lead.setAttribute('d', 'M' + (px + 40) + ' ' + py + 'H' + (px + 70));
      }
      card.setAttribute('transform', 'translate(' + cx + ' ' + cy + ')');
      $('.intro-ground', card).setAttribute('width', cw);
      var fs = 0.24, feet = 190, stx = Math.round(cw * 0.22), prx = Math.round(cw * 0.78);
      $('.intro-student', card).setAttribute('transform', 'translate(' + stx + ' ' + feet + ') scale(' + fs + ')');
      $('.intro-prof', card).setAttribute('transform', 'translate(' + prx + ' ' + feet + ') scale(' + fs + ')');
      var hx1 = stx + 210 * fs, hx2 = prx - 210 * fs, hy = feet - 440 * fs, dip = hy + 44;
      var q = 'M' + hx1 + ' ' + hy + 'C' + (hx1 + (hx2 - hx1) * 0.3) + ' ' + dip + ' ' + (hx2 - (hx2 - hx1) * 0.3) + ' ' + dip + ' ' + hx2 + ' ' + hy;
      $('.intro-line', card).setAttribute('d', q);
      $('.intro-glow', card).setAttribute('d', q);
      repeatLen = measure.getComputedTextLength() || repeatLen;
    };

    var startFlow = function () {
      if (flowTween) flowTween.kill();
      flow.offset = -repeatLen;
      flowTween = gsap.to(flow, {
        offset: 0, duration: repeatLen / 42, ease: 'none', repeat: -1,
        onUpdate: function () { textPath.setAttribute('startOffset', flow.offset.toFixed(1)); }
      });
    };

    var cardLoop = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: 'power2.inOut' } })
      .set('.intro-line', { strokeDashoffset: 1 })
      .set('.intro-glow', { opacity: 0 })
      .to('.intro-line', { strokeDashoffset: 0, duration: 0.7 }, 0.4)
      .to('.intro-glow', { opacity: 1, duration: 0.4 }, 1.1)
      .to(['.intro-line', '.intro-glow'], { opacity: 0, duration: 0.4 }, 4.2)
      .set('.intro-line', { opacity: 1, strokeDashoffset: 1 }, 4.6);

    var ready = function () {
      layout();
      if (!motion) { textPath.setAttribute('startOffset', String(-repeatLen * 0.4)); return; }
      startFlow();
      gsap.ticker.add(function () {
        speed.now += (speed.target - speed.now) * 0.08;
        speed.target += (1 - speed.target) * 0.05;
        if (flowTween) flowTween.timeScale(speed.now);
      });
      ScrollTrigger.create({
        trigger: ribbon, start: 'top bottom', end: 'bottom top',
        onToggle: function (self) {
          if (self.isActive) { flowTween && flowTween.resume(); cardLoop.play(); }
          else { flowTween && flowTween.pause(); cardLoop.pause(); }
        },
        onUpdate: function (self) {
          speed.target = Math.max(speed.target, Math.min(3, 1 + Math.abs(self.getVelocity()) / 900));
        }
      });
      cardLoop.play();
      gsap.to(pill, { scale: 1.05, transformOrigin: '50% 50%', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    };

    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(ready);
    var rw = 0;
    window.addEventListener('resize', function () {
      var w = art.getBoundingClientRect().width;
      if (Math.abs(w - rw) < 2) return;
      rw = w; layout(); if (motion) startFlow();
    });
  })();

  /* The problem and the fix */
  var problem = $('.problem');
  if (problem && motion) (function () {
    var scene = $('.problem-scene', problem);
    var caps = $$('.problem-caption', problem);
    var envs = $$('.env', scene), tiles = $$('.p-tile', scene);
    var chosen = $('.p-tile.chosen', scene), rest = tiles.filter(function (t) { return t !== chosen; });
    var point = $('.pose-point', scene), reach = $('.pose-reach', scene), prof = $('.p-prof', scene);
    var line = $('.p-line', scene), glow = $('.p-glow', scene);

    gsap.set(caps[1], { opacity: 0 });
    gsap.set(envs, { x: 256, y: 182, scale: 0.3, rotation: 0, opacity: 0, transformOrigin: '50% 50%' });
    tiles.forEach(function (t) { gsap.set(t, { x: +t.dataset.x, y: +t.dataset.y, opacity: 1, scale: 1, transformOrigin: '50% 50%' }); });
    gsap.set(point, { opacity: 1 });
    gsap.set(reach, { opacity: 0 });
    gsap.set(prof, { x: 500, y: 430, opacity: 0 });
    gsap.set(line, { strokeDashoffset: 1 });
    gsap.set(glow, { opacity: 0 });

    var tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
    envs.forEach(function (e, i) {
      tl.to(e, { x: +e.dataset.x, duration: 0.5, ease: 'power1.out' }, 0.1 + i * 0.13)
        .to(e, { y: +e.dataset.y, rotation: +e.dataset.r, scale: 1, duration: 0.5, ease: 'power2.in' }, 0.1 + i * 0.13)
        .to(e, { opacity: 1, duration: 0.15 }, 0.1 + i * 0.13);
    });
    tl.addLabel('p1', 2.0)
      .to(caps[0], { opacity: 0, y: -12, duration: 0.3 }, 2.2)
      .fromTo(caps[1], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 }, 2.35)
      .to(envs, { x: '+=150', rotation: '+=30', opacity: 0, duration: 0.45, stagger: 0.03 }, 2.2)
      .to(rest, { opacity: 0, duration: 0.3 }, 2.45)
      .to(chosen, { x: 500, y: 200, scale: 1.3, duration: 0.4 }, 2.5)
      .to(chosen, { opacity: 0, duration: 0.2 }, 2.8)
      .to(prof, { y: 400, opacity: 1, duration: 0.45, ease: 'expo.out' }, 2.75)
      .to(point, { opacity: 0, duration: 0.25 }, 2.7)
      .to(reach, { opacity: 1, duration: 0.25 }, 2.7)
      .to(line, { strokeDashoffset: 0, duration: 0.5 }, 3.1)
      .to(glow, { opacity: 1, duration: 0.2 }, 3.55)
      .to({}, { duration: 0.65 }, 3.75);

    gsap.matchMedia().add({ pin: PIN, step: STEP }, function (ctx) {
      tl.pause(0);
      if (ctx.conditions.pin) {
        problem.classList.add('is-scrubbed');
        pins.problem = ScrollTrigger.create({ trigger: problem, start: 'top top', end: '+=150%', pin: true, scrub: 0.8, animation: tl, invalidateOnRefresh: true });
        return function () { problem.classList.remove('is-scrubbed'); delete pins.problem; };
      }
      once($('.problem-stage', problem), function () { tl.play(); }, 'top 70%');
    });
  })();

  /* How it works */
  var how = $('.how');
  if (how) (function () {
    var stage = $('#stage'), scene = $('.scene', stage);
    var tabs = $$('.rail-step'), texts = $$('.step-text'), fill = $('.rail-fill');
    var status = $('#stage-status');
    var back = $('[data-move="back"]'), next = $('[data-move="next"]');
    var items = $$('.item', scene), fits = items.filter(function (i) { return i.classList.contains('fit'); });
    var misses = items.filter(function (i) { return !i.classList.contains('fit'); });
    var chosen = $('.item.chosen', scene), others = items.filter(function (i) { return i !== chosen; });
    var studentG = $('.student', scene), hold = $('.pose-hold', scene), reach = $('.pose-reach', scene), profG = $('.prof', scene);
    var matchLine = $('.match-line', scene), matchGlow = $('.match-glow', scene), spark = $('.spark', scene);
    var tile = function (el) { return $('.tile', el); };

    var told = [
      'Step 1 of 3, Fill out one profile. The Student steps in holding a profile.',
      'Step 2 of 3, We screen for fit. Professors appear around the Student. Four fade out and three that fit are outlined.',
      'Step 3 of 3, Meet your lab. The others clear away and a line joins the Student to one Professor.'
    ];

    var T = { s1: 0.6, b2: 1.2, s2: 2.3, b3: 2.9, s3: 4.0, end: 4.6 };
    gsap.set(studentG, { x: 190, y: 410, opacity: 0 });
    gsap.set(hold, { opacity: 1 });
    gsap.set(reach, { opacity: 0 });
    gsap.set(profG, { x: 500, y: 410, opacity: 0 });
    items.forEach(function (it) {
      gsap.set(it, { x: +it.dataset.x, y: +it.dataset.y, scale: 0.8, opacity: 0, transformOrigin: '50% 50%' });
      gsap.set(tile(it), { stroke: '#C9D1DC', strokeWidth: 1.5 });
    });
    gsap.set(matchLine, { strokeDashoffset: 1 });
    gsap.set(matchGlow, { opacity: 0 });
    gsap.set(spark, { opacity: 0 });

    var tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
      .to(studentG, { y: 382, opacity: 1, duration: 0.55, ease: 'expo.out' }, 0)
      .addLabel('s1', T.s1)
      .to(items, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'expo.out' }, T.b2)
      .to(misses, { opacity: 0.25, duration: 0.4 }, T.b2 + 0.55)
      .to(fits.map(tile), { stroke: '#185FA5', strokeWidth: 3, duration: 0.3 }, T.b2 + 0.6)
      .addLabel('s2', T.s2)
      .to(others, { opacity: 0, duration: 0.35 }, T.b3)
      .to(chosen, { x: 500, y: 167, scale: 1.3, duration: 0.45 }, T.b3 + 0.1)
      .to(chosen, { opacity: 0, duration: 0.25 }, T.b3 + 0.45)
      .to(profG, { y: 382, opacity: 1, duration: 0.45, ease: 'expo.out' }, T.b3 + 0.4)
      .to(studentG, { x: 140, duration: 0.45 }, T.b3 + 0.2)
      .to(hold, { opacity: 0, duration: 0.25 }, T.b3 + 0.35)
      .to(reach, { opacity: 1, duration: 0.25 }, T.b3 + 0.35)
      .to(matchLine, { strokeDashoffset: 0, duration: 0.5 }, T.b3 + 0.7)
      .to(matchGlow, { opacity: 1, duration: 0.2 }, T.b3 + 1.05)
      .addLabel('s3', T.s3)
      .to({}, { duration: T.end - T.s3 });

    var trackLen = matchLine.getTotalLength(), sp = { t: 0, o: 0 };
    var drawSpark = function () {
      var pt = matchLine.getPointAtLength(Math.max(0, Math.min(1, sp.t)) * trackLen);
      spark.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')');
      spark.setAttribute('opacity', sp.o.toFixed(2));
    };
    var sparkTl = gsap.timeline({ repeat: -1, paused: true, onUpdate: drawSpark })
      .fromTo(sp, { t: 0 }, { t: 1, duration: 1.3, ease: 'power1.inOut' }, 0)
      .fromTo(sp, { o: 0 }, { o: 1, duration: 0.2 }, 0)
      .to(sp, { o: 0, duration: 0.2 }, 1.1)
      .fromTo(sp, { t: 1 }, { t: 0, duration: 1.3, ease: 'power1.inOut' }, 1.8)
      .fromTo(sp, { o: 0 }, { o: 1, duration: 0.2 }, 1.8)
      .to(sp, { o: 0, duration: 0.2 }, 2.9)
      .to({}, { duration: 0.5 }, 3.1);

    var current = 0;
    var stepAt = function (time) { return time < T.b2 ? 1 : time < T.b3 ? 2 : 3; };
    var show = function (n, announce) {
      if (n !== current) {
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
          if (on && motion) gsap.fromTo(el, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: true });
        });
        stage.setAttribute('aria-labelledby', 'tab-' + n);
        back.setAttribute('aria-disabled', String(n === 1));
        next.hidden = n === 3;
        if (announce !== false) status.textContent = told[n - 1];
      }
      var landed = n === 3 && tl.time() >= T.s3 - 0.05;
      if (landed && motion) { if (!sparkTl.isActive()) sparkTl.restart(); }
      else { sparkTl.pause(0); sp.o = 0; drawSpark(); }
    };

    var horizontal = function () { return window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches; };
    var fillTo = function (p) { gsap.set(fill, horizontal() ? { scaleX: p, scaleY: 1 } : { scaleY: p, scaleX: 1 }); };
    tl.eventCallback('onUpdate', function () {
      show(stepAt(tl.time()));
      fillTo(Math.min(1, tl.time() / T.s3));
    });

    var labelFor = function (n) { return [T.s1, T.s2, T.s3][n - 1]; };
    var goTo = function (n, focus) {
      n = Math.max(1, Math.min(3, n));
      var pin = pins.how;
      if (pin) {
        window.scrollTo({ top: Math.round(pin.start + (labelFor(n) / T.end) * (pin.end - pin.start)), behavior: motion ? 'smooth' : 'auto' });
      } else if (motion) {
        tl.tweenTo(labelFor(n), { duration: 0.9, ease: 'power2.inOut' });
      } else {
        tl.seek(labelFor(n), false); show(n); fillTo(Math.min(1, labelFor(n) / T.s3));
      }
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
      t.addEventListener('focus', function () {
        var pin = pins.how;
        if (pin && (window.scrollY < pin.start || window.scrollY > pin.end)) goTo(i + 1);
      });
    });
    back.addEventListener('click', function () { if (current > 1) goTo(current - 1); });
    next.addEventListener('click', function () { goTo(current + 1); });

    var sx = null, sy = 0;
    stage.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' && !pins.how) { sx = e.clientX; sy = e.clientY; } });
    stage.addEventListener('pointerup', function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) goTo(current + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener('pointercancel', function () { sx = null; });

    gsap.matchMedia().add({ pin: PIN, step: STEP }, function (ctx) {
      tl.pause(0);
      if (ctx.conditions.pin) {
        how.classList.add('is-pinned');
        pins.how = ScrollTrigger.create({
          trigger: how, start: 'top top', end: '+=300%', pin: true, scrub: 0.8, animation: tl,
          onLeave: function () { show(3); }, invalidateOnRefresh: true
        });
        show(1, false);
        return function () { how.classList.remove('is-pinned'); delete pins.how; };
      }
      show(1, false);
      if (motion) once(stage, function () { tl.tweenTo(T.s1, { duration: 0.7, ease: 'power2.out' }); }, 'top 75%');
      else { tl.seek(T.s1, false); show(1, false); fillTo(T.s1 / T.s3); }
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
      var hx1 = sx + 210 * s, hx2 = px - 210 * s, hy = feet - 440 * s, dip = hy + (w < 768 ? 40 : 90);
      var d = 'M' + hx1 + ' ' + hy + 'C' + (hx1 + (hx2 - hx1) * 0.3) + ' ' + dip + ' ' + (hx2 - (hx2 - hx1) * 0.3) + ' ' + dip + ' ' + hx2 + ' ' + hy;
      line.setAttribute('d', d); glow.setAttribute('d', d);
      if (tl) tl.kill();
      if (trig) trig.kill();
      gsap.set(st, { x: sx, y: feet }); gsap.set(pr, { x: px, y: feet });
      if (!motion) return;
      var far = w * 0.22 + 80;
      tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
        .fromTo(st, { x: sx - far, opacity: 0 }, { x: sx, opacity: 1, duration: 1 }, 0)
        .fromTo(pr, { x: px + far, opacity: 0 }, { x: px, opacity: 1, duration: 1 }, 0)
        .fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, 1)
        .fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.45);
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

  /* Labs hero: the Professor holds a profile while students drift past */
  var drift = $('.drift');
  if (drift) (function () {
    var fig = $('.hero-figure', drift), tiles = $$('.drift-item', drift);
    if (!motion) return;
    gsap.from(fig, { y: '+=40', opacity: 0, duration: 0.9, ease: 'expo.out', delay: 0.2 });
    gsap.from(tiles, { scale: 0.6, opacity: 0, transformOrigin: '50% 50%', duration: 0.6, ease: 'expo.out', stagger: 0.07, delay: 0.45 });
    var loops = tiles.map(function (t, i) {
      return gsap.to(t, { x: '+=' + (i % 2 ? 6 : -6), y: '+=' + (i % 3 ? -8 : 8), duration: 2.6 + (i % 4) * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 + i * 0.1 });
    });
    idle(drift, loops);
  })();

  /* Labs steps: the connector draws, then each step arrives */
  var seq = $('.lab-sequence');
  if (seq && motion) (function () {
    var nums = $$('.lab-num', seq), links = $$('.lab-link', seq), words = $$('li h3, li p', seq);
    var vertical = function () { return window.matchMedia('(max-width: 767px)').matches; };
    gsap.set(nums, { scale: 0.6, opacity: 0 });
    gsap.set(words, { y: 16, opacity: 0 });
    gsap.set(links, vertical() ? { scaleY: 0 } : { scaleX: 0 });
    once(seq, function () {
      var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      nums.forEach(function (n, i) {
        tl.to(n, { scale: 1, opacity: 1, duration: 0.5 }, i * 0.45)
          .to($$('h3, p', n.parentNode), { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, i * 0.45 + 0.1);
        if (links[i]) tl.to(links[i], vertical() ? { scaleY: 1, duration: 0.45, ease: 'power2.inOut' } : { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, i * 0.45 + 0.15);
      });
    }, 'top 80%');
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
      gsap.fromTo(p, { opacity: 0.18 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: p, start: 'top 88%', end: 'top 58%', scrub: true } });
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
    var lane = $$('.lane-list li');
    if (lane.length) {
      gsap.set(lane, { x: 32, opacity: 0 });
      once($('.lane-list'), function () { gsap.to(lane, { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.1 }); });
    }
    $$('.reveal').forEach(function (h) {
      if (h.getBoundingClientRect().top < window.innerHeight) return;
      gsap.set(h, { y: 24, opacity: 0 });
      once(h, function () { gsap.to(h, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }); }, 'top 90%');
    });
  }

  var settle = function () { ScrollTrigger.refresh(); land(); };
  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle);
})();
