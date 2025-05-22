import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function TutoriaisPage() {
  const navigate = useNavigate();
  const [tutorialSelecionado, setTutorialSelecionado] = useState(null);
  const [filtro, setFiltro] = useState('');

  const tutoriais = [
    {
      titulo: 'Tutorial 1: Introdução ao JavaScript',
      conteudo: 'JavaScript é uma linguagem de programação usada para tornar páginas web interativas. Você pode começar declarando variáveis usando `let` ou `const`.\n\n```js\nlet nome = "Maria";\nconsole.log(nome);\n```'
    },
    {
      titulo: 'Tutorial 2: Condicionais',
      conteudo: 'Condicionais permitem que você execute blocos de código com base em condições.\n\n```js\nconst idade = 18;\nif (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}\n```'
    },
    {
      titulo: 'Tutorial 3: Loops',
      conteudo: 'Loops permitem repetir uma ação várias vezes.\n\n```js\nfor (let i = 0; i < 5; i++) {\n  console.log("Número: " + i);\n}\n```'
    },
    {
      titulo: 'Tutorial 4: Funções',
      conteudo: 'Funções são blocos de código reutilizáveis.\n\n```js\nfunction saudacao(nome) {\n  return "Olá, " + nome + "!";\n}\nconsole.log(saudacao("Lucas"));\n```'
    },
    {
      titulo: 'Tutorial 5: Arrays e Métodos',
      conteudo: 'Arrays armazenam coleções de valores. Você pode usar métodos como `.map()` ou `.filter()`.\n\n```js\nconst numeros = [1, 2, 3];\nconst dobrados = numeros.map(n => n * 2);\nconsole.log(dobrados);\n```'
    }
  ];

  const tutoriaisFiltrados = tutoriais.filter(t =>
    t.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900">
      <div className="w-full bg-blue-700 p-4 flex justify-center items-center gap-8 shadow-md sticky top-0 z-50 text-white">
        <img src="/logo2.png" alt="EducaTech Logo" className="h-10 absolute left-4" />
        <button onClick={() => window.location.href = '/home'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Home</button>
        <button onClick={() => window.location.href = '/cursos'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Cursos</button>
        <button onClick={() => window.location.href = '/Fórum'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Fórum</button>
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
        {!tutorialSelecionado ? (
          <>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
              Tutoriais Interativos
            </h1>
            <p className="text-blue-800 mb-4">Aprenda programação com tutoriais simples e didáticos.</p>
            <input
              type="text"
              placeholder="Pesquisar x..."
              className="w-full p-3 mb-6 rounded border border-blue-300 text-blue-900 outline-none"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="bg-white p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {tutoriaisFiltrados.map((tutorial, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 rounded-xl p-5 shadow hover:bg-blue-200 transition cursor-pointer flex justify-between items-center"
                    onClick={() => setTutorialSelecionado(tutorial)}
                  >
                    <h2 className="text-lg font-bold text-blue-900">{tutorial.titulo}</h2>
                    <span className="text-xl text-blue-700">➤</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white text-blue-900 p-6 rounded-xl shadow">
            <button
              onClick={() => setTutorialSelecionado(null)}
              className="text-sm text-blue-700 flex items-center gap-1 mb-4 hover:underline"
            >
              <span className="text-lg">←</span>
              <span>Voltar</span>
            </button>
            <h2 className="text-xl font-bold mb-4">{tutorialSelecionado.titulo}</h2>
            <pre className="whitespace-pre-wrap bg-blue-50 p-4 rounded text-sm font-mono text-blue-900">
              {tutorialSelecionado.conteudo}
            </pre>
          </div>
        )}
      </div>
  <Footer />
    </div>
  );
}
