import { prisma } from "../client";

main();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Alice",
        bio: "I'm a designer!",
      },
      {
        name: "Bob",
        bio: "I'm a programmer!",
      },
    ],
  });
}
