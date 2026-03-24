import ProjectPage from '../ProjectPage';
import { PROJECTS } from '../../data/content';
export default function MemoireMaster() {
  return <ProjectPage project={PROJECTS.find(p => p.id === 'memoire-master')} />;
}
