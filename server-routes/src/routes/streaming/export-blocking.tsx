import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/streaming/export-blocking")({
	component: RouteComponent,
});

function RouteComponent() {
	const [csvData, setCsvData] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const startExport = async () => {
		setCsvData("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/streaming/export-blocking");
			const text = await response.text();
			setCsvData(text);
		} catch (error) {
			console.error("Export failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="page-wrap export-page">
			<section className="island-shell export-shell rise-in">
				<button
					className="export-trigger"
					disabled={isLoading}
					onClick={startExport}
					type="button"
				>
					{isLoading ? "Loading everything..." : "Start Blocking Export"}
				</button>

				<pre aria-live="polite" className="export-output">
					{csvData ||
						(isLoading ? "Preparing export..." : "Waiting to fetch data...")}
				</pre>
			</section>
		</main>
	);
}
