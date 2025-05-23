//cabeçalho - referenciado nas pages - menos no cursos pq achei feio
export default function Header() {
  return (
    <header className="bg-blue-800 text-blue-100 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Logo Positivo"
          className="h-12 w-12 object-contain"
        />
        <h3 className="text-3xl font-bold">Universidade Positivo</h3>
      </div>

      <nav>
        <ul className="flex gap-8 text-lg">
          <li><a href="/tutoriais" className="hover:text-blue-300">Tutoriais</a></li>
          <li><a href="/cursos" className="hover:text-blue-300">Graduação</a></li>
          <li><a href="/forum" className="hover:text-blue-300">Fórum</a></li>
        </ul>
      </nav>
    </header>
  );
}
