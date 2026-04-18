import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/files/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Parse the incoming request as FormData
        const formData = await request.formData();

        // Extract the file using the exact field name sent by the client
        const file = formData.get("avatar");

        // Verify the file actually exists and is not a plain text string
        if (!file || typeof file === "string") {
          return Response.json({ error: "No file uploaded" }, { status: 400 });
        }

        console.log(`Received file: ${file.name}, size: ${file.size} bytes`);

        // You save the file to a cloud bucket or local disk here

        return Response.json({ message: "File uploaded successfully" });
      },
    },
  },
});
