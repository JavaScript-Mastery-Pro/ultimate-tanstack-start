import { createFileRoute } from "@tanstack/react-router";

let databaseUsername = "GuestUser_Original";

export const Route = createFileRoute("/api/profile")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({ username: databaseUsername });
      },
      POST: async ({ request }) => {
        const formData = await request.formData();
        const newName = formData.get("username");

        if (typeof newName === "string") {
          databaseUsername = newName;
          console.log(`[Backend] Database updated to: ${databaseUsername}`);
        }

        return Response.json({ success: true });
      },
    },
  },
});
