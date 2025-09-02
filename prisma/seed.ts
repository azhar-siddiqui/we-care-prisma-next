import { Role } from '@/generated/prisma';
import { hashPassword } from '@/lib/auth';
import { env } from '@/lib/env';
import prisma from '@/lib/prisma';

async function main() {
  console.warn('🌌 Starting We Care seeding...');

  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    console.error('Missing admin email or password');
    return;
  }

  const hashedPassword = await hashPassword(env.ADMIN_PASSWORD);

  await prisma.admin.upsert({
    where: {
      email: env.ADMIN_EMAIL,
    },
    update: {}, // Do nothing if exists
    create: {
      labName: 'Medicare Pathology lab',
      ownerName: 'Ahatesham Siddiqui',
      email: env.ADMIN_EMAIL,
      password: hashedPassword,
      contactNumber: env.ADMIN_CONTACT_NUMBER,
      previousSoftware: 'Patho',
      role: Role.ADMIN,
      isVerified: true,
    },
  });

  console.log('✅ Admin seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
