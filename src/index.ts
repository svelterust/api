import { Elysia, t } from "elysia";
import { auth } from "$lib/elysia";
import { login, register } from "$lib/session";

const app = new Elysia()
  .use(auth)
  .post("/register", async ({ body: { email, password } }) => {
    await register(email, password);
    return login(email, password);
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })
  .post("/login", async ({ body: { email, password } }) => {
    return login(email, password);
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  })
  .listen(3000);

console.log(`🌐 Server running at http://${app.server?.hostname}:${app.server?.port}`);
