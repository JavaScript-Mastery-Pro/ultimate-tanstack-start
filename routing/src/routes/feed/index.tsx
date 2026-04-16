import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/feed/")({
  component: RouteComponent,
});

function RouteComponent() {
  // We use actual seeds for Picsum to generate consistent photos
  const photoSeeds = ["ocean", "mountain", "forest", "city", "desert", "space"];

  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Latest Photos</h1>

      <div className="grid grid-cols-3 gap-6">
        {photoSeeds.map((seed) => (
          <Link
            key={seed}
            // Notice we link to the nested route, NOT the standalone route
            to="/feed/photo/$photoId"
            params={{ photoId: seed }}
            className="block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={`https://picsum.photos/seed/${seed}/400/400`}
              alt={`Thumbnail ${seed}`}
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
      </div>

      {/* The modal renders right here when a user clicks a photo */}
      <Outlet />
    </main>
  );
}
