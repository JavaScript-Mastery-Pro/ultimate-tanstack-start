import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/skills/$skillId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { skillId } = Route.useParams();

	return <div>Hello "/skills/{skillId}"!</div>;
}
