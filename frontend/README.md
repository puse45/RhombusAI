# Rhombus AI Frontend Challenge

This is a web application designed to display data, focusing on data type inference and conversion for datasets.

## Table of Contents

- [Description](#description)
- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [Getting Started](#getting-started)
  - [Deployment](#deployment)

## Description

The goal is to develop a frontend application using a JavaScript framework, preferably React, to interact with the Django backend.

- Users should be able to upload data (CSV/Excel files), submit it for processing, and view the processed data.
- The application can map backend (Pandas) data types to user-friendly names; for example, 'object' data type could be displayed as 'Text', and 'datetime64' could be shown as 'Date', etc.
- Additionally, users could have the option to override the data types inferred by the script, enabling them to set their own data types for columns if needed.

## Setup

### Dependencies

List of main libraries, tools, etc. needed:

- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
- [NPM](https://www.npmjs.com/) - A package manager
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps
- [Eslint](https://eslint.org/) - A linting utility for JavaScript

### Getting Started

- Clone the repository
- Navigate to the project directory - `cd`

## Deployment

The project can be deployed in two ways:

1. Docker Container
2. NPM Server (Development)

### Deployment via Docker

For quick setup, utilize Docker.

#### Requirements

- Docker
- Docker-compose

#### Ports

Ensure that port :3000 (Development Server) is available and not occupied by any other service.

#### Environment Variables

```shell
cp .env-example .env.development.local
source .env.development.local
```

#### Deployment Procedure (Docker)

```shell
docker-compose -f docker/docker-compose.yml up --build -d && docker system prune --all --force
```

### Deployment Procedure (Dev Server)

#### Setup Project
- Install project dependencies by running:
```shell
npm install
```
- Start the server:
```shell
npm start
```
