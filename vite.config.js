import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Dev-only middleware that mounts the serverless function at /api/chat
// so `npm run dev` matches the Vercel production behavior.
const devApiPlugin = () => ({
  name: "dev-api",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (req, res, next) => {
      try {
        const mod = await server.ssrLoadModule("/api/chat.js");
        const handler = mod.default;
        return handler(req, res);
      } catch (err) {
        console.error("[dev-api] /api/chat failed:", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: err?.message || "Dev API failure" }));
        return next();
      }
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), devApiPlugin()],
  server: {
    host: true,
    port: 4000,
  },
  build: {
    outDir: "dist",
  },
});
