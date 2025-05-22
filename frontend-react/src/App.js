import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignIn from './Pages/SignIn';
import MainPage from './Pages/MainPage';
import Biomedicina from './Pages/Biomed';
import Medicina from './Pages/Medicina'; 
import Tutoriais from './Pages/Tutoriais';
import ForumPage from './Pages/ForumPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SignIn />} />
        <Route path="/Home" element={<MainPage />} />
        <Route path="/Biomedicina" element={<Biomedicina />} />
        <Route path="/Medicina" element={<Medicina />} />
        <Route path="/tutoriais" element={<Tutoriais />} />
        <Route path="/forumpage" element={<ForumPage />} /> 
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
