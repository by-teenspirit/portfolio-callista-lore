import ProjectPage from '../ProjectPage';
import { PROJECTS } from '../../data/content';
export default function DirectMandat() {
  return <ProjectPage project={PROJECTS.find(p => p.id === 'direct-mandat')} />;
}
