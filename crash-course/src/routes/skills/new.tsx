import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/skills/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/skills/new"!</div>
}
