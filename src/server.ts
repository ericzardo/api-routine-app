import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import env from "@lib/env"
import cookie from "@fastify/cookie"

import login from "./routes/auth/login";
import logout from "./routes/auth/logout";
import createUser from "./routes/users/create-user";
import getUsers from "./routes/users/get-users";
import createProfile from "./routes/profiles/create-profile";
import getProfiles from "./routes/profiles/get-profiles";

const app = Fastify({ logger: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cookie, {
  secret: env.COOKIE_SECRET,
  parseOptions: {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  }
})

app.register(createUser);
app.register(getUsers);

app.register(createProfile);
app.register(getProfiles);

app.register(login);
app.register(logout);

const main = async () => {
  try {
    await app.listen({ port: Number(env.PORT)});
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
