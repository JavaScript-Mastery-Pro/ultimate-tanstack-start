import { createFileRoute } from "@tanstack/react-router";

const usersDB: Record<string, { name: string; role: string }> = {
  "101": { name: "Alice Jenkins", role: "Administrator" },
  "102": { name: "Bob Smith", role: "Editor" },
};

export const Route = createFileRoute("/api/dynamic-routes/users/$userId/")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { userId } = params;

        const user = usersDB[userId];

        if (!user) {
          return Response.json(
            { error: `User ${userId} not found.` },
            { status: 404 },
          );
        }

        return Response.json({
          id: userId,
          name: user.name,
          role: user.role,
        });
      },
      POST: async ({ request, params }) => {
        const { userId } = params;

        const body = await request.json();

        usersDB[userId] = {
          name: body.name || usersDB[userId]?.name || "Unknown",
          role: body.role || usersDB[userId]?.role || "Unknown",
        };

        return Response.json(
          {
            message: `User ${userId} updated successfully.`,
            updatedData: body,
          },
          { status: 200 },
        );
      },
    },
  },
});
