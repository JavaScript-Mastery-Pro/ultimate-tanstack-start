import { authMiddleware, loggerMiddleware } from "#/middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin")({
  server: {
    // This array applies to EVERY handler in this file automatically
    middleware: [loggerMiddleware, authMiddleware],

    handlers: {
      GET: async () => {
        return Response.json({ message: "Secure admin data fetched" });
      },
      DELETE: async () => {
        return Response.json({ message: "Securely deleted data" });
      },
    },
  },
});
