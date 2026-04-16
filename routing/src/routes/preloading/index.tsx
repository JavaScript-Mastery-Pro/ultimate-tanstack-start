import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/preloading/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Preloading Strategies</h1>

      <div className="flex flex-col space-y-8">
        {/* Strategy 1: Intent (Default) */}
        <div className="border p-4 rounded">
          <h2 className="font-bold mb-2">1. Intent (Hover)</h2>
          <Link
            to="/preloading/target"
            preload="intent"
            className="text-blue-600 underline"
          >
            Hover over me, wait 2 seconds, then click
          </Link>
        </div>

        {/* Strategy 2: Disabled */}
        <div className="border p-4 rounded">
          <h2 className="font-bold mb-2">2. Disabled</h2>
          <Link
            to="/preloading/target"
            preload={false}
            className="text-blue-600 underline"
          >
            I will only load when you actually click me
          </Link>
        </div>

        {/* Spacer to push the viewport link off-screen */}
        <div className="h-[150vh] bg-gray-100 p-4 flex items-center justify-center rounded">
          <p>Scroll down...</p>
        </div>

        {/* Strategy 3: Viewport */}
        <div className="border p-4 rounded">
          <h2 className="font-bold mb-2">3. Viewport (Scroll)</h2>
          <Link
            to="/preloading/target"
            preload="viewport"
            className="text-blue-600 underline"
          >
            I preloaded the exact second I appeared on your screen
          </Link>
        </div>
      </div>
    </main>
  );
}
