@echo off
:: Script automatizado para subir el proyecto a GitHub - VIZELEC
chcp 65001 > nul
echo ==========================================================
echo 🚀 SUBIR VIZELEC A GITHUB (MÉTODO INTELIGENTE SSH/HTTPS)
echo ==========================================================
echo.

:: Verificar si git está instalado
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Git no está instalado o no está en las variables de entorno (PATH).
    echo.
    echo Para solucionar esto:
    echo 1. Descarga e instala Git para Windows desde: https://git-scm.com/download/win
    echo 2. Durante la instalación, deja las opciones por defecto (asegúrate de que esté marcada la opción de agregar a PATH).
    echo 3. Reinicia tu editor (VS Code) o esta ventana de terminal y vuelve a ejecutar este script.
    echo.
    pause
    exit /b
)

echo ✅ Git detectado en el sistema.
echo.

:: Inicializar repositorio si no existe
if not exist .git (
    echo 📦 Inicializando repositorio local Git...
    git init
    if %errorlevel% neq 0 (
        echo ❌ Error al inicializar Git.
        pause
        exit /b
    )
) else (
    echo 📦 Repositorio Git ya inicializado.
)

:: Agregar archivos
echo.
echo ➕ Agregando archivos al área de preparación (stage)...
git add .
if %errorlevel% neq 0 (
    echo ❌ Error al agregar archivos.
    pause
    exit /b
)

:: Crear commit
echo.
echo 💾 Creando el commit inicial...
git commit -m "Initial commit - VIZELEC Landing Page con Sliders de Fotos Reales"
if %errorlevel% neq 0 (
    echo.
    echo 💡 Nota: Es posible que no haya cambios nuevos para registrar o necesites configurar tu usuario de Git:
    echo    git config --global user.email "victorio.zabalet@gmail.com"
    echo    git config --global user.name "Victorio Zabalet"
)

:: Renombrar rama a main
echo.
echo 🌿 Configurando rama principal como 'main'...
git branch -M main

:: Configurar repositorio remoto (SSH por defecto)
echo.
echo 🔗 Configurando el repositorio remoto a git@github.com:VZsanmanuel/web.git...
git remote remove origin >nul 2>nul
git remote add origin git@github.com:VZsanmanuel/web.git

:: Intentar subir por SSH
echo.
echo ⬆️ Intentando subir archivos a GitHub por SSH (git@github.com:VZsanmanuel/web.git)...
git push -u origin main

if %errorlevel% eq 0 (
    echo.
    echo ==========================================================
    echo 🎉 ¡PROYECTO SUBIDO CON ÉXITO A GITHUB VÍA SSH!
    echo ==========================================================
    goto fin
)

echo.
echo ⚠️  La subida por SSH falló (es común si no tienes claves SSH configuradas en GitHub).
echo 🔄 Cambiando automáticamente al método HTTPS (más sencillo, abrirá tu navegador para iniciar sesión)...
echo.

:: Cambiar remoto a HTTPS
git remote set-url origin https://github.com/VZsanmanuel/web.git

echo ⬆️ Intentando subir archivos a GitHub por HTTPS (https://github.com/VZsanmanuel/web.git)...
echo 🌐 Si se abre una ventana del navegador, inicia sesión con tu cuenta de GitHub para autorizar.
echo.
git push -u origin main

if %errorlevel% eq 0 (
    echo.
    echo ==========================================================
    echo 🎉 ¡PROYECTO SUBIDO CON ÉXITO A GITHUB VÍA HTTPS!
    echo ==========================================================
) else (
    echo.
    echo ❌ Hubo un inconveniente al subir los archivos a GitHub usando HTTPS.
    echo.
    echo Por favor, verifica:
    echo 1. Que el repositorio 'web' esté creado y vacío en tu cuenta de GitHub (https://github.com/VZsanmanuel/web).
    echo 2. Que tu conexión a internet funcione correctamente.
)

:fin
echo.
pause
