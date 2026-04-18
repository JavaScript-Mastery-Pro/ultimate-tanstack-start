import { authMiddleware, loggerMiddleware } from "#/middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/profile")({
  server: {
    // Route level runs first for everything
    middleware: [loggerMiddleware],

    handlers: ({ createHandlers }) =>
      createHandlers({
        GET: async () => {
          return Response.json({ message: "Public profile info" });
        },
        POST: {
          // Handler specific runs second, only for POST requests
          middleware: [authMiddleware],

          handler: async ({ request, context }) => {
            // The context object contains data passed down by the authMiddleware
            const userId = context.userId;

            return Response.json({
              message: `Profile updated successfully`,
              updatedBy: userId,
            });
          },
        },
      }),
  },
});
