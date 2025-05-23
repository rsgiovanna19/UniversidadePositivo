import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function MainPage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'A Universidade',
      description: 'Conheça um pouco mais do seu futuro',
      image: '/tutoriais.png',
      route: '/tutoriais'
    },
    {
      title: 'Graduação',
      description: 'Veja todos os cursos da graduação disponíveis e encontre o ideal para você.',
      image: '/cursos.png',
      route: '/cursos'
    },
    {
      title: 'Fórum',
      description: 'Tire dúvidas, compartilhe ideias e ajude outros estudantes.',
      image: '/forum.png',
      route: '/forum'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-blue-900 text-blue-100">
      <Header /> {/* cabeçalho fixo no topo */}

      {/* Botão Voltar para Home */}
      <div className="flex justify-start px-8 mt-8 mb-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition duration-300"
        >Sair
        </button>
      </div>

      <main className="px-6 py-12 flex-grow">
        <h4 className="text-5xl font-bold text-center mb-16">
          Bem-vindo à Universidade Positivo! Vamos começar?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={() => navigate(card.route)}
              className="cursor-pointer bg-blue-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            >
              <img
                src={card.image}
                alt={card.title}
                className="rounded-t-2xl h-48 w-full object-cover"
              />
              <div className="p-6 h-48 flex flex-col justify-between">
                <h4 className="text-blue-100 font-bold mb-2 text-4xl">{card.title}</h4>
                <p className="text-lg text-blue-200">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
