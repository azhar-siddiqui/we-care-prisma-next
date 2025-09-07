/*
  Warnings:

  - A unique constraint covering the columns `[contactNumber]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Admin" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."Doctor" (
    "id" TEXT NOT NULL,
    "doctorName" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191),
    "commission" INTEGER NOT NULL,
    "phone" VARCHAR(191) NOT NULL,
    "degree" VARCHAR(191) NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'DOCTOR',
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "public"."Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_phone_key" ON "public"."Doctor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_contactNumber_key" ON "public"."Admin"("contactNumber");

-- AddForeignKey
ALTER TABLE "public"."Doctor" ADD CONSTRAINT "Doctor_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
