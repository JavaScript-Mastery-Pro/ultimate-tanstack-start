import { getAllProductsFn } from "#/server/products";
import { createFileRoute } from "@tanstack/react-router";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const products = await getAllProductsFn();

        const productUrls = products
          .map(
            (product: { lastUpdated: string | Date; id: string | number }) => {
              const lastmod =
                typeof product.lastUpdated === "string"
                  ? product.lastUpdated
                  : product.lastUpdated.toISOString().split("T")[0];

              return [
                "<url>",
                `  <loc>https://example.com/products/${escapeXml(String(product.id))}</loc>`,
                `  <lastmod>${escapeXml(lastmod)}</lastmod>`,
                "  <changefreq>weekly</changefreq>",
                "  <priority>0.8</priority>",
                "</url>",
              ].join("\n");
            },
          )
          .join("\n");

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          "  <url>",
          "    <loc>https://example.com/</loc>",
          "    <changefreq>daily</changefreq>",
          "    <priority>1.0</priority>",
          "  </url>",
          productUrls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
          },
        });
      },
    },
  },
});
