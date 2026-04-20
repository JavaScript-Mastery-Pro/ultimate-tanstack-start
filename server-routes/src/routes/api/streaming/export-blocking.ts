import { createFileRoute } from "@tanstack/react-router";

function generateMockUsers(offset: number, limit: number) {
  return Array.from({ length: limit }).map((_, i) => ({
    id: offset + i,
    name: `User ${offset + i}`,
    email: `user${offset + i}@example.com`,
    role: "Member",
  }));
}

export const Route = createFileRoute("/api/streaming/export-blocking")({
  server: {
    handlers: {
      GET: async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const users = generateMockUsers(0, 25);

        let csvString = "id,name,email,role\n";

        for (const user of users) {
          csvString += `${user.id},${user.name},${user.email},${user.role}\n`;
        }

        return new Response(csvString, {
          headers: {
            "Content-Type": "text/plain",
          },
        });
      },
    },
  },
});
