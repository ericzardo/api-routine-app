import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/", (_, reply) => {
  reply.status(200).send({
    message: "First route bitches!"
  })
})

const main = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3333 });
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
};

main();
