import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import InstantProd from './pages/projects/InstantProd';
import Blackskill from './pages/projects/Blackskill';
import Human2Sport from './pages/projects/Human2Sport';
import PesDepannage from './pages/projects/PesDepannage';
import DirectMandat from './pages/projects/DirectMandat';
import Quadient from './pages/projects/Quadient';
import MemoireMaster from './pages/projects/MemoireMaster';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets/instant-prod"    element={<InstantProd />} />
        <Route path="/projets/blackskill"      element={<Blackskill />} />
        <Route path="/projets/human2sport"     element={<Human2Sport />} />
        <Route path="/projets/pes-depannage"   element={<PesDepannage />} />
        <Route path="/projets/direct-mandat"   element={<DirectMandat />} />
        <Route path="/projets/quadient"        element={<Quadient />} />
        <Route path="/projets/memoire-master"  element={<MemoireMaster />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
