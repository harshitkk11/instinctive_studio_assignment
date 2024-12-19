-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "cohort" TEXT NOT NULL,
    "courses" TEXT[],
    "dateOfJoin" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
