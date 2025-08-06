import { FaTools, FaCouch, FaWater } from "react-icons/fa";

const items = [
  {
    icon: FaTools,
    title: "Gros œuvre",
    description: "Structures solides et durables pour tous vos projets",
  },
  {
    icon: FaCouch,
    title: "Aménagement intérieur",
    description: "Espaces intérieurs fonctionnels et esthétiques",
  },
  {
    icon: FaWater,
    title: "Hydraulique",
    description: "Pompes de forage et solutions hydrauliques",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 px-4 bg-blue-50">
      <h2 className="text-3xl font-bold text-center mb-10">Nos services</h2>
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white p-6 rounded shadow text-center flex flex-col items-center gap-2"
          >
            <div className="text-4xl text-orange-500">
              <item.icon />
            </div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
