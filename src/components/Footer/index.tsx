"use client";

import {
  Scissors,
  Instagram,
  MessageCircle,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold">Lipe Cortes</span>
            </div>
            <p className="mb-4 text-gray-300">
              Mais que uma barbearia, um espaço onde estilo e personalidade se encontram. Profissionalismo e qualidade em cada corte.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/lipecortes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navegação</h3>
            <ul className="flex flex-col gap-2 text-gray-300">
              <li><a href="#inicio" className="hover:text-yellow-500 transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-yellow-500 transition-colors">Serviços</a></li>
              <li><a href="#produtos" className="hover:text-yellow-500 transition-colors">Produtos</a></li>
              <li><a href="#sobre" className="hover:text-yellow-500 transition-colors">Sobre</a></li>
              <li><a href="#contato" className="hover:text-yellow-500 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Serviços</h3>
            <ul className="flex flex-col gap-2 text-gray-300 mb-2">
              <li className="flex justify-between"><span>Degradê</span><span>R$ 35</span></li>
              <li className="flex justify-between"><span>Social</span><span>R$ 30</span></li>
              <li className="flex justify-between"><span>Barba</span><span>R$ 25</span></li>
            </ul>
            <a href="#servicos" className="text-yellow-500 hover:underline">
              Ver todos os serviços →
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="flex flex-col gap-4 text-gray-300 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <div>Rua das Flores, 123</div>
                  <div>Centro - São Paulo, SP</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-5 h-5 mt-1" />
                <div>
                  <div>(11) 99999-9999</div>
                  <div>WhatsApp disponível</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-300 mb-2">Funcionamento:</div>
              <div className="flex flex-col gap-1 text-gray-400">
                <div className="flex justify-between"><span>Seg - Sex</span><span>9h - 18h</span></div>
                <div className="flex justify-between"><span>Sábado</span><span>8h - 16h</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2025 Lipe Cortes. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
}
