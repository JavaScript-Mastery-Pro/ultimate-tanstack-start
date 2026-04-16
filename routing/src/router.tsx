import {
  createRouteMask,
  createRouter as createTanStackRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// 1. Define the masking rule
const photoModalMask = createRouteMask({
  routeTree,
  from: "/feed/photo/$photoId",
  to: "/photo/$photoId",
  params: true, // Automatically pass the $photoId parameter to the masked URL
});

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    routeMasks: [photoModalMask],
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
