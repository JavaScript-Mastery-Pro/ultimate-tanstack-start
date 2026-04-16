import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/$")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat } = Route.useParams();

  return <div>Path: /docs/{_splat}</div>;
}
