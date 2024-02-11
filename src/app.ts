import Fastify, { FastifyError, FastifyInstance } from "fastify";
import AutoLoad from "@fastify/autoload";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyJwt from "@fastify/jwt";
import {
  API_VERSION,
  CREDENTIALS,
  NODE_ENV,
  ORIGIN,
  PORT,
  SECRET_KEY,
} from "@config";
import fastifyEnv from "@fastify/env";

import { authentication } from "@plugins/authentication";
import { initSwagger } from "@plugins/swagger";

import { schemaErrorFormatter } from "@utils/schemaErrorFormatter";

import { schema } from "@utils/validateEnv";
import { join } from "path";

class App {
  public app: FastifyInstance;

  public env: string;

  public port: number;

  constructor() {
    this.app = Fastify({
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

    this.env = NODE_ENV ?? "development";
    this.port = Number(PORT) ?? 3001;

    this.init();
  }

  public async listen() {
    try {
      await this.app.listen({ port: this.port });
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  public getServer() {
    return this.app;
  }

  private init() {
    this.initializePlugins();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializePlugins() {
    this.app.register(fastifyEnv, { dotenv: true, schema });
    this.app.register(fastifyCors, {
      origin: ORIGIN,
      credentials: CREDENTIALS === "true",
    });
    this.app.register(fastifyHelmet);
    this.app.register(fastifyJwt, { secret: SECRET_KEY ?? "" });
    this.app.register(authentication);
    this.app.register(initSwagger);
  }

  private initializeRoutes() {
    this.app.register(AutoLoad, {
      dir: join(__dirname, "/routes"),
      dirNameRoutePrefix: false,
      options: { prefix: `/api` },
    });
  }

  private initializeErrorHandling() {
    this.app.setErrorHandler((error: FastifyError, request, reply) => {
      const status: number = error.statusCode ?? 500;
      const message: string =
        status === 500
          ? "Something went wrong"
          : error.message ?? "Something went wrong";

      this.app.log.error(
        `[${request.method}] ${request.url} >> StatusCode:: ${status}, Message:: ${message}`
      );

      return reply.status(status).send({ error: true, message });
    });
  }
}

export default App;
