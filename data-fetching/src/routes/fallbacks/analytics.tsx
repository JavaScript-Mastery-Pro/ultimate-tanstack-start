import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fallbacks/analytics")({
  loader: async () => {
    // Simulate a fatal network error
    throw new Error("Analytics database connection refused (Code: 503)");
  },

  // The router automatically passes the thrown error to this component
  errorComponent: ({ error, reset }) => {
    return (
      <main className="page-wrap px-4 py-12">
        <div className="p-6 bg-red-50 border border-red-200 rounded max-w-2xl">
          <h1 className="text-xl font-bold text-red-700 mb-2">
            Failed to load analytics
          </h1>
          <p className="text-red-800 font-mono text-sm bg-red-100 p-2 rounded">
            {error.message}
          </p>

          <button
            onClick={() => reset()}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/fallbacks/analytics"!</div>;
}
