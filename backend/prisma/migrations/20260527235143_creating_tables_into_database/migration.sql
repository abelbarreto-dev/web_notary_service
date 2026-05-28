-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMINISTRATOR', 'ATTENDANT');

-- CreateEnum
CREATE TYPE "NotaryStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "NotaryType" AS ENUM ('BIRTH_CERTIFICATE', 'SIGNATURE_AUTHENTICATION', 'DOCUMENT_AUTHENTICATION', 'DEED', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(512) NOT NULL,
    "profile" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notary" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "remarks" VARCHAR(512),
    "notaryStatus" "NotaryStatus" NOT NULL DEFAULT 'PENDING',
    "notaryType" "NotaryType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
