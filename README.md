# Финансовые калькуляторы

Сайт на Next.js 14 с калькуляторами для инвесторов (русский язык).

## Запуск локально

```bash
cd "/Users/hilulai/Documents/сайт fire калькулятор"
npm install
npm run dev
```

Откройте в браузере: **http://localhost:3000**

Страницы:
- http://localhost:3000 — главная
- http://localhost:3000/compound-interest — сложный процент
- http://localhost:3000/fire-calculator — FIRE

## Если не открывается

1. Убедитесь, что в терминале есть строка `Ready` и `Local: http://localhost:3000`.
2. Не открывайте файлы `.html` напрямую — нужен запущенный `npm run dev`.
3. Если порт занят: `npm run dev -- -p 3001` и откройте http://localhost:3001
4. После установки skills (папка `.agents`) перезапустите сервер: `Ctrl+C`, затем снова `npm run dev`.

## Production-сборка

```bash
npm run build
npm start
```
