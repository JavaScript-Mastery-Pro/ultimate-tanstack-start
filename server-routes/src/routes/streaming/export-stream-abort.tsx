import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/streaming/export-stream-abort")({
  component: RouteComponent,
});

function RouteComponent() {
  const [csvData, setCsvData] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Store the AbortController in a ref so it persists across renders
  const abortControllerRef = useRef<AbortController | null>(null);

  const startExport = async () => {
    setCsvData("");
    setIsStreaming(true);

    // Create a new controller for this specific request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/streaming/export-stream", {
        // Attach the controller signal to the fetch request
        signal: abortControllerRef.current.signal,
      });

      if (!response.body) throw new Error("Streaming not supported.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value);
        setCsvData((prev) => prev + chunkText);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Export manually stopped by user.");
      } else {
        console.error("Export failed:", error);
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const cancelExport = () => {
    // Trigger the abort signal to stop the frontend fetch and notify the backend
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <main className="page-wrap export-page">
      <section className="island-shell export-shell rise-in">
        <div className="flex gap-2.5 mb-4">
          <button
            className="export-trigger"
            disabled={isStreaming}
            onClick={startExport}
            type="button"
          >
            {isStreaming ? "Fetching chunks..." : "Start Streaming Export"}
          </button>

          <button
            className="export-trigger"
            disabled={!isStreaming}
            onClick={cancelExport}
            type="button"
          >
            Cancel Export
          </button>
        </div>

        <pre aria-live="polite" className="export-output">
          {csvData ||
            (isStreaming ? "Preparing stream..." : "Waiting to fetch data...")}
        </pre>
      </section>
    </main>
  );
}
