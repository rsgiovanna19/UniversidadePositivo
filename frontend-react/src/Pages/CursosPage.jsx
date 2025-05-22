// src/pages/CursosPage.jsx
import { useNavigate } from 'react-router-dom';

export default function CursosPage() {
  const navigate = useNavigate();

  const cursos = [
    { nome: 'Biomedicina', rota: '/Biomedicina', imagem: '/Biomedicina.png' },
    { nome: 'Medicina', rota: '/Medicina', imagem: '/medicina.png' },
    { nome: 'Psicologia', rota: '/Psicologia', imagem: '/psicologia.png' },
    { nome: 'Filosofia', rota: '/Filosofia', imagem: '/filosofia.png' },
  ];

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Cursos Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cursos.map((curso) => (
          <div
            key={curso.nome}
            onClick={() => navigate(curso.rota)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src={curso.imagem} alt={curso.nome} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold">{curso.nome}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
