import { PrismaClient } from "@prisma/client";
import { cryptHash } from "../src/libs/bcrypt";

const prisma = new PrismaClient();

const numberOfCompanies = 2;
const numberOfEvents = 2;
const numberOfCourses = 2;
const numberOfTargets = 10;
const numberOfShots = 2;

async function main() {
  // Create a TargetType (assuming one type for simplicity)
  const targetType = await prisma.targetType.create({
    data: {
      id: "e32ff699-2353-411e-b51f-0999a35c56e3",
      dateCreated: new Date(),
      dateUpdated: new Date(),
    },
  });

  // Create 5 targetTypeRing records
  const defaultColors = [
    "rgb(204, 176, 60)",
    "rgb(153, 51, 51)",
    "rgb(58, 110, 165)",
    "rgb(51, 51, 51)",
    "rgb(240, 240, 240)",
  ];
  const defaultValues = [12, 10, 8, 5, 0];
  for (let i = 1; i <= 5; i++) {
    await prisma.targetTypeRing.create({
      data: {
        targetTypeId: targetType.id,
        orderIndex: i,
        value: defaultValues[i - 1],
        color: defaultColors[i - 1],
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
    });
  }

  for (let i = 1; i <= numberOfCompanies; i++) {
    // Create Companies
    const company = await prisma.company.create({
      data: {
        name: `Company ${i}`,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
    });

    const seedUser = await prisma.user.create({
      data: {
        type: "ADMIN",
        companyId: company.id,
      },
    });
    await prisma.userAuth.create({
      data: {
        userId: seedUser.id,
        email: `test${i}`,
        hashedPassword: await cryptHash("password"),
      },
    });

    for (let j = 1; j <= numberOfEvents; j++) {
      // Create Events related to the Company
      const event = await prisma.event.create({
        data: {
          name: `Event ${j} for Company ${i}`,
          companyId: company.id,
          dateCreated: new Date(),
          dateUpdated: new Date(),
        },
      });

      for (let k = 1; k <= numberOfCourses; k++) {
        // Create Courses related to the Event
        const course = await prisma.course.create({
          data: {
            name: `Course ${k} for Event ${j}`,
            eventId: event.id,
            dateCreated: new Date(),
            dateUpdated: new Date(),
          },
        });

        for (let l = 1; l <= numberOfTargets; l++) {
          // Create Targets related to the Course
          const target = await prisma.target.create({
            data: {
              courseId: course.id,
              targetTypeId: targetType.id,
              dateCreated: new Date(),
              dateUpdated: new Date(),
            },
          });

          for (let m = 1; m <= numberOfShots; m++) {
            // Create Shots related to the Target
            await prisma.shot.create({
              data: {
                targetId: target.id,
                dateCreated: new Date(),
                dateUpdated: new Date(),
              },
            });
          }
        }
      }
    }
  }

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
