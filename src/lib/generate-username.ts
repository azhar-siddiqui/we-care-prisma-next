import prisma from './prisma';

// Function to generate a unique username
export async function generateUniqueUsername(name: string, domain: string): Promise<string> {
  // Generate base username
  const baseName = name.toLowerCase().replace(/\s+/g, '');
  let username = `${baseName}@${domain}.com`;
  let counter = 1;

  // Ensure username uniqueness
  while (await prisma.user.findUnique({ where: { username } })) {
    username = `${baseName}_${counter}@${domain}.com`;
    counter++;
  }

  return username;
}
