import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Tutoriais',
      description: 'Aprenda com tutoriais passo a passo sobre linguagens de programação.',
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
      description: 'Tire dúvidas, compartilhe código e ajude outros estudantes.',
      image: '/forum.png',
      route: '/forum'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-12 text-blue-900">
      <h1 className="text-5xl font-bold text-center mb-16">Bem-vindo à Positivo! Vamos começar?</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src={card.image}
              alt={card.title}
              className="rounded-t-2xl h-48 w-full object-cover"
            />
            <div className="p-6 h-48 flex flex-col justify-between">
              <h2 className="text-3xl font-bold mb-2">{card.title}</h2>
              <p className="text-lg text-gray-700">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

