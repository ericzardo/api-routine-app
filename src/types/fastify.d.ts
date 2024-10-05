import "fastify";

interface Profile {
  id: string;
  userId: string;
  name: string;
}

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
      username: string;
      email: string;
      password: string;
      profiles?: Profile[];
    };
  }
}
