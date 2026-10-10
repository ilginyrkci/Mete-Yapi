@echo off
cd /d %~dp0
npm run dev:frontend > frontend-dev.log 2>&1
