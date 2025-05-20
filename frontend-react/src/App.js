import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignIn from './Pages/SignIn';
import MainPage from './Pages/MainPage';
import Desafios from './Pages/Desafios'; 
import Tutoriais from './Pages/Tutoriais';
import ForumPage from './Pages/ForumPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SignIn />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/desafios" element={<Desafios />} />
        <Route path="/tutoriais" element={<Tutoriais />} />
        <Route path="/forumpage" element={<ForumPage />} /> 
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
