// Research Reach: sign up routing, menu, section links and every scene

var STUDENT_FORM_URL = 'https://forms.gle/aK2CJZSYnAAkVHnM9';
var LAB_EMAIL = 'patemish@iu.edu';
var LAB_MAILTO = 'mailto:patemish@iu.edu?subject=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0D%0A%0D%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0D%0A%0D%0AName%3A%0D%0ALab%20or%20PI%3A%0D%0ADepartment%3A%0D%0AWhat%20I%20look%20for%20in%20a%20student%3A%0D%0AA%20few%20times%20that%20work%20to%20talk%3A%0D%0A';
var LAB_OUTLOOK = 'https://outlook.office.com/mail/deeplink/compose?to=patemish%40iu.edu&subject=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0A%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0A%0AName%3A%0ALab%20or%20PI%3A%0ADepartment%3A%0AWhat%20I%20look%20for%20in%20a%20student%3A%0AA%20few%20times%20that%20work%20to%20talk%3A%0A';
var LAB_GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=patemish%40iu.edu&su=Bringing%20my%20lab%20into%20Research%20Reach&body=Hi%2C%0A%0AI%27d%20like%20to%20bring%20my%20lab%20into%20Research%20Reach.%0A%0AName%3A%0ALab%20or%20PI%3A%0ADepartment%3A%0AWhat%20I%20look%20for%20in%20a%20student%3A%0AA%20few%20times%20that%20work%20to%20talk%3A%0A';
var COHORT_LINE = '';
var LAB_PROFILE_URL = '';

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
    return Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - (el.id === 'how' ? 0 : headerSpace())));
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

  /* The hero: the Student and the Professor reach for the Research Reach mark */
  var hero = $('.hero-scene');
  if (hero && motion) (function () {
    var figs = $$('.h-fig', hero), line = $('.m-line', hero), mark = $('.hero-badge', hero);
    var ring = $('.badge-ring', mark), caption = $('.m-caption', hero), tags = $$('.svg-tag', hero);
    var apps = $$('.app', hero), trails = $$('.app-trail', hero);
    gsap.set(apps, { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set(trails, { opacity: 0 });
    gsap.set(line, { strokeDashoffset: 1 });
    gsap.set(mark, { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' });
    gsap.set([caption].concat(tags), { opacity: 0, y: 8 });
    gsap.timeline({ delay: 0.3 })
      .from(figs[0], { x: '-=60', opacity: 0, duration: 0.9, ease: 'expo.out' }, 0)
      .from(figs[1], { x: '+=60', opacity: 0, duration: 0.9, ease: 'expo.out' }, 0)
      .to(tags, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.5)
      .to(mark, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0.7)
      .to(line, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.9)
      .to(apps, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.12 }, 0.45)
      .to(trails, { opacity: 1, duration: 0.5 }, 0.75)
      .to(caption, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 1.4);
    var pulse = gsap.to(ring, { scale: 1.12, opacity: 0.55, transformOrigin: '50% 50%', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    idle(hero, [pulse]);
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

  /* How it works: plays 1, 2, 3 on its own and loops. Pause, or pick a step */
  var how = $('.how');
  if (how && motion) (function () {
    var stage = $('#stage'), scene = $('.scene', stage);
    var tabs = $$('.rail-step', how), texts = $$('.step-text', how), fill = $('.rail-fill', how);
    var status = $('#stage-status'), pauseBtn = $('.how-pause', how);
    var items = $$('.item', scene), fits = items.filter(function (i) { return i.classList.contains('fit'); });
    var misses = items.filter(function (i) { return !i.classList.contains('fit'); });
    var chosen = $('.item.chosen', scene), others = items.filter(function (i) { return i !== chosen; });
    var studentG = $('.student', scene), profG = $('.prof', scene), hold = $('.pose-hold', profG), reach = $('.pose-reach', profG);
    var matchLine = $('.match-line', scene), mark = $('.match-glow', scene);
    var tile = function (el) { return $('.tile', el); };
    var told = [
      'Step 1 of 3, Tell us what you look for. The Professor holds a profile of what the lab needs.',
      'Step 2 of 3, We screen every student. Student portraits appear. Four fade out and three that fit are outlined.',
      'Step 3 of 3, Meet only the students who fit. One Student and the Professor reach toward the Research Reach mark.'
    ];
    var T = { s1: 0.6, b2: 1.2, s2: 2.3, b3: 2.9, s3: 4.0 };

    gsap.set(profG, { x: 320, y: 410, opacity: 0 });
    gsap.set(hold, { opacity: 1 });
    gsap.set(reach, { opacity: 0 });
    gsap.set(studentG, { x: 140, y: 410, opacity: 0 });
    items.forEach(function (it) {
      gsap.set(it, { x: +it.dataset.x, y: +it.dataset.y, scale: 0.8, opacity: 0, transformOrigin: '50% 50%' });
      gsap.set(tile(it), { stroke: '#C9D1DC', strokeWidth: 1.5 });
    });
    gsap.set(matchLine, { strokeDashoffset: 1 });
    gsap.set(mark, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' });

    var tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
      .to(profG, { y: 382, opacity: 1, duration: 0.55, ease: 'expo.out' }, 0)
      .addLabel('s1', T.s1)
      .to(profG, { x: 520, duration: 0.5 }, T.b2)
      .to(items, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'expo.out' }, T.b2 + 0.1)
      .to(misses, { opacity: 0.25, duration: 0.4 }, T.b2 + 0.6)
      .to(fits.map(tile), { stroke: '#185FA5', strokeWidth: 3, duration: 0.3 }, T.b2 + 0.65)
      .addLabel('s2', T.s2)
      .to(others, { opacity: 0, duration: 0.35 }, T.b3)
      .to(chosen, { x: 140, y: 167, scale: 1.3, duration: 0.45 }, T.b3 + 0.1)
      .to(chosen, { opacity: 0, duration: 0.25 }, T.b3 + 0.45)
      .to(studentG, { y: 382, opacity: 1, duration: 0.45, ease: 'expo.out' }, T.b3 + 0.4)
      .to(profG, { x: 500, duration: 0.45 }, T.b3 + 0.2)
      .to(hold, { opacity: 0, duration: 0.25 }, T.b3 + 0.35)
      .to(reach, { opacity: 1, duration: 0.25 }, T.b3 + 0.35)
      .to(mark, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' }, T.b3 + 0.6)
      .to(matchLine, { strokeDashoffset: 0, duration: 0.5 }, T.b3 + 0.75)
      .addLabel('s3', T.s3);

    var current = 0;
    var stepAt = function (time) { return time < T.b2 ? 1 : time < T.b3 ? 2 : 3; };
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
      if (!playing) status.textContent = told[n - 1];
    };
    var horizontal = function () { return window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches; };
    tl.eventCallback('onUpdate', function () {
      show(stepAt(tl.time()));
      var p = Math.min(1, tl.time() / T.s3);
      gsap.set(fill, horizontal() ? { scaleX: p, scaleY: 1 } : { scaleY: p, scaleX: 1 });
    });

    // The loop: build each step, hold it, then clear and start again
    var HOLD = 2.6;
    var loop = gsap.timeline({ repeat: -1, paused: true })
      .add(tl.tweenFromTo(0, 's1', { duration: 0.9, immediateRender: false }))
      .addLabel('h1')
      .to({}, { duration: HOLD })
      .add(tl.tweenFromTo('s1', 's2', { duration: 1.4, immediateRender: false }))
      .addLabel('h2')
      .to({}, { duration: HOLD })
      .add(tl.tweenFromTo('s2', 's3', { duration: 1.4, immediateRender: false }))
      .addLabel('h3')
      .to({}, { duration: HOLD + 0.6 })
      .to(scene, { opacity: 0, duration: 0.35 })
      .add(function () { tl.pause(0); })
      .to(scene, { opacity: 1, duration: 0.25 });

    var playing = true, onScreen = false;
    var setPlaying = function (on) {
      playing = on;
      pauseBtn.textContent = on ? 'Pause' : 'Play';
      pauseBtn.setAttribute('aria-pressed', String(!on));
      if (on && onScreen) loop.play('h' + Math.max(1, current));
      else loop.pause();
    };
    pauseBtn.addEventListener('click', function () { setPlaying(!playing); });

    var goTo = function (n, focus) {
      n = Math.max(1, Math.min(3, n));
      setPlaying(false);
      gsap.to(scene, { opacity: 1, duration: 0.1 });
      tl.tweenTo('s' + n, { duration: 0.8, ease: 'power2.inOut' });
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
      trigger: how, start: 'top 75%', end: 'bottom top',
      onToggle: function (self) {
        onScreen = self.isActive;
        if (onScreen && playing) loop.resume(); else loop.pause();
      }
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
    rowsIn('.benefits', '.benefit');
    rowsIn('.facts', '.fact');
    rowsIn('.after-steps', 'li');
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

  var settle = function () { ScrollTrigger.refresh(); land(); };
  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle);
})();