// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Forces the terminal to use the direct connection for migrations
    url: env("DIRECT_URL"), 
  },
});