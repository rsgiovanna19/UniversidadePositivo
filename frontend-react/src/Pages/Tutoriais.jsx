import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function CursosPage() {
  const navigate = useNavigate();
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [filtro, setFiltro] = useState('');

  const cursos = [
    {
      titulo: 'Por que estudar na Universidade Positivo?',
      conteudo: 'Na Universidade Positivo, oferecemos uma formação moderna e alinhada com o mercado de trabalho, com professores experientes e infraestrutura de ponta para garantir o seu sucesso profissional.'
    },
    {
      titulo: 'Cursos oferecidos',
      conteudo: 'Oferecemos cursos nas áreas de tecnologia, negócios, saúde, design e muito mais. Escolha a área que combina com seu perfil e prepare-se para um futuro brilhante.'
    },
    {
      titulo: 'Matrícula e Bolsas',
      conteudo: 'Quer estudar na Universidade Positivo? Conheça nosso processo de matrícula simples e aproveite as bolsas de estudo e descontos exclusivos para novos alunos.'
    },
    {
      titulo: 'Mercado de Trabalho',
      conteudo: 'Nossos cursos são planejados para atender as demandas do mercado, com foco em empregabilidade e empreendedorismo. Prepare-se para as melhores oportunidades.'
    },
    {
      titulo: 'Infraestrutura e Recursos',
      conteudo: 'Laboratórios modernos, ambientes virtuais de aprendizagem, bibliotecas digitais e suporte acadêmico dedicado para ajudar você a se desenvolver em todas as etapas do curso.'
    }
  ];

  const cursosFiltrados = cursos.filter(curso =>
    curso.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900">
      <div className="w-full bg-blue-700 p-4 flex justify-center items-center gap-8 shadow-md sticky top-0 z-50 text-white">
        <img src="/logo2.png" alt="Universidade Positivo Logo" className="h-10 absolute left-4" />
        <button onClick={() => window.location.href = '/home'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Home</button>
        <button onClick={() => window.location.href = '/cursos'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Cursos</button>
        <button onClick={() => window.location.href = '/forum'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Fórum</button>
      </div>

      {/* Botão Voltar para Home */}
      <div className="flex justify-start px-8 mt-8 mb-4">
        <button
          onClick={() => navigate('/home')}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition duration-300"
        >Voltar
        </button>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        {!cursoSelecionado ? (
          <>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
              Conheça nossos Cursos
            </h1>
            <p className="text-blue-800 mb-4">Explore os diferenciais da Universidade Positivo e encontre o curso ideal para você.</p>
            <input
              type="text"
              placeholder="Pesquise pelo curso desejado..."
              className="w-full p-3 mb-6 rounded border border-blue-300 text-blue-900 outline-none"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="bg-white p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {cursosFiltrados.map((curso, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 rounded-xl p-5 shadow hover:bg-blue-200 transition cursor-pointer flex justify-between items-center"
                    onClick={() => setCursoSelecionado(curso)}
                  >
                    <h2 className="text-lg font-bold text-blue-900">{curso.titulo}</h2>
                    <span className="text-xl text-blue-700">➤</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white text-blue-900 p-6 rounded-xl shadow">
            <button
              onClick={() => setCursoSelecionado(null)}
              className="text-sm text-blue-700 flex items-center gap-1 mb-4 hover:underline"
            >
              <span className="text-lg">←</span>
              <span>Voltar</span>
            </button>
            <h2 className="text-xl font-bold mb-4">{cursoSelecionado.titulo}</h2>
            <pre className="whitespace-pre-wrap bg-blue-50 p-4 rounded text-sm font-mono text-blue-900">
              {cursoSelecionado.conteudo}
            </pre>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
