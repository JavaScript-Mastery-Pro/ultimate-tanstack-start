import { Await, createFileRoute, defer } from "@tanstack/react-router";
import { Suspense } from "react";

// A simulated fast database query
const fetchProductDetails = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { name: "Pro Wireless Headphones", price: "$299.00" };
};

// A simulated slow database aggregation
const fetchCustomerReviews = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return [
    { id: 1, user: "Alice", text: "Incredible sound quality." },
    { id: 2, user: "David", text: "Comfortable, but battery life is average." },
  ];
};

export const Route = createFileRoute("/streaming-ssr/product")({
  loader: async () => {
    // We await this. The server stops and waits.
    const product = await fetchProductDetails();

    // We DO NOT await this. We wrap the pending promise
    // in defer(). The server will not wait for this to finish.
    const reviewsPromise = defer(fetchCustomerReviews());

    return {
      product,
      reviewsPromise,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  // data.product is a resolved object ready to use.
  // data.reviewsPromise is an unresolved promise.
  const data = Route.useLoaderData();

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      {/* The awaited data renders instantly */}
      <h1 className="text-3xl font-bold">{data.product.name}</h1>
      <p className="text-xl text-green-700 mt-2">{data.product.price}</p>

      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* 1. Wrap the deferred section in Suspense */}
      <div className="min-h-37.5">
        <Suspense fallback={<ReviewsSkeleton />}>
          {/* 2. Pass the promise to the Await component */}
          <Await promise={data.reviewsPromise}>
            {/* 3. Once the server finishes streaming, Await provides the data */}
            {(reviews) => (
              <ul className="space-y-4">
                {reviews.map((review) => (
                  <li key={review.id} className="p-4 border rounded">
                    <p className="font-bold">{review.user}</p>
                    <p className="text-gray-700">{review.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </Await>
        </Suspense>
      </div>
    </main>
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
