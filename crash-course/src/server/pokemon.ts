import { createServerFn } from "@tanstack/react-start";

export const getPokemonFn = createServerFn({ method: "GET" }).handler(
	async () => {
		// This will ONLY log on your secure backend server
		console.log("Executing secure database/API call on the server...");

		const response = await fetch(
			"https://pokeapi.co/api/v2/pokemon?offset=20&limit=5",
		);
		const data = await response.json();
		return data;
	},
);
