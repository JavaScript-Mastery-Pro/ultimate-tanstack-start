import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";

// 1. Mock Database (This stays securely on the server)
let databaseUsername = "GuestUser_Original";

// 2. Server Function to GET data
const getProfile = createServerFn({ method: "GET" }).handler(async () => {
  return { username: databaseUsername };
});

// 3. Server Function to POST data
const updateProfile = createServerFn({ method: "POST" })
  .inputValidator((name: string) => name)
  .handler(async ({ data }) => {
    databaseUsername = data;
    console.log(`[Server] Database updated to: ${databaseUsername}`);
    return { success: true };
  });

export const Route = createFileRoute("/profile/")({
  staleTime: 60_000,

  loader: async () => {
    console.log("Loader executed: Fetching user profile...");
    // 4. Call the server function directly. Start handles the URL routing automatically.
    return await getProfile();
  },

  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(event.currentTarget);
    const newName = formData.get("username") as string;

    try {
      if (newName) {
        // 5. Call the mutation server function directly
        await updateProfile({ data: newName });
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className="page-wrap mt-8">
      <section className="island-shell rise-in p-8 rounded-2xl">
        <span className="island-kicker">Demo 1</span>
        <h2 className="display-title mt-2 mb-6 text-2xl font-bold">
          The Outdated Data Problem
        </h2>

        <div className="p-4 bg-(--foam) border border-(--line) rounded-lg mb-6">
          <strong>Current Username: </strong>
          <code>{data.username}</code>
        </div>

        <form onSubmit={handleUpdate} className="flex gap-4">
          <input
            type="text"
            name="username"
            placeholder="Enter new username"
            required
            className="flex-1 px-4 py-2 border border-(--line) rounded-md focus:outline-none focus:ring-2 focus:ring-(--sea-ink-soft) bg-white/50"
          />
          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-2 bg-(--sea-ink) text-white font-semibold rounded-md hover:bg-(--sea-ink-soft) disabled:opacity-60 transition-colors cursor-pointer"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>
    </main>
  );
}
