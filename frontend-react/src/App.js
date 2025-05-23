import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignIn from './Pages/SignIn';
import MainPage from './Pages/MainPage';
import Biomedicina from './Pages/Biomed';
import Medicina from './Pages/Medicina'; 
import Psicologia from './Pages/Psicologia'; 
import Filosofia from './Pages/Filosofia';
import CursosPage from './Pages/CursosPage';
import Tutoriais from './Pages/Tutoriais';
import ForumPage from './Pages/ForumPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SignIn />} />
        <Route path="/Home" element={<MainPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/Biomedicina" element={<Biomedicina />} />
        <Route path="/Medicina" element={<Medicina />} />
        <Route path="/Psicologia" element={<Psicologia />} /> 
        <Route path="/Filosofia" element={<Filosofia />} />
        <Route path="/tutoriais" element={<Tutoriais />} />
        <Route path="/forum" element={<ForumPage />} /> 
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
