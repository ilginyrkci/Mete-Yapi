@echo off
cd /d %~dp0
npm run dev:backend > backend-dev.log 2>&1
