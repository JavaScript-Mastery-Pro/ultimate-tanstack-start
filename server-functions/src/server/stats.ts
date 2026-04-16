import { createServerFn } from "@tanstack/react-start";

export const getServerStatsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    // This logic executes on the server and never reaches the browser bundle
    const serverUptime = process.uptime();
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

    return {
      uptime: Math.round(serverUptime),
      memoryMB: Math.round(memoryUsage),
      timestamp: new Date().toISOString(),
    };
  },
);
