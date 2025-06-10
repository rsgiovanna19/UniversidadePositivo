import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function Biomedicina() {
  const navigate = useNavigate();
  const [Biomed, setBiomed] = useState(null);
  const [filtro, setFiltro] = useState('');

  //conteúdo dos cursos
  const conteudoBiomedicina = [
    {
      titulo: 'Conheça a Biomedicina',
      descricao: 'O curso de Biomedicina forma profissionais capacitados para atuar nas áreas de diagnóstico laboratorial, pesquisa científica, estética, entre outras, com uma base sólida em biologia, química e saúde humana.'
    },
    {
      titulo: 'Mercado de Trabalho da Biomedicina',
      descricao: 'O biomédico encontra oportunidades em hospitais, clínicas, laboratórios, indústria farmacêutica, centros de pesquisa, e também pode empreender em áreas como estética e análises clínicas.'
    },
    {
      titulo: 'Áreas de atuação da Biomedicina',
      descricao: 'As principais áreas incluem análises clínicas, biologia molecular, banco de sangue, imagem (como ressonância), reprodução humana, perícia criminal, estética, acupuntura e pesquisa científica.'
    },
    {
      titulo: 'Diferenciais da Biomedicina',
      descricao: 'A Biomedicina oferece estrutura de laboratórios modernos, professores com experiência de mercado, projetos de iniciação científica, foco em empreendedorismo e trilhas customizáveis de formação.'
    },
    {
      titulo: 'Duração da Biomedicina',
      descricao: 'O curso de Biomedicina tem duração média de 4 anos (8 semestres), com aulas teóricas e práticas em laboratório.'
    },
    {
      titulo: 'Mensalidade da Biomedicina',
      descricao: 'Quer saber o investimento da mensalidade do curso de Biomedicina? Precisa de uma ajuda para pagar? Saiba mais. Conheça Bolsas e Descontos.'
    },
    {
      titulo: 'Trilhas Customizáveis na Biomedicina',
      descricao: 'O estudante pode escolher trilhas de especialização durante o curso, como Biomedicina Estética, Análises Clínicas, Pesquisa Científica, Imagem, entre outras, moldando sua formação conforme seus interesses.'
    },
    {
      titulo: 'Coordenação da Biomedicina',
      descricao: 'O curso de Biomedicina conta com uma coordenação qualificada, composta por mestres e doutores com ampla experiência acadêmica e profissional, disponíveis para orientação dos alunos durante toda a graduação.'
    }
  ];

  const resultadosFiltrados = conteudoBiomedicina.filter(item =>
    item.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  //atualizações visuais do site
  return (
    <div className="min-h-screen bg-blue-50 text-blue-900">
      {/* Navbar */}
      <div className="w-full bg-blue-700 p-4 flex items-center justify-between shadow-md sticky top-0 z-50 text-white">
        <img src="/logo2.png" alt="Logo" className="h-10" />
        <div className="flex-1 flex justify-center gap-4">
          <button onClick={() => navigate('/home')} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Home</button>
          <button onClick={() => navigate('/tutoriais')} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Tutoriais</button>
          <button onClick={() => navigate('/cursos')} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Cursos</button>
          <button onClick={() => navigate('/forum')} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Fórum</button>
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

      <div className="p-8 max-w-4xl mx-auto">
        {!Biomed ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Biomedicina - Universidade Positivo</h1>
            <p className="text-blue-800 mb-4">Explore e aprenda conceitos fundamentais da Biomedicina por meio do nosso curso!</p>
            <input
              type="text"
              placeholder="Pesquise sobre o curso..."
              className="w-full p-3 mb-6 rounded border border-blue-300 text-blue-900"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="bg-white p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {resultadosFiltrados.map((item, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 rounded-xl p-5 shadow hover:bg-blue-200 transition cursor-pointer flex justify-between items-center"
                    onClick={() => setBiomed(item)}
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
              onClick={() => setBiomed(null)}
              className="text-sm text-blue-700 mb-4 hover:underline"
            >
              ← Voltar
            </button>
            <h2 className="text-xl font-semibold mb-2">{Biomed.titulo}</h2>
            <p className="text-blue-800 mb-4">{Biomed.descricao}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
