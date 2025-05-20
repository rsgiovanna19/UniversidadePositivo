import React, { useState } from 'react';

export default function TutoriaisPage() {
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
    <div className="min-h-screen bg-[#1c1c1e] text-white">
      <div className="w-full bg-[#2a2a2c] p-4 flex justify-center items-center gap-8 shadow-md sticky top-0 z-50">
        <img src="/logo2.png" alt="EducaTech Logo" className="h-10 absolute left-4" />
        <button onClick={() => window.location.href = '/home'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Home</button>
        <button onClick={() => window.location.href = '/desafios'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Desafios</button>
        <button onClick={() => window.location.href = '/forumpage'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Fórum</button>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        {!tutorialSelecionado ? (
          <>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
            Tutoriais Interativos
            </h1>
            <p className="text-gray-300 mb-4">Aprenda programação com tutoriais simples e didáticos.</p>
            <input
              type="text"
              placeholder="Pesquisar tutorial..."
              className="w-full p-3 mb-6 rounded bg-white text-black outline-none"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="bg-[#2a2a2c] p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {tutoriaisFiltrados.map((tutorial, index) => (
                  <li
                    key={index}
                    className="bg-[#3a3a3c] text-white rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer flex justify-between items-center"
                    onClick={() => setTutorialSelecionado(tutorial)}
                  >
                    <h2 className="text-lg font-bold">{tutorial.titulo}</h2>
                    <span className="text-xl text-black">➤</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white text-black p-6 rounded-xl shadow">
            <button
              onClick={() => setTutorialSelecionado(null)}
              className="text-sm text-black flex items-center gap-1 mb-4 group"
            >
              <span className="text-lg">←</span>
              <span className="group-hover:underline">Voltar</span>
            </button>
            <h2 className="text-xl font-bold mb-4">{tutorialSelecionado.titulo}</h2>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm font-mono text-black">
              {tutorialSelecionado.conteudo}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
