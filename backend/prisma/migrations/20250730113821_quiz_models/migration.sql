-- CreateTable
CREATE TABLE "public"."quiz_responses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "sessionId" TEXT NOT NULL,
    "quiz_1_selection" TEXT NOT NULL,
    "quiz_2_selection" TEXT NOT NULL,
    "quiz_3_selection" TEXT NOT NULL,
    "quiz_4_selection" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz_config" (
    "id" SERIAL NOT NULL,
    "mandatory_categories_count" INTEGER NOT NULL DEFAULT 2,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "quiz_config_pkey" PRIMARY KEY ("id")
);
