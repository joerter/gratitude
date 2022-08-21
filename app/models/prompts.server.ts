import { prisma } from "~/db.server";

export function getPrompts() {
  return prisma.prompt.findMany({
    select: { id: true, text: true },
  });
}
