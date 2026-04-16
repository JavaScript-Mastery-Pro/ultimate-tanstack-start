import { createFileRoute } from "@tanstack/react-router";

// Simulated database queries taking 1 second each
const getUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { name: "Alice" };
};

const getBilling = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { status: "Active" };
};

const getStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { visitors: 4200 };
};

export const Route = createFileRoute("/parallel-fetching/dashboard/waterfall")({
  loader: async () => {
    console.time("Waterfall Time");

    // Anti-pattern: Sequential execution
    const user = await getUser();
    const billing = await getBilling();
    const stats = await getStats();

    console.timeEnd("Waterfall Time");

    return { user, billing, stats };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold">{data.user.name}'s Dashboard</h1>
      <p className="mt-4">Billing: {data.billing.status}</p>
      <p>Visitors: {data.stats.visitors}</p>
    </main>
  );
}
