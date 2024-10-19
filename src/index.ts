import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { auth } from "$lib/elysia";
import { login, register } from "$lib/session";

const app = new Elysia()
  .use(auth)
  .use(swagger())
  .onError(({ error, redirect }) => {
    return redirect("/swagger");
  })
  .post("/register", async ({ body: { email, password } }) => {
    await register(email, password);
    const { token } = await login(email, password);
    return { token };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
    response: t.Object({
      token: t.String(),
    }),
  })
  .post("/login", async ({ body: { email, password } }) => {
    const { token } = await login(email, password);
    return { token };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
    response: t.Object({
      token: t.String(),
    }),
  })
  .listen(3000);

console.log(`🌐 Server running at http://${app.server?.hostname}:${app.server?.port}`);
