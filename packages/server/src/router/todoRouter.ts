import { z } from "zod";
import trpc from "../lib/trpc";

export const todoRouter = trpc.router({
  list: trpc.procedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany();
    return { todos };
  }),
  create: trpc.procedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const title = input.title;
      const newTodo = await ctx.prisma.todo.create({
        data: {
          title,
          isCompleted: false,
        },
      });
      return { todod: newTodo };
    }),
  update: trpc.procedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.update({
        where: { id: input.id },
        data: { title: input.title, isCompleted: input.isCompleted },
      });

      return { todo };
    }),

  delete: trpc.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.delete({ where: { id: input.id } });
      return `Successfuly Deleted Todo ${todo.id}`;
    }),
});
