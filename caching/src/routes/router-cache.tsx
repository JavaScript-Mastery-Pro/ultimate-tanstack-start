import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/router-cache")({
  staleTime: 0,
  // Data is completely deleted from RAM after 15 seconds of inactivity.
  gcTime: 15_000,

  loader: async () => {
    console.log("Loader executed: Fetching default data...");
    // Simulate a slow database query
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      timestamp: new Date().toLocaleTimeString(),
    };
  },

  pendingComponent: () => (
    <main className="page-wrap p-8 max-w-2xl mx-auto font-sans">
      <section className="island-shell rise-in p-8 rounded-xl">
        <p className="font-medium animate-pulse">Loading fresh data...</p>
      </section>
    </main>
  ),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="page-wrap p-8 max-w-2xl mx-auto font-sans">
      <section className="island-shell rise-in p-8 rounded-xl">
        <Link
          to="/"
          className="inline-block mb-6 text-sm hover:text-gray-800 transition-colors"
        >
          ← Back to Hub
        </Link>

        <h2 className="text-xl font-bold mb-2">Default Cache Behavior</h2>
        <p className="mb-6">
          Because default staleTime is 0, this instantly shows old data upon
          return, but fetches a background update.
        </p>

        <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
          <strong className="text-gray-500">Last updated: </strong>
          <span className="font-mono text-emerald-700">{data.timestamp}</span>
        </div>
      </section>
    </main>
  );
}
