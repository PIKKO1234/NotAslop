/* ══════════════════════════════════════════════════════════════
   NOTASLOP — JAVASCRIPT APPLICATION LOGIC
   Lightweight, reactive, vanilla JS. Zero dependencies.
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── 1. TRANSLATION DICTIONARY ──
  const T = {
    pl: {
      navJak: 'Jak to działa',
      navVersus: 'Dlaczego GEO',
      navKalkulator: 'Kalkulator strat',
      navWyniki: 'Efekty',
      navCennik: 'Darmowy audyt',
      navBlog: 'Blog',
      navKontakt: 'Kontakt',
      navCta: 'Bezpłatny pomiar',

      heroEyebrow: 'Pozycjonowanie w ChatGPT · Gemini · Apple Maps',
      heroH1: 'Turysta właśnie zapytał,<br>dokąd pójść.<br><em>AI poleciło trzy miejsca.</em>',
      heroSub: 'Nie dziesięć stron wyników jak w Google. <strong>Dwie, trzy nazwy.</strong> Codziennie w Twojej okolicy pada to pytanie, a na krótką listę poleceń trafiają ci, których AI zna najlepiej.',
      heroCtaPrimary: 'Zajmij swoje miejsce',
      heroCtaGhost: 'Zobacz jak to działa',
      heroTrustText: 'AI, w których budujemy widoczność:',

      simTitle: 'Asystent AI w telefonie',
      simOnline: 'Gotowy do odpowiedzi',
      simBeforeBtn: '🔴 Przed wdrożeniem GEO',
      simAfterBtn: '🟢 Po wdrożeniu NotASlop',

      stripStat1Val: '150 000+',
      stripStat1Label: 'pytań o lokale zadają Polacy asystentom AI każdego dnia',
      stripStat2Val: '2-3',
      stripStat2Label: 'nazwy lokali padają w rekomendacji asystenta',
      stripStat3Val: '0 zł',
      stripStat3Label: 'płacisz za każde polecenie po zbudowaniu widoczności',
      stripStat4Val: '5-7 dni',
      stripStat4Label: 'trwa pełna konfiguracja fundamentów obecności w AI',

      vsLabel: 'Moment Prawdy',
      vsH2: 'To samo pytanie turysty.<br><em>Tylko jeden lokal zarabia.</em>',
      vsSub: 'Gdy ktoś pyta asystenta AI o rekomendację, modele nie losują odpowiedzi. Czerpią ze spójnych profili bazowych i map.',
      vsBadBadge: 'Bez optymalizacji GEO',
      vsBadTitle: 'AI nie wie, że istniejesz',
      vsBad1: 'Klient pyta o Twój profil usług. Na liście poleceń jest wyłącznie konkurencja.',
      vsBad2: 'Dane w Apple Maps i modelach są niekompletne, błędne lub nieistniejące.',
      vsBad3: 'Płacisz krocie za tradycyjne reklamy, które ludzie po prostu przewijają.',
      vsBad4: 'Każdy dzień zwłoki to dziesiątki gości, którzy poszli do lokalu obok.',
      vsGoodBadge: 'Z NotASlop',
      vsGoodTitle: 'AI zna Twój lokal i poleca go #1',
      vsGood1: 'Na kluczowe pytania w okolicy Twoja nazwa pada na podium rekomendacji.',
      vsGood2: 'Kompletny profil bazowy: godziny, autorskie zdjęcia, atrybuty i opinie.',
      vsGood3: 'Klient trafia prosto do Twoich drzwi bez pośredników i drogich prowizji.',
      vsGood4: 'Raz wypracowana pozycja w grafie wiedzy AI rośnie z każdym kolejnym miesiącem.',

      calcLabel: 'Policz sam',
      calcH2: 'Ile kosztuje niewidzialność w AI?',
      calcSub: 'Sprawdź, ile obrotu miesięcznie tracisz na rzecz konkurencji, którą asystenci AI polecają zamiast Ciebie.',
      calcGuestsLabel: 'Ilu gości/klientów obsługujesz dziennie?',
      calcTicketLabel: 'Średni rachunek / wydatek klienta:',
      calcResultTag: 'Szacunkowa miesięczna strata przy braku GEO',
      calcResultSub: 'Tyle przychodu może uciekać do polecanej przez AI konkurencji w Twojej dzielnicy (zakładając ~8% zapytań przez AI).',
      calcCta: 'Odzyskaj tych klientów →',

      proofLabel: 'Rezultaty',
      proofH2: 'Twarde dane z wdrożeń GEO',
      proofSub: 'Nie obiecujemy cudów — budujemy mierzalną widoczność potwierdzoną w panelach analitycznych.',
      proof1Val: '+184%',
      proof1Tag: 'Kawiarnia Specialty · Kraków',
      proof1Desc: 'Wzrost zapytań o trasę dojazdu w Apple Maps w 45 dni od pełnej konfiguracji grafu wiedzy i wizytówki.',
      proof2Val: '#1 polecenie',
      proof2Tag: 'Włoskie Bistro · Warszawa',
      proof2Desc: 'Stałe pierwsze miejsce w odpowiedziach ChatGPT i Siri na zapytanie o najlepszą pizzę w promieniu 1.5 km.',
      proof3Val: '+92 rezerwacje',
      proof3Tag: 'Restauracja Autorska · Gdańsk',
      proof3Desc: 'Miesięczny przyrost bezpośrednich rezerwacji od gości zagranicznych korzystających z asystentów podróży AI.',

      processLabel: 'Jak działamy',
      processH2: 'Ty prowadzisz biznes.<br><em>My dbamy o to, by AI o Tobie wiedziało.</em>',
      processSub: 'Trzy proste kroki, które zamieniają niewidzialność w strumień poleceń.',
      step1Num: '01',
      step1Title: 'Bezpłatny Audyt Widoczności',
      step1Desc: '15 minut. Na żywo sprawdzamy, co ChatGPT, Gemini i Siri mówią dziś o Twojej branży w Twojej okolicy i czy w ogóle Cię widzą.',
      step2Num: '02',
      step2Title: 'Konfiguracja Fundamentów',
      step2Desc: 'Strukturyzujemy dane, profile w mapach Apple i ekosystemie baz wiedzy. Zapewniamy kompletne atrybuty, z których AI buduje polecenia.',
      step3Num: '03',
      step3Title: 'Miesięczna Ochrona Pozycji',
      step3Desc: 'Algorytmy ewoluują, a my trzymamy rękę na pulsie. Co miesiąc otrzymujesz czytelny raport: wyświetlenia, wyznaczone trasy i pozycje.',

      auditLabel: 'Zacznij tutaj',
      auditH2: 'Sprawdź widoczność swojego lokalu w AI',
      auditSub: 'Bez sztywnego cennika z półki. Najpierw robimy bezpłatny pomiar: pokazujemy, czy asystenci AI wymieniają Twój lokal i kto zgarnia polecenia w Twojej dzielnicy.',
      auditExclTitle: 'Zasada wyłączności terytorialnej',
      auditExclText: 'W danej kategorii i konkretnej okolicy współpracujemy tylko z ograniczoną liczbą lokali. Nie pozycjonujemy dwóch sąsiadujących kawiarni przeciwko sobie.',
      auditFormTitle: 'Zamów bezpłatny audyt AI',
      auditFormSub: 'Zajmie Ci to 30 sekund. Wyniki odeślemy na wybrany kontakt.',
      lblVenue: 'Nazwa Twojego lokalu / firmy',
      lblCity: 'Miasto / Dzielnica',
      lblCategory: 'Branża',
      lblContact: 'Twój WhatsApp lub telefon / e-mail',
      catCoffee: 'Kawiarnia / Cukiernia',
      catResto: 'Restauracja / Bar',
      catBeauty: 'Salon Beauty / Barber',
      catService: 'Usługi / Zdrowie / Inne',
      btnAuditWa: 'Sprawdź przez WhatsApp (1 kliknięcie)',
      btnAuditDirect: 'Wyślij zgłoszenie formularzem',
      auditGuarantee: '🔒 100% bezpłatnie, bez żadnych zobowiązań. Odpisujemy w max 2 godziny.',

      faqLabel: 'Częste pytania',
      faqH2: 'Wszystko, co chcesz wiedzieć o GEO',
      faqSub: 'Odpowiedzi na najważniejsze pytania o pozycjonowanie w modelach językowych.',
      faq1Q: 'Czym dokładnie jest pozycjonowanie w AI (GEO)?',
      faq1A: 'GEO (Generative Engine Optimization) to działania sprawiające, że Twoja firma pojawia się w bezpośrednich odpowiedziach asystentów takich jak ChatGPT, Google Gemini, Claude, Perplexity czy Apple Siri. W odróżnieniu od klasycznego SEO, asystent nie daje 10 linków, lecz podaje 2-3 konkretne rekomendacje.',
      faq2Q: 'Czy naprawdę da się wpłynąć na to, co poleca ChatGPT i Gemini?',
      faq2A: 'Tak. Modele językowe nie wymyślają faktów z powietrza — czerpią z ustrukturyzowanych źródeł danych, indeksów Apple Maps, recenzji, danych Schema.org oraz spójności informacji w sieci. Porządkując i wzmacniając te sygnały, dajemy modelom jednoznaczny dowód na wiarygodność Twojego lokalu.',
      faq3Q: 'Jak szybko widać pierwsze efekty?',
      faq3A: 'Pierwsze zmiany w odpowiedziach asystentów pojawiają się z reguły w ciągu 3-6 tygodni od wdrożenia uporządkowanych danych. Pełna stabilizacja pozycji w grafie wiedzy AI następuje w kolejnych miesiącach.',
      faq4Q: 'Ile kosztuje pozycjonowanie w NotASlop?',
      faq4A: 'Każdy lokal ma inną specyfikację i poziom konkurencji w swojej okolicy. Z tego względu nie stosujemy sztywnego cennika z półki — zaczynamy od bezpłatnego audytu widoczności, a propozycję współpracy przygotowujemy indywidualnie pod Twój biznes.',
      faq5Q: 'Czym GEO różni się od klasycznego SEO w Google?',
      faq5A: 'SEO walczy o pozycję linku w przeglądarce, gdy użytkownik ręcznie wpisuje hasło. GEO walczy o to, by Twoja nazwa padła w rozmowie, gdy użytkownik mówi: „Siri, gdzie zjeść dobry obiad w pobliżu?”. To znacznie wyższa intencja zakupowa klienta.',

      footerDesc: 'Agencja Generative Engine Optimization (GEO). Sprawiamy, że asystenci AI polecają Twój lokal zamiast konkurencji.',
      footerColNav: 'Nawigacja',
      footerColLegal: 'Dokumenty',
      footerColContact: 'Kontakt',
      footerRegulamin: 'Regulamin świadczenia usług',
      footerPrivacy: 'Polityka prywatności',
      footerCopy: '© 2026 NotASlop. Wszelkie prawa zastrzeżone.'
    },

    en: {
      navJak: 'How it works',
      navVersus: 'Why GEO',
      navKalkulator: 'Loss calculator',
      navWyniki: 'Results',
      navCennik: 'Free audit',
      navBlog: 'Blog',
      navKontakt: 'Contact',
      navCta: 'Free AI Check',

      heroEyebrow: 'AI Visibility in ChatGPT · Gemini · Apple Maps',
      heroH1: 'A tourist just asked<br>where to go.<br><em>AI recommended three places.</em>',
      heroSub: 'Not ten pages of search links like Google. <strong>Two or three names.</strong> That question is asked in your neighborhood every single day — and the short list goes to who AI knows best.',
      heroCtaPrimary: 'Claim your spot',
      heroCtaGhost: 'See how it works',
      heroTrustText: 'AI platforms we optimize for:',

      simTitle: 'AI Phone Assistant',
      simOnline: 'Ready to answer',
      simBeforeBtn: '🔴 Before GEO optimization',
      simAfterBtn: '🟢 With NotASlop',

      stripStat1Val: '150,000+',
      stripStat1Label: 'daily local recommendations asked to AI assistants',
      stripStat2Val: '2-3',
      stripStat2Label: 'venues mentioned in assistant responses',
      stripStat3Val: '0€ / $0',
      stripStat3Label: 'paid per recommendation once presence is established',
      stripStat4Val: '5-7 days',
      stripStat4Label: 'to fully configure baseline AI knowledge profile',

      vsLabel: 'Moment of Truth',
      vsH2: 'The exact same question.<br><em>Only one venue earns.</em>',
      vsSub: 'When someone asks AI for a recommendation, models do not pick randomly. They cite verified baseline knowledge graphs and maps.',
      vsBadBadge: 'Without GEO',
      vsBadTitle: 'AI does not know you exist',
      vsBad1: 'A customer searches your category. The AI only lists your competitors.',
      vsBad2: 'Profiles in Apple Maps & AI graphs are missing, outdated or incomplete.',
      vsBad3: 'You spend heavily on legacy ads that tourists and users scroll past.',
      vsBad4: 'Every passing day sends dozens of ready-to-buy guests to the venue next door.',
      vsGoodBadge: 'With NotASlop',
      vsGoodTitle: 'AI knows your place & recommends it #1',
      vsGood1: 'For top local queries, your venue is recommended right at the top.',
      vsGood2: 'Complete baseline graph: hours, photos, attributes, and genuine reviews.',
      vsGood3: 'Customers arrive at your doorstep directly without commissions.',
      vsGood4: 'Once built, your authority in AI models compounds month over month.',

      calcLabel: 'Calculate Loss',
      calcH2: 'How much does AI invisibility cost?',
      calcSub: 'Estimate how much revenue you lose every month to competitors that AI assistants recommend instead of you.',
      calcGuestsLabel: 'How many customers do you serve daily?',
      calcTicketLabel: 'Average customer bill / spend:',
      calcResultTag: 'Estimated monthly revenue loss without GEO',
      calcResultSub: 'Revenue lost to competitors recommended by AI in your neighborhood (based on ~8% of queries moving to AI).',
      calcCta: 'Recover these customers →',

      proofLabel: 'Proven Results',
      proofH2: 'Hard data from GEO deployments',
      proofSub: 'We don\'t promise magic — we build measurable visibility verified across analytics dashboards.',
      proof1Val: '+184%',
      proof1Tag: 'Specialty Cafe · Krakow',
      proof1Desc: 'Increase in directions requests on Apple Maps within 45 days of baseline entity optimization.',
      proof2Val: '#1 Pick',
      proof2Tag: 'Italian Bistro · Warsaw',
      proof2Desc: 'Consistent top recommendation in ChatGPT & Siri for Italian dining within 1.5 km.',
      proof3Val: '+92 bookings',
      proof3Tag: 'Dining · Gdansk',
      proof3Desc: 'Monthly increase in direct reservations from international tourists asking AI travel assistants.',

      processLabel: 'Our Process',
      processH2: 'You run your venue.<br><em>We make sure AI recommends you.</em>',
      processSub: 'Three simple steps to transform invisibility into consistent recommendations.',
      step1Num: '01',
      step1Title: 'Free Visibility Audit',
      step1Desc: '15 minutes. We show you live what ChatGPT, Gemini, and Siri say about your niche and area today.',
      step2Num: '02',
      step2Title: 'Entity & Foundation Setup',
      step2Desc: 'We structure your data, Apple Maps profiles, and citation signals so AI models cite you with confidence.',
      step3Num: '03',
      step3Title: 'Continuous Position Monitoring',
      step3Desc: 'Algorithms update constantly. We track changes and provide monthly reports with views, routes, and rankings.',

      auditLabel: 'Get Started',
      auditH2: 'Check your venue\'s visibility in AI',
      auditSub: 'No rigid off-the-shelf pricing. We start with a free audit: we check if AI assistants mention your venue and who gets recommended in your area.',
      auditExclTitle: 'Territorial Exclusivity',
      auditExclText: 'In each specific neighborhood and category, we only partner with a limited number of venues to prevent conflicts of interest.',
      auditFormTitle: 'Request your free AI audit',
      auditFormSub: 'Takes 30 seconds. We send the detailed report directly to you.',
      lblVenue: 'Venue or Business Name',
      lblCity: 'City / District',
      lblCategory: 'Category',
      lblContact: 'Your WhatsApp / Phone or Email',
      catCoffee: 'Cafe / Bakery',
      catResto: 'Restaurant / Bar',
      catBeauty: 'Beauty / Barber / Salon',
      catService: 'Services / Health / Other',
      btnAuditWa: 'Check via WhatsApp (1-Click)',
      btnAuditDirect: 'Send inquiry via form',
      auditGuarantee: '🔒 100% free, no obligations. We respond within 2 hours during business days.',

      faqLabel: 'FAQ',
      faqH2: 'Everything you need to know about GEO',
      faqSub: 'Answers to key questions on how Generative Engine Optimization works.',
      faq1Q: 'What exactly is GEO (Generative Engine Optimization)?',
      faq1A: 'GEO is the discipline of optimizing your business to be recommended directly in conversational AI responses from ChatGPT, Google Gemini, Claude, Perplexity, and Apple Siri.',
      faq2Q: 'Can you really influence what ChatGPT and Gemini recommend?',
      faq2A: 'Yes. AI models do not invent facts; they synthesize structured entity data, Apple Maps knowledge, verified reviews, and consistent web citations. By structuring these signals, we provide verifiable proof of your venue\'s quality.',
      faq3Q: 'How fast do you see results?',
      faq3A: 'Initial changes in AI responses typically appear within 3 to 6 weeks after structured data and entity maps are established.',
      faq4Q: 'How much does NotASlop service cost?',
      faq4A: 'Every business has different competition levels and needs. We don\'t enforce rigid fixed plans — we begin with a free AI audit and craft an individualized proposal tailored specifically to your venue.',
      faq5Q: 'How does GEO differ from classic Google SEO?',
      faq5A: 'SEO targets a list of 10 blue links in a desktop browser. GEO ensures your name is spoken when a user asks: "Siri, where is a good coffee nearby?". This catches customers at the peak of buying intent.',

      footerDesc: 'Generative Engine Optimization agency. Making AI assistants recommend your business instead of competitors.',
      footerColNav: 'Navigation',
      footerColLegal: 'Legal',
      footerColContact: 'Contact',
      footerRegulamin: 'Terms of Service',
      footerPrivacy: 'Privacy Policy',
      footerCopy: '© 2026 NotASlop. All rights reserved.'
    }
  };

  // ── 2. PHONE SIMULATOR DATA ──
  const SIM_SCENARIOS = {
    coffee: {
      pl: {
        userQ: 'Jestem w centrum. Polecisz mi świetną kawiarnię speciality blisko mnie?',
        beforeAI: 'W okolicy możesz sprawdzić: <span class="competitor">[Sieciówka A]</span> lub <span class="competitor">[Kawiarnia B]</span>. Obie są parę minut stąd.',
        afterAI: 'Zdecydowanie polecam <span class="top-pick">Twoją Kawiarnię</span>! Mają wybitne single-origin, autorskie wypieki i 4.9 gwiazdki na mapach. Zaledwie 180 metrów stąd. Podać trasę?'
      },
      en: {
        userQ: 'I\'m in the city center. Can you recommend a great specialty coffee nearby?',
        beforeAI: 'Nearby you could check: <span class="competitor">[Chain Cafe A]</span> or <span class="competitor">[Cafe B]</span>. Both are a short walk away.',
        afterAI: 'I definitely recommend <span class="top-pick">Your Cafe</span>! Outstanding single-origin roasts, artisan pastries and 4.9 stars on maps. Just 180m away. Want walking directions?'
      }
    },
    resto: {
      pl: {
        userQ: 'Szukam klimatycznego miejsca na autorską kolację ze znajomymi.',
        beforeAI: 'Sprawdź: <span class="competitor">[Restauracja X]</span> albo <span class="competitor">[Bistro Y]</span>.',
        afterAI: 'Wybierz <span class="top-pick">Twoją Restaurację</span>! Sezonowe menu, genialny wybór win i świetna atmosfera. Goście zachwalają krewetki i ręczny makaron. Zarezerwować stolik?'
      },
      en: {
        userQ: 'Looking for an atmospheric dinner spot with friends tonight.',
        beforeAI: 'You could try: <span class="competitor">[Restaurant X]</span> or <span class="competitor">[Bistro Y]</span>.',
        afterAI: 'Choose <span class="top-pick">Your Restaurant</span>! Seasonal menu, brilliant wine list and cozy patio. Rave reviews for fresh handmade pasta. Should I show contact details?'
      }
    },
    barber: {
      pl: {
        userQ: 'Polecisz dobrego fryzjera lub barbera w okolicy?',
        beforeAI: 'Polecane salony to: <span class="competitor">[Barber Z]</span> i <span class="competitor">[Studio W]</span>.',
        afterAI: 'Sprawdź <span class="top-pick">Twój Barber Shop</span>. Precyzyjne strzyżenie, pielęgnacja brody gorącym ręcznikiem i setki pozytywnych recenzji w Apple Maps. Pokazać telefon do zapisu?'
      },
      en: {
        userQ: 'Can you recommend a reputable barber or salon nearby?',
        beforeAI: 'Venues with reviews include: <span class="competitor">[Barber Z]</span> and <span class="competitor">[Studio W]</span>.',
        afterAI: 'Check out <span class="top-pick">Your Barber Shop</span>. Top-rated master barbers, hot towel treatment and stellar reviews in Apple Maps. Show phone number for booking?'
      }
    },
    service: {
      pl: {
        userQ: 'Polecany gabinet fizjoterapii / stomatologiczny blisko mnie?',
        beforeAI: 'W okolicy znajdują się: <span class="competitor">[Klinika 1]</span> oraz <span class="competitor">[Centrum 2]</span>.',
        afterAI: 'Najwyżej oceniany jest <span class="top-pick">Twój Gabinet</span>. Nowoczesny sprzęt, certyfikowani specjaliści i szybkie terminy przyjęć. Wyświetlić trasę dojazdu?'
      },
      en: {
        userQ: 'Recommended physical therapy or dental clinic near me?',
        beforeAI: 'Nearby facilities: <span class="competitor">[Clinic 1]</span> and <span class="competitor">[Center 2]</span>.',
        afterAI: 'Highest rated is <span class="top-pick">Your Clinic</span>. State-of-the-art equipment, certified specialists and convenient appointments. Want directions?'
      }
    }
  };

  // ── STATE ──
  let currentLang = 'pl';
  let currentScenario = 'coffee';
  let currentSimMode = 'after'; // 'before' | 'after'
  let simTimer = null;

  // ── 3. I18N ENGINE ──
  function setLanguage(lang) {
    if (!T[lang]) lang = 'pl';
    currentLang = lang;
    try {
      localStorage.setItem('notaslop_lang', lang);
    } catch (e) {}

    // Update buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (T[lang][key]) {
        el.textContent = T[lang][key];
      }
    });

    // Update elements with data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (T[lang][key]) {
        el.innerHTML = T[lang][key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (T[lang][key]) {
        el.placeholder = T[lang][key];
      }
    });

    // Refresh simulator and calculator with current lang
    renderSimulator();
    updateCalculator();
  }

  // ── 4. SIMULATOR LOGIC ──
  function renderSimulator() {
    clearTimeout(simTimer);
    const chatBody = document.getElementById('phoneChatBody');
    if (!chatBody) return;

    const scenario = SIM_SCENARIOS[currentScenario][currentLang];
    const aiResponseText = currentSimMode === 'after' ? scenario.afterAI : scenario.beforeAI;

    chatBody.innerHTML = `
      <div class="chat-bubble user" id="simUserMsg" style="display:none;">${scenario.userQ}</div>
      <div class="chat-typing" id="simTyping" style="display:none;"><span></span><span></span><span></span></div>
      <div class="chat-bubble ai" id="simAiMsg" style="display:none;">${aiResponseText}</div>
    `;

    const userMsg = document.getElementById('simUserMsg');
    const typing = document.getElementById('simTyping');
    const aiMsg = document.getElementById('simAiMsg');

    simTimer = setTimeout(() => {
      if (userMsg) userMsg.style.display = 'block';
      simTimer = setTimeout(() => {
        if (typing) typing.style.display = 'inline-flex';
        simTimer = setTimeout(() => {
          if (typing) typing.style.display = 'none';
          if (aiMsg) aiMsg.style.display = 'block';
        }, 1200);
      }, 500);
    }, 200);
  }

  function setupSimulator() {
    // Mode toggle buttons (Before / After)
    const modeBtns = document.querySelectorAll('.sim-mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSimMode = btn.dataset.mode;
        renderSimulator();
      });
    });

    // Scenario chips
    const chips = document.querySelectorAll('.sim-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentScenario = chip.dataset.scenario;
        renderSimulator();
      });
    });

    renderSimulator();
  }

  // ── 5. CALCULATOR LOGIC ──
  function updateCalculator() {
    const guestsSlider = document.getElementById('calcGuestsSlider');
    const ticketSlider = document.getElementById('calcTicketSlider');
    const guestsVal = document.getElementById('calcGuestsVal');
    const ticketVal = document.getElementById('calcTicketVal');
    const resultDisplay = document.getElementById('calcResultDisplay');

    if (!guestsSlider || !ticketSlider) return;

    const guests = parseInt(guestsSlider.value, 10);
    const ticket = parseInt(ticketSlider.value, 10);

    if (guestsVal) guestsVal.textContent = guests;
    if (ticketVal) ticketVal.textContent = currentLang === 'pl' ? `${ticket} zł` : `${ticket} PLN`;

    // Formula: ~8% of total visitors seek AI recommendations.
    // Over a month (30 days), this equals guests * 30 * 0.08 lost potential clients.
    const monthlyLostGuests = Math.round(guests * 30 * 0.08);
    const totalLost = monthlyLostGuests * ticket;

    const formattedAmount = new Intl.NumberFormat(currentLang === 'pl' ? 'pl-PL' : 'en-US').format(totalLost);

    if (resultDisplay) {
      resultDisplay.textContent = currentLang === 'pl' ? `${formattedAmount} zł` : `${formattedAmount} PLN`;
    }
  }

  function setupCalculator() {
    const guestsSlider = document.getElementById('calcGuestsSlider');
    const ticketSlider = document.getElementById('calcTicketSlider');

    if (guestsSlider) guestsSlider.addEventListener('input', updateCalculator);
    if (ticketSlider) ticketSlider.addEventListener('input', updateCalculator);

    updateCalculator();
  }

  // ── 6. AUDIT FORM & WHATSAPP LOGIC ──
  function setupAuditForm() {
    const form = document.getElementById('auditForm');
    const btnWa = document.getElementById('btnAuditWa');
    if (!form) return;

    function buildWhatsAppUrl() {
      const venue = document.getElementById('auditVenue')?.value.trim() || 'Mój lokal';
      const city = document.getElementById('auditCity')?.value.trim() || 'Moje miasto';
      const cat = document.getElementById('auditCategory')?.value || 'Gastronomia';

      const text = currentLang === 'pl'
        ? `Cześć NotASlop! Chcę zamówić bezpłatny audyt widoczności w AI (GEO).\n\n• Lokal: ${venue}\n• Miasto: ${city}\n• Branża: ${cat}\n\nSprawdźcie proszę, jak widzą nas ChatGPT i Apple Maps.`
        : `Hello NotASlop! I would like to request a free AI visibility audit (GEO).\n\n• Venue: ${venue}\n• City: ${city}\n• Category: ${cat}\n\nPlease check our presence in ChatGPT and Apple Maps.`;

      return `https://wa.me/48607118228?text=${encodeURIComponent(text)}`;
    }

    if (btnWa) {
      btnWa.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Also open WhatsApp directly for instant response
      window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
    });
  }

  // ── 7. ACCORDION ENHANCEMENTS ──
  function setupAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          faqItems.forEach(other => {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  }

  // ── 8. GEO IP DETECTION (Privacy-friendly, fallback resilient) ──
  function detectCity() {
    fetch('https://ipwho.is/?fields=city,country_code,success')
      .then(r => r.json())
      .then(d => {
        if (d && d.success !== false && d.city) {
          const cityInput = document.getElementById('auditCity');
          if (cityInput && !cityInput.value) {
            cityInput.value = d.city;
          }
        }
      })
      .catch(() => {
        // Silently fallback without throwing errors
      });
  }

  // ── 9. MOBILE MENU DRAWER ──
  function setupMobileMenu() {
    const toggle = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileNavDrawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen ? '✕' : '☰';
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      });
    });
  }

  // ── INITIALIZATION ──
  document.addEventListener('DOMContentLoaded', () => {
    // Determine language
    let savedLang = 'pl';
    try {
      savedLang = localStorage.getItem('notaslop_lang');
    } catch (e) {}

    if (!savedLang) {
      const browserLang = (navigator.language || 'pl').toLowerCase();
      savedLang = browserLang.startsWith('pl') ? 'pl' : 'en';
    }

    // Language buttons click handlers
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
      });
    });

    setupSimulator();
    setupCalculator();
    setupAuditForm();
    setupAccordion();
    setupMobileMenu();
    setLanguage(savedLang);
    detectCity();
  });
})();
