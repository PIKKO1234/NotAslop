# NotASlop — Pozycjonowanie w AI (GEO)

> **Generative Engine Optimization (GEO) dla lokalnych biznesów.**
> Sprawiamy, że asystenci AI (ChatGPT, Apple Siri, Google Gemini, Perplexity) oraz Apple Maps polecają Twoją firmę na 1. miejscu podium.

Oficjalna strona: [https://notaslop.com](https://notaslop.com)

---

## ⚡ O Projekcie

Tradycyjne SEO walczy o linki na 10 stronach wyników Google. **W erze asystentów głosowych i AI użytkownik otrzymuje tylko 2–3 konkretne rekomendacje.**

NotASlop buduje i strukturyzuje obecność firm w grafach wiedzy modeli LLM oraz w ekosystemie Apple Business Connect, sprawiając, że asystenci wymieniają lokal klienta zamiast konkurencji.

---

## 🚀 Kluczowe Funkcje Serwisu

- **Deep Obsidian & Cyber-Emerald Spatial UI (Wersja 3.0):** Wielowymiarowy, nowoczesny interfejs z ambientowym oświetleniem i elementami glassmorphismu (`backdrop-filter: blur(20px)`).
- **Rzeźbiona Typografia:** Wyrazisty zestaw fontów `Plus Jakarta Sans` (display/UI z nacięciami ink-traps) + `Fraunces` (luksusowy szeryf dla prestiżowych akcentów) + `JetBrains Mono` (metryki techniczne).
- **Interaktywny OLED Phone Simulator:** Symulator odpowiedzi ChatGPT/Siri na żywo dla 4 branż (Kawiarnia, Restauracja, Barber, Klinika medyczna) z natychmiastowym porównaniem *„Przed GEO”* vs *„Z NotASlop”*.
- **Kalkulator Utraconych Przychodów:** Suwaki dynamicznie przeliczające straty biznesu wynikające z braku obecności w poleceniach AI.
- **Wielojęzyczność (PL / EN):** Reaktywny silnik i18n bez przeładowania strony, zapamiętujący wybór w `localStorage`.
- **Zindywidualizowany Regulamin:** Zgodnie z modelem agencji, sztywne cenniki zostały zastąpione transparentną wyceną po bezpłatnym audycie.
- **100/100 Core Web Vitals:** Czysty HTML5, nowoczesny CSS z CSS Variables i lekki Vanilla JS. Zero zbędnych zależności `node_modules`, zero frameworków.

---

## 📁 Struktura Repozytorium

```
NotAslop/
├── index.html                                        # Główny landing page (symulator, kalkulator, audyt)
├── css/
│   └── main.css                                      # Kompletny system stylów Deep Obsidian 3.0
├── js/
│   └── app.js                                        # Reaktywna logika: i18n, symulator, kalkulator
├── kontakt/
│   └── index.html                                    # Hub kontaktowy (formularz, WhatsApp, direct call)
├── regulamin/
│   └── index.html                                    # Regulamin świadczenia usług (indywidualna wycena w §5)
├── polityka_prywatnosci/
│   └── index.html                                    # Zgodna z RODO polityka prywatności
├── blog/
│   ├── index.html                                    # Hub bazy wiedzy o GEO
│   ├── jak-byc-polecanym-przez-chatgpt-i-siri/       # Artykuł #1
│   ├── apple-maps-i-siri-lokalna-widocznosc/         # Artykuł #2
│   └── strona-internetowa-ktora-sprzedaje/           # Artykuł #3
├── uruchom.bat                                       # Uruchomienie lokalnego serwera 1 kliknięciem (port 8085)
└── start.bat                                         # Alias do uruchom.bat
```

---

## 🛠️ Uruchomienie Lokalne

### Opcja 1 (Windows — 1 kliknięcie):
Dwukrotnie kliknij plik `uruchom.bat` lub `start.bat`.

### Opcja 2 (Wiersz poleceń):
```bash
python -m http.server 8085
```
Następnie otwórz w przeglądarce adres:
```
http://localhost:8085
```

---

## 📄 Licencja

© 2026 NotASlop. Wszelkie prawa zastrzeżone.
