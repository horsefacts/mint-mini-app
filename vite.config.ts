import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { config } from "./src/config";

/**
 * Vite plugin to inject Farcaster mini app embed meta tag
 * This generates the fc:miniapp tag at build time from the config
 */
function fcMiniAppMeta(): Plugin {
  return {
    name: "inject-fc-miniapp-meta",
    transformIndexHtml(html: string) {
      const embedJson = JSON.stringify(config.embed);
      const metaTag = `<meta name="fc:miniapp" content='${embedJson}'>`;
      return html.replace('</head>', `${metaTag}\n</head>`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), fcMiniAppMeta()],
  server: {
    allowedHosts: true,
  },
});
