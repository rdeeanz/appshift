import { CollectionConfig } from "payload/types";

export const Apps: CollectionConfig = {
  slug: "apps",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "link", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "license", type: "text", required: true },
    { name: "type", type: "text", required: true },
    { name: "platforms", type: "array", fields: [{ name: "platform", type: "text" }] },
    { name: "features", type: "array", fields: [{ name: "feature", type: "text" }] },
    { name: "origin", type: "text" },
    { name: "isFeatured", type: "checkbox", defaultValue: false },
    { name: "isNew", type: "checkbox", defaultValue: true },
  ],
};
