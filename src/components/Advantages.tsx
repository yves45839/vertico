const points = [
  { icon: "✅", title: "Fiable" },
  { icon: "⚙️", title: "Fluide" },
  { icon: "🏅", title: "Professionnel" },
];

export default function Advantages() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Pourquoi nous choisir ?</h2>
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="text-center flex flex-col items-center gap-2">
            <div className="text-4xl text-accent">{p.icon}</div>
            <p className="text-lg font-medium">{p.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
