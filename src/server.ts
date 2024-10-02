import Fastify from "fastify";

const app = Fastify({ logger: true });

const main = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3333 });
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
};

main();
