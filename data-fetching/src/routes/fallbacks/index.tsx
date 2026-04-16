import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/fallbacks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Welcome Home</h1>

      <p className="mb-6">
        To see the pending component work, you MUST click this link. Do not type
        the URL in the address bar!
      </p>

      {/* This triggers the client-side router, NOT the server */}
      <Link to="/fallbacks/reports" preload={false}>
        Go to Reports
      </Link>
    </main>
  );
}
