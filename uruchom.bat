@echo off
title NotASlop - Podglad Lokalny
cd /d "%~dp0"

echo ============================================================
echo                NOTASLOP - URUCHAMIANIE SERWISU
echo ============================================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Srodowisko Python jest dostepne.
    echo [INFO] Uruchamianie serwera pod adresem: http://localhost:8085
    echo [INFO] Otwieranie przegladarki...
    echo.
    echo [WSKAZOWKA] Aby zatrzymac serwer, po prostu zamknij to okno.
    echo ============================================================
    echo.
    start cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:8085"
    python -m http.server 8085
) else (
    echo [INFO] Nie wykryto polecenia Python.
    echo Otwieranie strony bezposrednio z dysku w domyslnej przegladarce...
    start "" "%~dp0index.html"
    pause
)
