-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'faculty', 'student', 'super_admin');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('proposed', 'revise_requested', 'advisor_approved', 'final_approval');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "GroupRequestType" AS ENUM ('join', 'invite');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'student',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "profilePictureUrl" TEXT,
    "new" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "minor" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "isInterdisciplinary" BOOLEAN NOT NULL DEFAULT false,
    "status" "ProjectStatus" NOT NULL DEFAULT 'proposed',
    "groupOpen" BOOLEAN NOT NULL DEFAULT true,
    "advisorId" TEXT,
    "coAdvisorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvisorRequest" (
    "id" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "AdvisorRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupRequest" (
    "id" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'pending',
    "type" "GroupRequestType" NOT NULL DEFAULT 'join',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "GroupRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMember" (
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("studentId","projectId")
);

-- CreateTable
CREATE TABLE "StudentSkill" (
    "studentId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "StudentSkill_pkey" PRIMARY KEY ("studentId","skillId")
);

-- CreateTable
CREATE TABLE "FacultySkill" (
    "facultyId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "FacultySkill_pkey" PRIMARY KEY ("facultyId","skillId")
);

-- CreateTable
CREATE TABLE "FacultyResearchInterest" (
    "facultyId" TEXT NOT NULL,
    "researchInterestId" TEXT NOT NULL,

    CONSTRAINT "FacultyResearchInterest_pkey" PRIMARY KEY ("facultyId","researchInterestId")
);

-- CreateTable
CREATE TABLE "FacultyExpertiseArea" (
    "facultyId" TEXT NOT NULL,
    "expertiseAreaId" TEXT NOT NULL,

    CONSTRAINT "FacultyExpertiseArea_pkey" PRIMARY KEY ("facultyId","expertiseAreaId")
);

-- CreateTable
CREATE TABLE "ResearchInterest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ResearchInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpertiseArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExpertiseArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_userId_key" ON "Faculty"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "AdvisorRequest_studentId_idx" ON "AdvisorRequest"("studentId");

-- CreateIndex
CREATE INDEX "AdvisorRequest_projectId_idx" ON "AdvisorRequest"("projectId");

-- CreateIndex
CREATE INDEX "GroupRequest_studentId_idx" ON "GroupRequest"("studentId");

-- CreateIndex
CREATE INDEX "GroupRequest_projectId_idx" ON "GroupRequest"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchInterest_name_key" ON "ResearchInterest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ExpertiseArea_name_key" ON "ExpertiseArea"("name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_coAdvisorId_fkey" FOREIGN KEY ("coAdvisorId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvisorRequest" ADD CONSTRAINT "AdvisorRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvisorRequest" ADD CONSTRAINT "AdvisorRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRequest" ADD CONSTRAINT "GroupRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRequest" ADD CONSTRAINT "GroupRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSkill" ADD CONSTRAINT "StudentSkill_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSkill" ADD CONSTRAINT "StudentSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultySkill" ADD CONSTRAINT "FacultySkill_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultySkill" ADD CONSTRAINT "FacultySkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyResearchInterest" ADD CONSTRAINT "FacultyResearchInterest_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyResearchInterest" ADD CONSTRAINT "FacultyResearchInterest_researchInterestId_fkey" FOREIGN KEY ("researchInterestId") REFERENCES "ResearchInterest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyExpertiseArea" ADD CONSTRAINT "FacultyExpertiseArea_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyExpertiseArea" ADD CONSTRAINT "FacultyExpertiseArea_expertiseAreaId_fkey" FOREIGN KEY ("expertiseAreaId") REFERENCES "ExpertiseArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
