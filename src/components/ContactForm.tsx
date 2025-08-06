export default function ContactForm() {
  return (
    <section id="contact" className="py-16 px-4 bg-blue-50">
      <h2 className="text-3xl font-bold text-center mb-8">Contact rapide</h2>
      <form className="max-w-md mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom"
          className="border border-blue-200 p-3 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-blue-200 p-3 rounded"
        />
        <textarea
          placeholder="Message"
          className="border border-blue-200 p-3 rounded h-32"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white font-semibold py-3 rounded hover:bg-orange-600"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
