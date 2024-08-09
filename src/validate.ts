import { FastifyBasicAuthOptions } from "@fastify/basic-auth";

export const validate: FastifyBasicAuthOptions["validate"] = (
  username,
  password,
  req,
  reply,
  done
) => {
  if (username === process.env.NAME && password === process.env.PASSWORD) {
    done();
  } else {
    done(new Error("Winter is coming"));
  }
};
