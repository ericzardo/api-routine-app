import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ForbiddenError } from "src/error-handler";
import auth from "src/middleware/auth";

interface ProfileParams {
  userId: string;
}

async function getProfiles (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get<{ Params: ProfileParams }>(
    "//profiles",
    {
      preHandler: [auth],
    },
    async (request, reply) => {
      const { user } = request;

      if (!user) {
        throw new ForbiddenError("Not authenticated.")
      }

      return reply.status(201).send({
        profiles: user.profiles,
        message: `User Profiles sent successfully`,
      });
    },
  );
}

export default getProfiles;
