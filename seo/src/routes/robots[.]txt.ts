import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({}) => {
        // Allow all user agents (crawlers) to access the site
        // and explicitly define the location of the sitemap.
        const content = `User-agent: *
Allow: /
Sitemap: http://localhost:3000/api/sitemap.xml`;

        // Return a standard web Response with a plain text header
        return new Response(content, {
          headers: { "Content-Type": "text/plain" },
        });
      },
    },
  },
});
