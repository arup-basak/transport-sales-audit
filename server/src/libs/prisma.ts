import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.info("⚡️[POSTGRESQL]: CONNECTED TO DATABASE");
  })
  .catch((error) => {
    console.error("⚡️[POSTGRESQL]: ERROR CONNECTING TO DATABASE", error);
    process.exit(1);
  });

export default prisma;
