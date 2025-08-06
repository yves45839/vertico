export default function Header() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
        <a href="#" className="font-bold text-xl">
          VERTICO
        </a>
        <nav className="flex gap-4">
          <a href="#services" className="hover:underline">
            Services
          </a>
          <a href="#advantages" className="hover:underline">
            Avantages
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
