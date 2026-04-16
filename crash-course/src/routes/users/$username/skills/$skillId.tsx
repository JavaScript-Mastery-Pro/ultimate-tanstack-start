import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$username/skills/$skillId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { username, skillId } = Route.useParams();

	return (
		<p>
			{username}'s skill: {skillId}
		</p>
	);
}
