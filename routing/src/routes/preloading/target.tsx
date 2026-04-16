import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/preloading/target")({
  loader: async () => {
    // Simulate a slow 2-second database query
    console.log("Fetching heavy data...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { message: "Heavy data loaded successfully" };
  },

  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold">Target Page</h1>
      <p className="mt-4 text-green-600">{data.message}</p>
    </main>
  );
}
