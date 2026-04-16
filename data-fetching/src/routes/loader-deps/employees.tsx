import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const employeeSearchSchema = z.object({
  page: z.number().catch(1),
  department: z.enum(["engineering", "sales", "hr", "all"]).catch("all"),
});

export const Route = createFileRoute("/loader-deps/employees")({
  validateSearch: employeeSearchSchema,
  // router constantly watches the return value of this function.
  loaderDeps: ({ search }) => {
    return {
      page: search.page,
      department: search.department,
    };
  },

  // use the dependencies via the `deps` property
  loader: async ({ deps }) => {
    console.log(
      `Fetching data -> Page: ${deps.page} | Dept: ${deps.department}`,
    );

    // simulate a database query that relies on the URL state
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      results: `Showing ${deps.department} employees for page ${deps.page}`,
      timestamp: new Date().toLocaleTimeString(),
    };
  },

  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const handleNextPage = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: prev.page + 1,
      }),
    });
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        department: e.target.value as any,
        page: 1, // Always reset pagination to page 1 when a filter changes
      }),
    });
  };

  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Employee Directory</h1>

      <div className="flex gap-4 mb-8 p-4 bg-gray-100 border border-gray-300">
        <div>
          <label className="block text-sm font-bold mb-1">
            Filter by Department
          </label>
          <select
            value={search.department}
            onChange={handleDepartmentChange}
            className="border p-2 rounded bg-white"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="hr">Human Resources</option>
          </select>
        </div>
      </div>

      <div className="mb-8 p-6 bg-white border shadow-sm">
        <p className="text-lg font-medium text-blue-800">{data.results}</p>
        <p className="text-sm text-gray-500 mt-2">
          Data fetched at: {data.timestamp}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            navigate({
              search: (prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }),
            })
          }
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 font-medium"
        >
          Previous
        </button>
        <span className="font-bold text-gray-700">Page {search.page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded font-medium"
        >
          Next
        </button>
      </div>
    </main>
  );
}
