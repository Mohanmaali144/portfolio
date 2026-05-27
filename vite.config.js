import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Dev-only middleware that mounts every file under /api/*.js as a route so
// `npm run dev` matches Vercel's production routing.
const devApiPlugin = () => ({
  name: "dev-api",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url || !req.url.startsWith("/api/")) return next();
      // Strip query string + trailing slash for module resolution.
      const path = req.url.split("?")[0].replace(/\/$/, "");
      const modulePath = `${path}.js`;
      try {
        const mod = await server.ssrLoadModule(modulePath);
        const handler = mod.default;
        if (typeof handler !== "function") {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({ error: `No default export in ${modulePath}` })
          );
          return;
        }
        return handler(req, res);
      } catch (err) {
        console.error(`[dev-api] ${path} failed:`, err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: err?.message || "Dev API failure" }));
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
