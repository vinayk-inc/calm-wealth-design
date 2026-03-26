import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,

    proxy: {
      "/api/market": {
        target: "https://www.nseindia.com",
        changeOrigin: true,
        secure: false,
        rewrite: () => "/api/allIndices",

        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("user-agent", "Mozilla/5.0");
            proxyReq.setHeader("accept", "application/json");
            proxyReq.setHeader("referer", "https://www.nseindia.com/");
            proxyReq.setHeader("origin", "https://www.nseindia.com");
          });
          proxy.on("error", (err) => {
            console.error("Proxy error:", err);
          });
        },
      },
    },

    hmr: {
      overlay: false,
    },
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));