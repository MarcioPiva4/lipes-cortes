"use client";

import { Scissors, Users, Clock, Award } from "lucide-react";

export default function About() {
  return (
    <section id="sobre" className="section-about py-20 bg-[var(--color-dark)] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Conteúdo de texto */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center justify-start mb-2">
              <Scissors className="w-8 h-8 text-[var(--color-gold)]" />
            </div>
            <h2 className="text-4xl font-bold mb-2">
              Sobre o <span className="text-[var(--color-gold)]">Lipe Cortes</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Mais que uma barbearia, é um espaço onde estilo e personalidade se encontram.
            </p>
            <div className="space-y-4">
              <p>
                Há 5 anos, o Lipe Cortes nasceu da paixão por criar não apenas cortes, mas experiências únicas. 
                Com técnicas modernas e um olhar atento aos detalhes, transformamos cada visita em um momento de cuidado pessoal e renovação.
              </p>
              <p>
                Nossa filosofia é simples: <strong className="text-[var(--color-gold)]">profissionalismo + estilo</strong>. 
                Cada cliente recebe atenção personalizada, garantindo que saia daqui não apenas com um novo visual, mas com mais confiança.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="stat-item bg-[var(--color-gray-dark)] p-6 rounded-xl flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Users className="w-10 h-10 text-[var(--color-gold)] mb-2" />
                <div className="text-2xl font-bold">500+</div>
                <div className="font-semibold">Clientes Satisfeitos</div>
                <div className="text-gray-300 text-sm">Cada cliente é único, cada corte é especial</div>
              </div>
              <div className="stat-item bg-[var(--color-gray-dark)] p-6 rounded-xl flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Clock className="w-10 h-10 text-[var(--color-gold)] mb-2" />
                <div className="text-2xl font-bold">5</div>
                <div className="font-semibold">Anos de Experiência</div>
                <div className="text-gray-300 text-sm">Aperfeiçoando técnicas e criando estilos</div>
              </div>
              <div className="stat-item bg-[var(--color-gray-dark)] p-6 rounded-xl flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Award className="w-10 h-10 text-[var(--color-gold)] mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="font-semibold">Qualidade Garantida</div>
                <div className="text-gray-300 text-sm">Compromisso com a excelência em cada serviço</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 w-full flex justify-center">
              <button
                className="btn-hero bg-[var(--color-gold)] text-black cursor-pointer font-bold px-6 py-3 rounded-md hover:shadow-[0_4px_15px_rgba(238,189,43,0.5)] transition-transform duration-600 hover:-translate-y-1 transition-colors"
                onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              >
                Conheça Nosso Espaço
              </button>
            </div>
          </div>

          {/* Imagem e citação */}
          <div className="flex-1 relative">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://i.ibb.co/6P6X2f1/barbershop-interior.jpg"
                alt="Interior moderno da barbearia Lipe Cortes com cadeiras de couro e ambiente luxuoso"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-[var(--color-gold)] bg-opacity-70 w-full p-4 rounded-md max-w-xs">
              <blockquote className="italic text-[var(--color-dark)]">
                "Cada corte é uma obra de arte. Cada cliente, uma nova inspiração."
              </blockquote>
              <cite className="block mt-2 text-[var(--color-dark)] font-semibold">- Lipe Cortes, Fundador</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
