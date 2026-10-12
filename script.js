/* ==========================================================================
   إدلب العز | Interactions
   - Bilingual engine (Arabic RTL <-> English LTR)
   - Navbar, mobile menu, scroll reveal, hero intro
   - Tabbed quick-booking + package modal with live validation
   - WhatsApp hand-off (the prototype's "backend")
   ========================================================================== */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const html = document.documentElement;
  html.classList.add('js');

  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const WA_NUMBER = '963936179628';
  const PRICES = { quad: 600, triple: 675, double: 750 };

  /* ------------------------------------------------------------------
     1. Dictionary
  ------------------------------------------------------------------ */
  const I18N = {
    ar: {
      page_title: 'وكالة إدلب العز للسياحة والسفر والحج والعمرة | برامج عمرة تبدأ من 600$',
      skip: 'انتقل إلى المحتوى',
      lang_btn: 'EN',
      lang_aria: 'تغيير اللغة إلى الإنجليزية',
      menu_aria: 'القائمة',
      close: 'إغلاق',

      brand_name: 'إدلب العز',
      brand_sub: 'للسياحة والسفر والحج والعمرة',

      nav_home: 'الرئيسية',
      nav_umrah: 'برامج الحج والعمرة',
      nav_services: 'خدماتنا',
      nav_booking: 'حجز سريع',
      nav_contact: 'اتصل بنا',
      nav_cta: 'احجز رحلتك الآن',

      hero_t1: 'رحلتك الإيمانية بروحانيةٍ تامة',
      hero_t2: 'وطمأنينةٍ ترتقي بروحك',
      hero_sub: 'من إدلب إلى الحرمين الشريفين، نرتّب لك كل التفاصيل: الإقامة والنقل والتأشيرة والمرشد، لتتفرّغ للعبادة وتعود بقلبٍ مطمئن.',
      hero_cta1: 'استكشف عروض العمرة الحالية',
      hero_cta2: 'تحدث مع مستشار السفر',
      hero_card_from: 'تبدأ برامج العمرة من',
      hero_card_note: 'للفرد في الغرفة الرباعية',
      hc1: '9 ليالٍ في مكة المكرمة',
      hc2: '3 ليالٍ في المدينة المنورة',
      hc3: 'نقل VIP من إدلب إلى إدلب',

      pk_title: 'برامج العمرة المميزة',
      pk_sub: 'ثلاثة خيارات للإقامة بالبرنامج الكامل نفسه من فنادق ونقل وتأشيرة وجولات إرشادية. اختر الغرفة التي تناسب أسرتك وميزانيتك.',
      badge_eco: 'برنامج اقتصادي مميز',
      badge_mid: 'راحة متوازنة',
      badge_vip: 'رحلات VIP برّاً',
      room_quad: 'غرفة رباعية',
      room_triple: 'غرفة ثلاثية',
      room_double: 'غرفة ثنائية',
      per_person: 'للفرد',
      pk_f1: '9 ليالٍ في مكة المكرمة',
      pk_f1s: 'فندق إيلاف بكة (محبس الجن)',
      pk_f2: '3 ليالٍ في المدينة المنورة',
      pk_f2s: 'فنادق المنطقة المركزية',
      pk_f3: 'نقل VIP من إدلب إلى إدلب',
      pk_f3s: 'رحلة برّية متكاملة ذهاباً وإياباً',
      pk_f4: 'تأشيرة العمرة',
      pk_f5: 'جولات إرشادية دينية',
      pk_f6: 'حافلات مكيّفة',
      pk_book: 'احجز مقعدك الآن',
      pk_note: 'تواصل معنا لتأكيد المقاعد المتاحة وموعد الانطلاق.',

      sv_title: 'خدمات سفر متكاملة',
      sv_sub: 'إلى جانب العمرة، نتولى ترتيب سفرك أينما كانت وجهتك.',
      sv_air_t: 'حجز تذاكر الطيران',
      sv_air_d: 'نبحث لك عن الرحلة الأنسب بين شركات الطيران، ونتابع حجزك حتى موعد الإقلاع.',
      sv_visa_t: 'تأمين التأشيرات العالمية',
      sv_visa_d: 'نجهّز ملفك ونتابع معاملة التأشيرة خطوة بخطوة لتسافر بلا تعقيد.',
      sv_tour_t: 'الرحلات السياحية والإجازات',
      sv_tour_d: 'برامج سياحية وترفيهية مرتّبة بعناية للأفراد والعائلات والمجموعات.',
      sv_link: 'اطلب الخدمة',

      bk_title: 'احجز رحلتك في دقيقة',
      bk_sub: 'املأ بياناتك وسيجهّز لك الموقع رسالة جاهزة على واتساب لنؤكّد معك التفاصيل.',
      bk_visit: 'زرنا في مكتبنا',
      tab_umrah: 'حجز عمرة',
      tab_other: 'حجز تذاكر وسياحة',
      f_name: 'الاسم الكامل',
      f_phone: 'رقم الهاتف',
      f_dest: 'الوجهة',
      f_pkg_umrah: 'نوع الغرفة',
      f_pkg_other: 'نوع الخدمة',
      f_date: 'تاريخ السفر المفضّل',
      ph_name: 'مثال: أحمد محمد العلي',
      ph_dest_other: 'مثال: إسطنبول، دبي، القاهرة',
      dest_umrah: 'مكة المكرمة والمدينة المنورة',
      opt_choose: 'اختر من القائمة',
      opt_quad: 'غرفة رباعية: 600$',
      opt_triple: 'غرفة ثلاثية: 675$',
      opt_double: 'غرفة ثنائية: 750$',
      opt_air: 'حجز تذكرة طيران',
      opt_visa: 'معاملة تأشيرة',
      opt_tour: 'رحلة سياحية',
      err_name: 'اكتب اسمك الكامل (3 أحرف على الأقل).',
      err_phone: 'أدخل رقم هاتف صحيح، مثل +963936179628.',
      err_dest: 'اكتب وجهة السفر.',
      err_pkg: 'اختر من القائمة.',
      err_date: 'اختر تاريخاً من اليوم فصاعداً.',
      bk_submit: 'أرسل طلب الحجز',
      ok_title: 'تم تجهيز طلبك',
      ok_text: 'بقيت خطوة واحدة: اضغط الزر لإرسال طلبك إلى مستشارنا عبر واتساب.',
      ok_wa: 'أكمل عبر واتساب',
      ok_again: 'طلب جديد',

      md_title: 'احجز مقعدك',
      md_sub: 'أكّد اختيارك وسنكمل الباقي معك على واتساب.',

      ft_tag: 'إدلب العز: ثقة وتميّز في خدمات العمرة والسفر',
      ft_bio: 'نرافق ضيوف الرحمن من إدلب إلى الحرمين الشريفين برحلات منظّمة وأسعار واضحة وفريق يضع راحتك وطمأنينتك أولاً. ونوفّر لك كذلك حجوزات الطيران والتأشيرات والرحلات السياحية.',
      ft_links: 'روابط سريعة',
      ft_contact: 'تواصل معنا',
      ft_addr: 'إدلب، سوق الصاغة، خلف جامع العمري',
      ft_rights: 'جميع الحقوق محفوظة لوكالة إدلب العز للسياحة والسفر والحج والعمرة.',

      wa_tip: 'تحدث معنا على واتساب',
      mb_call: 'اتصل بنا',
      mb_book: 'احجز الآن',
      wa_greeting: 'السلام عليكم، أرغب بالاستفسار عن برامج العمرة وخدمات السفر لديكم.'
    },

    en: {
      page_title: 'Idlib Al-Izz Travel Agency | Umrah packages from $600',
      skip: 'Skip to content',
      lang_btn: 'عربي',
      lang_aria: 'Switch language to Arabic',
      menu_aria: 'Menu',
      close: 'Close',

      brand_name: 'Idlib Al-Izz',
      brand_sub: 'Tourism, Travel, Hajj & Umrah',

      nav_home: 'Home',
      nav_umrah: 'Hajj & Umrah',
      nav_services: 'Services',
      nav_booking: 'Quick booking',
      nav_contact: 'Contact',
      nav_cta: 'Book your trip',

      hero_t1: 'A journey of faith, lived',
      hero_t2: 'in serenity and peace of mind',
      hero_sub: 'From Idlib to the Two Holy Mosques, we arrange every detail: accommodation, transport, visa and guide, so you can devote yourself to worship and return with a calm heart.',
      hero_cta1: 'Explore current Umrah offers',
      hero_cta2: 'Talk to a travel advisor',
      hero_card_from: 'Umrah packages start from',
      hero_card_note: 'per person, quad room',
      hc1: '9 nights in Makkah',
      hc2: '3 nights in Madinah',
      hc3: 'VIP transport, Idlib to Idlib',

      pk_title: 'Featured Umrah packages',
      pk_sub: 'Three room options with the same complete program: hotels, transport, visa and guided tours. Choose the room that suits your family and budget.',
      badge_eco: 'Outstanding value',
      badge_mid: 'Balanced comfort',
      badge_vip: 'VIP overland travel',
      room_quad: 'Quad room',
      room_triple: 'Triple room',
      room_double: 'Double room',
      per_person: 'per person',
      pk_f1: '9 nights in Makkah',
      pk_f1s: 'Elaf Bakkah Hotel (Mahbas Al-Jin)',
      pk_f2: '3 nights in Madinah',
      pk_f2s: 'Central Area hotels',
      pk_f3: 'VIP transport, Idlib to Idlib',
      pk_f3s: 'Complete round-trip overland journey',
      pk_f4: 'Umrah visa',
      pk_f5: 'Religious guided tours',
      pk_f6: 'Air-conditioned buses',
      pk_book: 'Reserve your seat',
      pk_note: 'Contact us to confirm available seats and the departure date.',

      sv_title: 'Complete travel services',
      sv_sub: 'Beyond Umrah, we arrange your travel wherever you are headed.',
      sv_air_t: 'Airline ticket booking',
      sv_air_d: 'We find the most suitable flight across airlines and follow your booking until departure.',
      sv_visa_t: 'Global visa processing',
      sv_visa_d: 'We prepare your file and follow the visa process step by step, so you can travel without hassle.',
      sv_tour_t: 'Vacation tours and holidays',
      sv_tour_d: 'Carefully planned tourism and leisure programs for individuals, families and groups.',
      sv_link: 'Request this service',

      bk_title: 'Book your trip in a minute',
      bk_sub: 'Fill in your details and the site prepares a ready-to-send WhatsApp message so we can confirm everything with you.',
      bk_visit: 'Visit our office',
      tab_umrah: 'Umrah booking',
      tab_other: 'Tickets & tours',
      f_name: 'Full name',
      f_phone: 'Phone number',
      f_dest: 'Destination',
      f_pkg_umrah: 'Room type',
      f_pkg_other: 'Service type',
      f_date: 'Preferred travel date',
      ph_name: 'e.g. Ahmad Mohammad Al-Ali',
      ph_dest_other: 'e.g. Istanbul, Dubai, Cairo',
      dest_umrah: 'Makkah and Madinah',
      opt_choose: 'Choose from the list',
      opt_quad: 'Quad room: $600',
      opt_triple: 'Triple room: $675',
      opt_double: 'Double room: $750',
      opt_air: 'Airline ticket booking',
      opt_visa: 'Visa processing',
      opt_tour: 'Vacation tour',
      err_name: 'Enter your full name (at least 3 letters).',
      err_phone: 'Enter a valid phone number, like +963936179628.',
      err_dest: 'Enter your travel destination.',
      err_pkg: 'Choose from the list.',
      err_date: 'Choose a date from today onward.',
      bk_submit: 'Send booking request',
      ok_title: 'Your request is ready',
      ok_text: 'One step left: tap the button to send your request to our advisor on WhatsApp.',
      ok_wa: 'Continue on WhatsApp',
      ok_again: 'New request',

      md_title: 'Reserve your seat',
      md_sub: 'Confirm your choice and we will complete the rest with you on WhatsApp.',

      ft_tag: 'Idlib Al-Izz: trust and excellence in Umrah and travel services',
      ft_bio: 'We accompany pilgrims from Idlib to the Two Holy Mosques with well-organized trips, clear prices and a team that puts your comfort and peace of mind first. We also handle flights, visas and vacation tours.',
      ft_links: 'Quick links',
      ft_contact: 'Contact us',
      ft_addr: 'Idlib, Al-Sagha Market, behind Al-Omari Mosque',
      ft_rights: 'All rights reserved to Idlib Al-Izz Travel, Hajj & Umrah Agency.',

      wa_tip: 'Chat with us on WhatsApp',
      mb_call: 'Call us',
      mb_book: 'Book now',
      wa_greeting: 'السلام عليكم، أرغب بالاستفسار عن برامج العمرة وخدمات السفر لديكم.'
    }
  };

  let lang = 'ar';
  const t = (key, l = lang) => (I18N[l] && I18N[l][key]) ?? I18N.ar[key] ?? key;

  /* ------------------------------------------------------------------
     2. Translation engine
  ------------------------------------------------------------------ */
  function translateIn(root = document) {
    $$('[data-i18n]', root).forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]', root).forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]', root).forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'ar';
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t('page_title');
    translateIn(document);

    const label = $('#langLabel');
    if (label) label.textContent = t('lang_btn');

    const dest = $('#f-dest');
    if (dest && dest.dataset.fixed) dest.value = t('dest_umrah');

    updateChip();
    try { localStorage.setItem('iz-lang', lang); } catch (e) { /* storage unavailable */ }
  }

  $('#langToggle').addEventListener('click', () => {
    html.classList.add('lang-switching');
    setLang(lang === 'ar' ? 'en' : 'ar');
    setTimeout(() => html.classList.remove('lang-switching'), 400);
  });

  /* ------------------------------------------------------------------
     3. Navbar, menu, active links
  ------------------------------------------------------------------ */
  const header = $('#siteHeader');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = $('#menuBtn');
  const menu = $('#mobileMenu');
  function toggleMenu(force) {
    const open = typeof force === 'boolean' ? force : !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  }
  menuBtn.addEventListener('click', () => toggleMenu());
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  const sections = ['home', 'umrah', 'services', 'booking', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        $$('.nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ------------------------------------------------------------------
     4. Scroll reveal + hero intro
  ------------------------------------------------------------------ */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !REDUCE) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  if (window.gsap && !REDUCE) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-t', { y: 46, opacity: 0, duration: 1.1, stagger: 0.18, clearProps: 'all' })
      .from('.hero-sub', { y: 26, opacity: 0, duration: 0.9, clearProps: 'all' }, '-=0.6')
      .from('.hero-ctas', { y: 26, opacity: 0, duration: 0.9, clearProps: 'all' }, '-=0.55')
      .from('.hero-card-wrap', { y: 50, opacity: 0, scale: 0.96, duration: 1.2, clearProps: 'all' }, '-=1')
      .from('.hero-star-wrap', { scale: 0.82, duration: 2.4, clearProps: 'transform' }, 0);
  }

  /* ------------------------------------------------------------------
     5. Validation
  ------------------------------------------------------------------ */
  const todayISO = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  };
  $$('input[type="date"]').forEach(i => { i.min = todayISO(); });

  const toLatinDigits = s => s
    .replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, d => String(d.charCodeAt(0) - 0x06F0));

  function ruleError(rule, raw) {
    const v = raw.trim();
    switch (rule) {
      case 'name':
        return /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]{2,}$/u.test(v) ? '' : 'err_name';
      case 'phone': {
        const digits = toLatinDigits(v).replace(/[\s\-().]/g, '');
        return /^\+?\d{8,15}$/.test(digits) ? '' : 'err_phone';
      }
      case 'dest':
        return v.length >= 2 ? '' : 'err_dest';
      case 'pkg':
        return v ? '' : 'err_pkg';
      case 'date':
        return v && v >= todayISO() ? '' : 'err_date';
      default:
        return '';
    }
  }

  function setFieldState(field, errKey) {
    const msg = $('.msg', field);
    field.classList.toggle('is-invalid', !!errKey);
    field.classList.toggle('is-valid', !errKey);
    if (errKey) { msg.dataset.i18n = errKey; msg.textContent = t(errKey); }
    else { delete msg.dataset.i18n; msg.textContent = ''; }
  }

  function validateField(field) {
    const control = $('input, select', field);
    const err = ruleError(field.dataset.rule, control.value);
    setFieldState(field, err);
    return err;
  }

  function resetStates(form) {
    $$('.field', form).forEach(f => {
      f.classList.remove('is-valid', 'is-invalid');
      delete f.dataset.touched;
      const msg = $('.msg', f);
      delete msg.dataset.i18n;
      msg.textContent = '';
    });
  }

  function wireLiveValidation(form) {
    form.addEventListener('focusout', e => {
      const f = e.target.closest('.field');
      if (!f || f.querySelector('input[readonly]')) return;
      f.dataset.touched = '1';
      validateField(f);
    });
    form.addEventListener('input', e => {
      const f = e.target.closest('.field');
      if (f && f.dataset.touched) validateField(f);
    });
    form.addEventListener('change', e => {
      const f = e.target.closest('.field');
      if (!f) return;
      f.dataset.touched = '1';
      validateField(f);
    });
  }

  function validateAll(form) {
    let first = null;
    $$('.field', form).forEach(f => {
      f.dataset.touched = '1';
      if (validateField(f) && !first) first = f;
    });
    return first;
  }

  function formData(form) {
    const get = n => (form.elements[n] ? form.elements[n].value.trim() : '');
    return { name: get('name'), phone: get('phone'), dest: get('dest'), pkg: get('pkg'), date: get('date') };
  }

  function waLink(kind, d) {
    const A = I18N.ar;
    const lines = [
      'السلام عليكم ورحمة الله،',
      'أرغب بإرسال طلب حجز عبر موقع وكالة إدلب العز:',
      '',
      `• الخدمة: ${kind === 'umrah' ? 'عمرة' : 'تذاكر وسياحة'}`,
      `• الاسم: ${d.name}`,
      `• الهاتف: ${toLatinDigits(d.phone)}`,
      `• الوجهة: ${d.dest}`,
      `• ${kind === 'umrah' ? 'نوع الغرفة' : 'نوع الخدمة'}: ${A['opt_' + d.pkg] || d.pkg}`,
      `• تاريخ السفر المفضّل: ${d.date}`
    ];
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function onSubmit(form, handler) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const firstBad = validateAll(form);
      if (firstBad) {
        form.classList.remove('shake');
        void form.offsetWidth; // restart animation
        form.classList.add('shake');
        $('input:not([readonly]), select', firstBad).focus();
        return;
      }
      const btn = $('.submit-btn', form);
      btn.classList.add('loading');
      setTimeout(() => { btn.classList.remove('loading'); handler(formData(form)); }, 800);
    });
  }

  /* ------------------------------------------------------------------
     6. Quick booking (tabs)
  ------------------------------------------------------------------ */
  const bForm = $('#bookingForm');
  const bTabs = $('.tabs');
  const bDone = $('#bookingDone');
  let currentTab = 'umrah';

  const TAB_CFG = {
    umrah: {
      labelKey: 'f_pkg_umrah',
      fixedDest: true,
      options: [['quad', 'opt_quad'], ['triple', 'opt_triple'], ['double', 'opt_double']]
    },
    other: {
      labelKey: 'f_pkg_other',
      fixedDest: false,
      options: [['air', 'opt_air'], ['visa', 'opt_visa'], ['tour', 'opt_tour']]
    }
  };

  function applyTab(name, preselect) {
    currentTab = name;
    const cfg = TAB_CFG[name];

    bTabs.dataset.active = name;
    $$('.tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === name)));
    bForm.setAttribute('aria-labelledby', 'tab-' + name);

    $('#f-pkg-label').dataset.i18n = cfg.labelKey;

    const sel = $('#f-pkg');
    sel.innerHTML = '';
    const ph = document.createElement('option');
    ph.value = ''; ph.dataset.i18n = 'opt_choose';
    sel.appendChild(ph);
    cfg.options.forEach(([val, key]) => {
      const o = document.createElement('option');
      o.value = val; o.dataset.i18n = key;
      sel.appendChild(o);
    });

    const dest = $('#f-dest');
    if (cfg.fixedDest) {
      dest.readOnly = true; dest.dataset.fixed = '1';
      dest.removeAttribute('data-i18n-ph'); dest.placeholder = '';
    } else {
      dest.readOnly = false; delete dest.dataset.fixed;
      dest.value = '';
      dest.dataset.i18nPh = 'ph_dest_other';
    }

    translateIn(bForm);
    if (cfg.fixedDest) dest.value = t('dest_umrah');
    if (preselect) sel.value = preselect;
    resetStates(bForm);
  }

  $$('.tab').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.tab !== currentTab) applyTab(b.dataset.tab);
  }));

  $$('[data-service]').forEach(a => a.addEventListener('click', () => {
    showBookingForm();
    applyTab('other', a.dataset.service);
  }));

  function showBookingForm() {
    bDone.hidden = true;
    bForm.hidden = false;
    bTabs.hidden = false;
  }

  wireLiveValidation(bForm);
  onSubmit(bForm, data => {
    $('#bookingWA').href = waLink(currentTab, data);
    bForm.hidden = true;
    bTabs.hidden = true;
    bDone.hidden = false;
    bDone.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'center' });
  });

  $('#bookingAgain').addEventListener('click', () => {
    bForm.reset();
    showBookingForm();
    applyTab(currentTab);
  });

  /* ------------------------------------------------------------------
     7. Package modal
  ------------------------------------------------------------------ */
  const modal = $('#bookModal');
  const mForm = $('#modalForm');
  const mBody = $('#modalBody');
  const mDone = $('#modalDone');
  const mPkg = $('#m-pkg');
  let lastFocus = null;

  function updateChip() {
    const chip = $('#modalChip');
    if (!chip || !mPkg) return;
    chip.textContent = '';
    const name = document.createElement('span');
    name.textContent = t('room_' + mPkg.value);
    const price = document.createElement('b');
    price.dir = 'ltr';
    price.textContent = '$' + PRICES[mPkg.value];
    chip.append(name, price);
  }
  mPkg.addEventListener('change', updateChip);

  function openModal(pkg) {
    lastFocus = document.activeElement;
    mForm.reset();
    resetStates(mForm);
    mPkg.value = pkg;
    updateChip();
    mBody.hidden = false;
    mDone.hidden = true;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => $('#m-name').focus(), 120);
  }

  function closeModal() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (!menu.classList.contains('open')) document.body.classList.remove('no-scroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $$('[data-book]').forEach(b => b.addEventListener('click', () => openModal(b.dataset.book)));
  $$('[data-close]', modal).forEach(el => el.addEventListener('click', closeModal));

  wireLiveValidation(mForm);
  onSubmit(mForm, data => {
    data.dest = t('dest_umrah', 'ar');
    $('#modalWA').href = waLink('umrah', data);
    mBody.hidden = true;
    mDone.hidden = false;
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); toggleMenu(false); }
    if (e.key === 'Tab' && modal.classList.contains('open')) {
      const f = $$('a[href], button:not([disabled]), input:not([readonly]), select', modal)
        .filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ------------------------------------------------------------------
     8. WhatsApp float, plain links, footer year
  ------------------------------------------------------------------ */
  const greet = () => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(I18N.ar.wa_greeting)}`;
  $$('[data-wa-plain]').forEach(a => { a.href = greet(); });

  const tip = $('#waTip');
  setTimeout(() => {
    tip.classList.add('show');
    setTimeout(() => tip.classList.remove('show'), 5200);
  }, 3500);

  $('#year').textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     9. Boot
  ------------------------------------------------------------------ */
  let saved = 'ar';
  try { saved = localStorage.getItem('iz-lang') || 'ar'; } catch (e) { /* ignore */ }
  applyTab('umrah');
  setLang(saved);
})();
