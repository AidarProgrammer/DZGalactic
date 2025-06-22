# Инструкцию читать лучше в IDE
Инструкция по запуску
# 1. Установите зависимости
npm install
# 2. Запустите проект
npm run dev
# 3. Запустите бэкенд

React 19 (включая React Compiler)

- Vite для сборки
  
- Zustand для state-менеджмента

- React Router v7 для навигации

Архитектура приложения
src/
├── App.jsx          # 🖥️ Главный компонент (роутинг + Header) 
├── pages/           # 📄 Страницы приложения
│   ├── HomePage.jsx           # 🏠 Главная страница
│   ├── TableGeneratorPage.jsx # 📊 Генератор таблиц
│   └── HistoryPage.jsx        # 🕰️ История запросов
├── components/      # 🧩 Вспомогательные компоненты
│   ├── CloseBtn.jsx           # ❌ возвращает страницу к базовому состоянию
│   ├── Container.jsx          # 📦 контейнер для элементов
│   ├── CsvInfo.jsx            # ℹ️ отображает появившиеся хайлайты. Внутри имеет компонент CsvStatistic
│   ├── DownloadFile.jsx       # ⬇️ отвечает за состояние UI во всех состояниях (базовое, процесс скачивания, ошибка при скачивании, успешное скачивание). Также имеет внутри себя кнопку CloseBtn
│   ├── ExtraBtn.jsx           # 🔄  отвечает за роутинг на страницу HomePage и очистку истории
│   ├── Header.jsx             # 🏷️ Шапка (с Navigation внутри)
│   ├── HistoryElem.jsx        # 📜 Элемент истории (имя файла, дата загрузки, результат обработки)
│   ├── ModalWindow.jsx        # 🔢 Модальное окно
│   ├── Navigation.jsx         # 🧭 Навигация между страницами
│   └── SendCsv.jsx            # 📤 Отправка CSV (с LogMetric внутри)
└── features/       # ⚙️ Вспомогательные функции
    ├── calculateDay.js        # 📅 Конвертация числа в дату
    ├── LogMetric.js           # 📝 Логика отправки в LocalStorage
    └── roundedMetrics.js      # 🔢 Округление чисел

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
