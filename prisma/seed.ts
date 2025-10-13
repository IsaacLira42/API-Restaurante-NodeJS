import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Limpa os dados existentes para evitar duplicatas
  // A ordem importa por causa das chaves estrangeiras!
  await prisma.order.deleteMany()
  await prisma.tableSession.deleteMany()
  await prisma.product.deleteMany()
  await prisma.table.deleteMany()

  console.log('Old data cleaned.')

  // Cria produtos de exemplo
  await prisma.product.createMany({
    data: [
      { name: 'Pizza de Calabresa', price: 45.5 },
      { name: 'Pizza 4 Queijos', price: 52.0 },
      { name: 'Coca-Cola Lata', price: 6.0 },
      { name: 'Suco de Laranja', price: 9.0 },
    ],
  })

  // Cria mesas de exemplo
  await prisma.table.createMany({
    data: [
      { table_number: 1 },
      { table_number: 2 },
      { table_number: 3 },
      { table_number: 4 },
    ],
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
