import React, { useState } from 'react';

export default function ForumPage() {
  const [topicos, setTopicos] = useState([
    {
      titulo: 'Quais são os campus disponíveis para o meu curso?',
      autor: 'Universidade Positivo',
      mensagens: ['Os nossos campus disponíveis estão espalhados por todo o Brasil!',
        'Em Curitiba, estamos localizados no Campus Ecoville, Osório e Santos Andrade']
    },
    {
      titulo: 'Por qual meio de comunicação posso entrar em contato com a Universidade Positivo?',
      autor: 'Universidade Positivo',
      mensagens: ['Os estudantes podem entrar em contato com a Universidade Positivo por diversos canais oficiais, como telefone, e-mail, WhatsApp institucional e redes sociais.',
        'Além disso, o Portal do Aluno e o app da Universidade também oferecem suporte e informações úteis para os acadêmicos.']

    }
  ]);
  const [novoTopico, setNovoTopico] = useState({ titulo: '', autor: '', mensagem: '' });
  const [topicoSelecionado, setTopicoSelecionado] = useState(null);

const adicionarTopico = async () => { //add as novas perguntas no db
  if (!novoTopico.titulo || !novoTopico.autor || !novoTopico.mensagem) return;
  const novoTopicoParaEnviar = {
    titulo: novoTopico.titulo,
    conteudo: novoTopico.mensagem, 
    autor: novoTopico.autor
  };
  try {
    const response = await fetch("http://localhost:5000/api/Topico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoTopicoParaEnviar)
    });
    if (!response.ok) {
      throw new Error("Erro ao salvar o tópico");
    }
    const topicoSalvo = await response.json();
    setTopicos([
      ...topicos,
      {
        titulo: topicoSalvo.titulo,
        autor: topicoSalvo.autor,
        mensagens: [topicoSalvo.conteudo]
      }
    ]);
    setNovoTopico({ titulo: '', autor: '', mensagem: '' });
  } catch (error) {
    console.error("Erro ao salvar no banco:", error);
  }
};

  const adicionarMensagem = (mensagem) => {
    if (!mensagem) return;
    const novosTopicos = [...topicos];
    novosTopicos[topicoSelecionado].mensagens.push(mensagem);
    setTopicos(novosTopicos);
  };

  //atualizar com os novos cursos
  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white">
      <div className="w-full bg-[#2a2a2c] p-4 flex justify-center items-center gap-8 shadow-md sticky top-0 z-50">
        <img src="/logo2.png" alt="Logo" className="h-10 absolute left-4" />
        <button onClick={() => window.location.href = '/home'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Home</button>
        <button onClick={() => window.location.href = '/cursos'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Cursos</button>
        <button onClick={() => window.location.href = '/filosofia'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Filosofia</button>
        <button onClick={() => window.location.href = '/psicologia'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Psicologia</button>
        <button onClick={() => window.location.href = '/biomedicina'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Biomedicina</button>
        <button onClick={() => window.location.href = '/medicina'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Medicina</button>
        <button onClick={() => window.location.href = '/tutoriais'} className="text-white hover:bg-white hover:text-black px-4 py-2 rounded transition">Tutoriais</button>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Fórum</h1>

        {topicoSelecionado === null ? (
          <>
            <div className="bg-[#3a3a3c] p-4 rounded-xl mb-6">
              <h2 className="text-lg font-semibold mb-2">Novo tópico</h2>
              <input
                className="w-full mb-2 p-2 rounded text-black"
                placeholder="Título"
                value={novoTopico.titulo}
                onChange={(e) => setNovoTopico({ ...novoTopico, titulo: e.target.value })}
              />
              <input
                className="w-full mb-2 p-2 rounded text-black"
                placeholder="Seu nome"
                value={novoTopico.autor}
                onChange={(e) => setNovoTopico({ ...novoTopico, autor: e.target.value })}
              />
              <textarea
                className="w-full mb-2 p-2 rounded text-black"
                placeholder="Mensagem"
                value={novoTopico.mensagem}
                onChange={(e) => setNovoTopico({ ...novoTopico, mensagem: e.target.value })}
              />
              <button onClick={adicionarTopico} className="bg-black text-white px-4 py-2 rounded hover:opacity-90">
                Criar Tópico
              </button>
            </div>

            <div className="space-y-4">
              {topicos.map((t, i) => (
                <div
                  key={i}
                  onClick={() => setTopicoSelecionado(i)}
                  className="cursor-pointer bg-gray-100 text-black p-4 rounded hover:bg-gray-200"
                >
                  <h3 className="font-bold">{t.titulo}</h3>
                  <p className="text-sm text-gray-700">por {t.autor}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white text-black p-4 rounded-xl">
            <button onClick={() => setTopicoSelecionado(null)} className="mb-4 text-sm text-black flex items-center gap-1 group">
              <span className="text-lg">←</span>
              <span className="group-hover:underline">Voltar</span>
            </button>
            <h2 className="text-xl font-bold mb-1">{topicos[topicoSelecionado].titulo}</h2>
            <p className="mb-4 text-gray-600">por {topicos[topicoSelecionado].autor}</p>
            <div className="space-y-2 mb-4">
              {topicos[topicoSelecionado].mensagens.map((msg, i) => (
                <div key={i} className="bg-gray-100 text-black p-2 rounded">
                  {msg}
                </div>
              ))}
            </div>
            <textarea
              className="w-full mb-2 p-2 rounded text-black"
              placeholder="Responder..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  adicionarMensagem(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
