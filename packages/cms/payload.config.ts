import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb"; // Or postgres
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { Apps } from "./collections/Apps";
import { Categories } from "./collections/Categories";

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Apps, Categories],
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  typescript: {
    outputFile: "payload-types.ts",
  },
});
