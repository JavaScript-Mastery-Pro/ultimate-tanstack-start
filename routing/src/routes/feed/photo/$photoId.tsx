import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/feed/photo/$photoId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { photoId } = Route.useParams();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-2xl">
        {/* Close Button navigates back to the main feed */}
        <Link
          to="/feed"
          className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black"
        >
          X
        </Link>

        <img
          src={`https://picsum.photos/seed/${photoId}/1200/800`}
          alt={`Modal view of ${photoId}`}
          className="w-full h-auto max-h-[85vh] object-contain bg-gray-900"
        />
      </div>
    </div>
  );
}
