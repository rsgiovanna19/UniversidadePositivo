import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const nomeCompleto = localStorage.getItem('userName') || 'Usuário';
  const primeiroNome = nomeCompleto.split(' ')[0];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Botão de Logoff */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 font-medium py-2 px-4 rounded hover:bg-blue-100 transition"
          >
            Sair
          </button>
        </div>

        {/* Cabeçalho */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            Olá, Estudante!
          </h1>
          <p className="text-white/80 mt-2">
            Bem-vindo à Positivo! Vamos escolher seu curso?
          </p>
        </div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Biomedicina */}
          <div
            onClick={() => navigate('/Biomedicina')}
            className="cursor-pointer bg-white text-blue-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/Biomedicina.png" alt="Biomedicina" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">Biomedicina</h2>
            <p>
              🎓 Biomedicina – Torne-se o profissional que transforma a saúde com ciência! <br />
              Descubra um universo de possibilidades na área da saúde! No curso de Biomedicina, você será preparado para atuar com diagnósticos laboratoriais, pesquisas científicas, análises clínicas e inovação tecnológica.
            </p>
          </div>

          {/* Medicina */}
          <div
            onClick={() => navigate('/Medicina')}
            className="cursor-pointer bg-white text-blue-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/medicina.png" alt="Medicina" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">Medicina</h2>
            <p> <b>🩺 Medicina – Transforme vidas com ciência, empatia e propósito!</b> O curso de Medicina da Positivo oferece uma formação completa, aliando tecnologia de ponta, corpo docente qualificado e vivência prática desde os primeiros anos. Prepare-se para atuar com excelência na prevenção, diagnóstico e tratamento de doenças, impactando positivamente a vida de milhares de pessoas.
            Seja o médico que o mundo precisa!</p>
          </div>

          {/* Psicologia  */}
          <div
            onClick={() => navigate('/Psicologia ')}
            className="cursor-pointer bg-white text-blue-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/psicologia.png" alt="Psicologia" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">Psicologia</h2>
            <p> <b>🧠 Psicologia – Entenda mentes, transforme realidades!</b> No curso de Psicologia da Positivo, você será preparado para compreender o comportamento humano, promover saúde mental e atuar em diversas áreas como clínica, organizacional, escolar e social.
            Ajude pessoas a se encontrarem, com ciência e empatia!</p>
          </div>

          {/* Filosofia  */}
          <div
            onClick={() => navigate('/Filosofia')}
            className="cursor-pointer bg-white text-blue-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/filosofia.png" alt="Filosofia" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">Filosofia</h2>
            <p> <b>📚 Filosofia – Questione, compreenda e transforme o mundo!</b> No curso de Filosofia da Positivo, você será instigado a refletir sobre os grandes temas da existência, ética, política, ciência e linguagem. Aprenda a argumentar com clareza, pensar criticamente e enxergar o mundo sob novas perspectivas.
            Para quem acredita que grandes perguntas movem grandes mudanças!</p>
          </div>
              
          {/* Tutoriais */}
          <div
            onClick={() => navigate('/tutoriais')}
            className="cursor-pointer bg-white text-blue-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/tutoriais.png" alt="Tutoriais" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">Tutoriais</h2>
            <p>Aprenda com tutoriais passo a passo sobre linguagens de programação.</p>
          </div>

          {/* Fórum */}
          <div
            onClick={() => navigate('/forumpage')}
            className="cursor-pointer bg-white text-blue-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/forum.png" alt="Fórum" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">Fórum</h2>
            <p>Tire dúvidas, compartilhe código e ajude outros estudantes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
