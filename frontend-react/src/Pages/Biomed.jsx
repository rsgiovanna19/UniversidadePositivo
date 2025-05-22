import React, { useState } from 'react';

export default function Biomedicina() {
  const [CursoBiomed, setBiomedSelecionado] = useState(null);
  const [filtro, setFiltro] = useState('');

  const Biomedicina = [
    {
      titulo: 'Conheça o curso',
      descricao: 'Crie uma função que retorne se um número é par ou ímpar.',
      resposta: 'function verificarPar(numero) {\n  return numero % 2 === 0 ? "par" : "ímpar";\n}\nconsole.log(verificarPar(4));'
    },
    {
      titulo: 'Primeiro período: Manipulação de Arrays',
      descricao: 'Ordene um array de números em ordem crescente.',
      resposta: 'function ordenarArray(arr) {\n  return arr.sort((a, b) => a - b);\n}\nconsole.log(ordenarArray([5, 3, 1]));'
    },
    // Adicione mais desafios conforme necessário...
  ];

  const BiomedicinaFiltrados = Biomedicina.filter(d =>
    d.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white">
      {/* Navbar fixa */}
      <div className="w-full bg-[#2a2a2c] p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <img src="/logo2.png" alt="Logo" className="h-10" />
        <div className="flex-1 flex justify-center gap-4">
          <button onClick={() => window.location.href = '/home'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Home</button>
          <button onClick={() => window.location.href = '/tutoriais'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Tutoriais</button>
          <button onClick={() => window.location.href = '/forumpage'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Fórum</button>
        </div>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        {!CursoBiomed ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Biomedicina - Universidade Positivo</h1>
            <p className="text-gray-300 mb-4">Explore e aprenda conceitos fundamentais da Biomedicina por meio do nosso Curso!</p>
            <input
              type="text"
              placeholder="Pesquisar desafio..."
              className="w-full p-3 mb-6 rounded bg-white text-black outline-none"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="bg-[#2a2a2c] p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {BiomedicinaFiltrados.map((desafio, index) => (
                  <li
                    key={index}
                    className="bg-[#3a3a3c] rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer flex justify-between items-center"
                    onClick={() => setBiomedSelecionado(desafio)}
                  >
                    <div>
                      <h2 className="text-lg font-bold mb-1">{desafio.titulo}</h2>
                      <p className="text-sm text-gray-300">{desafio.descricao}</p>
                    </div>
                    <span className="text-xl">➤</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white text-black p-6 rounded-xl shadow">
            <button
              onClick={() => setBiomedSelecionado(null)}
              className="text-sm text-black mb-4"
            >
              ← Voltar
            </button>
            <h2 className="text-xl font-semibold mb-2">{CursoBiomed.titulo}</h2>
            <p className="text-gray-700 mb-4">{CursoBiomed.descricao}</p>
            <pre className="bg-gray-100 text-sm p-4 rounded overflow-auto text-gray-800 whitespace-pre-wrap font-mono">
              {CursoBiomed.resposta}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
