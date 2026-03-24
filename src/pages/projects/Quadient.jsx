import ProjectPage from '../ProjectPage';
import { PROJECTS } from '../../data/content';
export default function Quadient() {
  return <ProjectPage project={PROJECTS.find(p => p.id === 'quadient')} />;
}
