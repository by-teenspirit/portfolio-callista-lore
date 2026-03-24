import ProjectPage from '../ProjectPage';
import { PROJECTS } from '../../data/content';
export default function Blackskill() {
  return <ProjectPage project={PROJECTS.find(p => p.id === 'blackskill')} />;
}
