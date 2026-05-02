import { createFileRoute } from '@tanstack/react-router'
import { ProjectPage } from '@/features/projects/ProjectPage'
import { MemoirePage } from '@/features/projects/MemoirePage'
import { PROJECTS } from '@/lib/data'

export const Route = createFileRoute('/projects/$slug')({
  params: {
    parse: (params) => ({ slug: params.slug }),
    stringify: (params) => ({ slug: params.slug }),
  },
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug)
    return { project: project ?? null }
  },
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

  // Le mémoire a sa propre page dédiée avec mise en page innovante
  if (slug === 'memoire-master') {
    return <MemoirePage />
  }

  return <ProjectPage slug={slug} />
}
