import ProjectPage from '../ProjectPage';
import { PROJECTS } from '../../data/content';
export default function PesDepannage() {
  return <ProjectPage project={PROJECTS.find(p => p.id === 'pes-depannage')} />;
}
