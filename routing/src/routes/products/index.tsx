import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const productSearchSchema = z.object({
  category: z.enum(["shoes", "clothing", "accessories"]).optional(),
  inStock: z.boolean().catch(false),
  page: z.number().catch(1),
});

export const Route = createFileRoute("/products/")({
  validateSearch: productSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const toggleStock = () => {
    // We update the URL without losing the existing category or page
    navigate({
      search: (prev) => ({
        ...prev,
        inStock: !prev.inStock,
        page: 1, // Always reset to page 1 when a filter changes
      }),
    });
  };

  const nextPage = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: prev.page + 1,
      }),
    });
  };

  return (
    <main className="page-wrap px-4 py-12">
      <h1>Products</h1>

      <div className="flex gap-4 my-6 p-4 island-shell rounded">
        <p>
          <strong>Category:</strong> {search.category || "All"}
        </p>
        <p>
          <strong>In Stock Only:</strong> {search.inStock ? "Yes" : "No"}
        </p>
        <p>
          <strong>Page:</strong> {search.page}
        </p>
      </div>

      <div className="space-x-4">
        <button
          onClick={toggleStock}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Toggle Stock Filter
        </button>

        <button
          onClick={nextPage}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Next Page
        </button>
      </div>
    </main>
  );
}
