# ProjetoGoTask

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```



# 📋 Go Task (v1.0)

O **Go Task** é uma aplicação web de gerenciamento de tarefas no estilo Kanban, desenvolvida durante o curso de Angular da **Rocketseat**. O objetivo do aplicativo é permitir a criação, organização e acompanhamento de tarefas de maneira simples, fluida e intuitiva.

---

## 🚀 Funcionalidades

- **Gerenciamento de Tarefas (CRUD):**
  - **Criação:** Adicione novas tarefas com título e descrição.
      - Utilizando modal dialog
  - **Edição:** Atualize o conteúdo das tarefas existentes.
      - Utilizando modal dialog
  - **Exclusão:** Remova tarefas que não são mais necessárias.
- **Quadro Kanban Interativo (Drag & Drop):**
  - Movimente cards facilmente entre os status: **A Fazer** (`TODO`), **Fazendo** (`DOING`) e **Concluído** (`DONE`).
- **Sistema de Comentários:**
  - Adicione e visualize comentários vinculados a tarefas específicas através de modal dedicado.
- **Identificadores Únicos (IDs por Timestamp):**
  - Cada tarefa e comentário recebe um ID exclusivo gerado a partir do timestamp (data/hora de criação).
- **Persistência Local:**
  - Todas as tarefas e dados da aplicação são salvos no `localStorage` do navegador, garantindo que suas informações continuem disponíveis após recarregar a página.

---

## 🛠️ Tecnologias e Arquitetura

- **Framework Main:** [Angular](https://angular.io/)
- **Linguagem:** TypeScript / HTML5 / CSS3
- **Persistência:** Browser LocalStorage API
- **Arquitetura de Componentes:**
  - `header`: Cabeçalho principal da aplicação.
  - `welcome-section`: Seção de boas-vindas e ações rápidas.
  - `task-list-section`: Gerenciamento das colunas do quadro.
  - `task-card`: Card individual representando cada tarefa.
  - `task-form-modal`: Modal para criação e edição de tarefas.
  - `task-comments-modal`: Modal para gestão de comentários da tarefa.
  - **Enums, Interfaces, Services e Utils:** Organização das regras de negócio, tipagem de dados e comunicação local.

---

## 📁 Estrutura de Pastas

```text
src/app/
├── header/
├── main-content/
├── task-card/
├── task-comments-modal/
├── task-form-modal/
├── task-list-section/
├── welcome-section/
├── enums/
│   └── task-status.enum.ts
├── interface/
├── services/
├── types/
└── utils/.
