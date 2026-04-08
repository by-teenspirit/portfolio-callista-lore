import { createFileRoute } from '@tanstack/react-router'
import { ProjectPage } from '@/features/projects/ProjectPage'
import { PROJECTS } from '@/lib/data'

export const Route = createFileRoute('/projects/$slug')({
  // Validate the slug param
  params: {
    parse: (params) => ({ slug: params.slug }),
    stringify: (params) => ({ slug: params.slug }),
  },
  // Load the project data — useful for head/SEO
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug)
    return { project: project ?? null }
  },
  // Update document title per project
  head: ({ loaderData }) => ({
    meta: loaderData?.project
      ? [
          { title: `${loaderData.project.title} — Callista Loré` },
          { name: 'description', content: loaderData.project.description },
        ]
      : [{ title: 'Projet introuvable — Callista Loré' }],
  }),
  component: ProjectRouteComponent,
})

function ProjectRouteComponent() {
  const { slug } = Route.useParams()
  return <ProjectPage slug={slug} />
}
