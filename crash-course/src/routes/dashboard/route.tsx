import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main>
			<aside>
				<p>Sidebar</p>
			</aside>
			<section>
				<Outlet />
			</section>
		</main>
	);
}
