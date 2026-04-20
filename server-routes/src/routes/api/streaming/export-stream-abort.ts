import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/streaming/export-stream-abort")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const encoder = new TextEncoder();

        // Extract the signal from the incoming request
        const signal = request.signal;

        const stream = new ReadableStream({
          async start(controller) {
            controller.enqueue(encoder.encode("id,name,email,role\n"));

            let offset = 0;
            const limit = 5;
            let hasMoreData = true;

            while (hasMoreData) {
              // Check if the user paused or canceled the download
              if (signal.aborted) {
                console.log("Export canceled by user. Halting database query.");
                controller.close();
                return;
              }

              await new Promise((resolve) => setTimeout(resolve, 500));
              const batch = generateMockUsers(offset, limit);

              if (batch.length === 0) {
                hasMoreData = false;
                break;
              }

              let batchCsv = "";
              for (const user of batch) {
                batchCsv += `${user.id},${user.name},${user.email},${user.role}\n`;
              }

              controller.enqueue(encoder.encode(batchCsv));
              offset += limit;
            }

            controller.close();
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain",
            "Transfer-Encoding": "chunked",
          },
        });
      },
    },
  },
});

function generateMockUsers(offset: number, limit: number) {
  if (offset >= 25) return [];
  return Array.from({ length: limit }).map((_, i) => ({
    id: offset + i,
    name: `User ${offset + i}`,
    email: `user${offset + i}@example.com`,
    role: "Member",
  }));
}
