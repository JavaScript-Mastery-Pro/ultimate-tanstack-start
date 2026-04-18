import { authMiddleware } from "#/middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/posts")({
  server: {
    // Use a function that returns createHandlers for advanced method level control
    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: async () => {
          return Response.json({
            message: "Everyone can read this public post!",
          });
        },

        POST: {
          // The middleware array now only protects the POST method
          middleware: [authMiddleware],
          handler: async ({ request }) => {
            const body = await request.json();
            return Response.json({
              message: `Secret post created: ${body.title}`,
            });
          },
        },
      }),
  },
});
