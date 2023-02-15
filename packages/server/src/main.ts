import express, { Application } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

import { appRouter } from "./router";
import { createContext } from "./lib/context";

const app: Application = express();

app.use(cors({ origin: "*" }));

const PORT: number = Number(process.env.PORT) || 3333;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, () => {
  console.log(`🚀 server started on Port : ${PORT}`);
});
