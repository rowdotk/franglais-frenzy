import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const verbsStorageLocation = path.join(
  __dirname,
  "..",
  "storage",
  "verbs.json"
);
