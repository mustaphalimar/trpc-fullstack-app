import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "./context";

type Context = inferAsyncReturnType<typeof createContext>;

const trpc = initTRPC.context<Context>().create();

export default trpc;
