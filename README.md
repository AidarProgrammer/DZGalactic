## При проверке тестов необходимо зайти в папку src/testing. Внутри папки будет свой readme

Инструкция по запуску
## 1. Установите зависимости
npm install
## 2. Запустите проект
npm run dev
## 3. Запустите бэкенд

React 19 (включая React Compiler)

- Vite для сборки
  
- Zustand для state-менеджмента

- React Router v7 для навигации

🏗️ Структура проекта

src/

🖥️ App.jsx - Главный компонент (роутинг + Header)

📄 Страницы приложения (pages/)

🏠 HomePage.jsx - Главная страница

📊 TableGeneratorPage.jsx - Генератор таблиц

🕰️ HistoryPage.jsx - История запросов

🧩 Компоненты (components/)

❌ CloseBtn.jsx - Возвращает страницу к базовому состоянию

📦 Container.jsx - Контейнер для элементов

ℹ️ CsvInfo.jsx - Отображает появившиеся хайлайты (внутри CsvStatistic)

⬇️ DownloadFile.jsx - Отвечает за состояние UI (базовое/загрузка/ошибка/успех), содержит CloseBtn

🔄 ExtraBtn.jsx - Роутинг на HomePage и очистка истории

🏷️ Header.jsx - Шапка (с Navigation внутри)

📜 HistoryElem.jsx - Элемент истории (имя файла, дата, результат обработки)

🔢 ModalWindow.jsx - Модальное окно

🧭 Navigation.jsx - Навигация между страницами

📤 SendCsv.jsx - Отправка CSV (с LogMetric внутри)

⚙️ Вспомогательные функции (features/)

📅 calculateDay.js - Конвертация числа в дату

📝 LogMetric.js - Логика отправки в LocalStorage

🔢 roundedMetrics.js -  Округление чисел

Первая страница - HomePage (1) - отвечает за загрузку файла, его обработку и отправку данных в localstorage
Состоит из компонентов 
📦 Container

📤 DownloadFile 

📤 SendCsv  

ℹ️ CsvInfo

Вторая страница - TableGeneratorPage (2) - занимается загрузкой файла CSV для пользователя
Состоит из компонентов 
📦 Container

❌ CloseBtn

Третья страница - HistoryPage (3) - отображает данные по отправленным на серверную часть запросам по аналитике из HomePage (1)
Состоит из компонентов
📦 Container

📜 HistoryElem

🔢 ModalWindow

🔄 ExtraBtn


