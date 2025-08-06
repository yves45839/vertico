export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white text-sm py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <nav className="flex gap-4">
          <a href="#about" className="hover:underline">
            À propos
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
        <p className="text-xs">
          © 2024 Vertico Construction. Mentions légales.
        </p>
      </div>
    </footer>
  );
}
