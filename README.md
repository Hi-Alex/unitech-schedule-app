# Приложение расписания учебных занятий в университете

## Требования

- Docker
  - docker
  - docker-compose
- Node (for non-docker local dev)
  - yarn (monorepo with workspaces)
- GIT

## Архитектура

### Общая схема

- Все сервисы находятся в папке [packages](packages)
  - client-\*, - клиентский код для поддерживаемых платформ
  - node-\*, - node js сервер
  - service-\*, - используемые сервисы, как правило, переменные окружения и конфигурация для контейнеров docker`а
- [docker-compose.yml](docker-compose.yml), - prod-конфигурация docker-compose
- [docker-compose.override.yml](docker-compose.override.yml), - переопределения для локального использования
- Глобальные конфиги
  - [.yarnrc](.yarnrc)
  - [.prettierrc](.prettierrc)
  - [.gitignore](.gitignore)
  - [.dockerignore](.dockerignore)
  - [package.json](package.json)
  - [tsconfig.json](tsconfig.json)

### NodeJS

#### [main](packages/node-main)

Прокси-узел для связывания остальных node-\* сервисов.

> _Возможно, будет удален с переносом функций на nginx_

#### [renderer](packages/node-renderer)

Использует [client-web](packages/client-web) для серверного рендеринга приложения.

#### [graphql](packages/node-graphql)

Содержит описание и инициализацию всех моделей базы данных.

Является GraphQL API сервером.

### Клиенты

#### [client-web](packages/client-web)

Браузерный клиент, написанный на React.

### Сервисы

#### [postgres](packages/postgres)

На текущий момент пустая PosgreSQL база данных с .env файлом.

#### [nginx](packages/service-nginx)

Единственная точка входа на сервер извне, раздает статичные файлы, остальные запросы перекидывает на [node-main](packages/node-main).

## Связь серивсов

- [client-web](packages/client-web)
  - [nginx](packages/service-nginx)
    - Static files
    - [node-main](packages/node-main)
      - [node-graphql](packages/node-graphql)
        - [posgres](packages/posgres)
      - [node-renderer](packages/node-renderer)
        - Render [client-web](packages/client-web) to HTML
