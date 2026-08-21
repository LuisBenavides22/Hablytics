
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "resetPasswordExpire" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "stripeCustomerId" TEXT;


CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
