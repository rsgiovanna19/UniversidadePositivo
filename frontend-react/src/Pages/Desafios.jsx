import React, { useState } from 'react';

export default function DesafiosPage() {
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);
  const [codigo, setCodigo] = useState('');
  const [saida, setSaida] = useState('');
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [filtro, setFiltro] = useState('');

  const desafios = [
    {
      titulo: 'Desafio 1: Funções Básicas em JavaScript',
      descricao: 'Crie uma função que retorne se um número é par ou ímpar. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(verificarPar(4)); para ver o resultado',
      resposta: 'function verificarPar(numero) {\n  return numero % 2 === 0 ? "par" : "ímpar";\n}\nlog(verificarPar(4));'
    },
    {
      titulo: 'Desafio 2: Manipulação de Arrays',
      descricao: 'Ordene um array de números em ordem crescente. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(ordenarArray([5, 3, 1]));',
      resposta: 'function ordenarArray(arr) {\n  return arr.sort((a, b) => a - b);\n}\nlog(ordenarArray([5, 3, 1]));'
    },
    {
      titulo: 'Desafio 3: Soma de Elementos',
      descricao: 'Calcule a soma de todos os elementos de um array. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(somaElementos([1, 2, 3]));',
      resposta: 'function somaElementos(arr) {\n  return arr.reduce((soma, atual) => soma + atual, 0);\n}\nlog(somaElementos([1, 2, 3]));'
    },
    {
      titulo: 'Desafio 4: Verificar Palíndromo',
      descricao: 'Verifique se uma palavra é um palíndromo. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(ehPalindromo("ana"));',
      resposta: 'function ehPalindromo(palavra) {\n  const invertido = palavra.split("").reverse().join("");\n  return palavra === invertido;\n}\nlog(ehPalindromo("ana"));'
    },
    {
      titulo: 'Desafio 5: Números Primos',
      descricao: 'Verifique se um número é primo. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(ehPrimo(7));',
      resposta: 'function ehPrimo(n) {\n  if (n <= 1) return false;\n  for (let i = 2; i < n; i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}\nlog(ehPrimo(7));'
    },
    {
      titulo: 'Desafio 6: Contar Vogais',
      descricao: 'Conte quantas vogais existem em uma string. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(contarVogais("hello"));',
      resposta: 'function contarVogais(str) {\n  return (str.match(/[aeiou]/gi) || []).length;\n}\nlog(contarVogais("hello"));'
    },
    {
      titulo: 'Desafio 7: Fatorial',
      descricao: 'Calcule o fatorial de um número. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(fatorial(5));',
      resposta: 'function fatorial(n) {\n  return n <= 1 ? 1 : n * fatorial(n - 1);\n}\nlog(fatorial(5));'
    },
    {
      titulo: 'Desafio 8: Encontrar Máximo',
      descricao: 'Encontre o maior número em um array. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(maiorNumero([4, 7, 1]));',
      resposta: 'function maiorNumero(arr) {\n  return Math.max(...arr);\n}\nlog(maiorNumero([4, 7, 1]));'
    },
    {
      titulo: 'Desafio 9: Inverter String',
      descricao: 'Inverta os caracteres de uma string. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(inverter("abc"));',
      resposta: 'function inverter(str) {\n  return str.split("").reverse().join("");\n}\nlog(inverter("abc"));'
    },
    {
      titulo: 'Desafio 10: Remover Duplicatas',
      descricao: 'Remova valores duplicados de um array. Use log(...) para imprimir a saída.',
      placeholder: '// Escreva seu código aqui...\n// Dica: use log(removerDuplicatas([1, 2, 2, 3]));',
      resposta: 'function removerDuplicatas(arr) {\n  return [...new Set(arr)];\n}\nlog(removerDuplicatas([1, 2, 2, 3]));'
    }
  ];

  const executarCodigo = () => {
    try {
      const consoleLog = [];
      const log = (val) => consoleLog.push(val);
      new Function('log', `${codigo}`)(log);
      const ultimaSaida = consoleLog.length ? consoleLog.at(-1) : '';
      setSaida(String(ultimaSaida));
    } catch (err) {
      setSaida('Erro: ' + err.message);
    }
  };

  const desafiosFiltrados = desafios.filter(d => d.titulo.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white">
      {/* Navbar fixa */}
      <div className="w-full bg-[#2a2a2c] p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
  <img src="/logo2.png" alt="EducaTech Logo" className="h-10" />

  <div className="flex-1 flex justify-center gap-4">
    <button onClick={() => window.location.href = '/home'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Home</button>
    <button onClick={() => window.location.href = '/tutoriais'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Tutoriais</button>
    <button onClick={() => window.location.href = '/forumpage'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Fórum</button>
  </div>
</div>


      <div className="p-8 max-w-4xl mx-auto">
        {!desafioSelecionado ? (
          <>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
              Desafios de Programação
            </h1>
            <p className="text-gray-300 mb-4">Explore e pratique conceitos fundamentais de JavaScript resolvendo desafios interativos.</p>
            <input
              type="text"
              placeholder="Pesquisar desafio..."
              className="w-full p-3 mb-6 rounded bg-white text-black outline-none"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
             <div className="bg-[#2a2a2c] p-4 rounded-xl shadow max-h-[480px] overflow-y-auto">
              <ul className="space-y-4">
                {desafiosFiltrados.map((desafio, index) => (
                  <li
                    key={index}
                    className="bg-[#3a3a3c] text-white rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      setDesafioSelecionado(desafio);
                      setCodigo('');
                      setSaida('');
                      setMostrarResposta(false);
                    }}
                  >
                    <div>
                      <h2 className="text-lg font-bold mb-1">{desafio.titulo}</h2>
                      <p className="text-sm text-gray-300">{desafio.descricao}</p>
                    </div>
                    <span className="text-xl text-white">➤</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="bg-white text-black p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setDesafioSelecionado(null)}
                  className="text-sm text-black flex items-center gap-1 group"
                >
                  <span className="text-lg">←</span>
                  <span className="group-hover:underline">Voltar</span>
                </button>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">{desafioSelecionado.titulo}</h2>
            <p className="text-gray-700 mb-4">{desafioSelecionado.descricao}</p>

            <textarea
              className="w-full h-40 p-3 text-sm border rounded mb-4 font-mono bg-gray-100 text-gray-800"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder={desafioSelecionado.placeholder}
            />

            <div className="flex gap-4">
              <button
                onClick={executarCodigo}
                className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
              >
                Executar Código
              </button>

              <button
                onClick={() => setMostrarResposta(!mostrarResposta)}
                className="bg-gray-300 text-black px-6 py-2 rounded hover:opacity-90"
              >
                {mostrarResposta ? 'Ocultar Resposta' : 'Mostrar Resposta'}
              </button>
            </div>

            {mostrarResposta && (
              <div className="mt-4">
                <h3 className="font-semibold">Resposta correta:</h3>
                <pre className="bg-gray-100 text-black p-3 rounded mt-1 whitespace-pre-wrap">
                  {desafioSelecionado.resposta}
                </pre>
              </div>
            )}

            <div className="mt-4">
              <h3 className="font-semibold">Saída:</h3>
              <pre className="bg-gray-100 text-black p-3 rounded mt-1 whitespace-pre-wrap">
                {saida}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
