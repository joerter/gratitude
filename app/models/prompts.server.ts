import { prisma } from "~/db.server";

export function getPrompts() {
  return prisma.prompt.findMany({
    select: { id: true, text: true },
  });
}

export function createPrompt(prompt: string) {
  return prisma.prompt.create({
    data: {
      text: prompt
    }
  });
}
