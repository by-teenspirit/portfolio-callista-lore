import ProjectPage from '../ProjectPage';
import { PROJECTS } from '../../data/content';
export default function InstantProd() {
  return <ProjectPage project={PROJECTS.find(p => p.id === 'instant-prod')} />;
}
