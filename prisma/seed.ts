import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding realistic restaurant data...')

  // 1. Produtos
  const productList = [
    // Entradas
    { name: 'Batata Frita Tradicional', price: 25.0 },
    { name: 'Batata Frita com Cheddar e Bacon', price: 32.9 },
    { name: 'Anéis de Cebola Empanados', price: 22.0 },
    { name: 'Coxinha de Frango com Catupiry (6 un)', price: 18.0 },

    // Pratos / Pizzas / Burgers
    { name: 'Pizza de Calabresa (Grande)', price: 49.9 },
    { name: 'Pizza 4 Queijos (Grande)', price: 56.0 },
    { name: 'Pizza Frango com Catupiry (Grande)', price: 54.0 },
    { name: 'Pizza Portuguesa (Grande)', price: 58.0 },
    { name: 'Burger Artesanal Bacon Classic', price: 34.9 },
    { name: 'Burger Artesanal Double Cheese', price: 38.9 },
    { name: 'Smash Burger Salada', price: 26.5 },

    // Bebidas
    { name: 'Coca-Cola Lata 350ml', price: 6.5 },
    { name: 'Coca-Cola Zero 350ml', price: 6.5 },
    { name: 'Guaraná Antarctica 350ml', price: 6.0 },
    { name: 'Suco Natural de Laranja 500ml', price: 10.0 },
    { name: 'Suco Natural de Limão 500ml', price: 9.5 },
    { name: 'Água Mineral sem Gás 500ml', price: 4.5 },
    { name: 'Cerveja Long Neck Heineken', price: 12.0 },

    // Sobremesas
    { name: 'Pudim de Leite Condensado', price: 14.0 },
    { name: 'Petit Gâteau com Sorvete de Baunilha', price: 24.9 },
    { name: 'Brownie com Sorvete', price: 22.0 },
  ]

  const createdProducts = []
  for (const prod of productList) {
    let p = await prisma.product.findFirst({ where: { name: prod.name } })
    if (!p) {
      p = await prisma.product.create({ data: prod })
    }
    createdProducts.push(p)
  }

  // 2. Mesas (1 até 10)
  const createdTables = []
  for (let i = 1; i <= 10; i++) {
    const t = await prisma.table.upsert({
      where: { table_number: i },
      update: {},
      create: { table_number: i },
    })
    createdTables.push(t)
  }

  // 3. Sessões de Mesa e Pedidos (histórico e sessões abertas)
  const now = new Date()
  const sessionCount = await prisma.tableSession.count()

  if (sessionCount === 0) {
    console.log('Generating historic sessions and orders...')

    // Sessão Fechada 1 (Ontem)
    const session1 = await prisma.tableSession.create({
      data: {
        tableId: createdTables[0].id,
        opened_at: new Date(now.getTime() - 24 * 60 * 60 * 1000),
        closed_at: new Date(now.getTime() - 22 * 60 * 60 * 1000),
      },
    })
    await prisma.order.createMany({
      data: [
        {
          tableSessionId: session1.id,
          productId: createdProducts[4].id,
          quantity: 1,
          price: createdProducts[4].price,
        },
        {
          tableSessionId: session1.id,
          productId: createdProducts[11].id,
          quantity: 2,
          price: createdProducts[11].price,
        },
        {
          tableSessionId: session1.id,
          productId: createdProducts[18].id,
          quantity: 2,
          price: createdProducts[18].price,
        },
      ],
    })

    // Sessão Fechada 2 (Hoje cedo)
    const session2 = await prisma.tableSession.create({
      data: {
        tableId: createdTables[1].id,
        opened_at: new Date(now.getTime() - 5 * 60 * 60 * 1000),
        closed_at: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      },
    })
    await prisma.order.createMany({
      data: [
        {
          tableSessionId: session2.id,
          productId: createdProducts[8].id,
          quantity: 2,
          price: createdProducts[8].price,
        },
        {
          tableSessionId: session2.id,
          productId: createdProducts[0].id,
          quantity: 1,
          price: createdProducts[0].price,
        },
        {
          tableSessionId: session2.id,
          productId: createdProducts[17].id,
          quantity: 3,
          price: createdProducts[17].price,
        },
      ],
    })

    // Sessão Aberta 1 (Mesa 3)
    const session3 = await prisma.tableSession.create({
      data: {
        tableId: createdTables[2].id,
        opened_at: new Date(now.getTime() - 45 * 60 * 1000),
        closed_at: null,
      },
    })
    await prisma.order.createMany({
      data: [
        {
          tableSessionId: session3.id,
          productId: createdProducts[5].id,
          quantity: 1,
          price: createdProducts[5].price,
        },
        {
          tableSessionId: session3.id,
          productId: createdProducts[14].id,
          quantity: 2,
          price: createdProducts[14].price,
        },
      ],
    })

    // Sessão Aberta 2 (Mesa 5)
    const session4 = await prisma.tableSession.create({
      data: {
        tableId: createdTables[4].id,
        opened_at: new Date(now.getTime() - 15 * 60 * 1000),
        closed_at: null,
      },
    })
    await prisma.order.createMany({
      data: [
        {
          tableSessionId: session4.id,
          productId: createdProducts[9].id,
          quantity: 1,
          price: createdProducts[9].price,
        },
        {
          tableSessionId: session4.id,
          productId: createdProducts[12].id,
          quantity: 1,
          price: createdProducts[12].price,
        },
      ],
    })
  }

  console.log('Seeding finished successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


