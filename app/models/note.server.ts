import type { User, Note, Answer } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Note } from "@prisma/client";

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, },
    where: { id, userId },
  });
}

export function getNoteListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, createdAt: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNote({
  userId,
  answers
}: {
  userId: User["id"];
  answers: Pick<Answer, "markdown" | "promptId">[];
}) {
  return prisma.note.create({
    data: {
      answers: { 
        create: answers,
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      answers: true,
    }
  });
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
