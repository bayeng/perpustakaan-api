/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
const prisma = require('./prismaClient');

async function main() {
  seedBookCategory();
  seedLevel();
}

async function seedBookCategory() {
  const bookCategory = await prisma.bookCategory.create({
    data: {
      name: 'thriler',
    },
  });
  console.log(bookCategory);
}

async function seedLevel() {
  const level = await prisma.level.create({
    data: {
      name: 'author',
    },
  });
  console.log(level);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
