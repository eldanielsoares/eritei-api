import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const categories = [
  { name: 'punishment', id: 'bc737bb5-8351-4614-8c30-f82788613c30' },
  { name: 'challenge', id: '06270a24-c212-4b4f-af92-ff4556f779a7' },
  { name: 'vote', id: 'bd911953-4f2f-4e5d-a6dd-6828eec9bf31' },
  { name: 'action', id: '75292605-8fa8-46d5-a652-c7efbe5836d2' },
  { name: 'truthOrDare', id: '62991d0e-eda5-4aa0-ba9a-6f3f638032f2' },
  { name: 'personal', id: '3cb6c368-0e2e-4635-bd79-351e3b66dd67' },
  { name: 'truth', id: '0c14518a-7ebf-4542-a3d5-d96f99596613' },
  { name: 'lie', id: '8d7ef326-4d25-4331-855f-ccb2f163e42e' },
  { name: 'discord', id: '93249714-43ef-4fcc-a68a-46646dad9fb9' },
  { name: 'gossip', id: 'cdf26094-4752-4ed4-9b83-a0881a6a3a1c' },
  { name: 'opinion', id: 'f5aeb9f4-1ea9-45d2-b28b-f9d5edbd2b82' },
];

const deck = [
  { id: '4d9d4829-d806-4c32-9a63-f23cdc5823a8' },
  { id: 'f97d5da2-f9c5-451d-ae3f-e23134bbbc38' },
];

async function main() {
  const cards = [];

  for (const category of categories) {
    for (let i = 0; i < 10; i++) {
      cards.push({
        categoryId: category.id,
        description: faker.lorem.sentence(),
        shots: faker.number.int({ min: 1, max: 10 }),
        image: faker.image.url(),
        weight: faker.number.int({ min: 1, max: 10 }),
        deckId: deck[faker.number.int({ min: 0, max: 1 })].id,
        isFree: true,
      });
    }
  }

  // Inserir no banco de dados
  await prisma.card.createMany({
    data: cards,
  });

  console.log(`Seed complete!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
