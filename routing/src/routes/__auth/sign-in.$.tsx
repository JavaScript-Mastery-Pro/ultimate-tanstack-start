import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__auth/sign-in/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__auth/sign-in/$"!</div>;
}
