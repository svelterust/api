import { Elysia, t } from "elysia";
import { auth } from "$lib/elysia";
import { login, register } from "$lib/session";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(auth)
  .use(swagger())
  .onError(({ code, redirect, error }) => {
    if (code == "NOT_FOUND") {
      return redirect("/swagger");
    } else {
      return {
        name: error.name,
        message: error.message,
      };
    }
  })
  .post("/register", async ({ body: { email, password } }) => {
    await register(email, password);
    return login(email, password);
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
    return login(email, password);
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
    response: t.Object({
      token: t.String(),
    }),
  })
  .listen(process.env.PORT ?? 3000);

console.log(`🌐 API running at http://${app.server?.hostname}:${app.server?.port}`);
