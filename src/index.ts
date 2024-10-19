import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => ({ name: "James", age: 30 }))
  .listen(3000);

console.log(`🌐 Server running at http://${app.server?.hostname}:${app.server?.port}`);
