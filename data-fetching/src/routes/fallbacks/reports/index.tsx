import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fallbacks/reports/")({
  loader: async () => {
    // simulate a slow 2-second database query
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return { status: "Generated", total: 150 };
  },

  // assign the component to display while the loader is running
  pendingComponent: ReportsPending,

  // Wait 500ms before showing the pending component.
  // If the loader finishes in 300ms, the user NEVER sees the loading screen.
  pendingMs: 500,

  // If the loader DOES take longer than 500ms, paint the pending component.
  // Once painted, force it to stay visible for a MINIMUM of 1000ms.
  pendingMinMs: 1000,
  component: RouteComponent,
});

function ReportsPending() {
  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-400">
        Loading Reports...
      </h1>
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded w-full"></div>
        <div className="h-24 bg-gray-200 rounded w-full"></div>
      </div>
    </main>
  );
}

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Financial Reports</h1>
      <div className="p-6 bg-white border border-gray-200 shadow-sm rounded">
        <p>
          Status:{" "}
          <span className="text-green-600 font-bold">{data.status}</span>
        </p>
        <p>Total Records: {data.total}</p>
      </div>
    </main>
  );
}
