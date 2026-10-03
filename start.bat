@echo off
echo =========================================================
echo    ANJANAM FOODS - FULL STACK DEV ENVIRONMENT
echo    Brand: Shuddh Vrat Ka Aata (Tilak Nagar, Indore)
echo =========================================================
echo.

start "Anjanam Backend (FastAPI)" cmd /k "cd backend && python run.py"
start "Anjanam Frontend (Next.js 15)" cmd /k "cd frontend && npm.cmd run dev"

echo Backend starting at:  http://localhost:8000 (Docs: http://localhost:8000/api/docs)
echo Frontend starting at: http://localhost:3000
echo Admin Portal at:      http://localhost:3000/admin/login
echo.
echo Login Credentials:
echo   Username: admin
echo   Password: Anjanam@2025!
echo.
pause
