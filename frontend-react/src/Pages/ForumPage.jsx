import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function ForumPage() {
  const navigate = useNavigate();

  //perguntas fixas da Universidade Positivo
  const topicosFixos = [
    {
      titulo: 'Quais são os campus disponíveis para o meu curso?',
      autor: 'Universidade Positivo',
      mensagens: [
        'Os nossos campus disponíveis estão espalhados por todo o Brasil!',
        'Em Curitiba, estamos localizados no Campus Ecoville, Osório e Santos Andrade'
      ]
    },
    {
      titulo: 'Por qual meio de comunicação posso entrar em contato com a Universidade Positivo?',
      autor: 'Universidade Positivo',
      mensagens: [
        'Os estudantes podem entrar em contato por telefone, e-mail, WhatsApp institucional e redes sociais.',
        'O Portal do Aluno e o app da Universidade também oferecem suporte e informações úteis.'
      ]
    }
  ];

  const [novoTopico, setNovoTopico] = useState({ titulo: '', autor: '', mensagem: '' });
  const [topicoSelecionado, setTopicoSelecionado] = useState(null);
  const [topicosAPI, setTopicosAPI] = useState([]);
  const [respostaTexto, setRespostaTexto] = useState('');

  const topicosCompletos = [...topicosFixos, ...topicosAPI];

  useEffect(() => {
    const fetchTopicos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Topico");
        if (!response.ok) {
          throw new Error("Erro ao carregar os tópicos");
        }
        const data = await response.json();
        const topicosFormatados = data.map(t => ({
          titulo: t.titulo,
          autor: t.autor,
          mensagens: [t.conteudo || '']
        }));
        setTopicosAPI(topicosFormatados);
      } catch (error) {
        console.error("Erro ao carregar os tópicos:", error);
      }
    };
    fetchTopicos();
  }, []);

  const adicionarTopico = async () => {
    if (!novoTopico.titulo || !novoTopico.autor || !novoTopico.mensagem) return;

    const novoTopicoParaEnviar = {
      titulo: novoTopico.titulo,
      conteudo: novoTopico.mensagem,
      autor: novoTopico.autor
    };

    try {
      const response = await fetch("http://localhost:5000/api/Topico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoTopicoParaEnviar)
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar o tópico");
      }

      const topicoSalvo = await response.json();
      const novo = {
        titulo: topicoSalvo.titulo,
        autor: topicoSalvo.autor,
        mensagens: [topicoSalvo.conteudo]
      };

      setTopicosAPI(prev => [...prev, novo]);
      setNovoTopico({ titulo: '', autor: '', mensagem: '' });

    } catch (error) {
      console.error("Erro ao salvar no banco:", error);
    }
  };

  const adicionarMensagem = (mensagem) => {
    if (!mensagem) return;

    const todosTopicos = [...topicosFixos, ...topicosAPI];

    const index = topicoSelecionado;
    if (index < topicosFixos.length) {
      topicosFixos[index].mensagens.push(mensagem);
    } else {
      const relativeIndex = index - topicosFixos.length;
      const atualizados = [...topicosAPI];
      atualizados[relativeIndex].mensagens.push(mensagem);
      setTopicosAPI(atualizados);
    }
  };

  const enviarResposta = () => {
    if (!respostaTexto.trim()) return;
    adicionarMensagem(respostaTexto.trim());
    setRespostaTexto('');
  };

  //atualizações visuais do código
  return (
    <div className="min-h-screen bg-blue-50 text-blue-900">
      <div className="w-full bg-blue-700 p-4 flex justify-center items-center gap-8 shadow-md sticky top-0 z-50 text-white">
        <img src="/logo2.png" alt="Logo" className="h-10 absolute left-4" />
        <button onClick={() => window.location.href = '/home'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Home</button>
        <button onClick={() => window.location.href = '/cursos'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Cursos</button>
        <button onClick={() => window.location.href = '/tutoriais'} className="hover:bg-white hover:text-blue-700 px-4 py-2 rounded transition">Tutoriais</button>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">Fórum</h1>
        <h4 className="text-1xl font-bold mb-4">Converse aqui com seus colegas!</h4>

        <div className="flex items-center justify-start mb-6">
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition duration-300"
          >
            Voltar
          </button>
        </div>

        {topicoSelecionado === null ? (
          <>
            <div className="bg-white p-6 rounded-xl mb-8 shadow">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">Novo tópico</h2>
              <input
                className="w-full mb-3 p-3 rounded border border-blue-300 text-blue-900"
                placeholder="Título"
                value={novoTopico.titulo}
                onChange={(e) => setNovoTopico({ ...novoTopico, titulo: e.target.value })}
              />
              <input
                className="w-full mb-3 p-3 rounded border border-blue-300 text-blue-900"
                placeholder="Seu nome"
                value={novoTopico.autor}
                onChange={(e) => setNovoTopico({ ...novoTopico, autor: e.target.value })}
              />
              <textarea
                className="w-full mb-3 p-3 rounded border border-blue-300 text-blue-900"
                placeholder="Mensagem"
                value={novoTopico.mensagem}
                onChange={(e) => setNovoTopico({ ...novoTopico, mensagem: e.target.value })}
              />
              <button
                onClick={adicionarTopico}
                className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 transition duration-300"
              >
                Criar Tópico
              </button>
            </div>

            <div className="space-y-5">
              {topicosCompletos.map((t, i) => (
                <div
                  key={i}
                  onClick={() => setTopicoSelecionado(i)}
                  className="cursor-pointer bg-white text-blue-900 p-5 rounded shadow hover:bg-blue-100"
                >
                  <h3 className="font-bold text-lg">{t.titulo}</h3>
                  <p className="text-sm text-blue-700 mt-1">por {t.autor}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white text-blue-900 p-6 rounded-xl shadow">
            <button
              onClick={() => setTopicoSelecionado(null)}
              className="mb-4 text-sm flex items-center gap-1 text-blue-700 hover:underline"
            >
              <span className="text-lg">←</span>
              <span>Voltar</span>
            </button>
            <h2 className="text-2xl font-bold mb-2">{topicosCompletos[topicoSelecionado].titulo}</h2>
            <p className="mb-6 text-blue-700">por {topicosCompletos[topicoSelecionado].autor}</p>
            <div className="space-y-4 mb-6 max-h-72 overflow-y-auto">
              {topicosCompletos[topicoSelecionado].mensagens.map((msg, i) => (
                <div key={i} className="bg-blue-100 p-3 rounded text-blue-900">
                  {msg}
                </div>
              ))}
            </div>
            <textarea
              className="w-full mb-3 p-3 rounded border border-blue-300 text-blue-900"
              placeholder="Responder..."
              value={respostaTexto}
              onChange={(e) => setRespostaTexto(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  enviarResposta();
                }
              }}
            />
            <button
              onClick={enviarResposta}
              className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 transition duration-300"
            >
              Enviar Resposta
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
