# Streamthing

Streamthing is a real-time WebSocket platform for Node.js, designed as a simpler, more predictable alternative to hosted pub/sub services. It focuses on strong typing, modern Next.js integration, and production-ready infrastructure.

---

## Features

- 🚀 **Real-time WebSockets**  
  Low-latency messaging built for modern web applications.

- 🔐 **Stateless & Stateful authentication**  
  Access + refresh token model for secure and fast connections.

- 🧠 **Redis-backed state**  
  Redis is used for session tracking, presence, and ephemeral state.

- ⚡ **Next.js-native architecture**  
  Built with **Next.js**, leveraging **Server Actions** and **PPR (Partial Page Rendering)** for efficient server-to-client updates.

- 📦 **Typed NPM package**  
  Fully typed with JSDoc for first-class IntelliSense in both JavaScript and TypeScript. Clients communicate with hosted Streamthing servers — no local server required.

- 🐳 **Docker-first deployments**  
  All services are containerised. CI/CD builds, tests, and publishes versioned Docker images for reliable releases.

- 🧪 **Automated CI/CD**  
  Pipelines run tests, build images, and coordinate server + client releases to prevent breaking changes.

- 💳 **Stripe integration**  
  Simple subscription plans for straightforward billing and account management.

- 📚 **Documentation**  
  Hand-written docs and API reference available at  
  **https://docs.streamthing.dev**

---

## Get started

```bash
npm install streamthing
```
