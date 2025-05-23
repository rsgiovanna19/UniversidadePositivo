import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function Filosofia() {
  const navigate = useNavigate();
  const [filosofiaSelecionada, setFilosofiaSelecionada] = useState(null);
  const [filtro, setFiltro] = useState('');

  const informacoesFilosofia = [
    {
      titulo: 'Conheça o curso de Filosofia',
      descricao:
        'O curso de Filosofia desenvolve o pensamento crítico, a argumentação lógica e a análise de ideias fundamentais que moldam a sociedade, preparando profissionais para atuar em educação, pesquisa, consultoria ética e cultural.',
    },
    {
      titulo: 'Mercado de trabalho',
      descricao:
        'O filósofo pode atuar como professor, pesquisador, consultor em empresas, editoras, instituições públicas e organizações não-governamentais, além de participar de debates éticos e culturais em diversos setores.',
    },
    {
      titulo: 'Áreas de atuação',
      descricao:
        'Educação, pesquisa acadêmica, consultoria ética, análise crítica de discursos, elaboração de políticas públicas e curadoria de conteúdos filosóficos e culturais.',
    },
    {
      titulo: 'Diferenciais do curso',
      descricao:
        'O curso oferece uma formação interdisciplinar, com professores experientes, incentivo à iniciação científica, projetos de extensão e debates filosóficos contemporâneos.',
    },
    {
      titulo: 'Duração',
      descricao:
        'O curso de Filosofia tem duração de 4 anos (8 semestres), com disciplinas teóricas e optativas, trabalhos práticos e TCC.',
    },
    {
      titulo: 'Mensalidade e bolsas',
      descricao:
        'Consulte a instituição para mais detalhes sobre a mensalidade. Há opções de bolsas e programas de incentivo financeiro.',
    },
    {
      titulo: 'Trilhas formativas',
      descricao:
        'O aluno pode focar em áreas como Filosofia Política, Ética, Estética, Lógica, História da Filosofia e Filosofia da Ciência.',
    },
    {
      titulo: 'Coordenação',
      descricao:
        'Coordenação formada por doutores e mestres com ampla experiência em pesquisa e docência, orientando os alunos durante toda a graduação.',
    }
  ];

  const filosofiaFiltrada = informacoesFilosofia.filter((item) =>
    item.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900">
      {/* Navbar */}
      <div className="w-full bg-blue-700 p-4 flex items-center justify-between shadow-md sticky top-0 z-50 text-white">
        <img src="/logo2.png" alt="Logo" className="h-10" />
        <div className="flex-1 flex justify-center gap-4">
          <button onClick={() => window.location.href = '/home'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Home</button>
          <button onClick={() => window.location.href = '/tutoriais'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Tutoriais</button>
          <button onClick={() => window.location.href = '/cursos'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Cursos</button>
          <button onClick={() => window.location.href = '/forum'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Fórum</button>
        </div>
      </div>

      {/* Botão Voltar */}
      <div className="flex justify-start px-8 mt-8 mb-4">
        <button
          onClick={() => navigate('/cursos')}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition duration-300"
        >
          Voltar
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-8 max-w-4xl mx-auto">
        {!filosofiaSelecionada ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Filosofia - Universidade Positivo</h1>
            <p className="text-blue-800 mb-4">Explore e aprenda sobre o curso de Filosofia!</p>
            <input
              type="text"
              placeholder="Pesquise sobre o curso..."
              className="w-full p-3 mb-6 rounded border border-blue-300 text-blue-900"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="bg-white p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {filosofiaFiltrada.map((item, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 rounded-xl p-5 shadow hover:bg-blue-200 transition cursor-pointer flex justify-between items-center"
                    onClick={() => setFilosofiaSelecionada(item)}
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
          <div className="bg-white text-blue-900 p-6 rounded-xl shadow">
            <button
              onClick={() => setFilosofiaSelecionada(null)}
              className="text-sm text-blue-700 mb-4 hover:underline"
            >
              ← Voltar
            </button>
            <h2 className="text-xl font-semibold mb-2">{filosofiaSelecionada.titulo}</h2>
            <p className="text-blue-800">{filosofiaSelecionada.descricao}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
