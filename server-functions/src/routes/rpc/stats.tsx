import { getServerStatsFn } from "#/server/stats";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

export const Route = createFileRoute("/rpc/stats")({
  component: RouteComponent,
});

function RouteComponent() {
  const [stats, setStats] = useState<any>(null);

  // Extract the generated proxy for React to use
  const fetchStats = useServerFn(getServerStatsFn);

  const handleRefresh = async () => {
    // This looks like a local function call, but acts as an HTTP request
    const latestStats = await fetchStats();
    setStats(latestStats);
  };

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-3xl font-bold">Server Health Dashboard</h1>

      <button
        onClick={handleRefresh}
        className="mt-6 bg-green-600 text-white p-2 rounded"
      >
        Ping Server
      </button>

      {stats && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p>Uptime: {stats.uptime} seconds</p>
          <p>Memory: {stats.memoryMB} MB</p>
          <p>Last Checked: {stats.timestamp}</p>
        </div>
      )}
    </main>
  );
}
