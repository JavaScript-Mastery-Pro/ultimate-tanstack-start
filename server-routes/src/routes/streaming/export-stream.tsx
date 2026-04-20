import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/streaming/export-stream")({
  component: RouteComponent,
});

function RouteComponent() {
  const [csvData, setCsvData] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startExport = async () => {
    setCsvData("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/streaming/export-stream");

      if (!response.body) throw new Error("Streaming not supported.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value);
        setCsvData((prev) => prev + chunkText);
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <main className="page-wrap export-page">
      <section className="island-shell export-shell rise-in">
        <button
          className="export-trigger"
          disabled={isStreaming}
          onClick={startExport}
          type="button"
        >
          {isStreaming ? "Fetching chunks..." : "Start Streaming Export"}
        </button>

        <pre aria-live="polite" className="export-output">
          {csvData ||
            (isStreaming ? "Preparing stream..." : "Waiting to fetch data...")}
        </pre>
      </section>
    </main>
  );
}
