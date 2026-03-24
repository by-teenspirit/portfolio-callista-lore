import ProjectPage from '../ProjectPage';
import { PROJECTS } from '../../data/content';
export default function Human2Sport() {
  return <ProjectPage project={PROJECTS.find(p => p.id === 'human2sport')} />;
}
