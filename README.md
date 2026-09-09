# Atividade SOLID — Gerenciador de Notificações

Engenharia de Software · Desenvolvimento Back-End · CEUB/FATECS
Aluno: Daniel Pinheiro Antunes Nogueira

Refatoração de uma aplicação de envio de mensagens aplicando **SRP (Single Responsibility Principle)** e **DIP (Dependency Inversion Principle)**.

## Estrutura

```
solid-notificacoes/
├── backend/     Node.js + TypeScript
└── frontend/    React + TypeScript + Vite
```

---

## Parte 1 — Backend

### Como executar

```bash
cd solid-notificacoes/backend
npm install
npm run dev
```

Saída esperada:

```
Enviando E-MAIL para daniel@ceub.br: Bem-vindo!
Enviando SMS para o número 61999998888: Bem-vindo!
Email inválido
```

### O que foi refatorado

**Antes:** o `UserService` validava o e-mail **e** disparava o envio diretamente com um `console.log` fixo.

**Depois:**

| Arquivo | Responsabilidade |
|---|---|
| `notifications/AppNotification.ts` | Contrato — define apenas `enviarNotificacao()` |
| `notifications/EmailNotification.ts` | Implementação de e-mail |
| `notifications/SmsNotification.ts` | Implementação de SMS |
| `services/UserService.ts` | Valida e delega — não sabe qual canal é usado |

**DIP:** o `UserService` recebe um `AppNotification` pelo construtor e nunca importa uma implementação concreta. O canal é escolhido em `index.ts`, na injeção:

```ts
const servicoEmail = new UserService(new EmailNotification());
const servicoSms = new UserService(new SmsNotification());
```

Para adicionar WhatsApp basta criar `WhatsAppNotification.ts` — nenhuma linha do `UserService` muda.

**SRP:** o `UserService` deixou de conhecer o formato da mensagem e o meio de envio. Ele só valida e pede.

---

## Parte 2 — Frontend

### Como executar

```bash
cd solid-notificacoes/frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`.

### O que foi refatorado

**Antes:** o componente `UserProfile` fazia o `fetch` **e** montava o HTML na mesma função.

**Depois:**

| Arquivo | Responsabilidade |
|---|---|
| `hooks/useUser.ts` | Busca de dados — loading, erro e cancelamento de requisição |
| `components/UserProfile.tsx` | Apresentação — não sabe de onde o dado vem |
| `components/UserProfile.css` | Estilos |

**SRP:** trocar a fonte de dados afeta apenas o `useUser.ts`. O componente permanece intacto.

A API usada é a [JSONPlaceholder](https://jsonplaceholder.typicode.com/users). Os botões 1–5 alternam entre usuários.

---

## Tecnologias

Node.js · TypeScript · tsx · React 19 · Vite · CSS