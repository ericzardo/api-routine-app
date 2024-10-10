import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import env from "@lib/env"
import cookie from "@fastify/cookie"
import cors from "@fastify/cors"
import multipart from '@fastify/multipart'

import login from "./routes/auth/login";
import logout from "./routes/auth/logout";
import authentication from "./routes/auth/authentication";
import createUser from "./routes/users/create-user";
import getUsers from "./routes/users/get-users";
import createProfile from "./routes/profiles/create-profile";
import getProfiles from "./routes/profiles/get-profiles";
import createAlarm from "./routes/alarms/create-alarm";
import getAlarms from "./routes/alarms/get-alarms";
import deleteAlarm from "./routes/alarms/delete-alarm";
import toggleAlarm from "./routes/alarms/toggle-alarm";
import editAlarm from "./routes/alarms/edit-alarm";
import uploadDocument from "./routes/documents/upload-document";
import deleteDocument from "./routes/documents/delete-document";
import moveDocument from "./routes/documents/move-document";
import renameDocument from "./routes/documents/rename-document";
import createFolder from "./routes/documents/create-folder";

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
app.register(cors, {
  origin: true,
  credentials: true,
})
app.register(multipart);

app.register(createUser);
app.register(getUsers);

app.register(createProfile);
app.register(getProfiles);

app.register(login);
app.register(logout);
app.register(authentication);

app.register(createAlarm);
app.register(getAlarms);
app.register(deleteAlarm);
app.register(toggleAlarm);
app.register(editAlarm);

app.register(uploadDocument);
app.register(deleteDocument);
app.register(moveDocument);
app.register(renameDocument);
app.register(createFolder);

const main = async () => {
  try {
    await app.listen({ port: Number(env.PORT)});
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
