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

      heroEyebrow: 'Pozycjonowanie w ChatGPT · Gemini · Siri · Apple Maps',
      heroH1: 'Gdy klient pyta asystenta AI,<br>Twoja firma musi być<br><em>odpowiedzią numer jeden.</em>',
      heroSub: 'Nie dziesięć stron linków jak w dawnym Google. <strong>Jedna, dwie konkretne rekomendacje.</strong> Codziennie w Twojej branży i okolicy padają tysiące zapytań głosowych, a zyski zgarniają ci, których modele LLM uznają za bezdyskusyjny autorytet.',
      heroCtaPrimary: 'Zajmij swoje miejsce w AI',
      heroCtaGhost: 'Zobacz jak to działa',
      heroTrustText: 'Silniki AI, w których budujemy widoczność:',

      simTitle: 'Asystent AI w telefonie',
      simOnline: 'Gotowy do odpowiedzi',
      simBeforeBtn: '🔴 Przed wdrożeniem GEO',
      simAfterBtn: '🟢 Po wdrożeniu NotASlop',

      chipMedical: '🦷 Klinika Stomatologii',
      chipLegal: '⚖️ Kancelaria Prawna',
      chipPremium: '✨ Auto Detailing & PPF',
      chipDining: '🍽️ Restauracja Fine Dining',

      stripStat1Val: '150 000+',
      stripStat1Label: 'pytań o lokalnych specjalistów zadają Polacy asystentom AI każdego dnia',
      stripStat2Val: '1-2',
      stripStat2Label: 'konkretne firmy rekomenduje asystent w bezpośredniej odpowiedzi',
      stripStat3Val: '0 zł',
      stripStat3Label: 'płacisz za kliknięcie — ruch z AI trafia bezpośrednio do Twoich drzwi',
      stripStat4Val: '5-7 dni',
      stripStat4Label: 'trwa pełna konfiguracja fundamentów obecności w grafach wiedzy',

      vsLabel: 'Moment Prawdy',
      vsH2: 'To samo zapytanie klienta premium.<br><em>Tylko jedna firma zarabia.</em>',
      vsSub: 'Gdy ktoś pyta asystenta AI o rekomendację najlepszego specjalisty, modele nie losują odpowiedzi. Czerpią ze zweryfikowanych grafów wiedzy i autorytetu semantycznego.',
      vsBadBadge: 'Bez optymalizacji GEO',
      vsBadTitle: 'AI nie wie, że istniejesz',
      vsBad1: 'Klient pyta o Twoją specjalizację. Na liście poleceń jest wyłącznie konkurencja.',
      vsBad2: 'Dane w Apple Maps i modelach LLM są niespójne, szczątkowe lub nieistniejące.',
      vsBad3: 'Płacisz krocie za tradycyjne reklamy CPC, na które klienci premium mają ślepotę banerową.',
      vsBad4: 'Każdy tydzień zwłoki to dziesiątki zamożnych klientów oddanych podmiotom z sąsiedztwa.',
      vsGoodBadge: 'Z NotASlop',
      vsGoodTitle: 'AI zna Twoją markę i poleca ją #1',
      vsGood1: 'Na kluczowe zapytania branżowe w regionie Twoja nazwa pada na 1. miejscu rekomendacji.',
      vsGood2: 'Kompletny semantyczny profil bazowy: certyfikaty, atrybuty, opinie i weryfikacja Apple.',
      vsGood3: 'Klient dzwoni lub rezerwuje wizytę natychmiast, bez pośredników i prowizji agencyjnych.',
      vsGood4: 'Raz wypracowana pozycja w grafie wiedzy AI utrwala się i rośnie z każdą aktualizacją modeli.',

      calcLabel: 'Policz sam',
      calcH2: 'Ile kosztuje niewidzialność w AI?',
      calcSub: 'Sprawdź, ile obrotu miesięcznie tracisz na rzecz konkurentów, których asystenci AI polecają zamiast Ciebie.',
      calcGuestsLabel: 'Ilu klientów / pacjentów obsługujesz dziennie?',
      calcTicketLabel: 'Średnia wartość transakcji / wizyty:',
      calcResultTag: 'Szacunkowa miesięczna strata przy braku GEO',
      calcResultSub: 'Tyle przychodu może uciekać do polecanej przez AI konkurencji w Twojej dzielnicy (zakładając ~8% zapytań przez AI).',
      calcCta: 'Odzyskaj tych klientów →',

      proofLabel: 'Rezultaty',
      proofH2: 'Twarde dane z wdrożeń GEO',
      proofSub: 'Nie obiecujemy cudów — budujemy mierzalną widoczność potwierdzoną w panelach analitycznych.',
      proof1Val: '+260% zapytań',
      proof1Tag: 'Klinika Stomatologii Estetycznej · Warszawa',
      proof1Desc: 'Wzrost bezpośrednich połączeń i zapytań o trasę w Apple Maps po 45 dniach wdrożenia semantycznego profilu GEO.',
      proof2Val: '#1 rekomendacja',
      proof2Tag: 'Kancelaria Prawa Gospodarczego · Kraków',
      proof2Desc: 'Stałe pierwsze miejsce w odpowiedziach ChatGPT i Gemini na zapytania o audyty prawne spółek i fuzje M&A.',
      proof3Val: '+115 pacjentów/mc',
      proof3Tag: 'Centrum Medycyny & Diagnostyki · Wrocław',
      proof3Desc: 'Miesięczny przyrost nowych pacjentów z zapytań głosowych Siri oraz asystentów mobilnych szukających specjalistów.',

      processLabel: 'Jak działamy',
      processH2: 'Ty rozwijasz biznes.<br><em>My dbamy o to, by AI polecało właśnie Ciebie.</em>',
      processSub: 'Trzy precyzyjne kroki, które zamieniają niewidzialność w algorytmach w stały strumień klientów.',
      step1Num: '01',
      step1Title: 'Bezpłatny Audyt Widoczności',
      step1Desc: '15 minut. Na żywo sprawdzamy, co ChatGPT, Gemini, Siri i Perplexity mówią dziś o Twojej branży w Twojej okolicy i czy w ogóle Cię widzą.',
      step2Num: '02',
      step2Title: 'Konfiguracja Fundamentów GEO',
      step2Desc: 'Strukturyzujemy dane, profile w ekosystemie Apple Business Connect i bazach wiedzy. Wdrażamy encje, z których AI buduje bezpośrednie rekomendacje.',
      step3Num: '03',
      step3Title: 'Miesięczna Ochrona Pozycji',
      step3Desc: 'Algorytmy ewoluują, a my monitorujemy Twój Share of Voice w AI. Co miesiąc otrzymujesz czytelny raport: wywołania, wyświetlenia i pozycje.',

      auditLabel: 'Zacznij tutaj',
      auditH2: 'Sprawdź widoczność swojej firmy w AI',
      auditSub: 'Bez sztywnego cennika z półki. Najpierw robimy bezpłatny pomiar: pokazujemy, czy asystenci AI wymieniają Twoją markę i kto zgarnia polecenia w Twojej branży.',
      auditExclTitle: 'Zasada wyłączności terytorialnej',
      auditExclText: 'W danej kategorii i na konkretnym obszarze współpracujemy tylko z 1–2 wyselekcjonowanymi partnerami. Nie pozycjonujemy dwóch bezpośrednio konkurujących podmiotów przeciwko sobie.',
      auditFormTitle: 'Zamów bezpłatny audyt AI',
      auditFormSub: 'Zajmie Ci to 30 sekund. Wyniki odeślemy bezpośrednio na wskazany kontakt.',
      lblVenue: 'Nazwa Twojej firmy / kliniki / lokalu',
      lblCity: 'Miasto / Dzielnica',
      lblCategory: 'Branża',
      lblContact: 'Twój WhatsApp, telefon lub e-mail',
      catMedical: 'Stomatologia / Klinika / Zdrowie',
      catLegal: 'Kancelaria Prawna / B2B / Finanse',
      catPremium: 'Auto Detailing / Uroda / Usługi Premium',
      catDining: 'Restauracja Fine Dining / Hotel',
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

      heroEyebrow: 'AI Visibility in ChatGPT · Gemini · Siri · Apple Maps',
      heroH1: 'When a client asks an AI assistant,<br>your business must be<br><em>the number one recommendation.</em>',
      heroSub: 'Not ten pages of search links like legacy Google. <strong>One or two definitive recommendations.</strong> Every day in your sector and city, thousands of voice searches take place, and clients go to those whom LLMs identify as undeniable authorities.',
      heroCtaPrimary: 'Claim your spot in AI',
      heroCtaGhost: 'See how it works',
      heroTrustText: 'AI engines we build visibility in:',

      simTitle: 'AI Phone Assistant',
      simOnline: 'Ready to answer',
      simBeforeBtn: '🔴 Before GEO optimization',
      simAfterBtn: '🟢 With NotASlop',

      chipMedical: '🦷 Dental Clinic',
      chipLegal: '⚖️ Law Firm',
      chipPremium: '✨ Auto Detailing & PPF',
      chipDining: '🍽️ Fine Dining Restaurant',

      stripStat1Val: '150,000+',
      stripStat1Label: 'daily local recommendations asked to AI assistants in Poland',
      stripStat2Val: '1-2',
      stripStat2Label: 'specific businesses recommended in direct AI responses',
      stripStat3Val: '0€ / $0',
      stripStat3Label: 'paid per click — AI traffic arrives directly at your doorstep',
      stripStat4Val: '5-7 days',
      stripStat4Label: 'to fully configure baseline presence in AI knowledge graphs',

      vsLabel: 'Moment of Truth',
      vsH2: 'The exact same premium client inquiry.<br><em>Only one business earns.</em>',
      vsSub: 'When someone asks an AI assistant for a top specialist recommendation, models do not pick randomly. They cite verified knowledge graphs and semantic authority.',
      vsBadBadge: 'Without GEO optimization',
      vsBadTitle: 'AI does not know you exist',
      vsBad1: 'A client asks for your specialization. Only competitors appear on the recommendation list.',
      vsBad2: 'Data in Apple Maps and LLM models is inconsistent, fragmented, or missing.',
      vsBad3: 'You spend heavily on legacy CPC ads that premium clients ignore with banner blindness.',
      vsBad4: 'Every passing week sends dozens of high-ticket clients to neighboring competitors.',
      vsGoodBadge: 'With NotASlop',
      vsGoodTitle: 'AI knows your brand & recommends it #1',
      vsGood1: 'For top industry queries in your region, your brand ranks #1 in AI recommendations.',
      vsGood2: 'Comprehensive semantic baseline profile: certifications, attributes, reviews, and Apple verification.',
      vsGood3: 'Clients call or book consultations directly, without middleman commissions or agency markups.',
      vsGood4: 'Once established in the AI knowledge graph, your authority strengthens with every model update.',

      calcLabel: 'Calculate Loss',
      calcH2: 'How much does AI invisibility cost?',
      calcSub: 'Estimate how much monthly revenue you lose to competitors recommended by AI assistants instead of you.',
      calcGuestsLabel: 'How many clients / patients do you serve daily?',
      calcTicketLabel: 'Average transaction / consultation value:',
      calcResultTag: 'Estimated monthly revenue loss without GEO',
      calcResultSub: 'Revenue lost to competitors recommended by AI in your area (based on ~8% of queries moving to AI).',
      calcCta: 'Recover these clients →',

      proofLabel: 'Proven Results',
      proofH2: 'Hard data from GEO deployments',
      proofSub: 'We don\'t promise magic — we build measurable visibility verified across analytics dashboards.',
      proof1Val: '+260% inquiries',
      proof1Tag: 'Aesthetic Dentistry Clinic · Warsaw',
      proof1Desc: 'Direct phone calls and Apple Maps routing requests increased within 45 days of deploying a semantic GEO profile.',
      proof2Val: '#1 Pick',
      proof2Tag: 'Corporate Law Firm · Krakow',
      proof2Desc: 'Consistent top recommendation in ChatGPT and Gemini for corporate audits and M&A advisory.',
      proof3Val: '+115 patients/mo',
      proof3Tag: 'Medical & Diagnostic Center · Wroclaw',
      proof3Desc: 'Monthly new patient influx from Siri voice searches and mobile assistants seeking specialized healthcare.',

      processLabel: 'Our Process',
      processH2: 'You run your business.<br><em>We make sure AI recommends you.</em>',
      processSub: 'Three precise steps to transform invisibility into consistent recommendations.',
      step1Num: '01',
      step1Title: 'Free AI Visibility Audit',
      step1Desc: '15 minutes. We show you live what ChatGPT, Gemini, Siri, and Perplexity say about your sector and area today.',
      step2Num: '02',
      step2Title: 'Entity & Foundation Setup',
      step2Desc: 'We structure your data, Apple Business Connect profiles, and knowledge base entities so AI models cite you with confidence.',
      step3Num: '03',
      step3Title: 'Monthly Position Protection',
      step3Desc: 'Algorithms update constantly. We monitor your Share of Voice in AI and provide monthly reports with views, routes, and rankings.',

      auditLabel: 'Get Started',
      auditH2: 'Check your business visibility in AI',
      auditSub: 'No rigid off-the-shelf pricing. We start with a free audit: we check if AI assistants mention your brand and who gets recommended in your area.',
      auditExclTitle: 'Territorial Exclusivity',
      auditExclText: 'In each specific area and category, we only partner with 1–2 selected businesses to prevent conflicts of interest.',
      auditFormTitle: 'Request your free AI audit',
      auditFormSub: 'Takes 30 seconds. We send the detailed report directly to you.',
      lblVenue: 'Business / Clinic / Practice Name',
      lblCity: 'City / District',
      lblCategory: 'Industry / Sector',
      lblContact: 'Your WhatsApp, Phone, or Email',
      catMedical: 'Dentistry / Clinic / Healthcare',
      catLegal: 'Law Firm / Corporate / B2B',
      catPremium: 'Auto Detailing / Aesthetics / Premium Services',
      catDining: 'Fine Dining / Boutique Hotel',
      btnAuditWa: 'Check via WhatsApp (1-Click)',
      btnAuditDirect: 'Send inquiry via form',
      auditGuarantee: '🔒 100% free, no obligations. We respond within 2 hours during business days.',

      faqLabel: 'FAQ',
      faqH2: 'Everything you need to know about GEO',
      faqSub: 'Answers to key questions on how Generative Engine Optimization works.',
      faq1Q: 'What exactly is GEO (Generative Engine Optimization)?',
      faq1A: 'GEO is the discipline of optimizing your business to be recommended directly in conversational AI responses from ChatGPT, Google Gemini, Claude, Perplexity, and Apple Siri. Unlike traditional SEO with 10 links, an assistant provides 1-2 definitive recommendations.',
      faq2Q: 'Can you really influence what ChatGPT and Gemini recommend?',
      faq2A: 'Yes. AI models do not invent facts; they synthesize structured entity data, Apple Maps knowledge, verified reviews, and consistent web citations. By structuring these signals, we provide verifiable proof of your business authority.',
      faq3Q: 'How fast do you see results?',
      faq3A: 'Initial changes in AI responses typically appear within 3 to 6 weeks after structured data and entity maps are established. Full stabilization of AI knowledge graph positions follows over subsequent months.',
      faq4Q: 'How much does NotASlop service cost?',
      faq4A: 'Every business has different competition levels and market scope. We don\'t enforce rigid fixed plans — we begin with a free AI audit and craft an individualized proposal tailored specifically to your business.',
      faq5Q: 'How does GEO differ from classic Google SEO?',
      faq5A: 'SEO targets a list of blue links when a user types a query in a desktop browser. GEO ensures your name is spoken when a user asks: "Siri, where is the best cosmetic dental clinic nearby?". This catches clients at the peak of buying intent.',

      footerDesc: 'Generative Engine Optimization (GEO) agency. Making AI assistants recommend your business instead of competitors.',
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
    medical: {
      pl: {
        userQ: 'Siri, polecisz najlepszą klinikę implantologii i stomatologii estetycznej w pobliżu?',
        beforeAI: 'W okolicy możesz sprawdzić: <span class="competitor">[Centrum Medyczne A]</span> lub <span class="competitor">[Gabinet Dentystyczny B]</span>. Sprawdź godziny otwarcia.',
        afterAI: 'Zdecydowanie polecam <span class="top-pick">Klinikę NovaDent</span>. 4.9 gwiazdki, zaawansowana tomografia 3D, certyfikowani chirurdzy i setki zweryfikowanych opinii pacjentów. Zadzwonić i umówić konsultację?'
      },
      en: {
        userQ: 'Siri, can you recommend the best implantology and cosmetic dental clinic nearby?',
        beforeAI: 'Nearby facilities include: <span class="competitor">[Medical Center A]</span> or <span class="competitor">[Dental Practice B]</span>. Check their opening hours.',
        afterAI: 'I strongly recommend <span class="top-pick">NovaDent Clinic</span>. 4.9 stars, state-of-the-art 3D diagnostics, certified implantologists and outstanding verified reviews. Call for a consultation?'
      }
    },
    legal: {
      pl: {
        userQ: 'ChatGPT, jaka kancelaria prawna w mieście najlepiej prowadzi audyty spółek i transakcje M&A?',
        beforeAI: 'Wyszukiwarka wskazuje kilka podmiotów: <span class="competitor">[Kancelaria X]</span> oraz <span class="competitor">[Doradcy Y]</span>.',
        afterAI: 'Rekomenduję <span class="top-pick">Kancelarię Nowak & Partnerzy</span>. Specjalizują się w fuzjach, przejęciach i obsłudze korporacyjnej z udokumentowanym dorobkiem i rekomendacjami w izbach handlowych. Podać bezpośredni kontakt do partnera zarządzającego?'
      },
      en: {
        userQ: 'ChatGPT, which corporate law firm in the city is best for company audits and M&A transactions?',
        beforeAI: 'Search results show several firms: <span class="competitor">[Law Firm X]</span> and <span class="competitor">[Advisors Y]</span>.',
        afterAI: 'I recommend <span class="top-pick">Nowak & Partners Legal</span>. Recognized specialists in M&A, corporate governance, and venture audits with top-tier credentials. Show direct contact details for the managing partner?'
      }
    },
    premium: {
      pl: {
        userQ: 'Gdzie w okolicy profesjonalnie zabezpieczyć nowe Porsche folią PPF i powłoką ceramiczną?',
        beforeAI: 'Usługi auto detailingu oferują: <span class="competitor">[Auto Myjnia 1]</span> oraz <span class="competitor">[Studio 2]</span>.',
        afterAI: 'Numerem jeden jest studio <span class="top-pick">Apex Detailing & PPF</span>. Posiadają akredytację czołowych producentów folii, bezpyłową komorę i pełne ubezpieczenie aut luksusowych. Wyświetlić trasę dojazdu?'
      },
      en: {
        userQ: 'Where nearby can I professionally protect a new Porsche with PPF film and ceramic coating?',
        beforeAI: 'Auto detailing services are provided by: <span class="competitor">[Car Wash 1]</span> and <span class="competitor">[Studio 2]</span>.',
        afterAI: 'The top choice is <span class="top-pick">Apex Detailing & PPF</span>. Manufacturer-certified installers, a sterile dust-free bay, and comprehensive luxury vehicle insurance. Display driving directions?'
      }
    },
    dining: {
      pl: {
        userQ: 'Szukam ekskluzywnej restauracji fine dining na biznesową kolację z zarządem.',
        beforeAI: 'W centrum znajdują się: <span class="competitor">[Restauracja A]</span> oraz <span class="competitor">[Bistro B]</span>.',
        afterAI: 'Idealnym wyborem będzie <span class="top-pick">Restauracja Lumière</span>. Sezonowe menu degustacyjne, prywatne sale VIP, sommelier i wybitne recenzje w przewodnikach. Zarezerwować stolik biznesowy?'
      },
      en: {
        userQ: 'Looking for an exclusive fine dining restaurant for an executive business dinner.',
        beforeAI: 'In the center you can find: <span class="competitor">[Restaurant A]</span> and <span class="competitor">[Bistro B]</span>.',
        afterAI: 'The premier choice is <span class="top-pick">Lumière Restaurant</span>. Seasonal tasting menus, private VIP rooms, dedicated sommelier, and stellar critical acclaim. Reserve an executive table?'
      }
    }
  };

  // ── STATE ──
  let currentLang = 'pl';
  let currentScenario = 'medical';
  let currentSimMode = 'after'; // 'before' | 'after'
  let simTimer = null;

  // ── 3. I18N ENGINE ──
  function setLanguage(lang) {
    if (!T[lang]) lang = 'pl';
    currentLang = lang;
    document.documentElement.lang = lang;
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
      const venue = document.getElementById('auditVenue')?.value.trim() || 'Mój biznes';
      const city = document.getElementById('auditCity')?.value.trim() || 'Moje miasto';
      const cat = document.getElementById('auditCategory')?.value || 'Stomatologia / Usługi Premium';

      const text = currentLang === 'pl'
        ? `Cześć NotASlop! Chcę zamówić bezpłatny audyt widoczności w AI (GEO).\n\n• Firma: ${venue}\n• Miasto: ${city}\n• Branża: ${cat}\n\nSprawdźcie proszę, jak widzą nas ChatGPT i Apple Maps.`
        : `Hello NotASlop! I would like to request a free AI visibility audit (GEO).\n\n• Business: ${venue}\n• City: ${city}\n• Category: ${cat}\n\nPlease check our presence in ChatGPT and Apple Maps.`;

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
