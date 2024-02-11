import Fastify, { FastifyError, FastifyInstance } from "fastify";
import AutoLoad from "@fastify/autoload";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyJwt from "@fastify/jwt";
import { CREDENTIALS, NODE_ENV, ORIGIN, PORT, SECRET_KEY } from "@config";
import fastifyEnv from "@fastify/env";
import { authentication } from "@plugins/authentication";
import { initSwagger } from "@plugins/swagger";
import { schemaErrorFormatter } from "@utils/schemaErrorFormatter";
import { schema } from "@utils/validateEnv";
import { join } from "path";

async function startServer() {
  const app: FastifyInstance = Fastify({
    schemaErrorFormatter,
    ajv: {
      customOptions: {
        coerceTypes: false,
        allErrors: true,
      },
      plugins: [],
    },
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  const env: string = NODE_ENV ?? "development";
  const port: number = Number(PORT) ?? 3001;

  // Initialize Plugins
  await app.register(fastifyEnv, { dotenv: true, schema });
  await app.register(fastifyCors, {
    origin: ORIGIN,
    credentials: CREDENTIALS === "true",
  });
  await app.register(fastifyHelmet);
  await app.register(fastifyJwt, { secret: SECRET_KEY ?? "" });
  await app.register(authentication);
  await app.register(initSwagger);

  // Initialize Routes
  await app.register(AutoLoad, {
    dir: join(__dirname, "/routes"),
    dirNameRoutePrefix: false,
    options: { prefix: `/api` },
  });

  // Initialize Error Handling
  app.setErrorHandler((error: FastifyError, request, reply) => {
    const status: number = error.statusCode ?? 500;
    const message: string =
      status === 500
        ? "Something went wrong"
        : error.message ?? "Something went wrong";

    app.log.error(
      `[${request.method}] ${request.url} >> StatusCode:: ${status}, Message:: ${message}`
    );

    return reply.status(status).send({ error: true, message });
  });

  // Start listening
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  return app;
}

export default startServer;
