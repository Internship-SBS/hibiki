import { prisma } from "../client";
import { users } from "./users";

main();

async function main() {
  const checkout = await prisma.status.create({
    data: { name: "退勤", bgColor: "gray.1", textColor: "black" },
  });
  await prisma.status.createMany({
    data: [
      { name: "出勤", bgColor: "orange", textColor: "white" },
      { name: "外出", bgColor: "teal", textColor: "white" },
    ],
  });
  for (const user of users) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        comment: user.comment,
        extension: user.extension,
        UserStatus: {
          create: {
            statusId: checkout.id,
          },
        },
        Divisions: {
          connectOrCreate: {
            where: {
              name: user.division,
            },
            create: {
              name: user.division,
            },
          },
        },
      },
    });
  }
}
