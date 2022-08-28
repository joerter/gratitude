import type { Prompt, User } from "@prisma/client";
import { prisma } from "~/db.server";

export function getPrompts({ userId }: { userId: User["id"] }) {
  return prisma.prompt.findMany({
    where: { userId },
    select: { id: true, text: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createPrompt({
  userId,
  promptText,
}: {
  userId: User["id"];
  promptText: Prompt["text"];
}) {
  return prisma.prompt.create({
    data: {
      text: promptText,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
