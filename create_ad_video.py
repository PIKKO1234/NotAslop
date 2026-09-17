import os
import math
import wave
import struct
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

import sys
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# ══════════════════════════════════════════════════════════════════════════════
# 1. PARAMETERS
# ══════════════════════════════════════════════════════════════════════════════
W, H = 720, 1280
FPS = 30
DURATION = 30.0  # Exactly 30 seconds
TOTAL_FRAMES = int(FPS * DURATION)  # 900 frames
SAMPLE_RATE = 44100

OUTPUT_MP4 = os.path.abspath("reklama_notaslop_30s.mp4")
TEMP_VIDEO = os.path.abspath("temp_video.mp4")
TEMP_AUDIO = os.path.abspath("temp_audio.wav")
FONT_PATH = os.path.abspath("PlusJakartaSans.ttf")
FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

print(f"[START] Generating 30s ad: {W}x{H} @ {FPS} FPS ({TOTAL_FRAMES} frames)")
print(f"FFmpeg binary: {FFMPEG_EXE}")

# ══════════════════════════════════════════════════════════════════════════════
# 2. AUDIO SYNTHESIS (120 BPM TECH PULSE + RISERS + IMPACTS + CHIMES)
# ══════════════════════════════════════════════════════════════════════════════
def generate_audio():
    print("[AUDIO] Synthesizing 30-second soundtrack...")
    t = np.linspace(0, DURATION, int(SAMPLE_RATE * DURATION), endpoint=False)
    audio = np.zeros_like(t)

    # 120 BPM = 0.5s per beat
    beat_interval = 0.5
    num_beats = int(DURATION / beat_interval)

    # Kick drum
    for b in range(num_beats):
        bt = b * beat_interval
        # Drop out kick between 10.5s and 12s for riser tension
        if 10.5 <= bt < 12.0 or 23.0 <= bt < 24.0:
            continue
        idx = int(bt * SAMPLE_RATE)
        k_len = int(0.18 * SAMPLE_RATE)
        if idx + k_len < len(t):
            kt = np.linspace(0, 0.18, k_len, endpoint=False)
            freq = 160.0 * np.exp(-kt * 22) + 42.0
            env = np.exp(-kt * 18)
            kick = 0.55 * np.sin(2 * np.pi * freq * kt) * env
            audio[idx:idx + k_len] += kick

    # Hi-hat / Tech Tick (every 0.25s)
    for h_step in range(int(DURATION / 0.25)):
        ht = h_step * 0.25
        idx = int(ht * SAMPLE_RATE)
        h_len = int(0.04 * SAMPLE_RATE)
        if idx + h_len < len(t):
            noise = np.random.uniform(-0.1, 0.1, h_len)
            env = np.linspace(1, 0, h_len) ** 3
            audio[idx:idx + h_len] += noise * env * 0.4

    # Sub-Bass Chord Progressions (D - F - G - A)
    chords = [
        (0.0, 6.0, 73.4),    # D2
        (6.0, 12.0, 65.4),   # C2
        (12.0, 18.0, 87.3),  # F2
        (18.0, 24.0, 98.0),  # G2
        (24.0, 30.0, 73.4)   # D2
    ]
    for start, end, freq in chords:
        s_idx = int(start * SAMPLE_RATE)
        e_idx = int(end * SAMPLE_RATE)
        ct = t[s_idx:e_idx]
        sub = 0.22 * np.sin(2 * np.pi * freq * ct)
        sub_2 = 0.11 * np.sin(2 * np.pi * (freq * 2) * ct)
        audio[s_idx:e_idx] += sub + sub_2

    # Risers before Scene 3 (10.5s -> 12.0s) and Scene 5 (22.5s -> 24.0s)
    for r_start in [10.2, 22.2]:
        s_idx = int(r_start * SAMPLE_RATE)
        r_len = int(1.8 * SAMPLE_RATE)
        rt = np.linspace(0, 1.8, r_len, endpoint=False)
        r_freq = 200 + 1200 * (rt / 1.8) ** 2
        r_env = (rt / 1.8) ** 2
        riser = 0.28 * np.sin(2 * np.pi * r_freq * rt) * r_env
        audio[s_idx:s_idx + r_len] += riser

    # Impact Booms at 0.0s, 12.0s, 18.0s, 24.0s
    for imp_t in [0.0, 12.0, 18.0, 24.0]:
        idx = int(imp_t * SAMPLE_RATE)
        imp_len = int(1.2 * SAMPLE_RATE)
        if idx + imp_len < len(t):
            it = np.linspace(0, 1.2, imp_len, endpoint=False)
            boom = 0.5 * np.sin(2 * np.pi * 55 * np.exp(-it * 2) * it) * np.exp(-it * 3)
            audio[idx:idx + imp_len] += boom

    # Siri / AI Chime at 3.0s and 12.2s
    for c_t in [3.0, 12.2]:
        idx = int(c_t * SAMPLE_RATE)
        c_len = int(0.6 * SAMPLE_RATE)
        if idx + c_len < len(t):
            ct = np.linspace(0, 0.6, c_len, endpoint=False)
            chime = (0.2 * np.sin(2 * np.pi * 1046.5 * ct) + 
                     0.15 * np.sin(2 * np.pi * 1318.5 * ct) + 
                     0.15 * np.sin(2 * np.pi * 1567.98 * ct)) * np.exp(-ct * 5)
            audio[idx:idx + c_len] += chime

    # Normalize audio to -1 dB
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = audio / max_val * 0.88

    # Export WAV
    audio_int16 = (audio * 32767).astype(np.int16)
    with wave.open(TEMP_AUDIO, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(audio_int16.tobytes())
    print(f"[OK] Audio generated: {TEMP_AUDIO}")

# ══════════════════════════════════════════════════════════════════════════════
# 3. GRAPHICS HELPERS
# ══════════════════════════════════════════════════════════════════════════════
fonts = {
    'title_xl': ImageFont.truetype(FONT_PATH, 58),
    'title_lg': ImageFont.truetype(FONT_PATH, 46),
    'title_md': ImageFont.truetype(FONT_PATH, 34),
    'body_lg': ImageFont.truetype(FONT_PATH, 26),
    'body_md': ImageFont.truetype(FONT_PATH, 21),
    'body_sm': ImageFont.truetype(FONT_PATH, 16),
    'mono_bold': ImageFont.truetype(FONT_PATH, 20),
    'stat_huge': ImageFont.truetype(FONT_PATH, 76),
}

def draw_pill(draw, text, x, y, font, bg_col, text_col, border_col=None, pad_x=16, pad_y=8):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    box = [x, y, x + tw + pad_x * 2, y + th + pad_y * 2]
    draw.rounded_rectangle(box, radius=(th + pad_y * 2) // 2, fill=bg_col, outline=border_col, width=1)
    draw.text((x + pad_x, y + pad_y - 2), text, font=font, fill=text_col)
    return box[2], box[3]

def draw_card(draw, box, fill_col, border_col, radius=20):
    draw.rounded_rectangle(box, radius=radius, fill=fill_col, outline=border_col, width=1)

def ease_out_cubic(x):
    return 1.0 - math.pow(1.0 - x, 3)

def ease_in_out(x):
    return 0.5 * (1 - math.cos(math.pi * x))

# ══════════════════════════════════════════════════════════════════════════════
# 4. SCENE RENDERING
# ══════════════════════════════════════════════════════════════════════════════
def render_frame(f_idx):
    sec = f_idx / FPS
    im = Image.new("RGBA", (W, H), (8, 9, 13, 255))
    d = ImageDraw.Draw(im)

    # Ambient animated background glow
    pulse = math.sin(sec * 2.5) * 0.5 + 0.5
    glow_x = int(W * 0.5 + math.cos(sec * 1.5) * 90)
    glow_y = int(H * 0.4 + math.sin(sec * 1.2) * 120)
    glow_r = int(240 + pulse * 60)
    d.ellipse([glow_x - glow_r, glow_y - glow_r, glow_x + glow_r, glow_y + glow_r], fill=(0, 240, 144, int(16 + pulse * 14)))

    # Subtle violet top ambient
    d.ellipse([-100, -100, 450, 450], fill=(124, 92, 252, 18))
    # Subtle amber bottom ambient
    d.ellipse([W - 350, H - 350, W + 150, H + 150], fill=(255, 159, 67, 16))

    # Top brand bar (persistent)
    d.text((45, 48), "NotASlop", font=fonts['title_md'], fill=(255, 255, 255))
    d.text((188, 48), ".", font=fonts['title_md'], fill=(0, 240, 144))
    draw_pill(d, "AI VISIBILITY", W - 200, 48, fonts['body_sm'], (0, 240, 144, 25), (0, 240, 144), (0, 240, 144, 80))

    # Bottom Progress Bar (Instagram Stories / Reels style)
    bar_w = int((f_idx / TOTAL_FRAMES) * (W - 90))
    d.rounded_rectangle([45, H - 24, W - 45, H - 20], radius=2, fill=(255, 255, 255, 30))
    d.rounded_rectangle([45, H - 24, 45 + bar_w, H - 20], radius=2, fill=(0, 240, 144, 220))

    # ──────────────────────────────────────────────────────────────────────────
    # SCENE 1 (0.0s - 6.0s): THE HOOK
    # ──────────────────────────────────────────────────────────────────────────
    if sec < 6.0:
        s_time = sec
        anim = ease_out_cubic(min(1.0, s_time / 0.8))

        draw_pill(d, "⚡ REWOLUCJA WYSZUKIWANIA", 45, 120, fonts['body_sm'], (255, 159, 67, 25), (255, 175, 90), (255, 159, 67, 90))

        # Main Kinetic Typography
        d.text((45, 165), "Twój klient już nie", font=fonts['title_lg'], fill=(240, 244, 250))
        d.text((45, 225), "szuka w Google.", font=fonts['title_xl'], fill=(255, 255, 255))

        if s_time >= 2.0:
            sub_anim = ease_out_cubic(min(1.0, (s_time - 2.0) / 0.6))
            alpha_col = int(255 * sub_anim)
            d.text((45, 310), "On pyta telefonu.", font=fonts['title_xl'], fill=(0, 240, 144))

        # Center Phone Mockup
        phone_y = int(420 + (1.0 - anim) * 120)
        p_box = [65, phone_y, W - 65, phone_y + 540]
        draw_card(d, p_box, (18, 21, 32, 240), (255, 255, 255, 40), radius=36)

        # Notch
        d.rounded_rectangle([(W - 100) // 2, phone_y + 16, (W + 100) // 2, phone_y + 36], radius=10, fill=(8, 9, 13))

        # User voice query in phone
        if s_time >= 1.0:
            q_anim = ease_out_cubic(min(1.0, (s_time - 1.0) / 0.5))
            q_w = int(q_anim * 500)
            draw_card(d, [95, phone_y + 80, 95 + q_w, phone_y + 175], (32, 38, 56), (0, 240, 144, 70), radius=18)
            d.text((115, phone_y + 96), "Siri, gdzie zjeść dobry", font=fonts['body_lg'], fill=(255, 255, 255))
            d.text((115, phone_y + 130), "obiad w okolicy?", font=fonts['body_lg'], fill=(0, 240, 144))

        # Siri pulsing wave animation
        if s_time >= 3.0:
            sw_phase = (s_time - 3.0) * 8
            for i in range(5):
                wave_h = int(math.sin(sw_phase + i * 0.8) * 25 + 35)
                cx = W // 2 + (i - 2) * 24
                d.rounded_rectangle([cx - 5, phone_y + 240 - wave_h // 2, cx + 5, phone_y + 240 + wave_h // 2], radius=4, fill=(0, 240, 144))

        # Bottom punchline tag
        if s_time >= 4.0:
            d.text((45, H - 120), "92% użytkowników iPhone wybiera pierwsze polecenie AI.", font=fonts['body_sm'], fill=(148, 163, 184))

    # ──────────────────────────────────────────────────────────────────────────
    # SCENE 2 (6.0s - 12.0s): THE SHOCKING TRUTH (PROBLEM)
    # ──────────────────────────────────────────────────────────────────────────
    elif sec < 12.0:
        s_time = sec - 6.0
        anim = ease_out_cubic(min(1.0, s_time / 0.6))

        draw_pill(d, "⚠️ BRUTALNA PRAWDA O AI", 45, 120, fonts['body_sm'], (255, 82, 82, 30), (255, 110, 110), (255, 82, 82, 100))

        d.text((45, 165), "AI poleca tylko", font=fonts['title_lg'], fill=(240, 244, 250))
        d.text((45, 225), "2 lub 3 miejsca.", font=fonts['title_xl'], fill=(255, 82, 82))

        # Phone mockup showing competitor recommendation
        p_box = [65, 330, W - 65, 780]
        draw_card(d, p_box, (18, 21, 32, 240), (255, 82, 82, 60), radius=36)

        # AI Answer Bubble
        draw_card(d, [95, 380, W - 95, 520], (25, 18, 22), (255, 82, 82, 80), radius=18)
        d.text((115, 398), "Asystent AI:", font=fonts['body_sm'], fill=(255, 110, 110))
        d.text((115, 430), "„W pobliżu polecam:", font=fonts['body_md'], fill=(220, 225, 235))
        d.text((115, 465), "1. [Lokal Konkurenta A]  2. [Lokal B]”", font=fonts['body_md'], fill=(255, 90, 90))

        # Shocking Loss Counter Box
        loss_box = [65, 820, W - 65, 1060]
        draw_card(d, loss_box, (24, 18, 16), (255, 159, 67, 80), radius=24)
        d.text((95, 845), "SZACOWANA STRATA PRZYCHODU:", font=fonts['mono_bold'], fill=(255, 159, 67))

        # Dynamic counter animation
        cnt_val = int(min(1.0, s_time / 2.0) * 10800)
        d.text((95, 885), f"-{cnt_val:,} zł / mc".replace(",", " "), font=fonts['stat_huge'], fill=(255, 255, 255))
        d.text((95, 990), "klienci trafiają prosto do lokalu obok Ciebie.", font=fonts['body_md'], fill=(200, 205, 215))

        d.text((45, H - 120), "Jeśli nie ma Cię w bazie wiedzy AI — dla klienta nie istniejesz.", font=fonts['body_sm'], fill=(148, 163, 184))

    # ──────────────────────────────────────────────────────────────────────────
    # SCENE 3 (12.0s - 18.0s): THE SOLUTION (NOTASLOP & GEO)
    # ──────────────────────────────────────────────────────────────────────────
    elif sec < 18.0:
        s_time = sec - 12.0
        anim = ease_out_cubic(min(1.0, s_time / 0.7))

        # Dramatic Emerald flash at start
        if s_time < 0.4:
            flash_alpha = int((1.0 - s_time / 0.4) * 120)
            d.rectangle([0, 0, W, H], fill=(0, 240, 144, flash_alpha))

        draw_pill(d, "🚀 ROZWIĄZANIE: GEO", 45, 120, fonts['body_sm'], (0, 240, 144, 30), (0, 240, 144), (0, 240, 144, 110))

        d.text((45, 165), "Wprowadź swój lokal", font=fonts['title_lg'], fill=(240, 244, 250))
        d.text((45, 225), "do odpowiedzi AI.", font=fonts['title_xl'], fill=(0, 240, 144))

        # Brand Hero Box
        hero_box = [65, 330, W - 65, 620]
        draw_card(d, hero_box, (19, 23, 36), (0, 240, 144, 90), radius=28)

        d.text((100, 365), "NotASlop.", font=fonts['stat_huge'], fill=(255, 255, 255))
        d.text((100, 460), "Generative Engine Optimization", font=fonts['title_md'], fill=(0, 240, 144))
        d.text((100, 520), "Pozycjonujemy Twoją firmę tam, gdzie ludzie pytają:", font=fonts['body_md'], fill=(160, 175, 195))

        # Supported Platforms Badges
        platforms = ["ChatGPT", "Apple Siri", "Google Gemini", "Apple Maps", "Perplexity"]
        py = 660
        px = 65
        for p in platforms:
            bbox = d.textbbox((0, 0), p, font=fonts['body_md'])
            pw = bbox[2] - bbox[0] + 36
            if px + pw > W - 65:
                px = 65
                py += 60
            draw_card(d, [px, py, px + pw, py + 48], (26, 32, 48), (255, 255, 255, 30), radius=24)
            d.text((px + 18, py + 12), p, font=fonts['body_md'], fill=(240, 245, 255))
            px += pw + 14

        # Key promise card
        draw_card(d, [65, 840, W - 65, 1020], (16, 26, 24), (0, 240, 144, 80), radius=22)
        d.text((95, 870), "CO DLA CIEBIE ROBIMY?", font=fonts['mono_bold'], fill=(0, 240, 144))
        d.text((95, 915), "Sprawiamy, że asystenci AI wymieniają", font=fonts['title_md'], fill=(255, 255, 255))
        d.text((95, 960), "Twoją firmę na 1. miejscu podium.", font=fonts['title_md'], fill=(0, 240, 144))

        d.text((45, H - 120), "Zamiast 10 stron linków — bezpośrednie polecenie Twojego lokalu.", font=fonts['body_sm'], fill=(148, 163, 184))

    # ──────────────────────────────────────────────────────────────────────────
    # SCENE 4 (18.0s - 24.0s): THE PROOF & METRICS
    # ──────────────────────────────────────────────────────────────────────────
    elif sec < 24.0:
        s_time = sec - 18.0
        anim = ease_out_cubic(min(1.0, s_time / 0.6))

        draw_pill(d, "📊 TWARDE WYNIKI KLIENTÓW", 45, 120, fonts['body_sm'], (0, 240, 144, 30), (0, 240, 144), (0, 240, 144, 110))

        d.text((45, 165), "Efekty wdrożeń GEO", font=fonts['title_lg'], fill=(240, 244, 250))
        d.text((45, 225), "w pierwszych 45 dniach.", font=fonts['title_xl'], fill=(255, 255, 255))

        # 3 Result Cards
        proofs = [
            ("+184%", "zapytań o trasę w Apple Maps", "Kawiarnia Specialty · Kraków"),
            ("#1 polecenie", "w odpowiedziach ChatGPT i Siri", "Włoskie Bistro · Warszawa"),
            ("+92 rezerwacje", "bezpośrednio od turystów AI", "Restauracja Autorska · Gdańsk")
        ]

        card_y = 330
        for i, (metric, label, loc) in enumerate(proofs):
            c_anim = ease_out_cubic(min(1.0, max(0.0, (s_time - i * 0.25) / 0.5)))
            cx_off = int((1.0 - c_anim) * 50)
            box = [65 + cx_off, card_y, W - 65 + cx_off, card_y + 190]
            draw_card(d, box, (19, 23, 35), (0, 240, 144, 70), radius=22)

            d.text((95 + cx_off, card_y + 20), metric, font=fonts['title_xl'], fill=(0, 240, 144))
            d.text((95 + cx_off, card_y + 90), label, font=fonts['body_lg'], fill=(255, 255, 255))
            d.text((95 + cx_off, card_y + 140), loc, font=fonts['body_sm'], fill=(148, 163, 184))
            card_y += 225

        d.text((45, H - 120), "Pełna weryfikacja w panelach Apple Business Connect & Analytics.", font=fonts['body_sm'], fill=(148, 163, 184))

    # ──────────────────────────────────────────────────────────────────────────
    # SCENE 5 (24.0s - 30.0s): CALL TO ACTION (FINALE)
    # ──────────────────────────────────────────────────────────────────────────
    else:
        s_time = sec - 24.0
        anim = ease_out_cubic(min(1.0, s_time / 0.6))

        draw_pill(d, "🔥 SPRAWDŹ SWÓJ LOKAL GRATIS", 45, 120, fonts['body_sm'], (255, 159, 67, 30), (255, 175, 90), (255, 159, 67, 100))

        d.text((45, 165), "Zajmij 1. miejsce", font=fonts['title_lg'], fill=(240, 244, 250))
        d.text((45, 225), "w swojej dzielnicy.", font=fonts['title_xl'], fill=(0, 240, 144))

        # Urgent Exclusivity Card
        excl_box = [65, 330, W - 65, 480]
        draw_card(d, excl_box, (28, 20, 18), (255, 159, 67, 90), radius=22)
        d.text((95, 355), ">> ZASADA WYŁĄCZNOŚCI:", font=fonts['mono_bold'], fill=(255, 159, 67))
        d.text((95, 395), "Współpracujemy tylko z 1 lokalem", font=fonts['body_lg'], fill=(255, 255, 255))
        d.text((95, 430), "w danej kategorii w rejonie!", font=fonts['body_lg'], fill=(255, 180, 120))

        # Main Big CTA Button (Pulsing neon)
        btn_box = [65, 520, W - 65, 630]
        draw_card(d, btn_box, (0, 240, 144), (255, 255, 255, 180), radius=28)
        d.text((105, 552), "ZAMÓW DARMOWY AUDYT AI", font=fonts['title_md'], fill=(8, 9, 13))

        # WhatsApp & Website Cards
        draw_card(d, [65, 670, W - 65, 770], (20, 24, 36), (255, 255, 255, 30), radius=20)
        d.text((95, 695), "Napisz na WhatsApp (1 kliknięcie)", font=fonts['body_lg'], fill=(37, 211, 102))
        d.text((95, 730), "+48 607 118 228 · Odpisujemy w max 2h", font=fonts['body_sm'], fill=(160, 175, 195))

        draw_card(d, [65, 800, W - 65, 900], (20, 24, 36), (255, 255, 255, 30), radius=20)
        d.text((95, 825), "Wejdź na: notaslop.com", font=fonts['body_lg'], fill=(255, 255, 255))
        d.text((95, 860), "Sprawdź widoczność w 15 minut", font=fonts['body_sm'], fill=(0, 240, 144))

        # Guarantee Badge
        d.text((W // 2 - 190, 940), "100% bezpłatny audyt · Bez zobowiązań", font=fonts['body_sm'], fill=(148, 163, 184))

        d.text((45, H - 120), "NotASlop — Pozycjonowanie w ChatGPT, Siri, Gemini & Apple Maps.", font=fonts['body_sm'], fill=(148, 163, 184))

    return im.convert("RGB")

# ══════════════════════════════════════════════════════════════════════════════
# 5. VIDEO ENCODING VIA FFMPEG PIPE
# ══════════════════════════════════════════════════════════════════════════════
def generate_video():
    print(f"[VIDEO] Rendering {TOTAL_FRAMES} video frames (30s @ {FPS} FPS)...")

    # Command to pipe raw RGB24 frames to ffmpeg
    cmd_video = [
        FFMPEG_EXE,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{W}x{H}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "fast",
        "-crf", "20",
        TEMP_VIDEO
    ]

    proc = subprocess.Popen(cmd_video, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    for idx in range(TOTAL_FRAMES):
        if idx % 150 == 0 or idx == TOTAL_FRAMES - 1:
            print(f"  -> Frame {idx + 1}/{TOTAL_FRAMES} ({((idx+1)/TOTAL_FRAMES)*100:.1f}%) [{(idx+1)/FPS:.1f}s / {DURATION}s]")
        frame = render_frame(idx)
        proc.stdin.write(frame.tobytes())

    proc.stdin.close()
    proc.wait()
    print("[OK] Video track rendered successfully.")

    # Combine Video + Audio
    print("[INFO] Multiplexing video and audio into final MP4...")
    cmd_mux = [
        FFMPEG_EXE,
        "-y",
        "-i", TEMP_VIDEO,
        "-i", TEMP_AUDIO,
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        OUTPUT_MP4
    ]

    subprocess.run(cmd_mux, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"[SUCCESS] FINAL VIDEO READY: {OUTPUT_MP4}")

    # Cleanup temp files
    if os.path.exists(TEMP_VIDEO):
        os.remove(TEMP_VIDEO)
    if os.path.exists(TEMP_AUDIO):
        os.remove(TEMP_AUDIO)

if __name__ == "__main__":
    generate_audio()
    generate_video()
