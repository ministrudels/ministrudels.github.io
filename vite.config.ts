import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  define: {
    "import.meta.env.VITE_GOOGLE_CLIENT_ID": JSON.stringify(
      "698520807542-84bj8f4p2ueh40p6jb3dpo5hskuc1a7t.apps.googleusercontent.com"
    ),
  },
});
