import { initTRPC } from "@trpc/server";

const createContext = () => ({});

const trpc = initTRPC.create();

export default trpc;
