import { PrismaClient } from "@prisma/client";

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
      dateCreated: new Date(),
      dateUpdated: new Date(),
    },
  });

  // Create 5 targetTypeRing records
  for (let i = 1; i <= 5; i++) {
    await prisma.targetTypeRing.create({
      data: {
        targetTypeId: targetType.id,
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
