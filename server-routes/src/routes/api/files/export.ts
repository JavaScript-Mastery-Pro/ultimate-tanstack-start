import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/files/export")({
  server: {
    handlers: {
      GET: async () => {
        // 1. Create raw text format for a CSV file
        const csvData = "id,name,role\n1,Alice,Admin\n2,Bob,Editor";

        // 2. Return standard Response with explicit headers
        return new Response(csvData, {
          headers: {
            "Content-Type": "text/csv",
            // This header forces the browser to download the file
            "Content-Disposition": 'attachment; filename="users.csv"',
          },
        });
      },
    },
  },
});
