import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/api/dynamic-routes/users/$userId/posts/$postId",
)({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { userId, postId } = params;

        return Response.json({
          message: `Fetched post ${postId} for user ${userId}.`,
        });
      },
    },
  },
});
