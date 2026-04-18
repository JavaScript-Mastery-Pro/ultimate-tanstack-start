import { createMiddleware } from "@tanstack/react-start";

export const loggerMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    console.log(`[LOGGER] Request made to: ${request.url}`);

    // Calling next() tells the server to continue to the next step
    return next();
  },
);

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const authHeader = request.headers.get("Authorization");

    // If the token is missing or wrong, throw an error to block the request entirely
    if (authHeader !== "Bearer secret_token") {
      throw new Error("Unauthorized API Access");
    }

    // If the token is valid, continue to the handler
    // You can also pass data down using the context object
    return next({
      context: {
        userId: 999,
      },
    });
  },
);
