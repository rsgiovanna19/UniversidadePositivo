import React, { useState } from 'react';

export default function Psicologia() {
  const [CursoPsicologia, setPsicologiaSelecionado] = useState(null);
  const [filtro, setFiltro] = useState('');

  const Psicologia = [
    {
      titulo: 'Conheça a Psicologia',
      descricao: 'O curso de Psicologia forma profissionais capacitados para atuar nas áreas de diagnóstico laboratorial, pesquisa científica, estética, entre outras, com uma base sólida em biologia, química e saúde humana.'
    },
    {
      titulo: 'Mercado de Trabalho da Psicologia',
      descricao: 'O biomédico encontra oportunidades em hospitais, clínicas, laboratórios, indústria farmacêutica, centros de pesquisa, e também pode empreender em áreas como estética e análises clínicas.'
    },
    {
      titulo: 'Áreas de atuação da Psicologia',
      descricao: 'As principais áreas incluem análises clínicas, biologia molecular, banco de sangue, imagem (como ressonância), reprodução humana, perícia criminal, estética, acupuntura e pesquisa científica.'
    },
    {
      titulo: 'Diferenciais da Psicologia',
      descricao: 'A Psicologia oferece estrutura de laboratórios modernos, professores com experiência de mercado, projetos de iniciação científica, foco em empreendedorismo e trilhas customizáveis de formação.'
    },
    {
      titulo: 'Duração da Psicologia',
      descricao: 'O curso de Psicologia tem duração média de 4 anos (8 semestres), com aulas teóricas e práticas em laboratório.'
    },
    {
      titulo: 'Mensalidade da Psicologia',
      descricao: 'Quer saber o investimento da mensalidade do curso de Arquitetura e Urbanismo? Precisa de uma ajuda para pagar? Saiba mais. Conheça Bolsas e Descontos'
    },
    {
      titulo: 'Trilhas Customizáveis na Psicologia',
      descricao: 'O estudante pode escolher trilhas de especialização durante o curso, como Psicologia Estética, Análises Clínicas, Pesquisa Científica, Imagem, entre outras, moldando sua formação conforme seus interesses.'
    },
    {
      titulo: 'Coordenação da Psicologia',
      descricao: 'O curso de Psicologia conta com uma coordenação qualificada, composta por mestres e doutores com ampla experiência acadêmica e profissional, disponíveis para orientação dos alunos durante toda a graduação.'
    }
  ];

  const PsicologiaFiltrados = Psicologia.filter(d =>
    d.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900">
      {/* Navbar */}
      <div className="w-full bg-blue-700 p-4 flex items-center justify-between shadow-md sticky top-0 z-50 text-white">
        <img src="/logo2.png" alt="Logo" className="h-10" />
        <div className="flex-1 flex justify-center gap-4">
          <button onClick={() => window.location.href = '/home'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Home</button>
        <button onClick={() => window.location.href = '/filosofia'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Filosofia</button>
        <button onClick={() => window.location.href = '/psicologia'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Psicologia</button>
          <button onClick={() => window.location.href = '/tutoriais'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Tutoriais</button>
          <button onClick={() => window.location.href = '/forum'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Fórum</button>
          <button onClick={() => window.location.href = '/bioPsicologia'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">BioPsicologia</button>
        </div>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        {!CursoPsicologia ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Psicologia - Universidade Positivo</h1>
            <p className="text-blue-800 mb-4">Explore e aprenda conceitos fundamentais da Psicologia por meio do nosso Curso!</p>
            <input
              type="text"
              placeholder="Pesquise sobre seu curso..."
              className="w-full p-3 mb-6 rounded border border-blue-300 text-blue-900"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="bg-white p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {PsicologiaFiltrados.map((pergunta, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 rounded-xl p-5 shadow hover:bg-blue-200 transition cursor-pointer flex justify-between items-center"
                    onClick={() => setPsicologiaSelecionado(pergunta)}
                  >
                    <div>
                      <h2 className="text-lg font-bold mb-1">{pergunta.titulo}</h2>
                      <p className="text-sm text-blue-800">{pergunta.descricao}</p>
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
              onClick={() => setPsicologiaSelecionado(null)}
              className="text-sm text-blue-700 mb-4 hover:underline"
            >
              ← Voltar
            </button>
            <h2 className="text-xl font-semibold mb-2">{CursoPsicologia.titulo}</h2>
            <p className="text-blue-800 mb-4">{CursoPsicologia.descricao}</p>
            <pre className="bg-blue-50 text-sm p-4 rounded overflow-auto text-blue-900 whitespace-pre-wrap font-mono">
              {CursoPsicologia.resposta}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
