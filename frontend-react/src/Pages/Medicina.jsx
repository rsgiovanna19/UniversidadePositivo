import React, { useState } from 'react';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Medicina() {
  const navigate = useNavigate();
  const [Medicina, setMedicina] = useState(null);
  const [filtro, setFiltro] = useState('');

  const dadosMedicina = [
    {
      titulo: 'Conheça a Medicina',
      descricao: 'O curso de Medicina forma profissionais capacitados para atuar nas áreas de diagnóstico laboratorial, pesquisa científica, estética, entre outras, com uma base sólida em biologia, química e saúde humana.'
    },
    {
      titulo: 'Mercado de Trabalho da Medicina',
      descricao: 'O médico encontra oportunidades em hospitais, clínicas, laboratórios, indústria farmacêutica, centros de pesquisa, e também pode empreender em áreas como estética e análises clínicas.'
    },
    {
      titulo: 'Áreas de atuação da Medicina',
      descricao: 'As principais áreas incluem clínica médica, cirurgia, pediatria, ginecologia, psiquiatria, dermatologia, medicina estética, entre outras.'
    },
    {
      titulo: 'Diferenciais da Medicina',
      descricao: 'O curso oferece laboratórios modernos, professores com experiência de mercado, projetos de iniciação científica e trilhas customizáveis de formação.'
    },
    {
      titulo: 'Duração da Medicina',
      descricao: 'O curso de Medicina tem duração média de 6 anos, com aulas teóricas e práticas em laboratório e hospitais-escola.'
    },
    {
      titulo: 'Mensalidade da Medicina',
      descricao: 'Quer saber o valor da mensalidade do curso de Medicina? Precisa de ajuda para pagar? Conheça Bolsas e Descontos disponíveis.'
    },
    {
      titulo: 'Trilhas Customizáveis na Medicina',
      descricao: 'O estudante pode escolher trilhas de especialização, como Medicina Estética, Cirurgia, Clínica Geral, Pesquisa Científica, entre outras.'
    },
    {
      titulo: 'Coordenação da Medicina',
      descricao: 'O curso conta com coordenação qualificada, composta por mestres e doutores com ampla experiência acadêmica e profissional.'
    }
  ];

  const dadosFiltrados = dadosMedicina.filter(item =>
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

      {/* Conteúdo principal */}
      <main className="p-8 max-w-4xl mx-auto">
        {!Medicina ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Medicina - Universidade Positivo</h1>
            <p className="text-blue-800 mb-4">Explore e aprenda conceitos fundamentais da Medicina por meio do nosso curso!</p>

            <input
              type="text"
              placeholder="Pesquise sobre seu curso..."
              className="w-full p-3 mb-6 rounded border border-blue-300 text-blue-900"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />

            <div className="bg-white p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {dadosFiltrados.map((item, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 rounded-xl p-5 shadow hover:bg-blue-200 transition cursor-pointer flex justify-between items-center"
                    onClick={() => setMedicina(item)}
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
              onClick={() => setMedicina(null)}
              className="text-sm text-blue-700 mb-4 hover:underline"
            >
              ← Voltar
            </button>
            <h2 className="text-xl font-semibold mb-2">{Medicina.titulo}</h2>
            <p className="text-blue-800 mb-4">{Medicina.descricao}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
