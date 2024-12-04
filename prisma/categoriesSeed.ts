import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categories = [
  { name: 'punishment' },
  { name: 'challenge' },
  { name: 'vote' },
  { name: 'action' },
  { name: 'truthOrDare' },
  { name: 'personal' },
  { name: 'truth' },
  { name: 'lie' },
  { name: 'discord' },
  { name: 'gossip' },
  { name: 'opinion' },
];

async function main() {
  // Array para armazenar cartas

  // Inserir no banco de dados
  await prisma.category.createMany({
    data: categories,
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
