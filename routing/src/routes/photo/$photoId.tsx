import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/photo/$photoId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { photoId } = Route.useParams();

  return (
    <main className="page-wrap px-4 py-12 flex justify-center bg-gray-50 min-h-screen">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 capitalize">Photo: {photoId}</h1>
        <img
          src={`https://picsum.photos/seed/${photoId}/1200/800`}
          alt={`Standard view of ${photoId}`}
          className="rounded-lg shadow-xl w-full object-cover"
        />
      </div>
    </main>
  );
}
