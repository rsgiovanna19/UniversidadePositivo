import React, { useState } from 'react';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Psicologia() {
  const navigate = useNavigate();
  const [PsicologiaSelecionado, setPsicologiaSelecionado] = useState(null);
  const [filtro, setFiltro] = useState('');

  const conteudosPsicologia = [
    {
      titulo: 'Conheça a Psicologia',
      descricao: 'O Psicologia de Psicologia forma profissionais capacitados para atuar em diversas áreas, com base sólida em biologia, química e saúde humana.',
    },
    {
      titulo: 'Mercado de Trabalho da Psicologia',
      descricao: 'O psicólogo pode atuar em hospitais, clínicas, escolas, empresas, instituições públicas e privadas, além de abrir seu próprio consultório.',
    },
    {
      titulo: 'Áreas de atuação da Psicologia',
      descricao: 'As principais áreas incluem clínica, escolar, organizacional, esportiva, hospitalar, jurídica, social e pesquisa científica.',
    },
    {
      titulo: 'Diferenciais da Psicologia',
      descricao: 'A Psicologia oferece infraestrutura moderna, professores experientes, projetos científicos, foco em inovação e trilhas personalizadas.',
    },
    {
      titulo: 'Duração da Psicologia',
      descricao: 'O Psicologia tem duração média de 5 anos (10 semestres), com aulas teóricas e práticas.',
    },
    {
      titulo: 'Mensalidade da Psicologia',
      descricao: 'Quer saber sobre o valor da mensalidade? Conheça nossas bolsas e descontos exclusivos!',
    },
    {
      titulo: 'Trilhas Customizáveis na Psicologia',
      descricao: 'O aluno pode personalizar sua formação com trilhas como Psicologia Clínica, Organizacional, Social, entre outras.',
    },
    {
      titulo: 'Coordenação da Psicologia',
      descricao: 'Corpo docente formado por mestres e doutores, com ampla experiência acadêmica e profissional.',
    },
  ];

  const conteudosFiltrados = conteudosPsicologia.filter((item) =>
    item.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
 <div className="min-h-screen bg-blue-50 text-blue-900">
      {/* Navbar */}
      <header className="w-full bg-blue-700 p-4 flex items-center justify-between shadow-md sticky top-0 z-50 text-white">
        <img src="/logo2.png" alt="Logo" className="h-10" />
        <nav className="flex-1 flex justify-center gap-4">
          <button onClick={() => navigate('/home')} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Home</button>
          <button onClick={() => navigate('/tutoriais')} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Tutoriais</button>
          <button onClick={() => navigate('/cursos')} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Cursos</button>
          <button onClick={() => navigate('/forum')} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Fórum</button>
        </nav>
      </header>
      {/* Botão Voltar */}
      <div className="flex justify-start px-8 mt-8 mb-4">
        <button
          onClick={() => navigate('/cursos')}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition duration-300"
        >
          Voltar
        </button>
      </div>

      {/* Conteúdo Principal */}
      <main className="p-8 max-w-4xl mx-auto">
        {!PsicologiaSelecionado ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Psicologia - Universidade Positivo</h1>
            <p className="mb-4">Explore conceitos fundamentais da Psicologia!</p>
            <input
              type="text"
              placeholder="Pesquise sobre seu Psicologia..."
              className="w-full p-3 mb-6 rounded border border-blue-300"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              aria-label="Campo de busca"
            />
            <div className="bg-white p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {conteudosFiltrados.map((item, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 rounded-xl p-5 shadow hover:bg-blue-200 transition Psicologiar-pointer flex justify-between items-center"
                    onClick={() => setPsicologiaSelecionado(item)}
                  >
                    <div>
                      <h2 className="text-lg font-bold mb-1">{item.titulo}</h2>
                      <p className="text-sm text-blue-800">{item.descricao}</p>
                    </div>
                    <span className="text-xl text-blue-700">➤</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow">
            <button
              onClick={() => setPsicologiaSelecionado(null)}
              className="text-sm text-blue-700 mb-4 hover:underline"
            >
              ← Voltar
            </button>
            <h2 className="text-xl font-semibold mb-2">{PsicologiaSelecionado.titulo}</h2>
            <p className="text-blue-800">{PsicologiaSelecionado.descricao}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
