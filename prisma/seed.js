// 📂 FILE: prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Memulai seeding data...');

  // 1. Buat Data Planet
  const planets = [
    { name: 'Mars', description: 'Planet Merah', distanceAU: 1.5 },
    { name: 'Jupiter', description: 'Raksasa Gas', distanceAU: 5.2 },
    { name: 'Saturnus', description: 'Planet Cincin', distanceAU: 9.5 },
    { name: 'Neptunus', description: 'Raksasa Es', distanceAU: 30.1 },
  ];

  for (const p of planets) {
    await prisma.planet.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }

  // 2. Buat Data Cargo Dummy
  const allPlanets = await prisma.planet.findMany();
  
  // Buat 20 data dummy
  for (let i = 1; i <= 20; i++) {
    const randomPlanet = allPlanets[Math.floor(Math.random() * allPlanets.length)];
    
    await prisma.cargo.create({
      data: {
        receiptCode: `CRG-${Date.now()}-${i}`,
        senderName: `Pengirim ${i}`,
        weight: parseFloat((Math.random() * 50).toFixed(2)),
        status: i % 2 === 0 ? 'In Transit' : 'Delivered',
        planetId: randomPlanet.id
      }
    });
  }

  console.log('✅ Seeding selesai. 20 Data Cargo dibuat.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
