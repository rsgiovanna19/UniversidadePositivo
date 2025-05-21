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
    <div className="min-h-screen bg-gradient-to-br from-[#1c1c1e] to-[#3a3a3c] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Botão de Logoff */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="bg-[#3a3a3c] hover:bg-black text-white font-medium py-2 px-4 rounded transition"
          >
            Sair
          </button>
        </div>

        {/* Cabeçalho */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            Olá, {primeiroNome} 
          </h1>
          <p className="text-gray-300 mt-2">
            Bem-vindo a Positivo — vamos iniciar?
          </p>
        </div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Biomedicina */}
          <div
            onClick={() => navigate('/Biomedicina')}
            className="cursor-pointer bg-[#1c1c1e] text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/Biomedicina.png" alt="Biomedicina" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2"> Biomedicina</h2>
            <p className="text-white">🎓 Biomedicina – Torne-se o profissional que transforma a saúde com ciência! <br></br>
              Descubra um universo de possibilidades na área da saúde! No curso de Biomedicina, você será preparado para atuar com diagnósticos
               laboratoriais, pesquisas científicas, análises clínicas e inovação tecnológica. Com uma formação sólida e multidisciplinar, você poderá fazer a diferença na prevenção, detecção e tratamento de doenças.
            </p>
          </div>

          {/* Tutoriais */}
          <div
            onClick={() => navigate('/tutoriais')}
            className="cursor-pointer bg-[#1c1c1e] text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/tutoriais.png" alt="Tutoriais" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2"> Tutoriais</h2>
            <p className="text-white">Aprenda com tutoriais passo a passo sobre linguagens de programação.</p>
          </div>

          {/* Fórum */}
          <div
            onClick={() => navigate('/forumpage')}
            className="cursor-pointer bg-[#1c1c1e] text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            <img src="/forum.png" alt="Fórum" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2"> Fórum</h2>
            <p className="text-white-600">Tire dúvidas, compartilhe código e ajude outros estudantes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
