import basicAuth from "@fastify/basic-auth";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import path from "path";
import { renderMenu } from "./render";
import { validate } from "./validate";

const PORT = Number(process.env.PORT) || 3000;

const app = fastify();
const authenticate = { realm: "Westeros" };

app.register(basicAuth, { validate, authenticate });

app.register(fastifyStatic, {
  root: path.join(__dirname.replace("/src", ""), ""),
  prefix: "/public/", // optional: default '/',
  decorateReply: true,
  list: {
    format: "html",
    render: renderMenu,
  },
});

app.after(() => {
  app.addHook("onRequest", app.basicAuth);

  app.get("/*", async (request, reply) => {
    return reply.sendFile(request.url.slice(1));
  });
});

app.listen({ port: PORT, host: "0.0.0.0" }, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }

  console.log(`Server started on http://localhost:${PORT}`);
});
