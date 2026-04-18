import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

export const Route = createFileRoute("/upload")({
  component: RouteComponent,
});

function RouteComponent() {
  const [message, setMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    setSelectedFileName(file?.name ?? "");
    setMessage("");
    setStatus("idle");
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    setMessage("");
    setStatus("idle");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setMessage(data.error || "Upload failed. Please try again.");
        setStatus("error");
        return;
      }

      setMessage(data.message || "File uploaded successfully.");
      setStatus("success");
    } catch {
      setMessage("Something went wrong while uploading. Please try again.");
      setStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="page-wrap upload-page">
      <section className="island-shell upload-shell rise-in">
        <form className="upload-form" onSubmit={handleUpload}>
          <label
            className="feature-card upload-dropzone"
            htmlFor="avatar-upload"
          >
            <input
              accept="image/*"
              className="upload-input"
              id="avatar-upload"
              name="avatar"
              onChange={handleFileChange}
              required
              type="file"
            />

            <span aria-hidden="true" className="upload-illustration">
              <Upload size={48} />
            </span>

            <span className="upload-dropzone-copy">
              <strong>{selectedFileName || "Choose an image"}</strong>
              {selectedFileName ? (
                <span className="upload-file-name">Ready to upload</span>
              ) : (
                <span>Select a file</span>
              )}
            </span>

            <span className="upload-dropzone-action">
              {selectedFileName ? "Change File" : "Browse Files"}
            </span>
          </label>

          <div className="upload-actions">
            <button
              className="upload-submit"
              disabled={!selectedFileName || isUploading}
              type="submit"
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </button>
          </div>

          {message ? (
            <div
              aria-live="polite"
              className={`upload-feedback upload-feedback--${status}`}
            >
              {message}
            </div>
          ) : null}
        </form>
      </section>
    </main>
  );
}
