import { createFileRoute } from "@tanstack/react-router";

// Simulate critical data
const getUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { name: "Alice" };
};

// Simulate an API that always crashes (Non-Critical)
const getAds = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  throw new Error("Ad server timeout");
};

export const Route = createFileRoute("/parallel-fetching/dashboard/safe")({
  loader: async () => {
    // We append a .catch() directly to the non-critical promise.
    // If getAds() fails, it resolves to this fallback object instead of throwing.
    const safeAdsPromise = getAds().catch((error) => {
      console.error("Ad request failed, using fallback:", error.message);
      return { text: "Upgrade to Premium Mode!" };
    });

    // We execute the promises in parallel.
    // Because safeAdsPromise is guaranteed to resolve, it will never break Promise.all.
    const [user, ads] = await Promise.all([
      getUser(), // Critical: No .catch() attached. If this fails, the route crashes.
      safeAdsPromise, // Non-Critical: Protected by .catch().
    ]);

    return { user, ads };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold">{data.user.name}'s Dashboard</h1>

      <div className="mt-8 p-4 bg-gray-100 border text-gray-600">
        <p className="text-xs uppercase font-bold text-gray-400 mb-1">
          Advertisement
        </p>
        <p>{data.ads.text}</p>
      </div>
    </main>
  );
}
