const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  await prisma.note.deleteMany();
  await prisma.prompt.deleteMany();
  await prisma.answer.deleteMany();

  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  // await prisma.prompt.create({
  //   data: {
  //     text: 'What am I thankful for that happened yesterday?'
  //   }
  // });
  // await prisma.prompt.create({
  //   data: {
  //     text: 'What am I looking forward to today?'
  //   }
  // });
  // await prisma.prompt.create({
  //   data: {
  //     text: 'What am I working on at work today?'
  //   }
  // });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
