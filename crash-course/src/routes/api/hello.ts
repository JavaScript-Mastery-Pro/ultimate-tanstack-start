import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/hello")({
	server: {
		handlers: {
			// Define a GET handler for this specific URL
			GET: async ({ request }) => {
				console.log("Someone hit our public API!");

				// You MUST return a standard Web API Response object
				return Response.json(
					{ message: "Hello, World!" },
					{
						headers: {
							"Cache-Control": "public, s-maxage=60",
							"Access-Control-Allow-Origin": "*",
						},
					},
				);
			},
		},
	},
});
