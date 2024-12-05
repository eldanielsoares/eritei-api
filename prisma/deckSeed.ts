import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const decks = [{ name: 'love' }, { name: 'fallen' }];

async function main() {
  // Array para armazenar cartas

  // Inserir no banco de dados
  await prisma.deck.createMany({
    data: decks,
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
