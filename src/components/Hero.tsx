import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-6 py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold">VERTICO Construction</h1>
      <p className="text-lg md:text-xl">
        Gros œuvre – Aménagement intérieur – Hydraulique
      </p>
      <Link
        href="#services"
        className="bg-accent text-white font-semibold px-6 py-3 rounded hover:bg-accent/90"
      >
        Découvrir nos services
      </Link>
    </section>
  );
}
