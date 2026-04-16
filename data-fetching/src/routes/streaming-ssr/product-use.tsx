import { createFileRoute, defer } from "@tanstack/react-router";
import { Suspense, use } from "react";

const fetchProductDetails = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { name: "Pro Wireless Headphones", price: "$299.00" };
};

const fetchCustomerReviews = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return [
    { id: 1, user: "Alice", text: "Incredible sound quality." },
    { id: 2, user: "David", text: "Comfortable, but battery life is average." },
  ];
};

export const Route = createFileRoute("/streaming-ssr/product-use")({
  loader: async () => {
    const product = await fetchProductDetails();

    const reviewsPromise = defer(fetchCustomerReviews());

    return {
      product,
      reviewsPromise,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold">{data.product.name}</h1>
      <p className="text-xl text-green-700 mt-2">{data.product.price}</p>

      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      <div className="min-h-37.5">
        {/* We pass the raw promise down to an isolated child component */}
        <Suspense fallback={<ReviewsSkeleton />}>
          <ReviewsList promise={data.reviewsPromise} />
        </Suspense>
      </div>
    </main>
  );
}

// Child Component uses the `use` hook to unwrap the stream
function ReviewsList({
  promise,
}: {
  promise: Promise<Array<{ id: number; user: string; text: string }>>;
}) {
  // Execution pauses here until the promise resolves. No nesting required.
  const reviews = use(promise);

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="p-4 border rounded">
          <p className="font-bold">{review.user}</p>
          <p className="text-gray-700">{review.text}</p>
        </li>
      ))}
    </ul>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}
