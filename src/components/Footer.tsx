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
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="mailto:contact@vertico.com" className="hover:underline">
            contact@vertico.com
          </a>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.07 20.452H3.847V9h3.223v11.452zM5.458 7.433a1.868 1.868 0 110-3.736 1.868 1.868 0 010 3.736zM20.452 20.452h-3.223v-5.569c0-1.327-.026-3.037-1.852-3.037-1.852 0-2.136 1.447-2.136 2.942v5.664H9.966V9h3.091v1.561h.043c.43-.813 1.482-1.668 3.049-1.668 3.26 0 3.863 2.145 3.863 4.937v6.622z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495V14.708h-3.13v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.657-4.788 1.325 0 2.463.098 2.794.142v3.24h-1.918c-1.504 0-1.797.715-1.797 1.767v2.315h3.594l-.468 3.623h-3.126V24h6.127C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
          </div>
        </div>
        <p className="text-xs">
          © 2024 Vertico Construction. Mentions légales.
        </p>
      </div>
    </footer>
  );
}
