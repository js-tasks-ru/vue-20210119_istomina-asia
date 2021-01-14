# Курс Vue.js

Задачник [курса по Vue.js](https://learn.javascript.ru/courses/vue).

## Использование задачника

Инструкция по работе непосредственно с задачником подробно описана во введении в [00-intro/README.md](00-intro/README.md).

## Работа с репозиторием

#### Подготовка

Перед началом работы требуется установить все необходимые npm пакеты. Они понадобятся для запуска и проверки решений.

```bash
npm ci
```

#### Скрипты

- `npm test` - тестирование всех задач;
- `npm test <TASK>` - тестирование задачи `TASK` (например, `npm test sum` протестирует `00-intro/01-sum`);
- `npm run file-serve` - запуск локального сервера для ручного тестирования;  
    Можно открыть `index.html` задачи по адресу `http://localhost:5000/<MODULE>/<TASK>`; 
- `npm run serve` - запуск сервера разработки для ручного тестирования задач со сборщиком;
    Можно разрабатывать Vue приложение через WebpackDevServer и открывать задачу по адресу `http://localhost:8080/<module>/<task>`.

#### Ручное тестирование и отладка

Если задача простая и у неё есть тесты, вы можете написать решение, протестировать его и сдать решение через задачник. 
Но иногда решение задачи хочется отлаживать, проверять вручную. Для этого в каждой задаче есть возможность проверять задачу в браузере.  

##### Задачи без сборки

Решение задачи без сборки можно проверить, открыв `index.html`. Но просто открыть HTML документ в браузере как файл не получится из-за политик безопасности браузера в использовании EcmaScript модулей. Потребуется запуск локального сервера:
1. В корне репозитория выполните команду `npm run file-serve`;
2. Откройте сайт по ссылке из терминала (или из буфера обмена);
3. Выберите нужный файл, например `00-intro/01-sum`, или сразу откройте  
    http://localhost:5000/00-intro/01-sum ;
4. После изменения файлов решения обновите страницу.

##### Задачи со сборкой

Начиная с третьего модуля мы начнём разрабатывать с использованием инструментов сборки. 
1. В корне репозитория выполните команду `npm run serve`;  
    Выполнится запуск Webpack DevServer через `vue-cli-service`.
2. Откройте страницу, соответствующую решаемой задачи, например,  
    http://localhost:8080/03-SFC/01-counter-button ;
3. После изменения файлов решения страница должна обновиться автоматически с помощью HMR.

## Разработка проекта

В течение курса вы будете разрабатывать проект.

В некоторых задачах вам потребуется выполнить часть вашего проекта. Эти задачи также описаны в этом задачнике, но решать вы их будете в своём репозитории с вашим проектом. В качестве решения в этом репозитории потребуется приложить ссылку на commit с решением.

К концу курса у вас должен получиться репозиторий с законченным проектом.

## Meetups API

При разработке проекта и в решении задач мы будем использовать API сервиса митапов.

Документация API доступна по адресу: https://course-vue.javascript.ru/api

Есть два варианта использования API:
1. Использование публичного API на https://course-vue.javascript.ru/api.
    - База Данных сбрасывается каждые 15 минут;
    - Может одновременном использоваться несколькими разработчиками.
2. Разворачивание локальной версии сервера. Для этого требуется клонировать репозиторий
    https://github.com/javascriptru/course-vue-backend и следовать инструкции в README.
# vuejs-20200925_student