"use client";

import { Scissors, Star, Clock, Calendar } from "lucide-react";

interface Service {
  name: string;
  price: string;
  duration: string;
  description: string;
  image: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    name: "Degradê",
    price: "R$ 35,00",
    duration: "45 min",
    description: "Transição suave e perfeita entre o topo e as laterais, um clássico moderno.",
    image: "https://i.ibb.co/D8g0q9y/service-fade.jpg",
    popular: true,
  },
  {
    name: "Social",
    price: "R$ 30,00",
    duration: "30 min",
    description: "O corte clássico e atemporal, perfeito para qualquer ocasião.",
    image: "https://i.ibb.co/Q8F7yK2/service-social.jpg",
  },
  {
    name: "Barba",
    price: "R$ 25,00",
    duration: "25 min",
    description: "Cuidado especial para uma barba bem alinhada e cheia de estilo.",
    image: "https://i.ibb.co/Q6yJ2jT/service-beard.jpg",
  },
];

export default function Services() {
  const showAppointmentModal = (service?: string) => {
    alert(`Agendando serviço: ${service || "Consulta"} `);
  };

  return (
    <section id="servicos" className="section-services py-20 bg-[var(--color-dark)] text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Scissors className="w-8 h-8 text-[var(--color-gold)]" />
          </div>
          <h2 className="text-4xl font-bold mb-2">
            Nossos <span className="text-[var(--color-gold)]">Serviços</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Técnicas modernas e produtos premium para realçar seu estilo único. Cada corte é uma obra de arte personalizada.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="service-card relative bg-[var(--color-gray-dark)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <img src={service.image} alt={service.name} className="w-full h-64 object-cover" />
                {service.popular && (
                  <span className="absolute top-4 left-4 bg-[var(--color-gold)] text-black px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                    <Star className="w-4 h-4" /> Mais Pedido
                  </span>
                )}
                <div className="absolute inset-0 bg-black/25"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold">{service.price}</p>
                  <p className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" /> {service.duration}
                  </p>
                </div>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <button
                  className="btn-hero w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md cursor-pointer bg-[var(--color-gold)] text-black font-bold hover:bg-[var(--color-gold)] hover:shadow-[0_4px_15px_rgba(238,189,43,0.5)] transition-transform duration-600 hover:-translate-y-1 transition-colors"
                  onClick={() => showAppointmentModal(service.name)}
                >
                  <Calendar className="w-5 h-5" /> Agendar Agora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="cta-banner mt-16 bg-[var(--color-gray-dark)] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Precisa de um atendimento personalizado?</h3>
          <p className="text-gray-300 mb-4">
            Cada cliente é único. Entre em contato conosco para discutir suas necessidades específicas e criar o visual perfeito para você.
          </p>
          <button
            className="btn-hero inline-flex items-center gap-2 py-2 px-6 rounded-md bg-[var(--color-gold)] cursor-pointer text-black font-bold hover:shadow-[0_4px_15px_rgba(238,189,43,0.5)] transition-transform duration-600 hover:-translate-y-1 transition-colors"
            onClick={() => showAppointmentModal()}
          >
            <Calendar className="w-5 h-5" /> Agendar Consulta
          </button>
        </div>
      </div>
    </section>
  );
}
