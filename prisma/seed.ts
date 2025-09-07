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

  const existingSelfDoctor = await prisma.doctor.findFirst({
    where: { doctorName: 'Self', adminId: null },
  });

  if (!existingSelfDoctor) {
    await prisma.doctor.create({
      data: {
        id: '39ee36d6-229e-46e1-8c3c-ce4b14b798b2', // Use the provided ID
        doctorName: 'Self',
        email: null,
        commission: 0,
        phone: '+917558380826',
        degree: 'self',
        role: Role.DOCTOR,
        adminId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log('Created default "Self" doctor');
  } else {
    console.log('"Self" doctor already exists');
  }

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
